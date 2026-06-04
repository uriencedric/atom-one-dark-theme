#!/usr/bin/env node
/**
 * Generates `atom-one-dark-darker-color-theme.json` from the base theme by
 * overriding a small set of background/contrast colors. Keeps both variants
 * in sync — edit only the base theme and re-run this script.
 *
 * Usage:  node scripts/build-darker.js
 */
const fs = require("fs");
const path = require("path");

const BASE = path.join(__dirname, "..", "themes", "atom-one-dark-color-theme.json");
const OUT  = path.join(__dirname, "..", "themes", "atom-one-dark-darker-color-theme.json");

// Background palette mapping: base -> darker
const BG_MAP = {
  "#282c34": "#1b1f25", // editor / panel / terminal
  "#21252b": "#13161b", // chrome (activity bar, sidebar, status, tabs header)
  "#2c323c": "#20242c", // hover / line-highlight / input / dropdown
  "#282a36": "#1b1f25", // editor fold
};

// Per-key overrides applied AFTER the global bg map
const OVERRIDES = {
  "editor.inactiveSelectionBackground": "#4a525f80",
  "editorIndentGuide.background": "#2a2e36",
  "editorBracketMatch.background": "#4a525f80",
  "panel.background": "#13161b",
  "editorGroup.emptyBackground": "#1b1f25",
};

const base = JSON.parse(fs.readFileSync(BASE, "utf8"));
const out = JSON.parse(JSON.stringify(base));
out.name = "Atom One Dark (Material) Darker";

for (const [key, value] of Object.entries(out.colors)) {
  if (typeof value === "string" && BG_MAP[value.toLowerCase()]) {
    out.colors[key] = BG_MAP[value.toLowerCase()];
  }
}
Object.assign(out.colors, OVERRIDES);

fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${path.relative(process.cwd(), OUT)}`);
