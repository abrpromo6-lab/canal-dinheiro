import { AbsoluteFill, Img, staticFile } from "remotion";
import "./estilo";
import { cores, fonte, mono } from "./estilo";
import { Atmosfera } from "./componentes/Atmosfera";

export type CapaProps = { imagem: string; kicker: string; linha1: string; linha2: string; selo: string };

/** Capa vertical do Short (1080×1920): ilustração + título grande. */
export const Capa: React.FC<CapaProps> = ({ imagem, kicker, linha1, linha2, selo }) => (
  <AbsoluteFill style={{ backgroundColor: cores.fundo, fontFamily: fonte }}>
    <AbsoluteFill style={{ transform: "scale(1.12) translateY(40px)" }}>
      <Img src={staticFile(imagem)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
    <Atmosfera foco={{ x: 60, y: 58 }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(14,13,11,0.92) 0%, rgba(14,13,11,0.55) 30%, rgba(0,0,0,0) 50%)" }} />
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 230, textAlign: "center" }}>
      <div style={{ fontFamily: mono, fontSize: 34, letterSpacing: 7, color: cores.branco, opacity: 0.85 }}>{kicker}</div>
      <div style={{ marginTop: 26, fontSize: 210, fontWeight: 900, letterSpacing: -7, lineHeight: 0.92, color: cores.verde, textShadow: "0 10px 40px rgba(0,0,0,0.8)" }}>
        {linha1}
      </div>
      <div style={{ fontSize: 120, fontWeight: 900, letterSpacing: -3, lineHeight: 1, color: cores.branco, textShadow: "0 8px 30px rgba(0,0,0,0.8)" }}>
        {linha2}
      </div>
      <div
        style={{
          marginTop: 36,
          padding: "14px 30px",
          border: `5px solid ${cores.destaque}`,
          borderRadius: 14,
          color: cores.destaque,
          fontSize: 54,
          fontWeight: 900,
          letterSpacing: 2,
          transform: "rotate(-3deg)",
          background: "rgba(14,13,11,0.6)",
        }}
      >
        {selo}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
