import { Easing, interpolate } from "remotion";
import { cores, dinheiro, fonte } from "../estilo";
import type { Painel } from "../tipos";

const TRANSICAO = 18; // quadros para os números rolarem entre cenas

/** Painel fixo no topo: CASH / BANKED / SUSPICION. Anima de `de` para `para` no início da cena. */
export const PainelDinheiro: React.FC<{ de: Painel; para: Painel; quadroNaCena: number }> = ({
  de,
  para,
  quadroNaCena,
}) => {
  const t = interpolate(quadroNaCena, [0, TRANSICAO], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const mix = (a: number, b: number) => a + (b - a) * t;
  const cash = mix(de.cash, para.cash);
  const banked = mix(de.banked, para.banked);
  const suspeita = mix(de.suspicion, para.suspicion);
  const mudou = (a: number, b: number) => a !== b && t < 1;
  const pulso = 1 + 0.08 * Math.sin(Math.min(t, 1) * Math.PI);

  const corSuspeita = suspeita < 40 ? cores.verde : suspeita < 75 ? cores.amarelo : cores.vermelho;
  const bankedTexto = para.rotuloBanked && t > 0.5 ? para.rotuloBanked : dinheiro(banked);

  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 40,
        right: 40,
        height: 200,
        borderRadius: 28,
        background: "rgba(18,22,20,0.88)",
        border: `3px solid rgba(243,233,210,0.18)`,
        display: "flex",
        fontFamily: fonte,
        color: cores.bege,
        overflow: "hidden",
      }}
    >
      <Coluna rotulo="CASH" escala={mudou(de.cash, para.cash) ? pulso : 1}>
        <span style={{ color: cores.verde }}>{dinheiro(cash)}</span>
      </Coluna>
      <Divisor />
      <Coluna rotulo="BANKED" escala={mudou(de.banked, para.banked) ? pulso : 1}>
        <span style={{ color: para.rotuloBanked ? cores.vermelho : cores.bege }}>{bankedTexto}</span>
      </Coluna>
      <Divisor />
      <Coluna rotulo="SUSPICION" escala={mudou(de.suspicion, para.suspicion) ? pulso : 1}>
        <div style={{ width: "100%", padding: "0 26px" }}>
          <div style={{ color: corSuspeita }}>{Math.round(suspeita)}%</div>
          <div style={{ height: 14, borderRadius: 7, background: "rgba(255,255,255,0.12)", marginTop: 8 }}>
            <div style={{ width: `${suspeita}%`, height: "100%", borderRadius: 7, background: corSuspeita }} />
          </div>
        </div>
      </Coluna>
    </div>
  );
};

const Coluna: React.FC<{ rotulo: string; escala: number; children: React.ReactNode }> = ({
  rotulo,
  escala,
  children,
}) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 5, color: cores.cinza }}>{rotulo}</div>
    <div style={{ fontSize: 44, fontWeight: 900, marginTop: 10, transform: `scale(${escala})`, width: "100%" }}>
      {children}
    </div>
  </div>
);

const Divisor = () => <div style={{ width: 3, margin: "30px 0", background: "rgba(243,233,210,0.15)" }} />;
