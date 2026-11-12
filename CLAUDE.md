# Canal de dinheiro — instruções para o Claude Code

Fale com o Abr em português do Brasil. Ele é desenvolvedor (React, Vite, Tailwind, Supabase, Vercel) e quer prompts e comandos prontos para copiar.

## Foco atual: canal de dinheiro em inglês (Shorts)

### O formato

Shorts verticais (1080×1920) em **inglês**, contando histórias sobre como o dinheiro escondido funciona e **por que as pessoas são pegas**, em série com o público votando o próximo episódio.

Referência visual (vídeo que o Abr mandou): história "you have $10M in cash", com:

- **Ilustrações** em estilo quadrinho detalhado, com um personagem de cabeça redonda branca em cenários ricos. São geradas por IA de imagem (o Claude não gera imagem): o Abr gera no Gemini ou no ChatGPT com prompts que nós escrevemos.
- **Motion graphics no Remotion:** painel fixo no topo (CASH / BANKED / SUSPICION mudando ao longo da história), cartões bege com tipografia forte ("$10M in hundreds = 100 kg"), gráficos simples (barras de $9k abaixo da linha de $10k), palavra-chave grande ("STRUCTURING") e legenda palavra por palavra.
- **Final em série:** "PART 2 TOMORROW — Comment HIDE or SPEND. The majority writes Part 2."
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

### Próximo passo

1. Roteiro do episódio 1 da série "$10M in cash" (cerca de 80 a 90 s), em inglês, com fontes.
2. Modelo no Remotion com placeholders (composição `Episodio`, 1080×1920, 30 fps).
3. Lista de prompts das ilustrações para o Abr gerar.
