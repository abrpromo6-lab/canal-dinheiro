import { interpolate, spring } from "remotion";

/** Entrada padrão de um elemento: sobe 40px e aparece, começando no quadro `atraso`. */
export const entrar = (frame: number, fps: number, atraso = 0): React.CSSProperties => {
  const s = spring({ frame: frame - atraso, fps, config: { damping: 18, stiffness: 140 } });
  return { opacity: s, transform: `translateY(${(1 - s) * 40}px)` };
};

/** Corte rápido para tela cheia (4 quadros). */
export const opacidadeCorte = (frame: number) =>
  interpolate(frame, [0, 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
