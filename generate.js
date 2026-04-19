const fs = require("fs");

const base = JSON.parse(fs.readFileSync("questions.json", "utf-8"));

function expand(baseQuestions, target = 100) {
  let result = [...baseQuestions];

  while (result.length < target) {
    const q = baseQuestions[Math.floor(Math.random() * baseQuestions.length)];

    result.push({
      q: q.q + " (extra " + result.length + ")",
      a: [...q.a],
      c: q.c
    });
  }

  return result;
}

for (let lang in base) {
  for (let level in base[lang]) {
    base[lang][level] = expand(base[lang][level], 100);
  }
}

fs.writeFileSync("questions-full.json", JSON.stringify(base, null, 2));

console.log("DONE ✅ questions-full.json created");
