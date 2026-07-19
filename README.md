# GreenSort AI 🌿

AI-powered waste sorting assistant — upload a photo of an item and get instant guidance on how to dispose of it correctly. Built for Idea2Impact Hackathon 2026.

**Live pages included (MVP):**
- `index.html` — Home
- `scanner.html` — Waste Scanner (upload / camera / drag-drop)
- `results.html` — AI Analysis Result
- `chat.html` — AI Chat Assistant (bonus, follow-up questions)
- `dashboard.html` — Impact Dashboard (Chart.js)
- `learn.html` — Learn (bonus, category reference)
- `about.html` — About
- `report.html` — Downloadable/printable Sustainability Report

No build step, no server, no dependencies to install — it's plain HTML/CSS/JS plus Chart.js loaded from a CDN.

## Run it locally

You can just double-click `index.html` — but for the camera/upload flow to behave consistently across browsers, serve it over a local server:

```bash
# from inside the greensort-ai folder
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or with Node:

```bash
npx serve .
```

## How the "AI" currently works

This MVP ships with a **mock classifier** (`js/data.js` → `mockClassify()`) so the entire flow — upload, analyze, results, dashboard, report — works end‑to‑end without needing a trained model or API key. It randomly selects a realistic result from a small waste knowledge base (`WASTE_DB`).

To wire up a **real AI model**, replace `mockClassify()` with either:

**Option A — your own trained image classifier**, called via `fetch()` to your inference endpoint.

**Option B — the Anthropic API**, sending the uploaded image and asking for structured JSON back:

```javascript
async function classifyWithClaude(base64Image) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Image } },
          { type: "text", text: "Identify the waste item in this photo. Respond ONLY as JSON: {\"object\":\"\",\"material\":\"plastic|paper|glass|metal|organic|ewaste\",\"confidence\":0-100}" }
        ]
      }]
    })
  });
  const data = await response.json();
  return JSON.parse(data.content[0].text);
}
```

Everything downstream (results page, dashboard stats, PDF report) already expects that shape, so it's a drop-in swap.

## Publish it to GitHub (pavarshasree)

From inside the `greensort-ai` folder:

```bash
git init
git add .
git commit -m "Initial commit: GreenSort AI MVP"
git branch -M main
git remote add origin https://github.com/pavarshasree/greensort-ai.git
git push -u origin main
```

If the repo doesn't exist yet on GitHub:
1. Go to https://github.com/new
2. Repository name: `greensort-ai` (owner: pavarshasree)
3. Leave it empty (no README/gitignore — you already have one), click **Create repository**
4. Run the commands above

## See it live (GitHub Pages)

1. On GitHub, open the `greensort-ai` repo → **Settings** → **Pages**
2. Under "Build and deployment", set **Source** to `Deploy from a branch`
3. Branch: `main`, folder: `/ (root)` → **Save**
4. Wait ~1 minute, then your site is live at:
   `https://pavarshasree.github.io/greensort-ai/`

## Project structure

```
greensort-ai/
├── index.html
├── scanner.html
├── results.html
├── chat.html
├── dashboard.html
├── learn.html
├── about.html
├── report.html
├── css/style.css
├── js/main.js      # navbar, dark mode
└── js/data.js       # waste knowledge base, mock classifier, stats
```
