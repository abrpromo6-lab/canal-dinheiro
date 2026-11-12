import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from "remotion";
import "./estilo";
import { cores } from "./estilo";
import { CenaIlustrada } from "./componentes/CenaIlustrada";
import { PainelDinheiro } from "./componentes/PainelDinheiro";
import { Legenda } from "./componentes/Legenda";
import { CartaoTexto } from "./componentes/CartaoTexto";
import { GraficoBarras } from "./componentes/GraficoBarras";
import { PalavraChave } from "./componentes/PalavraChave";
import { TelaParte2 } from "./componentes/TelaParte2";
import type { EpisodioProps, Overlay, Painel } from "./tipos";

const telaCheia = (o: Overlay) => o.tipo !== "palavra" || o.tela === true;

const ConteudoOverlay: React.FC<{ overlay: Overlay }> = ({ overlay }) => {
  switch (overlay.tipo) {
    case "cartao":
      return <CartaoTexto {...overlay} />;
    case "grafico":
      return <GraficoBarras {...overlay} />;
    case "palavra":
      return <PalavraChave {...overlay} />;
    case "parte2":
      return <TelaParte2 {...overlay} />;
  }
};

/** Toca um efeito curto a partir de `from` (só se o arquivo existir). */
const Efeito: React.FC<{ src?: string; ok: Record<string, boolean>; from: number; volume: number }> = ({ src, ok, from, volume }) =>
  src && ok[src] ? (
    <Sequence from={from} durationInFrames={60} layout="none">
      <Audio src={staticFile(src)} volume={volume} />
    </Sequence>
  ) : null;

const mudouPainel = (a: Painel, b: Painel) =>
  a.cash !== b.cash || a.banked !== b.banked || a.suspicion !== b.suspicion || a.rotuloBanked !== b.rotuloBanked;

export const Episodio: React.FC<EpisodioProps> = ({ episodio, imagensDisponiveis = {}, sonsDisponiveis = {} }) => {
  const { fps } = episodio;
  const sons = episodio.sons ?? {};

  let acumulado = 0;
  const cenas = episodio.cenas.map((c) => {
    const inicio = acumulado;
    const quadros = Math.round(c.duracao * fps);
    acumulado += quadros;
    return { ...c, inicio, quadros };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: cores.fundo }}>
      {cenas.map((c, i) => {
        const atrasoOverlay = Math.round((c.overlay?.inicio ?? 0) * fps);
        const fimOverlay = c.overlayFim !== undefined ? Math.round(c.overlayFim * fps) : c.quadros;
        // Na primeira cena o painel conta de zero até o valor inicial (gancho visual).
        const painelAnterior = i === 0 ? { cash: 0, banked: 0, suspicion: 0 } : cenas[i - 1].painel;
        return (
          <Sequence key={c.id} from={c.inicio} durationInFrames={c.quadros} name={`${c.id} · ${c.descricao}`}>
            {/* Ordem das camadas: ilustração → legenda → painel → overlay (o overlay de tela cheia cobre os outros) */}
            <CenaIlustrada cena={c} arquivo={c.ilustracao ? imagensDisponiveis[c.ilustracao] ?? null : null} />
            <Legenda cena={c} velocidade={episodio.velocidadeFala} />
            <PainelDinheiro de={painelAnterior} para={c.painel} />
            {c.overlay ? (
              <Sequence from={atrasoOverlay} durationInFrames={Math.max(1, fimOverlay - atrasoOverlay)} name={`${c.id} · ${c.overlay.tipo}`}>
                <ConteudoOverlay overlay={c.overlay} />
              </Sequence>
            ) : null}
            {c.audio ? <Audio src={staticFile(c.audio)} /> : null}
            {/* Ambiente da cena: entra e sai em 8 quadros */}
            {c.ambiente && sonsDisponiveis[c.ambiente] ? (
              <Audio
                src={staticFile(c.ambiente)}
                loop
                volume={(f) =>
                  0.22 * interpolate(f, [0, 8, c.quadros - 8, c.quadros], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
                }
              />
            ) : null}
            {mudouPainel(painelAnterior, c.painel) ? <Efeito src={sons.tique} ok={sonsDisponiveis} from={0} volume={0.35} /> : null}
            {c.overlay && telaCheia(c.overlay) ? <Efeito src={sons.corte} ok={sonsDisponiveis} from={atrasoOverlay} volume={0.5} /> : null}
            {c.overlay?.tipo === "palavra" ? <Efeito src={sons.impacto} ok={sonsDisponiveis} from={atrasoOverlay + 3} volume={0.7} /> : null}
          </Sequence>
        );
      })}
      {sons.musica && sonsDisponiveis[sons.musica] ? <Audio src={staticFile(sons.musica)} loop volume={0.1} /> : null}
    </AbsoluteFill>
  );
};
