import { CalculateMetadataFunction, Composition, staticFile } from "remotion";
import { Episodio } from "./Episodio";
import ep01 from "./episodios/ep01.json";
import type { Episodio as EpisodioTipo, EpisodioProps } from "./tipos";

const episodioPadrao = ep01 as EpisodioTipo;

// Descobre quais ilustrações já estão em public/cenas; as que faltam viram placeholder.
const existe = async (caminho: string, tipo: "image/" | "audio/" = "image/") => {
  try {
    const r = await fetch(staticFile(caminho), { method: "HEAD" });
    return r.ok && (r.headers.get("content-type") ?? "").startsWith(tipo);
  } catch {
    return false;
  }
};

// Aceita o nome do JSON com .png, .jpg, .jpeg ou .webp (o que a IA de imagem entregar).
const EXTENSOES = [".png", ".jpg", ".jpeg", ".webp"];
const resolver = async (caminho: string): Promise<string | null> => {
  const base = caminho.replace(/\.(png|jpe?g|webp)$/i, "");
  for (const ext of EXTENSOES) {
    if (await existe(base + ext)) return base + ext;
  }
  return null;
};

const calcular: CalculateMetadataFunction<EpisodioProps> = async ({ props }) => {
  const { episodio } = props;
  const total = episodio.cenas.reduce((s, c) => s + Math.round(c.duracao * episodio.fps), 0);
  const caminhos = [...new Set(episodio.cenas.flatMap((c) => (c.ilustracao ? [c.ilustracao] : [])))];
  const lista = await Promise.all(caminhos.map(async (p) => [p, await resolver(p)] as const));
  const audios = [
    ...new Set([
      ...Object.values(episodio.sons ?? {}),
      ...episodio.cenas.flatMap((c) => [c.ambiente, c.audio].filter((a): a is string => !!a)),
    ]),
  ];
  const sons = await Promise.all(audios.map(async (a) => [a, await existe(a, "audio/")] as const));
  return {
    durationInFrames: total,
    fps: episodio.fps,
    props: { ...props, imagensDisponiveis: Object.fromEntries(lista), sonsDisponiveis: Object.fromEntries(sons) },
  };
};

export const Root: React.FC = () => (
  <Composition
    id="Episodio"
    component={Episodio}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={30 * 90}
    defaultProps={{ episodio: episodioPadrao } as EpisodioProps}
    calculateMetadata={calcular}
  />
);
