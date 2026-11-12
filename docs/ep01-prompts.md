# Episódio 1 — prompts das ilustrações

Gere no Gemini ou no ChatGPT, salve em `public/cenas/` com o nome indicado (PNG, 1080×1920 ou maior em 9:16). O Remotion detecta o arquivo sozinho e troca o placeholder pela imagem.

**Dicas**

- Gere primeiro a **s00 (folha do personagem)**. Depois, em cada cena, anexe essa imagem como referência e diga "same character as the reference image".
- As imagens **não podem ter texto** (o texto é todo do Remotion). Se vier com letras, peça de novo: "remove all text".
- O painel cobre o topo (até ~15% da altura) e a legenda fica perto de 75%. Deixe o personagem e a ação no **meio e na metade de baixo**.
- O Remotion dá zoom de até 1,35×: imagem com um pouco de "respiro" nas bordas funciona melhor.

## Bloco fixo (já incluso em cada prompt abaixo)

**Personagem — Mint:** a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick expressive black eyebrows, and a small simple mouth; wears an oversized mustard-yellow hoodie, dark grey jeans and chunky white sneakers; no hair, no ears, no nose.

**Estilo:** detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, slightly desaturated warm palette with mint green and mustard accents, cinematic lighting, vertical 9:16 composition, no text, no letters, no numbers, no logos, no watermark.

---

### s00 — folha do personagem (referência)
`public/cenas/mint-referencia.png` (não entra no vídeo)

```
Character reference sheet of Mint: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick expressive black eyebrows, and a small simple mouth; wears an oversized mustard-yellow hoodie, dark grey jeans and chunky white sneakers; no hair, no ears, no nose. Show front view, three-quarter view, side view and back view on a plain light grey background, plus four facial expressions: smug, shocked, nervous, sweating. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients. No text, no letters, no labels.
```

### s01 — o armário de dinheiro
`public/cenas/ep01-s01.png`

```
Mint opens a bedroom closet door and freezes in shock: the closet is packed floor to ceiling with neat bricks of hundred-dollar bills wrapped in paper bands, a few bricks tumbling out onto the carpet. Night, a single warm lamp, the cash glowing slightly green. Mint seen from behind at three-quarter angle, face turned toward the camera with wide eyes. Character: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick expressive black eyebrows, and a small simple mouth; oversized mustard-yellow hoodie, dark grey jeans, chunky white sneakers; no hair, no ears, no nose. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, slightly desaturated warm palette with mint green and mustard accents, cinematic lighting, vertical 9:16 composition, no text, no letters, no numbers, no logos, no watermark.
```

### s02 — 100 kg de papel
`public/cenas/ep01-s02.png`

```
Mint straining with all strength to lift a huge overstuffed black duffel bag full of cash bricks, knees bent, sweat drops flying, a bathroom scale next to the bag with its needle spun all the way around. Cramped apartment hallway, scattered cash bricks on the floor. Character: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick expressive black eyebrows, and a small simple mouth; oversized mustard-yellow hoodie, dark grey jeans, chunky white sneakers; no hair, no ears, no nose. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, slightly desaturated warm palette with mint green and mustard accents, cinematic lighting, vertical 9:16 composition, no text, no letters, no numbers, no logos, no watermark.
```

### s03 — no caixa do banco
`public/cenas/ep01-s03.png`

```
Inside a classic bank lobby with marble floor and brass details. Mint stands at the teller counter dumping a duffel bag of cash bricks onto it, smiling nervously. Behind the glass, a calm teller types on a computer while a printer behind her slowly prints a blank official form. Security camera in the corner pointing at Mint. Character: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick expressive black eyebrows, and a small simple mouth; oversized mustard-yellow hoodie, dark grey jeans, chunky white sneakers; no hair, no ears, no nose. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, slightly desaturated warm palette with mint green and mustard accents, cinematic lighting, vertical 9:16 composition, no text, no letters, no numbers, no logos, no watermark.
```

### s04 — o "plano esperto"
`public/cenas/ep01-s04.png`

```
Mint sits at a small kitchen table at night counting a thin stack of hundred-dollar bills with a smug, self-satisfied grin, one eyebrow raised. Many small identical envelopes lined up neatly on the table, a calculator, a mug of coffee, the overflowing closet of cash visible through a doorway in the background. Character: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick expressive black eyebrows, and a small simple mouth; oversized mustard-yellow hoodie, dark grey jeans, chunky white sneakers; no hair, no ears, no nose. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, slightly desaturated warm palette with mint green and mustard accents, cinematic lighting, vertical 9:16 composition, no text, no letters, no numbers, no logos, no watermark.
```

### s05 — três anos de fila
`public/cenas/ep01-s05.png`

```
Mint looks exhausted, dark circles under the eyes, slumped in a long bank queue holding a small envelope, the same envelope in a growing pile in a tote bag. On the wall behind, a huge calendar where almost every day is crossed out with red marks, pages from previous years piled on the floor. Fluorescent bank lighting, other customers as simple grey silhouettes. Character: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick expressive black eyebrows, and a small simple mouth; oversized mustard-yellow hoodie, dark grey jeans, chunky white sneakers; no hair, no ears, no nose. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, slightly desaturated warm palette with mint green and mustard accents, cinematic lighting, vertical 9:16 composition, no text, no letters, no numbers, no logos, no watermark.
```

