import {
  ROOT_BRANCHES, branchPathD, branchColor, branchWidth, branchOpacity,
  branchDelayMs, branchDurMs, tipDots,
} from "../src/lib/roots.ts";

let out = "";
for (const b of ROOT_BRANCHES) {
  out += `    <path class="roots-path" d="${branchPathD(b)}" stroke="${branchColor(b.depth)}" stroke-width="${branchWidth(b.depth)}" stroke-linecap="round" opacity="${branchOpacity(b.depth)}" style="--len:${Math.ceil(b.length * 1.1)};--dur:${Math.round(branchDurMs(b))}ms;--delay:${Math.round(branchDelayMs(b))}ms"/>\n`;
}
for (const d of tipDots()) {
  out += `    <circle class="roots-dot" cx="${d.x}" cy="${d.y}" r="${d.r}" fill="${d.tone === "rose" ? "#8b3a4a" : "#b08d3e"}" style="--delay:${d.delay}ms;--dot-o:${d.tone === "rose" ? 0.65 : 0.8}"/>\n`;
}
process.stdout.write(out);
