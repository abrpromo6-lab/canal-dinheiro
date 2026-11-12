// Gera a narração de um episódio no ElevenLabs e encaixa no JSON:
// áudio por cena (public/audio/), tempo de cada palavra (legenda), duração da cena
// e o momento exato em que cada cartão entra/sai (pela palavra-âncora).
//
// Uso:
//   node scripts/narrar.mjs                       (ep01, todas as cenas)
//   node scripts/narrar.mjs src/episodios/ep01.json --so=s02
//   node scripts/narrar.mjs --forcar              (refaz mesmo sem mudança)
//   node scripts/narrar.mjs --vozes               (lista vozes da conta)
//   node scripts/narrar.mjs --teste=<voice_id>    (gera só a cena 1 em out/teste-voz-*.mp3)

import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

// O .env do projeto tem prioridade sobre variáveis do sistema
// (o Windows pode ter uma ELEVENLABS_API_KEY antiga configurada).
if (existsSync(".env")) {
  for (const linha of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const m = linha.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2];
  }
}

const API = "https://api.elevenlabs.io/v1";
const CHAVE = process.env.ELEVENLABS_API_KEY;
if (!CHAVE) {
  console.error("Falta ELEVENLABS_API_KEY no .env");
  process.exit(1);
}

const args = process.argv.slice(2);
const opc = Object.fromEntries(
  args.filter((a) => a.startsWith("--")).map((a) => {
    const [k, v] = a.slice(2).split("=");
    return [k, v ?? true];
  })
);
const arquivoEp = args.find((a) => !a.startsWith("--")) ?? "src/episodios/ep01.json";

const PAUSA_FIM = 0.15; // respiro depois de cada fala (s)
const SEGURA_FINAL = 1.8; // tempo extra na última cena (tela final)

const api = async (rota, init = {}) => {
  const r = await fetch(API + rota, { ...init, headers: { "xi-api-key": CHAVE, "Content-Type": "application/json", ...init.headers } });
  if (!r.ok) throw new Error(`${r.status} ${rota}: ${(await r.text()).slice(0, 300)}`);
  return r.json();
};

const limpa = (t) => t.replace(/^[^\p{L}\p{N}$]+|[^\p{L}\p{N}%]+$/gu, "");

/** Converte o alinhamento por caractere do ElevenLabs em palavras com tempo de início. */
const palavrasDe = (alinhamento) => {
  const { characters, character_start_times_seconds: ini } = alinhamento;
  const palavras = [];
  let atual = null;
  characters.forEach((ch, i) => {
    if (/\s/.test(ch)) {
      atual = null;
      return;
    }
    if (!atual) {
      atual = { texto: "", inicio: Math.round(ini[i] * 1000) / 1000 };
      palavras.push(atual);
    }
    atual.texto += ch;
  });
  return palavras;
};

const acharPalavra = (palavras, ancora) => palavras.find((p) => limpa(p.texto) === limpa(ancora));

const existe = (p) => access(p).then(() => true, () => false);

async function listarVozes() {
  const { voices } = await api("/voices");
  for (const v of voices) console.log(`${v.voice_id} | ${v.name} | ${v.category} | ${JSON.stringify(v.labels ?? {})}`);
}

async function falar(voz, texto, anterior, proximo) {
  const consulta = "?output_format=mp3_44100_128";
  return api(`/text-to-speech/${voz.id}/with-timestamps${consulta}`, {
    method: "POST",
    body: JSON.stringify({
      text: texto,
      model_id: voz.modelo,
      voice_settings: voz.ajustes,
      previous_text: anterior || undefined,
      next_text: proximo || undefined,
    }),
  });
}

async function main() {
  if (opc.vozes) return listarVozes();

  const ep = JSON.parse(await readFile(arquivoEp, "utf8"));
  const voz = ep.voz;
  if (!voz?.id) throw new Error("Defina ep.voz.id no JSON");

  if (opc.teste) {
    const v = { ...voz, id: opc.teste };
    const r = await falar(v, ep.cenas[0].fala + " " + ep.cenas[4].fala, "", "");
    await mkdir("out", { recursive: true });
    const saida = `out/teste-voz-${opc.teste}.mp3`;
    await writeFile(saida, Buffer.from(r.audio_base64, "base64"));
    console.log("Teste salvo em", saida);
    return;
  }

  await mkdir("public/audio", { recursive: true });
  const cenas = ep.cenas;
  for (let i = 0; i < cenas.length; i++) {
    const c = cenas[i];
    if (opc.so && opc.so !== c.id) continue;
    const audio = `audio/${ep.id}-${c.id}.mp3`;
    const assinatura = `${voz.id}|${voz.modelo}|${JSON.stringify(voz.ajustes)}|${c.fala}`;
    if (!opc.forcar && c.audioAssinatura === assinatura && (await existe(path.join("public", audio)))) {
      console.log(c.id, "sem mudança, pulando");
    } else {
      const r = await falar(voz, c.fala, cenas[i - 1]?.fala, cenas[i + 1]?.fala);
      await writeFile(path.join("public", audio), Buffer.from(r.audio_base64, "base64"));
      const al = r.alignment;
      c.palavras = palavrasDe(al);
      c.duracaoFala = Math.round(al.character_end_times_seconds.at(-1) * 1000) / 1000;
      c.audio = audio;
      c.audioAssinatura = assinatura;
      console.log(c.id, `${c.duracaoFala.toFixed(2)} s`, c.palavras.length, "palavras");
    }

    // Duração da cena = fala + respiro (a última segura a tela final)
    const extra = i === cenas.length - 1 ? SEGURA_FINAL : PAUSA_FIM;
    c.duracao = Math.round((c.duracaoFala + extra) * 100) / 100;

    // Cartões entram/saem na palavra-âncora
    if (c.overlay?.ancora) {
      const p = acharPalavra(c.palavras, c.overlay.ancora);
      if (p) c.overlay.inicio = Math.max(0, Math.round((p.inicio - 0.05) * 100) / 100);
      else console.warn(c.id, "âncora não encontrada:", c.overlay.ancora);
    }
    if (c.overlayFimAncora) {
      const p = acharPalavra(c.palavras, c.overlayFimAncora);
      if (p) c.overlayFim = Math.round((p.inicio - 0.05) * 100) / 100;
      else console.warn(c.id, "âncora de saída não encontrada:", c.overlayFimAncora);
    }
  }

  await writeFile(arquivoEp, JSON.stringify(ep, null, 2) + "\n");
  const total = cenas.reduce((s, c) => s + c.duracao, 0);
  console.log(`Pronto. Duração total: ${total.toFixed(1)} s`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
