import { mono } from "../estilo";

/** Rótulo pequeno em fonte mono, caixa alta e espaçado (acima dos títulos). */
export const Kicker: React.FC<{ cor: string; children: React.ReactNode; tamanho?: number; style?: React.CSSProperties }> = ({
  cor,
  children,
  tamanho = 30,
  style,
}) => (
  <div
    style={{
      fontFamily: mono,
      fontWeight: 500,
      fontSize: tamanho,
      letterSpacing: tamanho * 0.2,
      textTransform: "uppercase",
      color: cor,
      ...style,
    }}
  >
    {children}
  </div>
);
