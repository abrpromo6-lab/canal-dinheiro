# Canal de dinheiro — instruções para o Claude Code

Fale com o Abr em português do Brasil. Ele é desenvolvedor (React, Vite, Tailwind, Supabase, Vercel) e quer prompts e comandos prontos para copiar.

## Foco atual: canal de dinheiro em inglês (Shorts)

### O formato

Shorts verticais (1080×1920) em **inglês**, contando histórias sobre como o dinheiro escondido funciona e **por que as pessoas são pegas**, em série com o público votando o próximo episódio.

Referência visual (vídeo que o Abr mandou): história "you have $10M in cash", com:

- **Ilustrações** em estilo quadrinho detalhado, com um personagem de cabeça redonda branca em cenários ricos. São geradas por IA de imagem (o Claude não gera imagem): o Abr gera no Gemini ou no ChatGPT com prompts que nós escrevemos.
- **Motion graphics no Remotion:** painel fixo no topo (CASH / BANKED / SUSPICION mudando ao longo da história), cartões bege com tipografia forte ("$10M in hundreds = 100 kg"), gráficos simples (barras de $9k abaixo da linha de $10k), palavra-chave grande ("STRUCTURING") e legenda palavra por palavra.
- **Final em série (da referência, não copiar o texto):** "PART 2 TOMORROW — Comment HIDE or SPEND. The majority writes Part 2."
- Movimento de câmera (zoom e pan) sobre as ilustrações.

O personagem e a identidade visual precisam ser **nossos**, não cópia do canal de referência.

### Por que este tema (pesquisa de 2026-11-12, Shorts, contagem do dia)

| Vídeo | Canal | Visualizações |
|---|---|---|
| $1M or this penny? | NYKentertain | 69 mi |
| Dealer explains money laundering scheme | The Connect | 56 mi |
| How money laundering works | Mark Tilbury | 54 mi |
| Laundering money in Las Vegas casinos | The Connect | 45 mi |
| $1 every day or $1M now | ItssIMANNN | 38 mi |
| Money laundering explained | Daniel Iles | 32 mi |
| Criminals use art to launder money | NYKentertain | 26 mi |
| How the rich avoid taxes | Mark Tilbury | 14 mi |
| How banks keep you poor | Mark Tilbury | 13 mi |

NYKentertain: criado em abril de 2025, sem rosto, 1,54 bilhão de visualizações em 427 vídeos. Fala de vários assuntos, mas os vídeos de dinheiro são os que explodem (os outros recentes fazem de 40 mil a 2 milhões).

Não foi possível medir o desempenho do **estilo** da referência (ilustração + painel): o tema está provado, o estilo ainda não.

### Regras de conteúdo

- Todo episódio mostra **por que o esquema falha** e como a pessoa é pega. Explicar o crime e a fiscalização, nunca ensinar a cometer.
- Nada de recomendação de investimento nem de personagem fingindo ser consultor financeiro.
- Fatos e números com fonte conferida (regras dos EUA: relatório de depósitos acima de US$ 10 mil, estruturação etc.).
- Cada vídeo com roteiro e cenas realmente diferentes (o YouTube desmonetiza conteúdo repetitivo).

### Pautas iniciais

1. Série "$10M in cash" (estruturação, motel, banco, carro, imóvel, cassino).
2. Como a Receita (IRS) te pega.
3. Como os ricos pagam menos imposto (legalmente).
4. Como o banco lucra com o seu cartão.
5. Dilemas: "$1M now or a penny doubled for 30 days?".

### Produção

- Remotion 4.0.536 com React 18 (ver `package.json`). Fonte em `public/fonts/InterDisplay-*`. Ainda não há código em `src/`: criar `src/index.ts`, `src/Root.tsx` e os componentes.
- Estrutura desejada: o roteiro e as cenas vêm de um **JSON** (gerado pelo Claude), e o Remotion só renderiza. Componentes reutilizáveis: `PainelDinheiro`, `CartaoTexto`, `GraficoBarras`, `PalavraChave`, `CenaIlustrada` (imagem com zoom/pan), `Legenda`, `TelaParte2`.
- Ilustrações: o Claude escreve os prompts (com descrição fixa do personagem para manter consistência); o Abr gera e coloca em `public/cenas/`. Enquanto não houver imagem, usar placeholder.
- Voz: ainda não decidida (sintética). Deixar o tempo de cada fala no JSON para encaixar o áudio depois.

### Estado (2026-11-12)

