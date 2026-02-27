// Einfacher Fake-Loader + Tipps (ohne Steam API / ohne PHP)

const tips = [
  "Tipp: Diplomatie bringt Ressourcen – Krieg bringt Kosten.",
  "Tipp: Verdiene dir Ausrüstung IC durch Missionen & Forschung.",
  "Tipp: Handel mit anderen Fraktionen kann dir Technologievorteile geben.",
  "Tipp: Keine Übermacht am Anfang — baue dir deinen Rang auf.",
  "Tipp: Koordiniere Operationen über die Flottenführung."
];

const tipText = document.getElementById("tipText");
const statusText = document.getElementById("statusText");
const percentEl = document.getElementById("percent");
const barFill = document.getElementById("barFill");
const communityUrl = document.getElementById("communityUrl");

// TODO: Hier deinen Discord/Website Link ändern:
communityUrl.textContent = "discord.gg/DEININVITE";

// Tipps rotieren
let tipIndex = 0;
setInterval(() => {
  tipIndex = (tipIndex + 1) % tips.length;
  tipText.textContent = tips[tipIndex];
}, 6000);

// Fake Progress
let p = 0;
const phases = [
  { until: 30, text: "Sammle Daten…" },
  { until: 55, text: "Synchronisiere Ressourcen…" },
  { until: 80, text: "Initialisiere Systeme…" },
  { until: 95, text: "Bereite Spawn vor…" },
  { until: 100, text: "Fast bereit…" }
];

function phaseText(val){
  for (const ph of phases) if (val <= ph.until) return ph.text;
  return "Lädt…";
}

function tick(){
  // kleine zufällige Steps
  const step = Math.random() * 3.2;
  p = Math.min(100, p + step);

  const rounded = Math.floor(p);
  percentEl.textContent = `${rounded}%`;
  barFill.style.width = `${rounded}%`;
  statusText.textContent = phaseText(rounded);

  // niemals "fertig" stehen bleiben, loop bei 100 auf 92
  if (p >= 100) {
    setTimeout(() => { p = 92; }, 800);
  }
  requestAnimationFrame(() => {
    setTimeout(tick, 200 + Math.random() * 260);
  });
}

tick();
