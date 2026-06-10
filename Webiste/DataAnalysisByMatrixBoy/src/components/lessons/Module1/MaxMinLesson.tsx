import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "MAX & MIN",
  purpose: "Find the largest or smallest value. This module covers the core mechanics of MAX/MIN.",
  syntax: "=MAX/MIN(...)",
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
      formulaUsed: "=MAX/MIN(...)",
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
    { title: "Example 1", description: "Use case for MAX/MIN." }
  ],
  commonMistakes: [
    "Common mistake 1"
  ],
  practiceExercise: {
    question: "Practice MAX/MIN",
    table: { headers: ["A"], rows: [["1"]] },
    expectedFormula: "=MAX/MIN()",
    expectedResult: "Result"
  },
  interviewQuestions: [
    { question: "Question 1?", answer: "Answer 1" }
  ],
  challengeQuestion: "Challenge for MAX/MIN"
};

export const MaxMinLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
