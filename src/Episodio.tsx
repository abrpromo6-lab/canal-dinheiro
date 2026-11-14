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
import { FinalNeon } from "./componentes/FinalNeon";
import type { EpisodioProps, Overlay, Painel } from "./tipos";
import { momentoDaPalavra, misturar, NIVEIS, presencaVoz, type Intervalo } from "./mixagem";

const telaCheia = (o: Overlay) => o.tipo !== "palavra" || o.tela === true;

const ConteudoOverlay: React.FC<{ overlay: Overlay; atrasoTexto?: number; cartaoEm: number }> = ({ overlay, atrasoTexto, cartaoEm }) => {
  switch (overlay.tipo) {
    case "cartao":
      return <CartaoTexto {...overlay} />;
    case "grafico":
      return <GraficoBarras {...overlay} />;
    case "palavra":
      return <PalavraChave {...overlay} atrasoTexto={atrasoTexto} />;
    case "parte2":
      return <TelaParte2 {...overlay} />;
    case "neon":
      return <FinalNeon {...overlay} cartaoEm={cartaoEm} />;
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
  const total = acumulado;

  // Onde a voz está falando (quadros globais), para abaixar música e ambiente por baixo dela.
  const falas: Intervalo[] = cenas
    .filter((c) => c.audio && c.palavras?.length)
    .map((c) => [c.inicio + Math.round(c.palavras![0].inicio * fps), c.inicio + Math.round((c.duracaoFala ?? c.duracao) * fps)]);

  return (
    <AbsoluteFill style={{ backgroundColor: cores.fundo }}>
      {cenas.map((c, i) => {
        const atrasoOverlay = Math.round((c.overlay?.inicio ?? 0) * fps);
        const fimOverlay = c.overlayFim !== undefined ? Math.round(c.overlayFim * fps) : c.quadros;
        // Na primeira cena o painel conta de zero até o valor inicial (gancho visual).
        const painelAnterior = i === 0 ? c.painel : cenas[i - 1].painel; // 1º quadro já mostra o dinheiro
        // Palavra-chave: carimba (e o impacto toca) no momento em que a palavra é falada.
        const segPalavra = c.overlay?.tipo === "palavra" ? momentoDaPalavra(c.palavras, c.overlay.texto) : undefined;
        const quadroPalavra = segPalavra !== undefined ? Math.max(atrasoOverlay, Math.round(segPalavra * fps)) : atrasoOverlay + 4;
        // Final de votação: o painel sai quando os botões entram; a tela preta vem quando a fala acaba.
        const ehFinal = c.overlay?.tipo === "neon";
        const fimFala = Math.round((c.duracaoFala ?? c.duracao) * fps);
        return (
          <Sequence key={c.id} from={c.inicio} durationInFrames={c.quadros} name={`${c.id} · ${c.descricao}`}>
            {/* Ordem das camadas: ilustração → legenda → painel → overlay (o overlay de tela cheia cobre os outros) */}
            <CenaIlustrada
              cena={c}
              arquivo={c.ilustracao ? imagensDisponiveis[c.ilustracao] ?? null : null}
              tratamento={episodio.tratamento}
            />
            <Legenda
              cena={c}
              velocidade={episodio.velocidadeFala}
              ateQuadro={
                (c.overlay?.tipo === "palavra" && !c.overlay.tela) || c.overlay?.tipo === "neon" ? atrasoOverlay : undefined
              }
            />
            <Sequence durationInFrames={ehFinal ? Math.max(1, atrasoOverlay) : c.quadros} layout="none" name="painel">
              <PainelDinheiro de={painelAnterior} para={c.painel} />
            </Sequence>
            {c.overlay ? (
              <Sequence from={atrasoOverlay} durationInFrames={Math.max(1, fimOverlay - atrasoOverlay)} name={`${c.id} · ${c.overlay.tipo}`}>
                {/* Na 1ª cena a palavra já está na tela no quadro 0 (é a "capa" que aparece no feed) */}
                <ConteudoOverlay
                  overlay={c.overlay}
                  atrasoTexto={i === 0 ? -20 : quadroPalavra - atrasoOverlay}
                  cartaoEm={fimFala - atrasoOverlay}
                />
              </Sequence>
            ) : null}
            {c.audio ? <Audio src={staticFile(c.audio)} volume={NIVEIS.voz} /> : null}
            {/* Ambiente da cena: entra e sai em 8 quadros e abaixa sob a voz */}
            {c.ambiente && sonsDisponiveis[c.ambiente] ? (
              <Audio
                src={staticFile(c.ambiente)}
                loop
                volume={(f) =>
                  misturar(NIVEIS.ambienteLivre, NIVEIS.ambienteSobVoz, presencaVoz(c.inicio + f, falas)) *
                  interpolate(f, [0, 8, c.quadros - 8, c.quadros], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
                }
              />
            ) : null}
            {mudouPainel(painelAnterior, c.painel) ? <Efeito src={sons.tique} ok={sonsDisponiveis} from={0} volume={NIVEIS.tique} /> : null}
            {/* Whoosh começa 4 quadros antes para o pico cair no corte */}
            {c.overlay && telaCheia(c.overlay) ? (
              <Efeito src={sons.corte} ok={sonsDisponiveis} from={Math.max(0, atrasoOverlay - 4)} volume={NIVEIS.corte} />
            ) : null}
            {c.overlay?.tipo === "palavra" ? <Efeito src={sons.impacto} ok={sonsDisponiveis} from={quadroPalavra} volume={NIVEIS.impacto} /> : null}
          </Sequence>
        );
      })}
      {/* Trilha: abaixa sob a voz, entra e sai em fade */}
      {sons.musica && sonsDisponiveis[sons.musica] ? (
        <Audio
          src={staticFile(sons.musica)}
          loop
          volume={(f) =>
            misturar(NIVEIS.musicaLivre, NIVEIS.musicaSobVoz, presencaVoz(f, falas)) *
            interpolate(f, [0, 20, total - 45, total], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
