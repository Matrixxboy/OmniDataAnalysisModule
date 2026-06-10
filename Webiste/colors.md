## 1. Theme Design Philosophy

### Premium Dark (Pastel Zen)

* **Goal:** Reduce eye strain during long coding and data analysis sessions.
* **Vibe:** Deep, immersive, developer-centric. It uses low-saturation slate tones as a canvas so that glowing data points, trend lines, and syntax highlighting stand out naturally without causing visual fatigue.

### Sophisticated Light (Alabaster Focus)

* **Goal:** Provide a crisp, bright, paper-like clarity optimized for daytime reading and mathematical conceptualization.
* **Vibe:** Editorial, minimalist, premium academic. Instead of harsh blinding whites (`#FFFFFF`), it utilizes warm alabaster, pale grays, and soft shadows to create depth, mimicking a high-end physical textbook or a modern productivity tool like Notion or Linear.

---

## 2. Definitive Color Palette Matrix

Here are the precise hex codes and semantic Tailwind CSS tokens for both environments.

### Core Architecture & Surface Tokens

| Component Layer | Dark Theme Token (Pastel Zen) | Light Theme Token (Alabaster Focus) | Purpose / Application |
| --- | --- | --- | --- |
| **Canvas Background** | `#020617` (`bg-slate-950`) | `#F8FAFC` (`bg-slate-50`) | The absolute base workspace layer. |
| **Panel Surface** | `#0F172A` @ 45% (`bg-slate-900/45`) | `#FFFFFF` @ 75% (`bg-white/75`) | Glassmorphic containers for lessons & grids. |
| **Primary Accent** | `#C084FC` (`text-purple-400`) | `#7C3AED` (`text-purple-600`) | Selected navigation items, primary buttons, focal nodes. |
| **Secondary Accent** | `#818CF8` (`text-indigo-400`) | `#4F46E5` (`text-indigo-600`) | Active variables, interactive sliders, data trends. |
| **Muted Borders** | `#1E293B` (`border-slate-800`) | `#E2E8F0` (`border-slate-200`) | Clean, ultra-thin dividing lines between workspaces. |

### Feedback & Simulation Tokens

| State / Status | Dark Theme Token (Pastel Zen) | Light Theme Token (Alabaster Focus) | Purpose / Application |
| --- | --- | --- | --- |
| **Success / Passing** | `#34D399` (`text-emerald-400`) | `#059669` (`text-emerald-600`) | Correct quiz selections, passing SQL/Python syntax. |
| **Warning / Process** | `#FBBF24` (`text-amber-400`) | `#D97706` (`text-amber-600`) | Live variables, mathematical steps being calculated. |
| **Error / Alert** | `#F87171` (`text-red-400`) | `#DC2626` (`text-red-600`) | Broken code execution lines, incorrect quiz feedback. |

---

## 3. Glassmorphism & Elevation Specs

### Dark Theme Glass (Layered Depth)

```css
.dark-glass-panel {
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}

```

### Light Theme Glass (Soft Shadow Depth)

```css
.light-glass-panel {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(15, 23, 42, 0.06);
  /* Uses a soft, multi-layered neutral shadow instead of a dark harsh one */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 
              0 10px 30px rgba(15, 23, 42, 0.04);
}

```

---

## 4. Interactive Components Component Adaptation

### A. Data Layout Grids & Tables

* **Dark Theme:** Dark headers (`bg-slate-900/80`) with muted text. Active rows glow with a soft purple tint (`bg-purple-500/10`).
* **Light Theme:** Soft gray headers (`bg-slate-100`) with strong, dark slate text (`text-slate-800`). Active rows use a clean, crisp pastel lilac highlight (`bg-purple-50`).

### B. Live Code IDE Mockups (SQL / Python)

* **Dark Theme:** Classic dark-mode IDE interface (`bg-slate-950`). High contrast syntax tokens (Emerald strings, Purple keywords).
* **Light Theme:** Elegant light-mode editor (`bg-slate-50`). Syntax tokens shift to rich, deeply saturated organic tones (Deep forest green for strings, Midnight purple for keywords) to guarantee accessible text contrast ratios.

### C. Statistics & Mathematical Curves

* **Dark Theme:** Chart grid lines use thin slate paths (`stroke-slate-800`). Curves glow softly over the dark backdrop.
* **Light Theme:** Chart grid lines use a crisp, faint gray mesh (`stroke-slate-200`). Interactive drag nodes feature a solid dark purple core surrounded by a wide, soft drop-shadow to make manipulation highly intuitive.

---

## 5. Visual Theme Reference Board

The design layout below provides a comparative look at the system UI, illustrating how components scale effortlessly between the deep, focused dark workspace and the clean, editorial light workspace while preserving identical information architecture.