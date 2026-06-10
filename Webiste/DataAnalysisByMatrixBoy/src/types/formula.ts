export interface TableData {
  headers: string[];
  rows: string[][];
  highlightRow?: number; // 0-indexed row to highlight
  highlightCol?: number; // 0-indexed column to highlight
}

export interface Parameter {
  name: string;
  meaning: string;
  example: string;
}

export interface VisualStep {
  title: string;
  description?: string;
  table: TableData;
}

export interface PracticeExercise {
  question: string;
  table: TableData;
  expectedFormula: string;
  expectedResult: string;
}

// The result of a real-time formula evaluation
export interface EvaluationResult {
  visualSteps: VisualStep[];
  finalOutput: TableData;
  flowDiagram: string[];
  formulaUsed: string; // The dynamically generated formula string (e.g. if user types E104)
}

export interface FormulaLessonData {
  formulaName: string;
  purpose: string;
  syntax: string;
  parameters: Parameter[];
  
  // Initial states for the interactive tables
  initialDataset: TableData;
  initialUserInput: TableData;
  
  // The core engine that recalculates everything when a user edits a cell
  evaluate: (dataset: TableData, userInput: TableData) => EvaluationResult;
  
  realWorldExamples: { title: string; description: string }[];
  commonMistakes: string[];
  practiceExercise: PracticeExercise;
  interviewQuestions: { question: string; answer: string }[];
  challengeQuestion: string;
}
