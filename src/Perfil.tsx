import { AbsoluteFill, Img, staticFile } from "remotion";
import { cores } from "./estilo";

/** Foto de perfil 800×800: rosto "convencido" do Mint recortado da folha de referência (1536×1024). */
export const Perfil: React.FC = () => {
  const escala = 800 / 300; // recorte de 300×300 px da folha
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 40%, #FFFFFF 0%, ${cores.bege} 55%, #D9CDB4 100%)`, overflow: "hidden" }}>
      <Img
        src={staticFile("cenas/mint-referencia.webp")}
        style={{ position: "absolute", width: 1536 * escala, height: 1024 * escala, left: -45 * escala, top: -640 * escala, mixBlendMode: "multiply" }}
      />
    </AbsoluteFill>
  );
};
