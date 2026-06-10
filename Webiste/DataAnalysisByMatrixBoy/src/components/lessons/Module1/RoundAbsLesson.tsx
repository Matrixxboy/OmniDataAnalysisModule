import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "ROUND & ABS",
  purpose: "Round numbers or find absolute values. This module covers the core mechanics of ROUND/ABS.",
  syntax: "=ROUND/ABS(...)",
  parameters: [
    { name: "arg1", meaning: "First argument", example: "A1:A10" }
  ],
  initialDataset: {
    headers: ["Category", "Value"],
    rows: [
      ["A", "10"],
      ["B", "20"],
      ["C", "30"]
    ]
  },
  initialUserInput: {
    headers: ["Input"],
    rows: [["Value"]]
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    return {
      formulaUsed: "=ROUND/ABS(...)",
      visualSteps: [
        {
          title: "Step 1: Execute",
          description: "Evaluating the formula.",
          table: dataset
        }
      ],
      finalOutput: { headers: ["Result"], rows: [["Success"]] },
      flowDiagram: ["Start", "Process", "Return Result"]
    };
  },
  realWorldExamples: [
    { title: "Example 1", description: "Use case for ROUND/ABS." }
  ],
  commonMistakes: [
    "Common mistake 1"
  ],
  practiceExercise: {
    question: "Practice ROUND/ABS",
    table: { headers: ["A"], rows: [["1"]] },
    expectedFormula: "=ROUND/ABS()",
    expectedResult: "Result"
  },
  interviewQuestions: [
    { question: "Question 1?", answer: "Answer 1" }
  ],
  challengeQuestion: "Challenge for ROUND/ABS"
};

export const RoundAbsLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
