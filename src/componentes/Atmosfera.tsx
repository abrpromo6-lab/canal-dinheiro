import { AbsoluteFill, useCurrentFrame } from "remotion";

/**
 * Camadas de clima por cima da ilustração (deixa imagens de IA com a mesma "cara"):
 * - foco: escurece tudo que está longe do ponto de interesse (simula uma luz dominante);
 * - tom: puxa as sombras para azul-petróleo;
 * - vinheta: bordas escuras;
 * - granulação: ruído de filme que muda a cada 2 quadros.
 */
export const Atmosfera: React.FC<{ foco?: { x: number; y: number } }> = ({ foco = { x: 50, y: 55 } }) => {
  const frame = useCurrentFrame();
  const semente = Math.floor(frame / 2) % 12;

  return (
    <>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${foco.x}% ${foco.y}%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0.38) 48%, rgba(0,0,0,0.62) 80%)`,
        }}
      />
      <AbsoluteFill style={{ backgroundColor: "rgba(16,70,80,0.22)", mixBlendMode: "soft-light" }} />
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)" }}
      />
      <AbsoluteFill style={{ opacity: 0.1, mixBlendMode: "overlay" }}>
        <svg width="100%" height="100%">
          <filter id={`grao-${semente}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={semente} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grao-${semente})`} />
        </svg>
      </AbsoluteFill>
    </>
  );
};
