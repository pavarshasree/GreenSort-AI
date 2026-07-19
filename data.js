/* =========================================================
   GreenSort AI — shared data layer
   - WASTE_DB: knowledge base used to render results/learn/chat
   - mockClassify(): stands in for a real vision model. Swap this
     for a call to your trained classifier, or to the Anthropic
     API (send the image + prompt asking for JSON classification)
     — see README for the exact snippet.
   - Stats are persisted in localStorage so the Dashboard reflects
     real usage during a demo.
   ========================================================= */

const WASTE_DB = [
  {
    id: "plastic-bottle",
    object: "Plastic Bottle (PET)",
    material: "plastic",
    category: "Recyclable",
    bin: "Blue Bin",
    binColor: "var(--plastic)",
    explanation: "This is a PET (Polyethylene Terephthalate) bottle, identified by its clear body and recycling code #1. PET is one of the most widely recycled plastics.",
    disposal: "Empty and rinse the bottle, remove the cap (recycle separately if same material), and flatten to save space before placing in the blue recycling bin.",
    benefit: "Recycling one PET bottle saves enough energy to power a 60W bulb for 6 hours and keeps it out of landfill for up to 450 years.",
    tips: [
      "Rinse before binning — food residue can contaminate a whole batch.",
      "Caps are usually PP (#5) — check local rules before recycling together.",
      "Crush bottles to reduce transport volume and emissions."
    ],
    mistakes: [
      "Leaving liquid inside, which can contaminate paper in the same stream.",
      "Assuming black plastic is recyclable — most sorting machines can't detect it."
    ],
    similar: ["Detergent bottles", "Shampoo bottles", "Plastic food trays"]
  },
  {
    id: "paper-cup",
    object: "Paper Coffee Cup",
    material: "paper",
    category: "Partially Recyclable",
    bin: "Yellow Bin (check locally)",
    binColor: "var(--paper-mat)",
    explanation: "Most disposable cups are paperboard with a thin polyethylene lining to prevent leaks — that lining means they need special facilities to recycle.",
    disposal: "Empty any liquid and check if your local facility accepts lined cups. If not, the lid (usually PP) and sleeve (paper) can often be recycled separately.",
    benefit: "Diverting one cup from landfill avoids roughly 20g of CO₂e and reduces demand on virgin pulp.",
    tips: [
      "Bring a reusable cup when possible — it's the biggest lever here.",
      "Separate the plastic lid before disposal.",
      "Look for 'compostable' certified cups, which break down differently."
    ],
    mistakes: [
      "Assuming all paper cups are recyclable like regular paper.",
      "Leaving the plastic lid attached."
    ],
    similar: ["Fast-food wrappers", "Pizza boxes (grease-free parts)", "Milk cartons"]
  },
  {
    id: "glass-jar",
    object: "Glass Jar",
    material: "glass",
    category: "Recyclable",
    bin: "Green Bin",
    binColor: "var(--glass)",
    explanation: "Glass is infinitely recyclable without loss of quality or purity, making it one of the most sustainable packaging materials.",
    disposal: "Rinse out residue, remove the metal lid (recycle separately), and place in the glass collection point or green bin.",
    benefit: "Recycled glass melts at a lower temperature than raw materials, cutting furnace energy use by up to 30%.",
    tips: [
      "Separate by colour if your local facility requires it.",
      "Lids and rings are usually metal — recycle them apart from the jar.",
      "Broken glass should be wrapped before binning for safety."
    ],
    mistakes: [
      "Mixing broken glass with general recyclables — it can contaminate paper.",
      "Forgetting to remove metal lids."
    ],
    similar: ["Wine bottles", "Sauce jars", "Glass food containers"]
  },
  {
    id: "aluminium-can",
    object: "Aluminium Can",
    material: "metal",
    category: "Recyclable",
    bin: "Gray Bin",
    binColor: "var(--metal)",
    explanation: "Aluminium cans are detected by their light weight and magnetic-negative response — a hallmark of non-ferrous metal.",
    disposal: "Rinse, gently crush to save space, and place in the metal recycling bin.",
    benefit: "Recycling aluminium uses 95% less energy than producing new aluminium from ore, and a can can be back on shelves in ~60 days.",
    tips: [
      "No need to remove the tab — it's the same material.",
      "Crushing is fine and saves collection space.",
      "Aluminium foil can often be recycled too if balled up and clean."
    ],
    mistakes: [
      "Treating aluminium foil the same as cans without checking local guidance.",
      "Leaving cans un-rinsed, attracting pests in collection points."
    ],
    similar: ["Steel food cans", "Aerosol cans (empty)", "Aluminium foil trays"]
  },
  {
    id: "banana-peel",
    object: "Banana Peel",
    material: "organic",
    category: "Compostable",
    bin: "Green Organic Bin",
    binColor: "var(--organic)",
    explanation: "This is organic food waste — biodegradable material that breaks down naturally and shouldn't enter the recycling or landfill stream.",
    disposal: "Place in a home compost bin or municipal organic waste collection. Never bag it in plastic before composting.",
    benefit: "Composted food waste avoids methane emissions from landfill and returns nutrients to soil — cutting your household's carbon footprint significantly.",
    tips: [
      "Chop scraps smaller to speed up composting.",
      "Balance 'green' waste like this with 'brown' waste (dry leaves, cardboard).",
      "Avoid composting meat or dairy in a home bin — it attracts pests."
    ],
    mistakes: [
      "Bagging food waste in regular plastic bags before composting.",
      "Putting organic waste in the general recycling bin."
    ],
    similar: ["Vegetable peels", "Coffee grounds", "Eggshells"]
  },
  {
    id: "battery",
    object: "Alkaline Battery",
    material: "ewaste",
    category: "Hazardous — Special Handling",
    bin: "E-Waste / Hazardous Drop-off",
    binColor: "var(--hazard)",
    explanation: "Batteries contain heavy metals and chemicals that are hazardous if landfilled, and can cause fires if crushed in regular waste trucks.",
    disposal: "Never place in household bins. Take to a designated e-waste or battery drop-off point — many electronics and hardware stores accept them for free.",
    benefit: "Proper battery recycling recovers zinc, manganese, and steel while preventing heavy-metal leaching into soil and groundwater.",
    tips: [
      "Tape terminals on lithium batteries before transport to prevent short-circuits.",
      "Keep a small home container for batteries until you can drop them off.",
      "Many councils run collection events — check your local authority site."
    ],
    mistakes: [
      "Throwing batteries in general or recycling bins.",
      "Storing damaged/swollen batteries loosely with other waste."
    ],
    similar: ["Phone chargers", "Old cables", "Small electronics"]
  }
];

