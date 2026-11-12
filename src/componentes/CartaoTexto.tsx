import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte, mono, temaDe, type Fundo } from "../estilo";
import { Kicker } from "./Kicker";
import { entrar, opacidadeCorte } from "./animacao";

/** Cartão de tela cheia: rótulo mono, título, número/frase em destaque, linha de apoio e nota (fonte). */
export const CartaoTexto: React.FC<{
  fundo?: Fundo;
  kicker?: string;
  titulo?: string;
  destaque: string;
  corDestaque?: "texto" | "destaque" | "verde";
  sub?: string;
  nota?: string;
}> = ({ fundo = "bege", kicker, titulo, destaque, corDestaque = "texto", sub, nota }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tema = temaDe(fundo);
  const cor = corDestaque === "destaque" ? cores.destaque : corDestaque === "verde" ? cores.verde : tema.texto;
  const s = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 150 } });
  const tamanhoDestaque = destaque.length > 12 ? 128 : 170;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: tema.fundo,
        opacity: opacidadeCorte(frame),
        alignItems: "center",
        textAlign: "center",
        padding: "330px 70px 0",
        fontFamily: fonte,
        color: tema.texto,
      }}
    >
      {kicker ? <Kicker cor={tema.secundario} style={entrar(frame, fps, 0)}>{kicker}</Kicker> : null}
      {titulo ? (
        <div style={{ marginTop: 150, fontSize: 68, fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.05, ...entrar(frame, fps, 3) }}>
          {titulo}
        </div>
      ) : null}
      <div
        style={{
          marginTop: titulo ? 6 : 150,
          fontSize: tamanhoDestaque,
          fontWeight: 900,
          letterSpacing: -tamanhoDestaque * 0.035,
          lineHeight: 0.95,
          color: cor,
          opacity: s,
          transform: `scale(${0.9 + 0.1 * s})`,
        }}
      >
        {destaque}
      </div>
      {sub ? (
        <div style={{ marginTop: 34, fontSize: 46, fontWeight: 800, lineHeight: 1.2, color: tema.secundario, maxWidth: 880, ...entrar(frame, fps, 14) }}>
          {sub}
        </div>
      ) : null}
      {nota ? (
        <div style={{ marginTop: 40, fontFamily: mono, fontSize: 26, letterSpacing: 1, color: tema.secundario, ...entrar(frame, fps, 20) }}>
          {nota}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
