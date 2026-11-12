import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte } from "../estilo";
import type { Cena } from "../tipos";

/** Ilustração em tela cheia com zoom/pan (Ken Burns). Sem imagem, mostra um placeholder. */
export const CenaIlustrada: React.FC<{ cena: Cena; disponivel: boolean }> = ({ cena, disponivel }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const { de, para } = cena.camera;
  const zoom = de.zoom + (para.zoom - de.zoom) * t;
  const x = de.x + (para.x - de.x) * t;
  const y = de.y + (para.y - de.y) * t;
  const entrada = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ overflow: "hidden", opacity: entrada }}>
      <AbsoluteFill style={{ transform: `translate(${x}px, ${y}px) scale(${zoom})` }}>
        {disponivel ? (
          <Img src={staticFile(cena.ilustracao)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Placeholder cena={cena} />
        )}
      </AbsoluteFill>
      {/* Escurece topo e base para o painel e a legenda ficarem legíveis */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const Placeholder: React.FC<{ cena: Cena }> = ({ cena }) => (
  <AbsoluteFill
    style={{
      background: `repeating-linear-gradient(45deg, #1B2420 0px, #1B2420 40px, #202B26 40px, #202B26 80px)`,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: fonte,
    }}
  >
    <div
      style={{
        width: 860,
        padding: 48,
        border: `6px dashed ${cores.cinza}`,
        borderRadius: 32,
        color: cores.bege,
        textAlign: "center",
        position: "absolute",
        top: 960,
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 900, color: cores.amarelo, letterSpacing: 4 }}>
        ILUSTRAÇÃO {cena.id.toUpperCase()}
      </div>
      <div style={{ fontSize: 36, fontWeight: 800, marginTop: 20, lineHeight: 1.25 }}>{cena.descricao}</div>
      <div style={{ fontSize: 28, fontWeight: 800, marginTop: 24, color: cores.cinza }}>public/{cena.ilustracao}</div>
    </div>
  </AbsoluteFill>
);
