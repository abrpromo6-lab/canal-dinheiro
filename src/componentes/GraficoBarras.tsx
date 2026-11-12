import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte } from "../estilo";
import type { Barra } from "../tipos";

const ALTURA = 520; // altura útil do gráfico em px

/** Barras que sobem uma a uma, com a linha de limite tracejada. Acima do limite fica vermelho. */
export const GraficoBarras: React.FC<{ titulo: string; limite: number; rotuloLimite: string; barras: Barra[] }> = ({
  titulo,
  limite,
  rotuloLimite,
  barras,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const maximo = Math.max(limite * 1.25, ...barras.map((b) => b.valor));
  const alturaDe = (v: number) => (v / maximo) * ALTURA;
  const entrada = spring({ frame: frame - 4, fps, config: { damping: 16 } });

  return (
    <div
      style={{
        position: "absolute",
        top: 470,
        left: 70,
        right: 70,
        background: cores.bege,
        borderRadius: 26,
        padding: "36px 40px 30px",
        boxShadow: `0 14px 0 ${cores.begeEscuro}, 0 30px 60px rgba(0,0,0,0.45)`,
        fontFamily: fonte,
        color: cores.tinta,
        opacity: entrada,
        transform: `translateY(${(1 - entrada) * 100}px)`,
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 900, textAlign: "center" }}>{titulo}</div>
      <div style={{ position: "relative", height: ALTURA, marginTop: 30 }}>
        {/* linha do limite */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: alturaDe(limite),
            borderTop: `6px dashed ${cores.vermelho}`,
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              top: -52,
              fontSize: 28,
              fontWeight: 900,
              color: cores.vermelho,
              letterSpacing: 1,
            }}
          >
            {rotuloLimite}
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", gap: 22 }}>
          {barras.map((b, i) => {
            const s = spring({ frame: frame - 12 - i * 7, fps, config: { damping: 13, stiffness: 120 } });
            const acima = b.valor > limite;
            return (
              <div key={b.rotulo} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: 30, fontWeight: 900, marginBottom: 8, opacity: s }}>
                  ${(b.valor / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 })}k
                </div>
                <div
                  style={{
                    width: "100%",
                    height: alturaDe(b.valor) * s,
                    background: acima ? cores.vermelho : cores.verde,
                    borderRadius: "12px 12px 0 0",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", gap: 22, borderTop: `4px solid ${cores.tinta}`, paddingTop: 12 }}>
        {barras.map((b) => (
          <div key={b.rotulo} style={{ flex: 1, textAlign: "center", fontSize: 24, fontWeight: 800 }}>
            {b.rotulo}
          </div>
        ))}
      </div>
    </div>
  );
};
