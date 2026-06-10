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

export interface FormulaExplainerProps {
  formula: string; // The LaTeX formula string
  variables: Array<{
    id: string; // variable symbol in latex e.g. x
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    color: string; // tailwind color class e.g. text-purple-400
  }>;
  calculateResult: (vars: Record<string, number>) => number;
}

export interface SQLSimulatorProps {
  initialQuery: string;
  schema: {
    tableName: string;
    columns: Array<{ name: string; type: string }>;
  };
  initialData: Array<Record<string, any>>;
}

export interface ScatterPlotVisualizerProps {
  initialPoints: Array<{ x: number; y: number }>;
}
