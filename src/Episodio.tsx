import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./estilo";
import { cores } from "./estilo";
import { CenaIlustrada } from "./componentes/CenaIlustrada";
import { PainelDinheiro } from "./componentes/PainelDinheiro";
import { Legenda } from "./componentes/Legenda";
import { CartaoTexto } from "./componentes/CartaoTexto";
import { GraficoBarras } from "./componentes/GraficoBarras";
import { PalavraChave } from "./componentes/PalavraChave";
import { TelaParte2 } from "./componentes/TelaParte2";
import type { EpisodioProps, Overlay } from "./tipos";

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

export const Episodio: React.FC<EpisodioProps> = ({ episodio, imagensDisponiveis = {} }) => {
  const { fps } = episodio;

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
            <CenaIlustrada cena={c} disponivel={!!c.ilustracao && !!imagensDisponiveis[c.ilustracao]} />
            <Legenda cena={c} velocidade={episodio.velocidadeFala} />
            <PainelDinheiro de={painelAnterior} para={c.painel} />
            {c.overlay ? (
              <Sequence from={atrasoOverlay} durationInFrames={Math.max(1, fimOverlay - atrasoOverlay)} name={`${c.id} · ${c.overlay.tipo}`}>
                <ConteudoOverlay overlay={c.overlay} />
              </Sequence>
            ) : null}
            {c.audio ? <Audio src={staticFile(c.audio)} /> : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
