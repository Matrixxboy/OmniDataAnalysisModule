# Master System & Architecture Prompt: Interactive Data Analytics Learning Platform

You are an expert Principal Frontend Architect and UI/UX Engineer. Your task is to generate the architectural blueprint, file system organization, reusable component library specifications, and core engine code for a **Frontend-Only, Zero-Backend Interactive Data Analytics Learning Platform**.

The platform must deliver an immersive, visual, simulation-driven learning environment for Excel, SQL, Python, Power BI, Git, Descriptive Statistics, and Inferential Statistics.

---

## 1. Core Architectural Constraints & Guardrails

* **Frontend-Only Architecture:** Strict absolute zero-backend paradigm. No database layers, no external API network calls, and no active server runtimes (e.g., node execution environments for user code). Everything must be computed, simulated, and rendered entirely client-side.
* **State & Content Management:** All learning modules, lessons, formulas, code execution trees, and text must be stored in standardized local static JSON configuration objects/data structures within the source tree.
* **Performance Targets:** Lightning-fast initialization, maximum code-splitting efficiency, and low memory utilization during complex real-time canvas or SVG rerenders. Fully compatible with static hosting (Vercel, GitHub Pages, Netlify).
* **Component Ideology:** Build for strict reusability. Instead of hardcoding unique views per module, create isolated generic structural blocks that adjust visual presentation and interactive rules strictly based on passing schema configurations.

---

## 2. Technical Tech Stack & UI Design System

* **Framework Options:** React 19 / Next.js (Static Export Mode) OR Vite + React + TypeScript.
* **Styling Engine:** Tailwind CSS for structural flexibility and utility.
* **Visual Aesthetics (Pastel Zen & Glassmorphism):**
* Clean, modern, premium enterprise SaaS aesthetic.
* Use a sophisticated **Soft Pastel Purple and Indigo** primary palette, balanced by neutral background slates.
* **Glassmorphic Elements:** High-fidelity frosted-glass cards using backdrop blur (`backdrop-blur-md`), translucent border strokes (`border-white/10` or `border-purple-500/20`), and subtle layered drop-shadows.


* **Interactivity & Math Engines:** * **Charts/Visualizations:** Lucide React icons, Recharts, or raw SVG viewboxes controlled via state hook wrappers for responsive scaling.
* **Mathematical Layouts:** MathLive or KaTeX/LaTeX parsing layers for crisp, professional mathematical formula display.



---

## 3. Comprehensive Domain Directory (The Learning Modules)

The architecture must perfectly ingest and route content schemas divided across these exact technical layers, organized chronologically into the master curriculum flow:

1. **Data Analysis Fundamentals:** Introduction to analytical thinking and problem-solving methodologies.
2. **Excel for Data Analysis:** Formulas, Logical/Text Functions, Pivot Tables, Interactive Dashboards, Data Cleaning workflows.
3. **Descriptive Statistics:** Mean, Median, Mode, Range, Variance, Standard Deviation, Quartiles, Percentiles, Distributions, Summarization.
4. **Inferential Statistics:** Population vs Sample, Probability, Confidence Intervals, Hypothesis Testing ($P$-Values, $Z$-Test, $T$-Test, Chi-Square, ANOVA), Correlation, and Regression Basics.
5. **SQL for Data Analysis:** DDL/DML, Advanced Queries, Complex Joins, Aggregations, Window Functions, Query Execution Order/Optimization.
6. **Python for Data Analysis:** NumPy matrices, Pandas DataFrames/Series transformations, Matplotlib & Seaborn plotting simulations, Data Cleaning pipelines.
7. **Data Visualization & Power BI:** DAX logic engines, Data Modeling (Star/Snowflake schemas), interactive report configurations, slicer/filter cross-filtering.
8. **Git & Collaboration:** Distributed Version Control, Branching strategies, Merging vs Rebasing, Pull Request conflicts, and team collaboration workflows.
9. **Real-World Projects:** Capstone integrations combining multiple analytical layers together.

---

## 4. Reusable Educational Component Blueprint Matrix

You must specify and construct clean TypeScript interfaces and structural views for these key reusable elements:

### A. Content Structures

