import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte } from "../estilo";

const paleta = { verde: cores.verde, vermelho: cores.vermelho, tinta: cores.bege };

/** Palavra-chave gigante que "carimba" na tela. Usa o fim da cena se a fala termina com ela. */
export const PalavraChave: React.FC<{ texto: string; cor?: "verde" | "vermelho" | "tinta"; atraso?: number }> = ({
  texto,
  cor = "vermelho",
  atraso = 6,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < atraso) return null;
  const s = spring({ frame: frame - atraso, fps, config: { damping: 9, stiffness: 180 } });
  const tremor = interpolate(frame - atraso, [0, 4, 8, 12], [0, 10, -8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tamanho = Math.min(190, Math.floor(1300 / texto.length));

  return (
    <div
      style={{
        position: "absolute",
        top: 700,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        transform: `translateX(${tremor}px) scale(${2.2 - 1.2 * s}) rotate(-4deg)`,
        opacity: Math.min(1, s * 1.5),
      }}
    >
      <div
        style={{
          fontFamily: fonte,
          fontWeight: 900,
          fontSize: tamanho,
          color: cores.branco,
          background: paleta[cor],
          padding: "10px 36px 18px",
          borderRadius: 18,
          border: `8px solid ${cores.tinta}`,
          boxShadow: `12px 12px 0 ${cores.tinta}`,
          letterSpacing: 2,
        }}
      >
        {texto}
      </div>
    </div>
  );
};
