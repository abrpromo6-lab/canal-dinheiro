import { useCurrentFrame, useVideoConfig } from "remotion";
import { cores, fonte } from "../estilo";
import type { Cena, PalavraTempo } from "../tipos";

const ATRASO = 0.2; // segundos antes da primeira palavra (sem áudio real)
const POR_GRUPO = 3; // palavras visíveis por vez

/** Tempos estimados pela velocidade de fala; substituídos por cena.palavras quando houver áudio. */
const tempos = (cena: Cena, velocidade: number): PalavraTempo[] => {
  if (cena.palavras?.length) return cena.palavras;
  return cena.fala
    .split(/\s+/)
    .filter(Boolean)
    .map((texto, i) => ({ texto, inicio: ATRASO + i / velocidade }));
};

/** Legenda discreta: grupos de até 3 palavras, que vão aparecendo conforme a fala. */
export const Legenda: React.FC<{ cena: Cena; velocidade: number; ateQuadro?: number }> = ({ cena, velocidade, ateQuadro }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Some quando uma palavra-chave grande entra por cima da ilustração (evita texto repetido).
  if (ateQuadro !== undefined && frame >= ateQuadro) return null;
  const seg = frame / fps;
  const palavras = tempos(cena, velocidade);

  let atual = -1;
  palavras.forEach((p, i) => {
    if (seg >= p.inicio) atual = i;
  });
  if (atual < 0) return null;

  // Grupos de até 3 palavras, sempre recomeçando depois de ponto, interrogação, exclamação ou dois-pontos.
  let inicioGrupo = 0;
  for (let i = 1; i <= atual; i++) {
    if (i - inicioGrupo >= POR_GRUPO || /[.?!:]$/.test(palavras[i - 1].texto)) inicioGrupo = i;
  }
  const visiveis = palavras.slice(inicioGrupo, atual + 1);

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: cena.legendaTopo ?? 1370,
        textAlign: "center",
        fontFamily: fonte,
        fontWeight: 800,
        fontSize: 64,
        letterSpacing: -0.5,
        lineHeight: 1.15,
        color: cores.branco,
        textShadow: "0 3px 6px rgba(0,0,0,0.9), 0 0 28px rgba(0,0,0,0.75)",
      }}
    >
      {visiveis.map((p) => p.texto).join(" ")}
    </div>
  );
};
