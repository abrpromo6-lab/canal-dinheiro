// Mixagem do episódio: a voz manda. Música e ambiente abaixam sozinhos enquanto alguém fala (ducking).
// Os níveis são multiplicadores de volume (1 = original). Ajuste aqui se algo ficar alto ou baixo.

export const NIVEIS = {
  voz: 1,
  musicaLivre: 0.25, // sem fala (ex.: tela final)
  musicaSobVoz: 0.08, // embaixo da narração
  ambienteLivre: 0.16,
  ambienteSobVoz: 0.05,
  corte: 0.14, // whoosh na entrada de cartão/gráfico em tela cheia
  impacto: 0.35, // grave na palavra-chave
  tique: 0.4, // números do painel
};

export const RAMPA = 8; // quadros para abaixar/subir a trilha

/** Intervalos [início, fim] em quadros globais em que a voz está falando. */
export type Intervalo = [number, number];

/** 0 = silêncio, 1 = voz falando; rampas suaves antes e depois de cada fala. */
export const presencaVoz = (f: number, falas: Intervalo[], rampa = RAMPA) => {
  let maior = 0;
  for (const [a, b] of falas) {
    if (f >= a && f <= b) return 1;
    const d = f < a ? a - f : f - b;
    maior = Math.max(maior, 1 - d / rampa);
  }
  return Math.max(0, maior);
};

export const misturar = (livre: number, sobVoz: number, presenca: number) => livre + (sobVoz - livre) * presenca;

const limpa = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

/** Segundo (na cena) em que a palavra é falada, se existir. */
export const momentoDaPalavra = (palavras: { texto: string; inicio: number }[] | undefined, alvo: string) =>
  palavras?.find((p) => limpa(p.texto) === limpa(alvo))?.inicio;
