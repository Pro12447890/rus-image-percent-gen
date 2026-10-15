# Pixel art: instructions for the AI (the `pixel_art` tool)

This file is the only instruction needed to draw a sprite. The tool is called as
`pixel_art` with an `action` field. Below: the workflow, the rules and ready recipes.

## 1. Workflow

1. **Pick a resolution.** `action: "new"` with `width` and `height` — any integer
   from 4 to 256. The canvas starts empty and fully transparent (or fill it with
   `background`). Choose the smallest resolution that carries the idea: 16×16 for
   an icon, 32×32 for a small sprite, 64×64 for a character, 128×128 and up for
   a scene.
2. **Paint.** Three ways, freely mixed:
   - `pixels` — one pixel at a time: `{x, y, color, alpha?}`. Coordinates are
     0-based, `(0,0)` is the top-left corner. Colours accept `#rgb`, `#rrggbb`,
     `#rrggbbaa`, `"r,g,b[,a]"`, a name (`red`, `teal`, `skin`) or `[r,g,b,a]`.
     `alpha` runs 0…255, where 0 is fully transparent.
   - `draw` — an ASCII grid plus a palette. The most compact way to lay down a
     whole sprite:
     ```json
     {"action":"draw","palette":{".":null,"K":"#1a1a1a","S":"#ffcd94","E":"#101820"},
      "rows":["..KKKK..",".KSSSSK.","KSESESK.","KSSSSSSK","..KKKK.."]}
     ```
     A palette key is exactly one character; a character missing from the palette
     **erases nothing** (handy for drawing over something); a `null` value paints
     nothing either. Every row must have the same length (pad with `.`).
   - `fill` — a rectangle: `{x, y, w, h, color, alpha?}`. Without `w`/`h` it runs
     to the canvas edge. Good for backgrounds and large patches.
3. **Look at yourself.** `action: "preview"` returns the canvas as a PNG at ×5
   zoom (×3 when a side is ≥ 128, so the picture stays reasonable). Judge it like
   an artist: does the silhouette read? is the palette muddy? any stray single
   pixels? is the symmetry there where it should be? Then fix and look again, as
   many times as the result needs.
4. **Think without seeing.** `action: "dump"` returns a character grid plus a
   palette legend. That is the cheap way to check coordinates, count pixels or
   verify symmetry without an image.
5. **Finish.** `action: "save"` writes a 1:1 PNG (by default into
   `<working directory>/pixel-art/<name>-<W>x<H>.png`). Add `scale` to also write
   an upscaled copy — that one is convenient to show a human. The saved file is
   the deliverable: hand it to the user as the result.

## 2. Rules that matter

- **Resolution never changes.** A canvas is created once; `new` clears it. Need a
  different size — create another canvas (optionally named via `canvas`).
- **No smoothing, ever.** Zoom is an integer factor: each art pixel becomes a
  crisp square. That is exactly right for pixel art.
- **Alpha is not a soft brush.** Semi-transparency is rarely useful here: draw
  shadows and smoke with an ordered pattern (dithering), not with a blur.
- **Coordinates outside the canvas are skipped silently.** The answer tells you
  how many pixels did not fit — read it as "the shape is off the edge".
- Attachment limits may lower the preview zoom. When that happens the answer says
  so — read it instead of wondering why the picture is small.

## 3. Art recipes

- **Silhouette before detail.** Fill the shape in one dark colour first and look
  at the preview: if the silhouette does not read, detail will not save it.
- **A palette of 4–8 colours.** Give each colour a job: shadow, base, highlight.
  Fewer colours make a cleaner picture. A classic trio: `#1a1a2e` (shadow),
  `#e94560` (base), `#f9d56e` (light).
- **One light source.** Decide where the light comes from (usually upper left)
  and keep it consistent across the whole picture.
- **Readability beats anatomy.** At small sizes, detail is replaced by contrast:
  a dark outline, a light patch in the middle, two colours for volume.
- **Outline.** A dark outline along the silhouette separates the object from the
  background; at 16×16 it often matters more than the shape itself.
- **Symmetry.** Draw half in `rows` and mirror it — faster and cleaner than
  painting pixel by pixel.
- **Grid and module.** On 32×32 keep a 4-pixel step, on 16×16 a 2-pixel step: the
  shape then looks assembled rather than accidental.

## 4. A full pass, end to end

```json
{"action":"help"}                                   // read this
{"action":"new","width":16,"height":16}             // canvas
{"action":"fill","w":16,"h":16,"color":"#101820"}   // background
{"action":"draw","palette":{".":null,"Y":"#f9d56e","O":"#e94560","K":"#1a1a2e"},
 "rows":["......YY......",".....YOOY.....","....YOOOOY....","...YOOOOOOY...",
         "...YOOOOOOY...","....YOOOOY....",".....YOOY.....","......YY......"]}
{"action":"preview"}                                // look at it
{"action":"pixels","pixels":[{"x":7,"y":14,"color":"#101820"},{"x":8,"y":14,"color":"#101820"}]}
{"action":"preview"}                                // check the fix
{"action":"save","scale":5}                         // finish: a 1:1 file and a ×5 file
```

## 5. Common mistakes

| Symptom | Cause |
|---|---|
| The preview is empty | the canvas exists but nothing was painted (all pixels transparent) |
| Rows "drift apart" | the `rows` strings differ in length; pad them with a palette character or `.` |
| The colour is wrong | `#abc` is a 12-bit colour; use `#rrggbb` when you need it exact |
| An edit "is not visible" | the vertex is outside the canvas — check coordinates with `dump` |
| The preview looks small | a side is ≥ 128 (zoom ×3), or an attachment limit applied |