const MATERIAL_LABELS = {
  plastic: "Plastic",
  paper: "Paper",
  glass: "Glass",
  metal: "Metal",
  organic: "Organic",
  ewaste: "E-Waste / Hazardous"
};

/**
 * Mock AI classification.
 * Replace this function's body with a real call to:
 *   1) your own trained CV model's inference endpoint, or
 *   2) the Anthropic API — send the base64 image + a prompt like:
 *      "Classify the waste item in this image. Respond ONLY as JSON:
 *       { material, object, confidence }" — see README.md.
 * Everything downstream (results page, dashboard, report) already
 * expects this exact shape, so swapping the model is a drop-in change.
 */
function mockClassify() {
  const item = WASTE_DB[Math.floor(Math.random() * WASTE_DB.length)];
  const confidence = Math.round((84 + Math.random() * 15) * 10) / 10; // 84–99%
  return { ...item, confidence };
}

/* ---------------- Stats persistence ---------------- */
const STATS_KEY = "greensort_stats_v1";

function getStats() {
  const raw = localStorage.getItem(STATS_KEY);
  if (raw) return JSON.parse(raw);
  const initial = {
    totalScans: 0,
    itemsRecycled: 0,
    co2Saved: 0,
    energySaved: 0,
    ecoScore: 0,
    byMaterial: { plastic: 0, paper: 0, glass: 0, metal: 0, organic: 0, ewaste: 0 },
    weekly: [2, 4, 3, 5, 6, 4, 5], // Mon..Sun baseline demo data
    history: []
  };
  localStorage.setItem(STATS_KEY, JSON.stringify(initial));
  return initial;
}

function recordScan(result) {
  const stats = getStats();
  stats.totalScans += 1;
  if (result.category !== "Hazardous — Special Handling") stats.itemsRecycled += 1;
  stats.co2Saved = Math.round((stats.co2Saved + (0.05 + Math.random() * 0.4)) * 100) / 100;
  stats.energySaved = Math.round((stats.energySaved + (0.1 + Math.random() * 0.6)) * 100) / 100;
  stats.byMaterial[result.material] = (stats.byMaterial[result.material] || 0) + 1;
  const dayIdx = (new Date().getDay() + 6) % 7; // Mon=0
  stats.weekly[dayIdx] += 1;
  stats.ecoScore = Math.min(100, Math.round(40 + stats.itemsRecycled * 2.2));
  stats.history.unshift({ ...result, date: new Date().toISOString() });
  stats.history = stats.history.slice(0, 20);
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  return stats;
}

function resetStats() {
  localStorage.removeItem(STATS_KEY);
  return getStats();
}
