import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte } from "../estilo";
import { Kicker } from "./Kicker";
import { entrar, opacidadeCorte } from "./animacao";

/** Tela final da série: chamada para a próxima parte e votação nos comentários. */
export const TelaParte2: React.FC<{ kicker: string; linha1: string; linha2: string; sub: string[] }> = ({
  kicker,
  linha1,
  linha2,
  sub,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s1 = spring({ frame: frame - 4, fps, config: { damping: 13, stiffness: 160 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: cores.escuro,
        opacity: opacidadeCorte(frame),
        alignItems: "center",
        textAlign: "center",
        paddingTop: 600,
        fontFamily: fonte,
      }}
    >
      <Kicker cor={cores.cinzaEscuro} style={entrar(frame, fps, 0)}>{kicker}</Kicker>
      <div
        style={{
          marginTop: 40,
          fontSize: 200,
          fontWeight: 900,
          letterSpacing: -6,
          lineHeight: 0.95,
          color: cores.destaque,
          opacity: s1,
          transform: `scale(${0.85 + 0.15 * s1})`,
        }}
      >
        {linha1}
      </div>
      <div style={{ fontSize: 86, fontWeight: 900, letterSpacing: -2, color: cores.branco, ...entrar(frame, fps, 8) }}>{linha2}</div>
      <div style={{ marginTop: 70, padding: "0 80px" }}>
        {sub.map((linha, i) => (
          <div
            key={i}
            style={{
              fontSize: 46,
              fontWeight: 800,
              lineHeight: 1.3,
              color: i === 0 ? cores.branco : cores.cinzaEscuro,
              ...entrar(frame, fps, 16 + i * 8),
            }}
          >
            {linha}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
