import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import "./estilo";
import { cores } from "./estilo";
import { CenaIlustrada } from "./componentes/CenaIlustrada";
import { PainelDinheiro } from "./componentes/PainelDinheiro";
import { Legenda } from "./componentes/Legenda";
import { CartaoTexto } from "./componentes/CartaoTexto";
import { GraficoBarras } from "./componentes/GraficoBarras";
import { PalavraChave } from "./componentes/PalavraChave";
import { TelaParte2 } from "./componentes/TelaParte2";
import type { Cena, EpisodioProps, Overlay } from "./tipos";

const OverlayCena: React.FC<{ overlay?: Overlay; duracao: number; fps: number }> = ({ overlay, duracao, fps }) => {
  if (!overlay) return null;
  switch (overlay.tipo) {
    case "palavra":
      return <PalavraChave {...overlay} atraso={overlay.inicio !== undefined ? Math.round(overlay.inicio * fps) : undefined} />;
    case "cartao":
      return <CartaoTexto {...overlay} atraso={overlay.inicio !== undefined ? Math.round(overlay.inicio * fps) : undefined} />;
    case "grafico":
      return <GraficoBarras {...overlay} />;
    case "parte2":
      return <TelaParte2 {...overlay} duracao={duracao} />;
  }
};

export const Episodio: React.FC<EpisodioProps> = ({ episodio, imagensDisponiveis = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = episodio;

  // Início de cada cena em quadros
  let acumulado = 0;
  const cenas = episodio.cenas.map((c) => {
    const inicio = acumulado;
    const quadros = Math.round(c.duracao * fps);
    acumulado += quadros;
    return { ...c, inicio, quadros };
  });

  const indiceAtual = Math.max(0, cenas.findIndex((c) => frame >= c.inicio && frame < c.inicio + c.quadros));
  const atual = cenas[indiceAtual];
  const anterior: Cena | undefined = cenas[indiceAtual - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: cores.fundo }}>
      {cenas.map((c) => (
        <Sequence key={c.id} from={c.inicio} durationInFrames={c.quadros} name={`${c.id} · ${c.descricao}`}>
          <CenaIlustrada cena={c} disponivel={!!imagensDisponiveis[c.ilustracao]} />
          <OverlayCena overlay={c.overlay} duracao={c.quadros} fps={fps} />
          <Legenda cena={c} velocidade={episodio.velocidadeFala} />
          {c.audio ? <Audio src={staticFile(c.audio)} /> : null}
        </Sequence>
      ))}
      <PainelDinheiro
        de={anterior?.painel ?? atual.painel}
        para={atual.painel}
        quadroNaCena={frame - atual.inicio}
      />
    </AbsoluteFill>
  );
};