- Episódio 1 pronto em `src/episodios/ep01.json` (88 s narrado, 13 cenas, 8 ilustrações em `public/cenas/`). Roteiro com fontes em `docs/ep01-roteiro.md`; prompts em `docs/ep01-prompts.md`.
- Personagem fixo do canal: **Mint** (cabeça verde-menta em forma de tijolo arredondado, moletom mostarda, tênis plataforma branco, elástico vermelho duplo no pulso esquerdo). A descrição está em `docs/ep01-prompts.md`; reutilizar igual em todo episódio.
- Identidade visual (v2, inspirada no acabamento da referência, mas com palavras e cores nossas): preto quente `#14120F` + bege `#EFE9DD`, destaque laranja `#FF5B2E`; títulos em Inter Display Black, rótulos em JetBrains Mono; cartões e gráficos em tela cheia; painel ON HAND / DEPOSITED / HEAT; legenda discreta em branco. Ilustrações com cenário profundo: plano aberto do alto, personagem pequeno, luz fria azul-petróleo contra luz âmbar. Cenário fixo: o porão-apartamento do Mint.
- **Não copiar textos da referência:** os rótulos do painel deles (CASH / BANKED / SUSPICION), o "RULE 1" e o final "Comment HIDE or SPEND. The majority writes Part 2." são deles. O nosso final usa BURY ou BLOW.
- O `calculateMetadata` em `src/Root.tsx` verifica quais imagens existem em `public/cenas/`; as que faltam viram placeholder.
- **Narração (ElevenLabs):** `npm run narrar` lê `ep.voz` no JSON, gera `public/audio/<ep>-<cena>.mp3`, grava `palavras` (tempo de cada palavra), `duracao` de cada cena e converte `overlay.ancora` / `overlayFimAncora` (palavra da fala) em `inicio` / `overlayFim`. Só refaz cenas cuja fala ou voz mudou (`--forcar` refaz tudo; `--so=s03` uma cena; `--vozes` lista as vozes).
  - Voz do canal: **Liam – Viral Short-Form Storyteller** (`VCgLBmBjldJmfphyB8sZ`, biblioteca), modelo `eleven_v4`. O v4 praticamente ignora `speed`; para encurtar, enxugar o texto.
  - Chave em `.env` (`ELEVENLABS_API_KEY`, fora do Git). O script dá prioridade ao `.env` porque o Windows do Abr tinha uma `ELEVENLABS_API_KEY` antiga no sistema. Plano Starter: saída `mp3_44100_128` (192 kbps só no Creator); a chave não tem permissão de adicionar vozes, mas usa vozes da biblioteca direto pelo ID.
- **Sons (ElevenLabs):** `npm run sons` gera música e efeitos em `public/sons/` (prompts em `scripts/sons.mjs`); `node scripts/normalizar.mjs` iguala o volume dos ambientes e grava `.wav` (o JSON aponta para os `.wav`). Níveis e ducking (música/ambiente abaixam sob a voz) em `src/mixagem.ts`. O Abr pediu whoosh suave e limpo; nada pode ficar na frente da voz.
- **Capa e perfil:** composições `Capa` (1080×1920) e `Perfil` (800×800) em `src/Root.tsx`; `npx remotion still src/index.ts Capa out/capa-ep01.png`. Título, descrição, tags e comentário fixado em `docs/ep01-publicacao.md`.
- Canal sugerido: **Mint Files** (@mintfiles), postar o mesmo vídeo em Shorts, TikTok e Reels, um por dia.
- Render no Windows desta máquina: o Chrome do Remotion falhava pelo caminho longo; usar `--browser-executable` apontando para uma cópia em caminho curto, se acontecer de novo.

### Resultados e lições (2026-11-13)

- Ep01 (88 s), primeiras ~11 h: **YouTube** 552 views, ~55 s de tempo médio, 10 curtidas, 2 inscritos, 1 voto (BURY). **Instagram** 173 views, 25 s médios, **49% pularam no início**. **TikTok** 91 views, 4 s médios: a conta foi distribuída para o Brasil (região da conta/celular), não para público de inglês.
- Lição: o 1º quadro mostrava o painel em "$0" (contava do zero). Agora a 1ª cena começa com o painel cheio e, no ep02, com o título já na tela no quadro 0. Mirar 55–65 s.
- Ep02 "You Buried It" pronto: `src/episodios/ep02.json` (65 s, 9 cenas, 7 ilustrações), composição `ep02` (`npm run render:ep02`), roteiro/fontes/publicação em `docs/ep02-roteiro.md`, prompts em `docs/ep02-prompts.md`. Capa: `npx remotion still src/index.ts Capa out/capa-ep02.png --props=...` (usar imagem em que o rosto do Mint fique abaixo do título).
- Fluxo por episódio: JSON → `node scripts/narrar.mjs src/episodios/epXX.json` → prompts → Abr gera imagens → ajustar `foco`/`legendaTopo`/`camera` por cena → render. Novos ambientes: adicionar em `scripts/sons.mjs`, `node scripts/sons.mjs`, `node scripts/normalizar.mjs <nome>`.

- Ep03 "The Casino" pronto (60 s, 8 cenas, 6 ilustrações): `src/episodios/ep03.json`, `docs/ep03-roteiro.md`, `docs/ep03-prompts.md`, `npm run render:ep03`.

### Decisões do Abr (2026-11-14) — valem para os próximos episódios

- **Cor assinatura nas imagens:** neon laranja `#FF5B2E` em toda ilustração (letreiro sem letras, faixa de luz), refletindo em superfícies, contra o azul-petróleo. É o nosso equivalente ao rosa do canal de referência.
- **Mais escuro:** as imagens não podem ficar "vivas". Prompts pedem low-key/dessaturado, e o episódio usa `tratamento` no JSON (ep03: brilho .72, saturação .7, contraste 1.12, sombra .15). Ep01/ep02 ficaram no padrão.
- **Final no formato da referência** (overlay `tipo: "neon"`, componente `FinalNeon`): última imagem é um **close no Mint** (sem balões de pensamento); na pergunta da narração entram "COMMENT ONE WORD" + dois botões (bege e laranja) e o painel some; quando a fala acaba, corta para tela preta "PART X" branco / "TOMORROW" laranja + 2 linhas. Texto sempre nosso, nunca o deles. **Antes de imitar algo da referência, extrair os quadros do vídeo e olhar** (`npx remotion ffmpeg -ss <s> -i ref.mp4 -r 4 ...`).
- **Voz:** fica o Liam (testamos ~20 vozes; o Abr preferiu manter).
- Evitar mala com estampa de monograma: pedir "plain black duffel bag, no pattern".

### Próximo passo

1. Abr publica o ep03 e fixa o comentário "HOUSE or CRYPTO?".
2. Episódio 4 conforme a votação (HOUSE ou CRYPTO).
