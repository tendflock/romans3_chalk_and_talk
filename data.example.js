// Skeleton showing required shape. Copy to data.js and fill in.

window.TEAM_DATA = {
  meta: {
    passage: "Book Chapter:Verse-Verse",
    burden: "One-line homiletical point.",
    takeHome: "One-line take-home truth.",
    sermon: { title: "Sermon Title", date: "YYYY-MM-DD" }
  },

  teach: [
    // Drop / add blocks as the passage warrants.
    // { kind: "catena",         title: "...", sources: [...], phrases: [...] },
    // { kind: "greek-terms",    title: "...", terms: [...] },
    // { kind: "courtroom-chain",title: "...", nodes: [...] },
    // { kind: "body-parts",     title: "...", phrases: [...] },
  ],

  equip: {
    bigIdea: { template: "{a}", blanks: [{ key: "a", answer: "..." }] },
    movements: [
      // { roman: "I", nameTemplate: "The {a}", nameBlank: { answer: "..." },
      //   ref: "v.1", summary: "...",
      //   christ: { template: "{a}", blanks: [{ key: "a", answer: "..." }] } }
    ],
    thisWeek: { template: "{a}", blanks: [{ key: "a", answer: "..." }] }
  },

  apply: [
    // { question: "...", tags: [] }
  ],

  mission: [
    // { question: "...", tags: ["evangelism"] }
  ],

  sendOut: {
    takeHome: "Take-home truth.",
    deeperLink: { url: "https://...", label: "Optional deeper resource" }
  }
};
