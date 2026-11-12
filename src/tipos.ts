import type { Fundo } from "./estilo";

export type Camera = { zoom: number; x: number; y: number };

export type Painel = {
  cash: number;
  banked: number;
  suspicion: number; // 0 a 100
  rotuloBanked?: string; // ex.: "SEIZED" no lugar do valor
};

export type Barra = { rotulo: string; valor: number };

// `inicio`: segundo da cena em que o overlay entra (padrão 0).
// Cartão, gráfico, palavra com `tela: true` e parte2 cobrem a tela inteira (a ilustração fica por baixo).
export type Overlay =
  | {
      tipo: "cartao";
      inicio?: number;
      fundo?: Fundo;
      kicker?: string;
      titulo?: string;
      destaque: string;
      corDestaque?: "texto" | "destaque" | "verde";
      sub?: string;
      nota?: string;
    }
  | {
      tipo: "grafico";
      inicio?: number;
      fundo?: Fundo;
      kicker?: string;
      titulo: string;
      sub?: string;
      limite: number;
      rotuloLimite: string;
      barras: Barra[];
    }
  | {
      tipo: "palavra";
      inicio?: number;
      tela?: boolean; // true = fundo escuro em tela cheia; false = por cima da ilustração
      kicker?: string;
      texto: string;
      sub?: string;
      nota?: string;
    }
  | { tipo: "parte2"; inicio?: number; kicker: string; linha1: string; linha2: string; sub: string[] };
// `ancora` (em qualquer overlay): palavra da fala em que ele entra. O scripts/narrar.mjs
// converte em `inicio` com o tempo real do áudio.

/** Tempo de cada palavra (em segundos, relativo ao início da cena). Preencher quando houver o áudio. */
export type PalavraTempo = { texto: string; inicio: number };

export type Cena = {
  id: string;
  duracao: number; // segundos
  fala: string;
  /** Opcional: tempos reais das palavras vindos do TTS. Sem isso, a legenda distribui pela velocidadeFala. */
  palavras?: PalavraTempo[];
  /** Opcional: arquivo de áudio da fala em public/ (ex.: "audio/ep01-s01.mp3"). */
  audio?: string;
  /** Caminho em public/. Cenas só de cartão não têm ilustração. */
  ilustracao?: string;
  descricao: string;
  camera?: { de: Camera; para: Camera };
  painel: Painel;
  /** Opcional: ponto de interesse da ilustração, em % da tela (padrão 50, 55). O resto escurece. */
  foco?: { x: number; y: number };
  /** Opcional: som ambiente da cena em public/ (ex.: "sons/chuva.mp3"), toca em loop baixinho. */
  ambiente?: string;
  /** Opcional: altura da legenda em px (padrão 1370). Use para não cobrir o personagem. */
  legendaTopo?: number;
  /** Opcional: segundo da cena em que o overlay sai e a ilustração volta. Sem isso, fica até o fim da cena. */
  overlayFim?: number;
  overlay?: Overlay;
};

export type Episodio = {
  id: string;
  serie: string;
  titulo: string;
  fps: number;
  velocidadeFala: number; // palavras por segundo (estimativa até ter a voz)
  /** Sons do episódio em public/. Os que não existirem são ignorados. */
  sons?: {
    musica?: string; // trilha de fundo, em loop, bem baixa
    corte?: string; // whoosh quando entra cartão/gráfico em tela cheia
    impacto?: string; // grave seco nas palavras-chave (WRONG., STRUCTURING, SEIZED)
    tique?: string; // quando os números do painel mudam
  };
  cenas: Cena[];
};

export type EpisodioProps = {
  episodio: Episodio;
  /** Preenchido pelo calculateMetadata: caminho do JSON → arquivo encontrado em public/ (ou null se faltar). */
  imagensDisponiveis?: Record<string, string | null>;
  /** Preenchido pelo calculateMetadata: quais sons existem em public/. */
  sonsDisponiveis?: Record<string, boolean>;
};
