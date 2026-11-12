import { continueRender, delayRender, staticFile } from "remotion";

export const cores = {
  fundo: "#0F1412",
  tinta: "#121614",
  bege: "#F3E9D2",
  begeEscuro: "#E2D3B0",
  verde: "#2FBF71",
  vermelho: "#E5484D",
  amarelo: "#FFD23F",
  branco: "#FFFFFF",
  cinza: "#8A938E",
};

export const fonte = "InterDisplay, Inter, Arial, sans-serif";

// Carrega as fontes de public/fonts antes de renderizar qualquer quadro.
const fontes = [
  { arquivo: "fonts/InterDisplay-ExtraBold.otf", peso: "800" },
  { arquivo: "fonts/InterDisplay-Black.otf", peso: "900" },
];

if (typeof document !== "undefined") {
  const handle = delayRender("Carregando fontes InterDisplay");
  Promise.all(
    fontes.map(async ({ arquivo, peso }) => {
      const face = new FontFace("InterDisplay", `url(${staticFile(arquivo)})`, { weight: peso });
      await face.load();
      document.fonts.add(face);
    })
  )
    .catch((e) => console.error("Falha ao carregar fontes", e))
    .finally(() => continueRender(handle));
}

export const dinheiro = (v: number) => "$" + Math.round(v).toLocaleString("en-US");
