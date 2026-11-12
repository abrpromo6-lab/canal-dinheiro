export type Camera = { zoom: number; x: number; y: number };

export type Painel = {
  cash: number;
  banked: number;
  suspicion: number; // 0 a 100
  rotuloBanked?: string; // ex.: "SEIZED" no lugar do valor
};

export type Barra = { rotulo: string; valor: number };

export type Overlay =
  // inicio: segundo da cena em que o overlay entra (padrão: logo no começo)
  | { tipo: "palavra"; texto: string; cor?: "verde" | "vermelho" | "tinta"; inicio?: number }
  | { tipo: "cartao"; titulo: string; destaque: string; sub?: string; inicio?: number }
  | { tipo: "grafico"; titulo: string; limite: number; rotuloLimite: string; barras: Barra[] }
  | { tipo: "parte2"; chamada: string; opcoes: [string, string]; rodape: string };

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
  ilustracao: string; // caminho em public/
  descricao: string;
  camera: { de: Camera; para: Camera };
  painel: Painel;
  overlay?: Overlay;
};

export type Episodio = {
  id: string;
  serie: string;
  titulo: string;
  fps: number;
  velocidadeFala: number; // palavras por segundo (estimativa até ter a voz)
  cenas: Cena[];
};

export type EpisodioProps = {
  episodio: Episodio;
  /** Preenchido pelo calculateMetadata: quais ilustrações já existem em public/. */
  imagensDisponiveis?: Record<string, boolean>;
};
