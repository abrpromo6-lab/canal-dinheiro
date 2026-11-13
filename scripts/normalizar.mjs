// Normaliza os ambientes (public/sons/*.mp3 em loop) para o mesmo volume médio e salva .wav ao lado.
// Assim a mixagem (src/mixagem.ts) funciona igual para todos. Uso: node scripts/normalizar.mjs
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";

const AMBIENTES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["chuva-porao", "banco", "escritorio-noite", "corredor", "rua-sirene", "quintal-noite", "aeroporto"];
const ALVO_DB = -20; // RMS alvo
const TETO = 0.89; // pico máximo (-1 dB)

for (const nome of AMBIENTES) {
  const tmp = `public/sons/${nome}.tmp.wav`;
  execFileSync("npx", ["remotion", "ffmpeg", "-v", "error", "-y", "-i", `public/sons/${nome}.mp3`, "-ac", "2", "-ar", "44100", "-acodec", "pcm_s16le", tmp], { shell: true });
  const wav = readFileSync(tmp);
  const d = wav.indexOf(Buffer.from("data"));
  const cab = wav.subarray(0, d + 8);
  const pcm = Buffer.from(wav.subarray(d + 8));
  const n = Math.floor(pcm.length / 2);
  let soma = 0;
  let pico = 0;
  for (let i = 0; i < n; i++) {
    const v = pcm.readInt16LE(i * 2) / 32768;
    soma += v * v;
    pico = Math.max(pico, Math.abs(v));
  }
  const rms = Math.sqrt(soma / n);
  const ganho = Math.min(10 ** (ALVO_DB / 20) / rms, TETO / pico);
  for (let i = 0; i < n; i++) {
    const v = Math.max(-32768, Math.min(32767, Math.round(pcm.readInt16LE(i * 2) * ganho)));
    pcm.writeInt16LE(v, i * 2);
  }
  writeFileSync(`public/sons/${nome}.wav`, Buffer.concat([cab, pcm]));
  unlinkSync(tmp);
  console.log(nome, `ganho ${(20 * Math.log10(ganho)).toFixed(1)} dB → RMS ${(20 * Math.log10(rms * ganho)).toFixed(1)} dB`);
}