### s06 — o banco vê o padrão
`public/cenas/ep01-s06.png`

```
A dim bank back office. A compliance analyst in a cardigan leans toward a wall of computer monitors that show rows and rows of identical green bars and a map with three bank branch pins connected by glowing lines to one small photo of Mint. Coffee cups, sticky notes without writing, a filing cabinet. Mint does not appear in person, only in the small photo on screen. Character in the photo: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick black eyebrows; mustard-yellow hoodie. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, cool blue monitor light with mint green and mustard accents, cinematic lighting, vertical 9:16 composition, no text, no letters, no numbers, no logos, no watermark.
```

### s07 — alerta vermelho
`public/cenas/ep01-s07.png`

```
Extreme close-up of a computer screen flashing a red alert glow, and in front of it a case folder lying open on a desk with Mint's photo paper-clipped to it, a red pushpin and red string leading off frame like an investigation board. Dramatic red and dark teal lighting, tense mood. Character in the photo: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick black eyebrows, nervous smile; mustard-yellow hoodie. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, vertical 9:16 composition, no text, no letters, no numbers, no logos, no watermark.
```

### s08 — tribunal federal
`public/cenas/ep01-s08.png`

```
A grand federal courtroom seen from a low angle: a stern judge's hand bringing a wooden gavel down, frozen mid-air, in the foreground. Far below, Mint sits small and nervous at the defense table, sweating, tie loosely worn over the mustard hoodie. Tall wooden panels, an empty jury box, dramatic light from high windows. Character: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick expressive black eyebrows, and a small simple mouth; oversized mustard-yellow hoodie, dark grey jeans, chunky white sneakers; no hair, no ears, no nose. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, slightly desaturated warm palette with mint green and mustard accents, cinematic lighting, vertical 9:16 composition, no text, no letters, no numbers, no logos, no watermark.
```

### s09 — o relatório secreto
`public/cenas/ep01-s09.png`

```
Cutaway view of a bank split by a wall. Left side: Mint at the teller window, smiling and waving cheerfully, handing over a small envelope. Right side, behind the wall and unseen by Mint: a quiet office where a clerk drops another page into a very thick, overflowing folder on a desk, a shredder and locked cabinets around. Warm light on the left, cold dim light on the right. Character: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick expressive black eyebrows, and a small simple mouth; oversized mustard-yellow hoodie, dark grey jeans, chunky white sneakers; no hair, no ears, no nose. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, cinematic lighting, vertical 9:16 composition, no text, no letters, no numbers, no logos, no watermark.
```

### s10 — nem os poderosos escapam (simbólica, sem pessoa real)
`public/cenas/ep01-s10.png`

```
Symbolic scene with no real person: an empty, grand marble government hallway with tall columns and a domed ceiling, late afternoon sun streaming in, and the long shadow of prison cell bars falling across the polished floor. A single leather briefcase left open on the floor with a few banded bills spilling out. Solemn, quiet mood. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, slightly desaturated warm palette, cinematic lighting, vertical 9:16 composition, no people, no text, no letters, no numbers, no flags, no logos, no watermark.
```

### s11 — apreendido
`public/cenas/ep01-s11.png`

```
Outside a bank at dusk, federal agents in plain dark windbreakers (no lettering) carry sealed cardboard evidence boxes and cash bags to an unmarked dark van. On the sidewalk, Mint watches in horror, hands on the head, mouth wide open. Flashing blue and red light reflections on wet pavement. Character: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick expressive black eyebrows, and a small simple mouth; oversized mustard-yellow hoodie, dark grey jeans, chunky white sneakers; no hair, no ears, no nose. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, cinematic lighting, vertical 9:16 composition, no text, no letters, no numbers, no badges, no logos, no watermark.
```

### s12 — esconder ou gastar?
`public/cenas/ep01-s12.png`

```
Back in the bedroom at night, the closet packed with cash bricks open behind Mint. Mint stands in the middle, torn, looking left and right: in the left hand a dirt-covered garden shovel, in the right hand a shiny sports car key with a glowing fob. Thought-bubble shapes above each side, left showing a hole in a backyard, right showing a sleek sports car, both drawn without any text. Character: a slim cartoon character whose head is a smooth rounded-rectangle shape, like a soft brick, colored mint green (#7FD8B0), with two small black oval eyes, thick expressive black eyebrows, and a small simple mouth; oversized mustard-yellow hoodie, dark grey jeans, chunky white sneakers; no hair, no ears, no nose. Detailed comic-book illustration, bold clean ink outlines, cel shading with soft gradients, rich detailed background, slightly desaturated warm palette with mint green and mustard accents, cinematic lighting, vertical 9:16 composition, no text, no letters, no numbers, no logos, no watermark.
```
