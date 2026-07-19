/* Shared across every page: theme toggle + mobile nav */
(function () {
  const THEME_KEY = "greensort_theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(saved);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

    const burger = document.getElementById("navBurger");
    const links = document.getElementById("navLinks");
    if (burger && links) {
      burger.addEventListener("click", () => links.classList.toggle("open"));
    }

    // highlight active nav link
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(a => {
      if (a.getAttribute("href") === path) a.classList.add("active");
    });
  });
})();
