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

/** Legenda palavra por palavra: mostra grupos de 3, com a palavra falada em destaque. */
export const Legenda: React.FC<{ cena: Cena; velocidade: number }> = ({ cena, velocidade }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seg = frame / fps;
  const palavras = tempos(cena, velocidade);

  let atual = -1;
  palavras.forEach((p, i) => {
    if (seg >= p.inicio) atual = i;
  });
  if (atual < 0) return null;

  const inicioGrupo = Math.floor(atual / POR_GRUPO) * POR_GRUPO;
  const grupo = palavras.slice(inicioGrupo, inicioGrupo + POR_GRUPO);

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 1380,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 30px",
        fontFamily: fonte,
        fontWeight: 900,
        fontSize: 78,
        lineHeight: 1.1,
        textTransform: "uppercase",
        textAlign: "center",
      }}
    >
      {grupo.map((p, i) => {
        const ativa = inicioGrupo + i === atual;
        return (
          <span
            key={inicioGrupo + i}
            style={{
              color: ativa ? cores.amarelo : cores.branco,
              WebkitTextStroke: `10px ${cores.tinta}`,
              paintOrder: "stroke fill",
              transform: ativa ? "scale(1.04)" : "none",
              display: "inline-block",
            }}
          >
            {p.texto}
          </span>
        );
      })}
    </div>
  );
};
