import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte, mono, temaDe, type Fundo } from "../estilo";
import type { Barra } from "../tipos";
import { Kicker } from "./Kicker";
import { entrar, opacidadeCorte } from "./animacao";

const ALTURA = 520; // altura útil das barras em px

/** Gráfico em tela cheia: barras surgem uma a uma; a linha tracejada marca o limite. Acima dela, cor de destaque. */
export const GraficoBarras: React.FC<{
  fundo?: Fundo;
  kicker?: string;
  titulo: string;
  sub?: string;
  limite: number;
  rotuloLimite: string;
  barras: Barra[];
}> = ({ fundo = "bege", kicker, titulo, sub, limite, rotuloLimite, barras }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tema = temaDe(fundo);
  const maximo = Math.max(limite * 1.3, ...barras.map((b) => b.valor));
  const alturaDe = (v: number) => (v / maximo) * ALTURA;

  return (
    <AbsoluteFill
      style={{ backgroundColor: tema.fundo, opacity: opacidadeCorte(frame), fontFamily: fonte, color: tema.texto, alignItems: "center" }}
    >
      <div style={{ marginTop: 330, textAlign: "center" }}>
        {kicker ? <Kicker cor={tema.secundario} style={entrar(frame, fps, 0)}>{kicker}</Kicker> : null}
        <div style={{ marginTop: 60, fontSize: 76, fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, ...entrar(frame, fps, 3) }}>
          {titulo}
        </div>
        {sub ? (
          <div style={{ fontSize: 76, fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, color: tema.secundario, ...entrar(frame, fps, 8) }}>
            {sub}
          </div>
        ) : null}
      </div>

      <div style={{ position: "absolute", left: 110, right: 110, top: 900, height: ALTURA }}>
        {/* linha do limite */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: alturaDe(limite), borderTop: `5px dashed ${cores.destaque}` }}>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: -46,
              fontFamily: mono,
              fontSize: 26,
              letterSpacing: 2,
              color: cores.destaque,
            }}
          >
            {rotuloLimite}
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", gap: 26 }}>
          {barras.map((b, i) => {
            const s = spring({ frame: frame - 12 - i * 9, fps, config: { damping: 15, stiffness: 130 } });
            const acima = b.valor > limite;
            return (
              <div
                key={b.rotulo}
                style={{
                  width: 148,
                  height: alturaDe(b.valor) * s,
                  opacity: Math.min(1, s * 2),
                  background: acima ? cores.destaque : tema.texto,
                  borderRadius: 14,
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 18,
                  color: tema.fundo,
                  fontSize: 38,
                  fontWeight: 900,
                  overflow: "hidden",
                }}
              >
                ${(b.valor / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 })}k
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, top: 900 + ALTURA + 20, display: "flex", gap: 26 }}>
        {barras.map((b, i) => (
          <div
            key={b.rotulo}
            style={{
              width: 148,
              textAlign: "center",
              fontFamily: mono,
              fontSize: 24,
              letterSpacing: 1,
              color: tema.secundario,
              opacity: spring({ frame: frame - 12 - i * 9, fps }),
            }}
          >
            {b.rotulo}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
