import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte, mono } from "../estilo";
import { Kicker } from "./Kicker";

/**
 * Final em duas etapas:
 * 1) por cima da última ilustração: "COMMENT ONE WORD" + dois botões (bege e laranja) que entram um depois do outro;
 * 2) quando a fala acaba (`cartaoEm`, em quadros desde o início do overlay): corte para a tela preta
 *    "PART X / TOMORROW" com duas linhas de apoio.
 */
export const FinalNeon: React.FC<{
  rotulo: string;
  opcoes: [string, string];
  kicker: string;
  linha1: string;
  linha2: string;
  sub: string[];
  cartaoEm: number;
}> = ({ rotulo, opcoes, kicker, linha1, linha2, sub, cartaoEm }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame >= cartaoEm) {
    const f = frame - cartaoEm;
    const s = spring({ frame: f, fps, config: { damping: 16, stiffness: 160 } });
    return (
      <AbsoluteFill style={{ backgroundColor: cores.escuro, alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: fonte }}>
        <Kicker cor={cores.cinzaEscuro}>{kicker}</Kicker>
        <div style={{ marginTop: 40, fontSize: 160, fontWeight: 900, letterSpacing: -5, lineHeight: 0.95, color: cores.branco, opacity: s }}>
          {linha1}
        </div>
        <div style={{ fontSize: 160, fontWeight: 900, letterSpacing: -5, lineHeight: 0.95, color: cores.destaque, opacity: s }}>{linha2}</div>
        <div style={{ marginTop: 56 }}>
          {sub.map((l, i) => (
            <div key={i} style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.25, color: cores.cinzaEscuro }}>
              {l}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    );
  }

  const botao = (atraso: number) => spring({ frame: frame - atraso, fps, config: { damping: 12, stiffness: 200 } });
  const a = botao(0);
  const b = botao(Math.round(fps * 0.4));
  const rot = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 1180, fontFamily: fonte }}>
      <div style={{ fontFamily: mono, fontSize: 30, letterSpacing: 6, color: cores.branco, opacity: rot, textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}>
        {rotulo}
      </div>
      <div style={{ display: "flex", gap: 36, marginTop: 28 }}>
        {[
          { texto: opcoes[0], fundo: cores.bege, cor: cores.tinta, s: a },
          { texto: opcoes[1], fundo: cores.destaque, cor: cores.branco, s: b },
        ].map((o) => (
          <div
            key={o.texto}
            style={{
              width: 420,
              padding: "34px 0",
              textAlign: "center",
              borderRadius: 30,
              background: o.fundo,
              color: o.cor,
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: -1,
              boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
              opacity: Math.min(1, o.s * 1.4),
              transform: `scale(${0.7 + 0.3 * o.s})`,
            }}
          >
            {o.texto}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
