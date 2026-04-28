# Romans 3:9-20 · TEAM Page

Static teaching surface for the Romans 3:9-20 afternoon TEAM session
(Teach · Equip · Apply · Mission). Projects to a fellowship-hall screen;
driven from the front by keyboard or presenter clicker.

## Viewing

Open `index.html` in a modern browser, or serve the directory:

    python3 -m http.server 5500

then open http://localhost:5500/.

No build step. Static HTML, CSS, and vanilla JavaScript.

## Driving the page

- ↓ / Space / PgDn — advance
- ↑ / PgUp — back
- 1 / 2 / 3 / 4 — jump to Teach / Equip / Apply / Mission
- Home / End — top / bottom
- r — reveal all Equip blanks
- f — fullscreen
- ? — keyboard help
- Esc — close overlay / exit fullscreen

## Architecture

| File | Role |
|------|------|
| `index.html` | Page markup with mount points per section. |
| `data.js` | The single content file — edit this for new passages. |
| `app.js` | Renderer + interactions. Passage-agnostic. |
| `styles.css` | Design system: type, palette, layout primitives. |
| `theme.css` | Per-section light/dark themes. |
| `tools/validate-team-data.js` | Schema validator (Node CLI). |

## For new passages

See `TEMPLATE.md`.

## Editorial rules

See `STYLE.md`.
