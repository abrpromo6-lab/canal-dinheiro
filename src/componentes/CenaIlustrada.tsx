import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte, mono } from "../estilo";
import type { Camera, Cena } from "../tipos";

const PARADA: { de: Camera; para: Camera } = { de: { zoom: 1.05, x: 0, y: 0 }, para: { zoom: 1.12, x: 0, y: 0 } };

/** Ilustração em tela cheia com zoom/pan lento. Sem imagem, mostra um placeholder. */
export const CenaIlustrada: React.FC<{ cena: Cena; disponivel: boolean }> = ({ cena, disponivel }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  if (!cena.ilustracao) return <AbsoluteFill style={{ backgroundColor: cores.fundo }} />;

  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const { de, para } = cena.camera ?? PARADA;
  const zoom = de.zoom + (para.zoom - de.zoom) * t;
  const x = de.x + (para.x - de.x) * t;
  const y = de.y + (para.y - de.y) * t;

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: cores.fundo }}>
      <AbsoluteFill style={{ transform: `translate(${x}px, ${y}px) scale(${zoom})` }}>
        {disponivel ? (
          <Img src={staticFile(cena.ilustracao)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Placeholder cena={cena} />
        )}
      </AbsoluteFill>
      {/* Leve escurecida embaixo para a legenda */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)" }} />
    </AbsoluteFill>
  );
};

const Placeholder: React.FC<{ cena: Cena }> = ({ cena }) => (
  <AbsoluteFill
    style={{
      background: "radial-gradient(ellipse at 50% 45%, #2A2520 0%, #141210 70%)",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: fonte,
      textAlign: "center",
    }}
  >
    <div style={{ width: 820, padding: 44, border: `4px dashed ${cores.cinzaEscuro}`, borderRadius: 28, marginTop: 120 }}>
      <div style={{ fontFamily: mono, fontSize: 30, letterSpacing: 6, color: cores.destaque }}>ILUSTRAÇÃO {cena.id.toUpperCase()}</div>
      <div style={{ fontSize: 40, fontWeight: 800, marginTop: 18, lineHeight: 1.25, color: cores.branco }}>{cena.descricao}</div>
      <div style={{ fontFamily: mono, fontSize: 24, marginTop: 20, color: cores.cinzaEscuro }}>public/{cena.ilustracao}</div>
    </div>
  </AbsoluteFill>
);
