import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "HLOOKUP",
  purpose: "Horizontal lookup in the first row. This module covers the core mechanics of HLOOKUP.",
  syntax: "=HLOOKUP(...)",
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
  evaluate: (dataset: TableData, _userInput: TableData): EvaluationResult => {
    return {
      formulaUsed: "=HLOOKUP(...)",
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
    { title: "Example 1", description: "Use case for HLOOKUP." }
  ],
  commonMistakes: [
    "Common mistake 1"
  ],
  practiceExercise: {
    question: "Practice HLOOKUP",
    table: { headers: ["A"], rows: [["1"]] },
    expectedFormula: "=HLOOKUP()",
    expectedResult: "Result"
  },
  interviewQuestions: [
    { question: "Question 1?", answer: "Answer 1" }
  ],
  challengeQuestion: "Challenge for HLOOKUP"
};

export const HlookupLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
