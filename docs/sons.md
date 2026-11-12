# Sons do canal

Baixe em um banco gratuito sem atribuição obrigatória (ex.: Pixabay → Sound Effects / Music) e salve em `public/sons/` com **exatamente** estes nomes. O Remotion só toca o que existir; o que faltar é ignorado, sem erro.

Os volumes já estão ajustados no código (`src/Episodio.tsx`): música 10%, ambiente 22%, whoosh 50%, impacto 70%, tique 35%.

## Efeitos (servem para todos os episódios)

| Arquivo | O que é | Buscar por | Duração |
|---|---|---|---|
| `whoosh.mp3` | Passagem rápida quando entra cartão/gráfico em tela cheia | `whoosh transition short` | < 1 s |
| `impacto.mp3` | Grave seco nas palavras-chave (WRONG., STRUCTURING, SEIZED) | `cinematic hit boom` / `bass drop impact` | 1–2 s |
| `tique.mp3` | Clique quando os números do painel mudam | `ui tick` / `counter click` | < 0,5 s |
| `musica-tensa.mp3` | Trilha de fundo em loop | `dark suspense background` / `tension minimal` | 1–3 min |

## Ambientes (em loop, por cena)

| Arquivo | Cenas | Buscar por |
|---|---|---|
| `chuva-porao.mp3` | s01, s02, s13 (porão do Mint) | `rain window night room tone` |
| `banco.mp3` | s03, s10 (agência) | `bank lobby ambience` / `office lobby murmur` |
| `escritorio-noite.mp3` | s06, s07 (analista) | `computer room hum night` / `server room ambience` |
| `corredor.mp3` | s11 (corredor de mármore) | `large empty hall reverb ambience` |
| `rua-sirene.mp3` | s12 (apreensão) | `city street night police siren distant` |

## Dicas

- Prefira MP3 ou WAV. Ambiente com 20 s ou mais evita repetição perceptível no loop.
- Para trocar o som de uma cena, mude o campo `ambiente` da cena no JSON do episódio.
- Ouça o resultado no `npm run studio` antes de renderizar.
