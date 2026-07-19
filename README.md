# 🌿 GreenSort AI

> AI-Powered Smart Waste Segregation & Sustainability Assistant

GreenSort AI is a web application that helps users identify the correct disposal method for everyday waste items. Users can upload an image of a waste item, receive an AI-powered classification, learn whether it belongs to Wet, Dry, Recyclable, Hazardous, Organic, or E-Waste categories, and get eco-friendly disposal recommendations.

Built for the **Idea2Impact Hackathon 2026** under the **Clean & Green Technology** theme.

---

## 🚀 Live Demo

🌐 **Website:**
https://pavarshasree.github.io/greensort-ai/

🎥 **Demo Video:**
(Add your YouTube or Google Drive link here)

---

## 📂 GitHub Repository

https://github.com/pavarshasree/greensort-ai

---

# 📌 Problem Statement

Improper waste segregation is one of the major causes of environmental pollution. Most people struggle to identify the correct disposal method for different waste materials, causing recyclable and hazardous waste to end up in landfills.

GreenSort AI simplifies waste segregation using AI by helping users correctly classify waste and promoting sustainable disposal practices.

---

# 💡 Solution

GreenSort AI allows users to:

- 📷 Upload or capture a waste item image
- 🤖 Receive AI-powered waste classification
- ♻️ View proper disposal instructions
- 🌱 Learn sustainable recycling practices
- 📊 Track environmental impact through a dashboard
- 💬 Ask follow-up questions using the AI Chat Assistant
- 📄 Generate a printable Sustainability Report

---

# ✨ Features

- AI Waste Classification
- Smart Disposal Recommendations
- Waste Category Detection
- Sustainability Dashboard
- AI Chat Assistant
- Learn Page
- Printable Sustainability Report
- Mobile Responsive UI
- Dark Mode Support

---

# 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)

### Libraries

- Chart.js

### Storage

- LocalStorage

### Deployment

- GitHub Pages

### Development Tools

- GitHub
- VS Code
- Replit
- ChatGPT

---

# 🧠 AI Architecture

GreenSort AI uses a modular waste classification pipeline.

Current MVP implementation uses a structured **rule-based AI simulation** through:

- `WASTE_DB`
- `mockClassify()`

The pipeline predicts:

- Waste Object
- Material Type
- Waste Category
- Confidence Score
- Disposal Recommendation

Because the classification module is isolated, it can easily be upgraded in the future with:

- TensorFlow
- Teachable Machine
- Roboflow
- Gemini Vision API
- OpenAI Vision API
- YOLO
- Custom CNN Models

without changing the rest of the application.

---

# 📄 Project Pages

| Page | Description |
|-------|-------------|
| Home | Landing Page |
| Scanner | Upload or Capture Waste Image |
| Results | AI Classification Result |
| Chat | AI Sustainability Assistant |
| Dashboard | Impact Analytics |
| Learn | Waste Segregation Guide |
| About | Project Information |
| Report | Printable Sustainability Report |

---

# 📁 Project Structure

```
greensort-ai/
│
├── index.html
├── scanner.html
├── results.html
├── dashboard.html
├── chat.html
├── learn.html
├── about.html
├── report.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   └── data.js
│
├── assets/
│
└── README.md
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/pavarshasree/greensort-ai.git
```

Move into the project folder:

```bash
cd greensort-ai
```

Run a local server:

Python

```bash
python -m http.server 8000
```

or

```bash
python3 -m http.server 8000
```

Node.js

```bash
npx serve .
```

Open your browser:

```
http://localhost:8000
```

---

# 🌍 Future Enhancements

- Real-time AI Image Recognition
- Gemini Vision Integration
- Voice-based Waste Assistant
- QR Code Recycling Information
- Nearby Recycling Center Finder
- User Authentication
- Carbon Footprint Tracking
- Multi-language Support

---

# 🎯 Expected Impact

GreenSort AI aims to:

- Increase recycling awareness
- Reduce landfill waste
- Encourage responsible disposal
- Improve household waste segregation
- Support smart and sustainable cities

---

# 👩‍💻 Developer

**Pavarsha Sree Devarapalli**

GitHub:
https://github.com/pavarshasree

LinkedIn:
https://www.linkedin.com/in/pavarsha-sree-devarapalli-a793aa341/

---

# 📜 License

This project was developed for educational and hackathon purposes under the **Idea2Impact Hackathon 2026**.

---

⭐ If you found this project useful, please consider giving the repository a **Star**.
