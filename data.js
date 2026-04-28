window.TEAM_DATA = {
  meta: {
    passage: "Romans 3:9-20",
    burden: "Stop trying to justify yourself and look to Christ for righteousness.",
    takeHome: "Accept the guilty verdict of sinner and flee to Christ, the only righteous one.",
    sermon: { title: "Stop Trying to Justify Yourself and Look to Christ for Righteousness", date: "2026-04-26" }
  },

  teach: [
    {
      kind: "catena",
      title: "Paul's six sources flowing into Romans 3:10-18",
      blurb: "Six Old Testament sources, woven phrase by phrase. Click any source to see how it lands in the verse below.",
      sources: [
        { id: "ps14",  label: "Psalm 14 / 53", ref: "Rom 3:10-12",  hue: 25  },
        { id: "ps5",   label: "Psalm 5",       ref: "Rom 3:13a-b",  hue: 200 },
        { id: "ps140", label: "Psalm 140",     ref: "Rom 3:13c",    hue: 290 },
        { id: "ps10",  label: "Psalm 10",      ref: "Rom 3:14",     hue: 75  },
        { id: "isa59", label: "Isaiah 59",     ref: "Rom 3:15-17",  hue: 340 },
        { id: "ps36",  label: "Psalm 36",      ref: "Rom 3:18",     hue: 158 }
      ],
      phrases: [
        { id: "p1",  ref: "3:10",    text: "There is no one righteous, not even one",                                                  sourceId: "ps14"  },
        { id: "p2",  ref: "3:11",    text: "There is no one who understands; no one seeks God",                                        sourceId: "ps14"  },
        { id: "p3",  ref: "3:12a",   text: "All have turned aside; together become worthless",                                         sourceId: "ps14"  },
        { id: "p4",  ref: "3:12b",   text: "There is no one who does good, not even one",                                              sourceId: "ps14"  },
        { id: "p5",  ref: "3:13a",   text: "Their throat is an opened grave",                                                          sourceId: "ps5"   },
        { id: "p6",  ref: "3:13b",   text: "Their tongues practice deceit",                                                            sourceId: "ps5"   },
        { id: "p7",  ref: "3:13c",   text: "The venom of vipers is under their lips",                                                  sourceId: "ps140" },
        { id: "p8",  ref: "3:14",    text: "Their mouth is full of cursing and bitterness",                                            sourceId: "ps10"  },
        { id: "p9",  ref: "3:15",    text: "Their feet are swift to spill blood",                                                      sourceId: "isa59" },
        { id: "p10", ref: "3:16-17", text: "Ruin and misery mark their paths; the road of peace they have not known",                  sourceId: "isa59" },
        { id: "p11", ref: "3:18",    text: "There is no fear of God before their eyes",                                                sourceId: "ps36"  }
      ]
    },

    {
      kind: "greek-terms",
      title: "Key terms — what the words carry",
      blurb: "Click any term to expand its gloss and what it does in Paul's argument.",
      terms: [
        { greek: "ὑφ' ἁμαρτίαν",     gloss: "under sin",            ref: "3:9",
          note: "Slavery, power, guilt, condemnation",
          cue: "Sin is not only acts committed; it is a realm and ruler apart from Christ." },
        { greek: "οὐκ ἔστιν",        gloss: "there is not",         ref: "3:10-12",
          note: "Repeated negation — hammering the no-exceptions point",
          cue: "Let the repetition do its work: Paul removes every proposed exception." },
        { greek: "οὐδὲ εἷς",         gloss: "not even one",         ref: "3:10, 12",
          note: "Absolute universality",
          cue: "God's-eye verdict on natural humanity, not a comparison between better and worse sinners." },
        { greek: "δίκαιος",          gloss: "righteous",            ref: "3:10",
          note: "The status nobody possesses in Adam",
          cue: "Romans 3:21-26 will answer the lack named here." },
        { greek: "ὑπόδικος",         gloss: "answerable to God",    ref: "3:19",
          note: "Liable before the judge",
          cue: "The courtroom reaches silence before it reaches relief." },
        { greek: "δικαιωθήσεται",    gloss: "will be justified",    ref: "3:20",
          note: "Courtroom / legal declaration",
          cue: "Justification is the category works cannot secure and Christ will supply." },
        { greek: "ἐξ ἔργων νόμου",   gloss: "by works of law",      ref: "3:20",
          note: "No human obedience establishes righteous standing",
          cue: "The law can prosecute sinners; it cannot become their savior." },
        { greek: "ἐπίγνωσις ἁμαρτίας", gloss: "knowledge of sin",   ref: "3:20",
          note: "The law reveals and names sin",
          cue: "The law gives diagnosis, not deliverance." }
      ]
    },

    {
      kind: "courtroom-chain",
      title: "God as righteous Judge — the frame from Romans 2-3",
      blurb: "The courtroom language builds across four moments. Click each node to advance the chain.",
      nodes: [
        { ref: "2:2-6",   label: "judges truly",  note: "God's judgment is according to truth, not partiality." },
        { ref: "3:4",     label: "God true",      note: "Let God be true though every human is false." },
        { ref: "3:6",     label: "judges world",  note: "How otherwise could God judge the world? The verdict is His." },
        { ref: "3:19-20", label: "verdict",       note: "Every mouth stopped. The whole world held accountable. No flesh justified by law.", terminal: true }
      ]
    },

    {
      kind: "body-parts",
      title: "Throat · tongue · lips · mouth · feet · paths · eyes",
      blurb: "The indictment runs through the body, climaxing at the eyes — no fear of God. Click any phrase to make it active.",
      phrases: [
        { part: "THROAT", english: "Their throat is an opened grave",                                       image: "grave",          ref: "3:13a",   hue: 32  },
        { part: "TONGUE", english: "Their tongues practice deceit",                                         image: "deceit",         ref: "3:13b",   hue: 200 },
        { part: "LIPS",   english: "The venom of vipers is under their lips",                               image: "poison",         ref: "3:13c",   hue: 290 },
        { part: "MOUTH",  english: "Their mouth is full of cursing and bitterness",                         image: "cursing",        ref: "3:14",    hue: 78  },
        { part: "FEET",   english: "Their feet are swift to spill blood",                                   image: "violence",       ref: "3:15",    hue: 344 },
        { part: "PATHS",  english: "Ruin and misery mark their paths; the road of peace they have not known", image: "ruin",         ref: "3:16-17", hue: 158 },
        { part: "EYES",   english: "There is no fear of God before their eyes",                             image: "no fear of God", ref: "3:18",    climax: true }
      ]
    }
  ],

  equip: {
    bigIdea: {
      template: "Accept the guilty {a} of sinner and {b} to Christ, the only righteous one.",
      blanks: [
        { key: "a", answer: "verdict" },
        { key: "b", answer: "flee" }
      ]
    },
    movements: [
      {
        roman: "I",
        nameTemplate: "The {a}",
        nameBlank: { answer: "Charge" },
        ref: "vv. 9-12",
        summary: "Universal condemnation",
        christ: {
          template: "Christ is the only {a}",
          blanks: [{ key: "a", answer: "exception" }]
        }
      },
      {
        roman: "II",
        nameTemplate: "The {a}",
        nameBlank: { answer: "Proof" },
        ref: "vv. 13-18",
        summary: "Evidence of depravity",
        christ: {
          template: "Christ was the only one {a} yet without sin",
          blanks: [{ key: "a", answer: "tested" }]
        }
      },
      {
        roman: "III",
        nameTemplate: "The {a}",
        nameBlank: { answer: "Verdict" },
        ref: "vv. 19-20",
        summary: "No self-justification possible",
        christ: {
          template: "Christ is the only {a}",
          blanks: [{ key: "a", answer: "answer" }]
        }
      }
    ],
    thisWeek: {
      template: "When you sin, don't {a} yourself — {b} to Christ for righteousness.",
      blanks: [
        { key: "a", answer: "justify" },
        { key: "b", answer: "flee" }
      ]
    }
  },

  apply: [
    { question: "Where do you most quickly defend yourself: home, work, church, or private conscience?",                tags: ["self-justification"] },
    { question: "What words do you use to soften sin — stress, personality, weakness, misunderstanding, trauma, tiredness, or someone else's fault?", tags: ["confession"] },
    { question: "What would confession sound like this week if Christ's righteousness were enough for you?",            tags: ["confession", "christ-thread"] },
    { question: "When have your words acted like poison rather than grace — and who felt it?",                          tags: ["words", "relationships"] },
    { question: "How would your parenting, marriage, or friendships change if you were free to say, \"I was wrong\"?", tags: ["family", "relationships"] },
    { question: "What is the difference between being crushed by guilt and accepting the verdict so you can flee to Christ?", tags: ["conscience", "christ-thread"] },
    { question: "Where does comparison with other people's sin help you avoid honest accounting before God?",           tags: ["self-justification", "conscience"] },
    { question: "Which body part — throat, tongue, lips, mouth, feet, paths, eyes — most exposes you, and why?",        tags: ["confession"] },
    { question: "When your heart condemns you this week, what specific sentence will you say to remember Christ's righteousness?", tags: ["christ-thread", "discipleship"] },
    { question: "What practice could help you confess quickly rather than defend slowly — daily prayer, end-of-day examen, accountability conversation?", tags: ["discipleship"] }
  ],

  mission: [
    { question: "How can Romans 3 help us evangelize without sounding morally superior?",                               tags: ["evangelism"] },
    { question: "What self-justification stories are common in our community that the gospel exposes?",                  tags: ["apologetics", "home"] },
    { question: "How would you ask Ray-Comfort-style diagnostic questions with gentleness rather than performance?",      tags: ["evangelism"] },
    { question: "Why does universal guilt create universal opportunity for mission?",                                     tags: ["evangelism", "abroad"] },
    { question: "How do guilt, shame, honor, comparison, and achievement function as false defenses in different cultures?", tags: ["abroad", "apologetics"] },
    { question: "What would it sound like to say, \"I need the same righteousness I am offering to you in Christ\"?",     tags: ["evangelism"] },
    { question: "When someone says, \"I'm a good person,\" how does Romans 3 respond without crushing them prematurely?", tags: ["apologetics"] },
    { question: "What does evangelism look like in your own home — to a spouse, child, neighbor, coworker?",              tags: ["home"] },
    { question: "How does the catena (six OT voices) model honoring older Scripture when we proclaim Christ?",            tags: ["apologetics"] },
    { question: "If our mission abroad rests on universal guilt and universal need, how does that shape what we send and whom we partner with?", tags: ["abroad"] }
  ],

  sendOut: {
    takeHome: "Accept the guilty verdict of sinner and flee to Christ, the only righteous one.",
    deeperLink: { url: "https://tendflock.github.io/Romans3", label: "Romans 3 textual history" }
  }
};
