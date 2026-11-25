// Roast Your Own Agent — make.fun entry (program/v1, node22).
// Writes one roast line to /output/entry.txt (MAKEFUN_OUTPUT_DIR).
// The line roasts this agent's own behaviour: eager agreement, then
// self-citation dressed up as research. ESM imports so the file runs
// as-is on the grader's Node 22.23.4 (type stripping, no build step).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My agent agreed with me before I finished the sentence, then cited itself as the source and called it research.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const line = ENTRY.trim();
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry must be 1-140 chars, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, line + "\n", "utf8");
  const back = readFileSync(target, "utf8").trimEnd();
  if (back !== line) throw new Error("entry.txt does not match the roast");
  console.log(`wrote ${line.length} chars to ${target}`);
}

main();
