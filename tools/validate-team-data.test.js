// Run with: node tools/validate-team-data.test.js
// No external test runner — uses Node's built-in `assert`.

const assert = require("node:assert/strict");
const { validate } = require("./validate-team-data.js");

let failed = 0;
let passed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ok ${name}`);
    passed++;
  } catch (err) {
    console.log(`  FAIL ${name}`);
    console.log(`    ${err.message}`);
    failed++;
  }
}

function makeValidData() {
  return {
    meta: {
      passage: "Romans 3:9-20",
      burden: "B",
      takeHome: "T",
      sermon: { title: "S", date: "2026-04-26" }
    },
    teach: [
      { kind: "catena", title: "T", sources: [{ id: "ps14", label: "Ps 14", hue: 25 }],
        phrases: [{ id: "p1", text: "x", sourceId: "ps14" }] }
    ],
    equip: {
      bigIdea: { template: "{a}", blanks: [{ key: "a", answer: "x" }] },
      movements: [
        { roman: "I", nameTemplate: "The {a}", nameBlank: { answer: "Charge" },
          ref: "v.1", summary: "s",
          christ: { template: "{a}", blanks: [{ key: "a", answer: "x" }] } }
      ],
      thisWeek: { template: "{a}", blanks: [{ key: "a", answer: "x" }] }
    },
    apply: [{ question: "q", tags: [] }],
    mission: [{ question: "q", tags: ["evangelism"] }],
    sendOut: { takeHome: "t" }
  };
}

console.log("validate-team-data");

test("accepts valid data", () => {
  const result = validate(makeValidData());
  assert.equal(result.ok, true, JSON.stringify(result.errors));
});

test("rejects missing meta", () => {
  const data = makeValidData();
  delete data.meta;
  const result = validate(data);
  assert.equal(result.ok, false);
  assert.match(result.errors[0], /meta/);
});

test("rejects empty teach array", () => {
  const data = makeValidData();
  data.teach = [];
  const result = validate(data);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /teach/);
});

test("rejects unknown teach kind", () => {
  const data = makeValidData();
  data.teach[0].kind = "imaginary";
  const result = validate(data);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /kind/);
});

test("rejects empty apply array", () => {
  const data = makeValidData();
  data.apply = [];
  const result = validate(data);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /apply/);
});

test("rejects mission question without tags", () => {
  const data = makeValidData();
  data.mission[0].tags = [];
  const result = validate(data);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /mission.*tag/);
});

test("rejects equip movement without blanks", () => {
  const data = makeValidData();
  data.equip.movements[0].christ.blanks = [];
  const result = validate(data);
  assert.equal(result.ok, false);
});

test("rejects template with blank key not declared", () => {
  const data = makeValidData();
  data.equip.bigIdea.template = "{a} {b}";
  const result = validate(data);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /b/);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
