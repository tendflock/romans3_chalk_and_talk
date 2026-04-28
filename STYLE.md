# TEAM Page · Style Guide

Inherits the editorial discipline of `tendflock/Romans3`.

## Voice

- Scholarly but accessible. Translate every Greek/Hebrew word the first
  time it appears in prose.
- Pastor's voice. Lead the room into a passage; don't perform expertise.
- Specific over generic. "Walvoord §C ¶3 says X" beats "some scholars
  argue X."

## Hard rules

- No emoji. Anywhere. Ever.
- BC / AD, not BCE / CE. Format: `c. AD 57`, `c. 150 BC`, `3rd c. AD`.
- Paraphrastic English only. All glosses are written fresh for this
  project. Do not paste in ESV, NIV, NRSV, NASB, KJV, or any modern
  copyrighted translation.
- Ancient text from public-domain critical editions only. Greek NT via
  Nestle-Aland / UBS. Greek OT via Rahlfs-Hanhart. Hebrew via the
  Masoretic / BHS family.
- No filler. If a paragraph doesn't move the argument forward, cut it.

## Visual rules

- Three faces only: Source Serif 4 (English), Gentium Plus (Greek),
  Frank Ruhl Libre (Hebrew). No fourth face.
- oklch palette, low chroma. No hard-coded hex except for true
  neutrals (`#fff`, `#222`, `#1a1a1a`).
- Motion argues or doesn't exist. No decorative entrance animation,
  no parallax, no scroll-driven reveals beyond the `.reveal` fade.
- Theme alternates Hero light → Teach light → Equip dark →
  Apply light → Mission dark → Send-out light.

## TEAM-specific rules

- No new handout. Equip mirrors the morning sermon handout.
- One pattern per content shape. Teach is editorial scroll-with-focus;
  Equip is one panoramic panel with revealable blanks; Apply / Mission
  are slide-by-slide. Don't homogenize.
- The room watches one screen. Type is large, contrast is high, motion
  focuses attention rather than competing for it.

## Adding a Teach block kind

If your passage needs a kind not yet implemented (`hebrew-terms`,
`covenant-pattern`, etc.):

1. Add the kind name to `KNOWN_TEACH_KINDS` in
   `tools/validate-team-data.js`.
2. Implement `teachRenderers["new-kind"](el, block)` in `app.js`.
3. Add the kind's styles to `styles.css`.
4. Re-run the validator and re-smoke-test.
