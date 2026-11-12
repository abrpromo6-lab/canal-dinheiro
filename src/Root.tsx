import { CalculateMetadataFunction, Composition, staticFile } from "remotion";
import { Episodio } from "./Episodio";
import ep01 from "./episodios/ep01.json";
import type { Episodio as EpisodioTipo, EpisodioProps } from "./tipos";

const episodioPadrao = ep01 as EpisodioTipo;

// Descobre quais ilustrações já estão em public/cenas; as que faltam viram placeholder.
const existe = async (caminho: string) => {
  try {
    const r = await fetch(staticFile(caminho), { method: "HEAD" });
    return r.ok && (r.headers.get("content-type") ?? "").startsWith("image/");
  } catch {
    return false;
  }
};

const calcular: CalculateMetadataFunction<EpisodioProps> = async ({ props }) => {
  const { episodio } = props;
  const total = episodio.cenas.reduce((s, c) => s + Math.round(c.duracao * episodio.fps), 0);
  const lista = await Promise.all(episodio.cenas.map(async (c) => [c.ilustracao, await existe(c.ilustracao)] as const));
  return {
    durationInFrames: total,
    fps: episodio.fps,
    props: { ...props, imagensDisponiveis: Object.fromEntries(lista) },
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
