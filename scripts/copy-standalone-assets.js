#!/usr/bin/env node
// `output: "standalone"` (next.config.mjs) produces .next/standalone/server.js
// but does NOT include public/ or .next/static/ — Next.js's own docs say to
// copy them in manually. Doing it here as a postbuild step means `npm run
// build` alone produces a complete, ready-to-run bundle for cPanel/Passenger
// (or any other standalone deploy target), with no manual step to forget.
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const standalone = path.join(root, ".next", "standalone");

if (!fs.existsSync(standalone)) {
  console.log("No .next/standalone directory found — skipping (is output: \"standalone\" set in next.config.mjs?).");
  process.exit(0);
}

fs.cpSync(path.join(root, "public"), path.join(standalone, "public"), { recursive: true });
fs.cpSync(path.join(root, ".next", "static"), path.join(standalone, ".next", "static"), { recursive: true });

console.log("Copied public/ and .next/static/ into .next/standalone/");
