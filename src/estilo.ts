import { continueRender, delayRender, staticFile } from "remotion";

// Identidade do canal: preto quente + bege papel, destaque laranja-sinal, verde só para dinheiro.
export const cores = {
  fundo: "#0E0D0B",
  escuro: "#14120F",
  bege: "#EFE9DD",
  tinta: "#17140F",
  cinzaBege: "#8E877B", // texto secundário sobre bege
  cinzaEscuro: "#8A8478", // texto secundário sobre preto
  branco: "#F5F1E8",
  destaque: "#FF5B2E",
  verde: "#3DD68C",
  caixa: "rgba(14,13,11,0.78)",
};

export const fonte = "InterDisplay, Inter, Arial, sans-serif";
export const mono = "JetBrainsMono, Consolas, 'Courier New', monospace";

// Carrega as fontes de public/fonts antes de renderizar qualquer quadro.
const fontes = [
  { familia: "InterDisplay", arquivo: "fonts/InterDisplay-ExtraBold.otf", peso: "800" },
  { familia: "InterDisplay", arquivo: "fonts/InterDisplay-Black.otf", peso: "900" },
  { familia: "JetBrainsMono", arquivo: "fonts/JetBrainsMono-Medium.woff2", peso: "500" },
];

if (typeof document !== "undefined") {
  const handle = delayRender("Carregando fontes");
  Promise.all(
    fontes.map(async ({ familia, arquivo, peso }) => {
      const face = new FontFace(familia, `url(${staticFile(arquivo)})`, { weight: peso });
      await face.load();
      document.fonts.add(face);
    })
  )
    .catch((e) => console.error("Falha ao carregar fontes", e))
    .finally(() => continueRender(handle));
}

export const dinheiro = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

export type Fundo = "bege" | "escuro";
export const temaDe = (fundo: Fundo = "bege") =>
  fundo === "bege"
    ? { fundo: cores.bege, texto: cores.tinta, secundario: cores.cinzaBege }
    : { fundo: cores.escuro, texto: cores.branco, secundario: cores.cinzaEscuro };
