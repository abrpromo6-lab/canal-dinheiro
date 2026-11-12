import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte } from "../estilo";

/** Tela final da série: chamada para a parte 2 e votação nos comentários. */
export const TelaParte2: React.FC<{ chamada: string; opcoes: [string, string]; rodape: string; duracao: number }> = ({
  chamada,
  opcoes,
  rodape,
  duracao,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Entra na metade da cena, quando a fala chega em "Do you hide it, or spend it?"
  const inicio = Math.round(duracao * 0.38);
  const f = frame - inicio;
  const fundo = interpolate(f, [0, 10], [0, 0.72], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sTitulo = spring({ frame: f, fps, config: { damping: 12 } });
  const sA = spring({ frame: f - 10, fps, config: { damping: 10, stiffness: 150 } });
  const sB = spring({ frame: f - 16, fps, config: { damping: 10, stiffness: 150 } });
  const sRodape = spring({ frame: f - 30, fps, config: { damping: 14 } });
  const pulsar = 1 + 0.04 * Math.sin((f / fps) * Math.PI * 2);

  if (f < 0) return null;

  return (
    <AbsoluteFill style={{ backgroundColor: `rgba(10,13,12,${fundo})`, fontFamily: fonte, alignItems: "center" }}>
      <div
        style={{
          marginTop: 430,
          fontSize: 92,
          fontWeight: 900,
          color: cores.amarelo,
          textAlign: "center",
          lineHeight: 1,
          transform: `scale(${sTitulo})`,
          WebkitTextStroke: `8px ${cores.tinta}`,
          paintOrder: "stroke fill",
        }}
      >
        {chamada}
      </div>
      <div style={{ marginTop: 60, fontSize: 48, fontWeight: 800, color: cores.bege }}>Comment one word:</div>
      <div style={{ display: "flex", gap: 40, marginTop: 36 }}>
        {[
          { texto: opcoes[0], cor: cores.verde, s: sA },
          { texto: opcoes[1], cor: cores.vermelho, s: sB },
        ].map((o) => (
          <div
            key={o.texto}
            style={{
              width: 420,
              padding: "36px 0 44px",
              textAlign: "center",
              background: o.cor,
              color: cores.branco,
              fontSize: 110,
              fontWeight: 900,
              borderRadius: 30,
              border: `8px solid ${cores.tinta}`,
              boxShadow: `12px 12px 0 ${cores.tinta}`,
              transform: `scale(${o.s * pulsar})`,
            }}
          >
            {o.texto}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 60,
          fontSize: 50,
          fontWeight: 900,
          color: cores.bege,
          opacity: sRodape,
          transform: `translateY(${(1 - sRodape) * 40}px)`,
        }}
      >
        {rodape}
      </div>
    </AbsoluteFill>
  );
};