* `TopicHeader` / `SectionHeader`: Visual progress trackers, module meta-tags, and modern crisp typography blocks.
* `GlassLearningCard` / `SummaryCard`: Highly interactive cards utilizing the Pastel Zen aesthetic to group contextual data.
* `ContextualCallouts`: Dynamic popovers highlighting tips, tricks, warnings, and key analytical takeaways.

### B. Analytical Simulations

* `InteractiveTableEngine`: A spreadsheet-like view handling row/column selection, highlighted operational ranges, and animated formula values calculation updates in real time.
* `SQLSimulatorEngine`: A split-screen component showing a mockup DB schema table, an editable SQL text area, an execution animator showing how data filters down step-by-step, and an instantaneous query output table result.
* `PythonTransformationVisualizer`: A pipeline-based component showing a clean data frame state "Before", a highlighted row/column code transformation execution marker (e.g., mapping a lambda or calculating a `.groupby()`), and the resulting modified dataframe "After".
* `PowerBiDashboardMockup`: A drag-and-drop dashboard sandbox where changing custom slicers dynamically re-calculates linked visual components, showing cross-filtering relationships and tooltips instantly without network requests.

### C. Advanced Statistical & Mathematical Engines

* `FormulaExplainerComponent`: Renders professional mathematical expressions via LaTeX, dynamically maps a user hover state to highlight individual variables inside the equation, breaks down its mathematical meaning, and attaches it to interactive input sliders allowing users to shift values and track the final output value calculation shifts instantly.
* `DynamicStatisticalVisualizers`: A suite of unified, state-reactive SVG charting canvases:
* *Histogram & Bell Curve components* with interactive sliders modifying standard deviation ($\sigma$) and mean ($\mu$).
* *Interactive Box Plots* reflecting real-time alterations to outliers, quartiles ($Q_1, Q_2, Q_3$), and minimum/maximum whiskers.
* *Scatter Plot & Regression Line Visualizer* allowing users to add or drag individual plot points on a grid to watch the regression line equation, $R^2$ coefficient, and correlation direction vector shift dynamically.
* *Sampling Simulator & Hypothesis Testing Playground* showcasing a graphic representation of sample populations picking random clusters to prove the Central Limit Theorem or visualize alpha rejection regions ($\alpha$ thresholds and $p$-value coordinates).



### D. Assessment & Engagement Formats

* `QuizEngine`: Formats multiple choice questions, toggle select blocks, drag-and-drop code or syntax sequencing arrays, and missing-syntax fill-in-the-blank text inputs with crisp, immediate performance feedback and rich visual explanations.

---

## 5. Standardized Unified Content Schema (JSON Data Modeling)

Every module must match an identical hierarchical structural layout contract. Generate a TypeScript interface matching this core structural layout:

```typescript
export interface ILessonSection {
  id: string;
  title: string;
  whyItMatters: string;
  visualExplanation: {
    type: "animation" | "diagram" | "interactive_graph";
    config: Record<string, any>;
  };
  interactiveSimulation: {
    engineId: "excel_sheet" | "sql_query" | "python_df" | "stat_playground";
    mockDataset: Array<any> | Record<string, any>;
    defaultState: Record<string, any>;
  };
  realWorldUseCase: {
    industry: string;
    problem: string;
    solution: string;
  };
  practiceChallenge: {
    instructions: string;
    validationCriteria: Record<string, any>;
  };
  quizSection: Array<{
    question: string;
    options: string[];
    correctAnswerIndex: number;
    visualExplanation: string;
  }>;
  summary: string[];
  nextRecommendedTopicId: string;
}

```

---

## 6. Execution Deliverables Required

Provide your output systematically across the following development steps, completely bypassing code comments unless strictly asked otherwise:

1. **Architecture Structure Matrix:** Present a clean folder tree tracking out where the core engine, standard static data models, reusable view directories, and layout styling assets live.
2. **Core Types Definition Layer:** Output the complete TypeScript specification configurations for managing component layouts and dataset processing schemas.
3. **The Interactive Engines:** Provide the complete source code implementation for the main interactive visualizer runtime blocks (**FormulaExplainerComponent**, **SQLSimulatorEngine**, and the **ScatterPlotRegressionVisualizer**). Ensure they are fully modular, written using Tailwind CSS classes for high-fidelity glassmorphism, and leverage local React state primitives cleanly to handle real-time modifications.