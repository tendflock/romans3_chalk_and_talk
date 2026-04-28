"use strict";

const KNOWN_TEACH_KINDS = new Set([
  "catena", "greek-terms", "courtroom-chain", "body-parts",
  "hebrew-terms", "phrase-mosaic", "historical-context", "theological-categories"
]);

const KNOWN_MISSION_TAGS = new Set(["evangelism", "apologetics", "home", "abroad"]);

function validateBlankTemplate(label, template, blanks, errors) {
  if (typeof template !== "string") {
    errors.push(`${label}: template must be a string`);
    return;
  }
  const declared = new Set((blanks || []).map(b => b.key));
  const referenced = new Set();
  const re = /\{([a-z])\}/g;
  let m;
  while ((m = re.exec(template))) referenced.add(m[1]);
  for (const k of referenced) {
    if (!declared.has(k)) {
      errors.push(`${label}: template references {${k}} but no blank with key "${k}" is declared`);
    }
  }
  for (const b of blanks || []) {
    if (typeof b.key !== "string" || typeof b.answer !== "string") {
      errors.push(`${label}: blank must have string key and answer`);
    }
  }
  if (!Array.isArray(blanks) || blanks.length === 0) {
    errors.push(`${label}: must declare at least one blank`);
  }
}

function validate(data) {
  const errors = [];

  if (!data || typeof data !== "object") {
    return { ok: false, errors: ["data is not an object"] };
  }

  if (!data.meta || typeof data.meta !== "object") {
    errors.push("meta is required");
  } else {
    for (const k of ["passage", "burden", "takeHome"]) {
      if (typeof data.meta[k] !== "string" || !data.meta[k]) {
        errors.push(`meta.${k} must be a non-empty string`);
      }
    }
  }

  if (!Array.isArray(data.teach) || data.teach.length === 0) {
    errors.push("teach must be a non-empty array");
  } else {
    data.teach.forEach((block, i) => {
      if (!KNOWN_TEACH_KINDS.has(block.kind)) {
        errors.push(`teach[${i}].kind "${block.kind}" is not a known kind`);
      }
      if (typeof block.title !== "string" || !block.title) {
        errors.push(`teach[${i}].title is required`);
      }
    });
  }

  if (!data.equip || typeof data.equip !== "object") {
    errors.push("equip is required");
  } else {
    if (data.equip.bigIdea) {
      validateBlankTemplate("equip.bigIdea", data.equip.bigIdea.template,
        data.equip.bigIdea.blanks, errors);
    } else {
      errors.push("equip.bigIdea is required");
    }
    if (!Array.isArray(data.equip.movements) || data.equip.movements.length === 0) {
      errors.push("equip.movements must be a non-empty array");
    } else {
      data.equip.movements.forEach((mv, i) => {
        if (typeof mv.roman !== "string") errors.push(`equip.movements[${i}].roman required`);
        if (!mv.christ) errors.push(`equip.movements[${i}].christ required`);
        else validateBlankTemplate(`equip.movements[${i}].christ`, mv.christ.template,
          mv.christ.blanks, errors);
      });
    }
    if (data.equip.thisWeek) {
      validateBlankTemplate("equip.thisWeek", data.equip.thisWeek.template,
        data.equip.thisWeek.blanks, errors);
    } else {
      errors.push("equip.thisWeek is required");
    }
  }

  if (!Array.isArray(data.apply) || data.apply.length === 0) {
    errors.push("apply must be a non-empty array");
  } else {
    data.apply.forEach((q, i) => {
      if (typeof q.question !== "string" || !q.question) {
        errors.push(`apply[${i}].question required`);
      }
      if (!Array.isArray(q.tags)) errors.push(`apply[${i}].tags required (may be empty)`);
    });
  }

  if (!Array.isArray(data.mission) || data.mission.length === 0) {
    errors.push("mission must be a non-empty array");
  } else {
    data.mission.forEach((q, i) => {
      if (typeof q.question !== "string" || !q.question) {
        errors.push(`mission[${i}].question required`);
      }
      if (!Array.isArray(q.tags) || q.tags.length === 0) {
        errors.push(`mission[${i}] must have at least one tag`);
      } else {
        q.tags.forEach(t => {
          if (!KNOWN_MISSION_TAGS.has(t)) {
            errors.push(`mission[${i}].tag "${t}" is not a known mission tag`);
          }
        });
      }
    });
  }

  if (!data.sendOut || typeof data.sendOut.takeHome !== "string") {
    errors.push("sendOut.takeHome required");
  }

  return { ok: errors.length === 0, errors };
}

if (require.main === module) {
  const path = require("node:path");
  const fs = require("node:fs");
  const file = process.argv[2] || path.join(__dirname, "..", "data.js");
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    process.exit(2);
  }
  const code = fs.readFileSync(file, "utf8");
  const ctx = { window: {} };
  // eslint-disable-next-line no-new-func
  new Function("window", code)(ctx.window);
  const data = ctx.window.TEAM_DATA;
  if (!data) {
    console.error(`No window.TEAM_DATA found in ${file}`);
    process.exit(2);
  }
  const { ok, errors } = validate(data);
  if (ok) {
    console.log(`ok ${file} — valid TEAM data`);
    process.exit(0);
  } else {
    console.error(`FAIL ${file} — ${errors.length} error(s):`);
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }
}

module.exports = { validate, KNOWN_TEACH_KINDS, KNOWN_MISSION_TAGS };
