import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte } from "../estilo";

/** Cartão bege com título, número/frase em destaque e linha de apoio. */
export const CartaoTexto: React.FC<{ titulo: string; destaque: string; sub?: string; atraso?: number }> = ({
  titulo,
  destaque,
  sub,
  atraso = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - atraso, fps, config: { damping: 14, stiffness: 140 } });
  const sDestaque = spring({ frame: frame - atraso - 8, fps, config: { damping: 10, stiffness: 160 } });

  return (
    <div
      style={{
        position: "absolute",
        top: 560,
        left: 80,
        right: 80,
        transform: `translateY(${(1 - s) * 120}px) rotate(${(1 - s) * -4 - 1.2}deg)`,
        opacity: s,
        background: cores.bege,
        borderRadius: 26,
        padding: "44px 48px 48px",
        boxShadow: `0 14px 0 ${cores.begeEscuro}, 0 30px 60px rgba(0,0,0,0.45)`,
        fontFamily: fonte,
        color: cores.tinta,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: 1 }}>{titulo}</div>
      <div
        style={{
          fontSize: destaque.length > 12 ? 104 : 132,
          fontWeight: 900,
          lineHeight: 1,
          marginTop: 18,
          transform: `scale(${0.6 + 0.4 * sDestaque})`,
          opacity: sDestaque,
        }}
      >
        {destaque}
      </div>
      {sub ? (
        <div style={{ fontSize: 32, fontWeight: 800, marginTop: 24, color: "#5B5444", lineHeight: 1.25 }}>{sub}</div>
      ) : null}
    </div>
  );
};
