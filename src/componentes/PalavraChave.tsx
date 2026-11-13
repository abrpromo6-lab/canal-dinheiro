import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte, mono } from "../estilo";
import { Kicker } from "./Kicker";
import { entrar, opacidadeCorte } from "./animacao";

/** Palavra-chave gigante na cor de destaque. Em tela cheia (fundo escuro) ou por cima da ilustração. */
export const PalavraChave: React.FC<{
  texto: string;
  tela?: boolean;
  kicker?: string;
  sub?: string;
  nota?: string;
  /** Quadro (dentro do overlay) em que a palavra grande "carimba" — o momento em que ela é falada. */
  atrasoTexto?: number;
}> = ({ texto, tela = false, kicker, sub, nota, atrasoTexto = 4 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - atrasoTexto, fps, config: { damping: 11, stiffness: 190 } });
  const tremor = interpolate(frame - atrasoTexto, [0, 3, 6, 9], [0, 8, -6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tamanho = Math.min(200, Math.floor(1500 / texto.length));
  const sombra = tela ? "none" : "0 8px 40px rgba(0,0,0,0.85)";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: tela ? cores.escuro : "transparent",
        opacity: tela ? opacidadeCorte(frame) : 1,
        alignItems: "center",
        textAlign: "center",
        paddingTop: tela ? 520 : 760,
        fontFamily: fonte,
      }}
    >
      {kicker ? <Kicker cor={tela ? cores.cinzaEscuro : cores.branco} style={entrar(frame, fps, Math.min(0, atrasoTexto - 4))}>{kicker}</Kicker> : null}
      <div
        style={{
          marginTop: kicker ? 40 : 0,
          fontSize: tamanho,
          fontWeight: 900,
          letterSpacing: -tamanho * 0.03,
          lineHeight: 1,
          color: cores.destaque,
          textShadow: sombra,
          opacity: s,
          transform: `translateX(${tremor}px) scale(${1.4 - 0.4 * s})`,
        }}
      >
        {texto}
      </div>
      {sub ? (
        <div style={{ marginTop: 36, fontSize: 50, fontWeight: 800, lineHeight: 1.2, color: cores.branco, maxWidth: 860, textShadow: sombra, ...entrar(frame, fps, 12) }}>
          {sub}
        </div>
      ) : null}
      {nota ? (
        <div style={{ marginTop: 44, fontFamily: mono, fontSize: 26, letterSpacing: 1, color: cores.cinzaEscuro, ...entrar(frame, fps, 18) }}>
          {nota}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
