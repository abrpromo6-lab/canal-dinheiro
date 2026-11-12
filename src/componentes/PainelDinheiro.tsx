import { Easing, interpolate, useCurrentFrame } from "remotion";
import { cores, dinheiro, fonte, mono } from "../estilo";
import type { Painel } from "../tipos";

const TRANSICAO = 20; // quadros para os números rolarem no começo da cena

/** Painel no topo: três caixas translúcidas (dinheiro em mãos, depositado, calor). */
export const PainelDinheiro: React.FC<{ de: Painel; para: Painel }> = ({ de, para }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, TRANSICAO], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const mix = (a: number, b: number) => a + (b - a) * t;
  const seized = para.rotuloBanked && t > 0.5;

  return (
    <div style={{ position: "absolute", top: 230, left: 60, right: 60, display: "flex", gap: 18 }}>
      <Caixa rotulo="ON HAND" valor={dinheiro(mix(de.cash, para.cash))} cor={cores.branco} flex={1.25} />
      <Caixa
        rotulo="DEPOSITED"
        valor={seized ? para.rotuloBanked! : dinheiro(mix(de.banked, para.banked))}
        cor={seized ? cores.destaque : cores.branco}
        flex={1}
      />
      <Caixa rotulo="HEAT" valor={`${Math.round(mix(de.suspicion, para.suspicion))}%`} cor={cores.destaque} flex={0.85} />
    </div>
  );
};

const Caixa: React.FC<{ rotulo: string; valor: string; cor: string; flex: number }> = ({ rotulo, valor, cor, flex }) => (
  <div
    style={{
      flex,
      background: cores.caixa,
      borderRadius: 18,
      padding: "20px 24px 22px",
      border: "1.5px solid rgba(245,241,232,0.08)",
    }}
  >
    <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: 3, color: cores.cinzaEscuro }}>{rotulo}</div>
    <div style={{ fontFamily: fonte, fontSize: 50, fontWeight: 900, letterSpacing: -1, marginTop: 6, color: cor, whiteSpace: "nowrap" }}>
      {valor}
    </div>
  </div>
);
