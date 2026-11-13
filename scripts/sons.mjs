// Gera a trilha e os efeitos do canal no ElevenLabs (música + efeitos sonoros),
// salvando em public/sons/ com os nomes que o episódio usa.
//
// Uso:
//   node scripts/sons.mjs                  (gera só o que ainda não existe)
//   node scripts/sons.mjs --forcar         (refaz tudo)
//   node scripts/sons.mjs --so=musica-tensa (refaz um arquivo)
//
// A duração da música acompanha a duração do episódio (src/episodios/ep01.json).

import { existsSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";

if (existsSync(".env")) {
  for (const linha of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const m = linha.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2];
  }
}
const CHAVE = process.env.ELEVENLABS_API_KEY;
if (!CHAVE) throw new Error("Falta ELEVENLABS_API_KEY no .env");

const opc = Object.fromEntries(
  process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => {
    const [k, v] = a.slice(2).split("=");
    return [k, v ?? true];
  })
);

const ep = JSON.parse(readFileSync("src/episodios/ep01.json", "utf8"));
const duracaoEp = ep.cenas.reduce((s, c) => s + c.duracao, 0);

const SEM = "no music, no voices, no speech";

/** Efeitos curtos e ambientes (loop). */
const EFEITOS = {
  whoosh: { texto: `very soft, subtle and clean air swish, gentle and smooth, quiet, no bass, no harsh noise, no impact, short and light, ${SEM}`, segundos: 0.6 },
  impacto: { texto: `deep cinematic boom hit with a short sub-bass tail, dark trailer impact, ${SEM}`, segundos: 1.6 },
  tique: { texto: `single soft digital UI tick, subtle counter click, ${SEM}`, segundos: 0.5 },
  "chuva-porao": { texto: `steady rain against a small basement window at night, distant city traffic, faint pipe hum, room tone, ${SEM}`, segundos: 20, loop: true },
  banco: { texto: `quiet old bank lobby ambience, soft distant indistinct murmur, footsteps on marble, faint keyboard typing, ${SEM}`, segundos: 20, loop: true },
  "escritorio-noite": { texto: `night office room tone, computer fans and server hum, faint fluorescent electrical buzz, ${SEM}`, segundos: 20, loop: true },
  corredor: { texto: `empty large marble hall ambience, soft reverb, distant echoing footsteps, low air hum, ${SEM}`, segundos: 20, loop: true },
  "rua-sirene": { texto: `city street at dusk after rain, wet tires passing, distant police siren, light traffic, ${SEM}`, segundos: 20, loop: true },
  "quintal-noite": { texto: `clearly audible backyard night ambience, loud chirping crickets, wind rustling leaves, occasional distant dog bark, shovel digging in dirt, ${SEM}`, segundos: 20, loop: true },
  aeroporto: { texto: `busy airport security checkpoint ambience, rolling suitcases, conveyor belt hum, distant indistinct announcements, ${SEM}`, segundos: 20, loop: true },
};

/** Trilha de fundo: discreta, sem melodia que dispute com a voz. */
const MUSICA = {
  nome: "musica-tensa",
  prompt:
    "Dark, minimal, tense underscore for a short true-crime money documentary. Slow pulsing low synth bass, " +
    "soft clock-like ticking percussion, sparse muted piano notes, airy pads. Atmospheric and restrained, " +
    "no lead melody competing with narration, no vocals, steady 90 BPM, gently building tension toward the end, " +
    "clean mix with lots of headroom for a voice-over.",
};

const post = async (rota, corpo) => {
  const r = await fetch("https://api.elevenlabs.io/v1" + rota, {
    method: "POST",
    headers: { "xi-api-key": CHAVE, "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });
  if (!r.ok) throw new Error(`${r.status} ${rota}: ${(await r.text()).slice(0, 300)}`);
  return Buffer.from(await r.arrayBuffer());
};

const quer = (nome) => (opc.so ? opc.so === nome : opc.forcar || !existsSync(`public/sons/${nome}.mp3`));

async function main() {
  await mkdir("public/sons", { recursive: true });

  for (const [nome, e] of Object.entries(EFEITOS)) {
    if (!quer(nome)) continue;
    const corpo = { text: e.texto, duration_seconds: e.segundos, prompt_influence: 0.6 };
    let audio;
    try {
      audio = await post("/sound-generation?output_format=mp3_44100_128", e.loop ? { ...corpo, loop: true } : corpo);
    } catch (erro) {
      if (!e.loop) throw erro;
      audio = await post("/sound-generation?output_format=mp3_44100_128", corpo); // sem suporte a loop
    }
    await writeFile(`public/sons/${nome}.mp3`, audio);
    console.log("efeito", nome, "ok");
  }

  if (quer(MUSICA.nome)) {
    const ms = Math.min(300000, Math.ceil(duracaoEp + 4) * 1000);
    const audio = await post("/music?output_format=mp3_44100_128", {
      prompt: MUSICA.prompt,
      music_length_ms: ms,
      force_instrumental: true,
    });
    await writeFile(`public/sons/${MUSICA.nome}.mp3`, audio);
    console.log("música", MUSICA.nome, `${(ms / 1000).toFixed(0)} s ok`);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
