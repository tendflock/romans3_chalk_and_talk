# Adapting this repo for a new TEAM passage

Each weekly TEAM session gets its own GitHub Pages deploy. To prepare
for next Sunday's passage:

## 1. Duplicate

Easiest: clone this repo into a new GitHub repository and rename. Or:

    gh repo create tendflock/<new-passage>-team --public --clone
    cd <new-passage>-team
    cp -r ../romans-3-9-20-team/{index.html,app.js,styles.css,theme.css,tools,STYLE.md,LICENSE,data.example.js} .
    cp ../romans-3-9-20-team/data.example.js data.js

## 2. Edit `data.js`

This is the only file you need to touch:

- `meta` — passage label, burden, take-home truth, sermon title and date.
- `teach` — array of Teach blocks. Use any of the supported `kind`s
  (catena, greek-terms, hebrew-terms, courtroom-chain, body-parts,
  phrase-mosaic, historical-context, theological-categories). Drop kinds
  not relevant to this passage.
- `equip.bigIdea`, `equip.movements`, `equip.thisWeek` — mirror the
  morning sermon handout's blanks.
- `apply` — 8-12 socratic questions; each with `question` (string) and
  `tags` (array, may be empty).
- `mission` — 8-12 questions, each with at least one tag from the four
  allowed: `evangelism`, `apologetics`, `home`, `abroad`.
- `sendOut.takeHome` — final take-home statement.
- `sendOut.deeperLink` — optional outbound link.

## 3. Validate

    node tools/validate-team-data.js data.js

Expected: `ok data.js — valid TEAM data`. Fix any reported errors.

## 4. Smoke-test the page

    python3 -m http.server 5500

Open http://localhost:5500/ at 1080p (your projection target). Drive the
page by keyboard: Home, 1, 2, 3, 4, End, r, f, ?. Verify every
interaction works for this passage's content.

## 5. Add a new Teach kind (only if needed)

If your passage needs a kind that doesn't exist yet:

1. Add the kind name to `KNOWN_TEACH_KINDS` in
   `tools/validate-team-data.js`.
2. Implement `teachRenderers["new-kind"](el, block)` in `app.js`.
3. Add the kind's styles to `styles.css`.
4. Re-run validator and re-smoke-test.

## 6. Deploy

    git add -A
    git commit -m "feat(content): <passage> TEAM data + first build"
    git push

Enable GitHub Pages from the repo's settings (Pages → main / root).

The page will be at `https://tendflock.github.io/<new-passage>-team/`.
