import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "IF",
  purpose: "Returns one value if a logical condition is TRUE and another value if it is FALSE.",
  syntax: "=IF(logical_test, value_if_true, [value_if_false])",
  parameters: [
    { name: "logical_test", meaning: "The condition you want to test.", example: "A2 > 50" },
    { name: "value_if_true", meaning: "The value returned if the condition is met.", example: "\"Pass\"" },
    { name: "[value_if_false]", meaning: "The value returned if the condition is not met.", example: "\"Fail\"" }
  ],
  initialDataset: {
    headers: ["Student", "Exam Score"],
    rows: [
      ["Alice", "85"],
      ["Bob", "42"]
    ]
  },
  initialUserInput: {
    headers: ["Passing Score", "If True", "If False"],
    rows: [["50", "Pass", "Fail"]]
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const thresholdStr = userInput.rows[0][0];
    const threshold = parseFloat(thresholdStr) || 0;
    const valTrue = userInput.rows[0][1];
    const valFalse = userInput.rows[0][2];
    
    // We will demonstrate the IF function running on the first row's score
    const targetScoreStr = dataset.rows[0][1];
    const targetScore = parseFloat(targetScoreStr) || 0;
    
    const formulaUsed = `=IF(B2 >= ${threshold}, "${valTrue}", "${valFalse}")`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start IF"];
    
    visualSteps.push({
      title: "Step 1: Evaluate Logical Test",
      description: `Testing if the Exam Score (${targetScore}) is greater than or equal to the Passing Score (${threshold}).`,
      table: { ...dataset, highlightRow: 0, highlightCol: 1 }
    });
    flowDiagram.push(`Test: ${targetScore} >= ${threshold}?`);
    
    const isTrue = targetScore >= threshold;
    
    if (isTrue) {
      visualSteps.push({
        title: "Step 2: Condition Met (TRUE)",
        description: `Since ${targetScore} is >= ${threshold}, the condition is TRUE.`,
        table: { ...dataset, highlightRow: 0, highlightCol: 1 }
      });
      flowDiagram.push(`Result: TRUE`, `Select value_if_true`);
      
      visualSteps.push({
        title: "Step 3: Return True Value",
        description: `Excel returns the value_if_true argument: "${valTrue}".`,
        table: { ...userInput, highlightRow: 0, highlightCol: 1 }
      });
      flowDiagram.push(`Return "${valTrue}"`);
      
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Status"], rows: [[valTrue]] },
        flowDiagram
      };
    } else {
      visualSteps.push({
        title: "Step 2: Condition Not Met (FALSE)",
        description: `Since ${targetScore} is NOT >= ${threshold}, the condition is FALSE.`,
        table: { ...dataset, highlightRow: 0, highlightCol: 1 }
      });
      flowDiagram.push(`Result: FALSE`, `Select value_if_false`);
      
      visualSteps.push({
        title: "Step 3: Return False Value",
        description: `Excel returns the value_if_false argument: "${valFalse}".`,
        table: { ...userInput, highlightRow: 0, highlightCol: 2 }
      });
      flowDiagram.push(`Return "${valFalse}"`);
      
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Status"], rows: [[valFalse]] },
        flowDiagram
      };
    }
  },
  realWorldExamples: [
    { title: "Grading Systems", description: "Assigning Pass/Fail or letter grades based on scores." },
    { title: "Budget Alerts", description: "Flagging expenses that go over budget with 'OVER' or 'OK'." }
  ],
  commonMistakes: [
    "Forgetting quotes around text values (e.g. IF(A1>10, Yes, No) instead of IF(A1>10, \"Yes\", \"No\")).",
    "Not handling edge cases like exact matches (using > instead of >=)."
  ],
  practiceExercise: {
    question: "Write an IF formula that returns 'High' if A1 is > 100, and 'Low' otherwise.",
    table: { headers: ["A"], rows: [["150"]] },
    expectedFormula: "=IF(A1>100, \"High\", \"Low\")",
    expectedResult: "High"
  },
  interviewQuestions: [
    { question: "What happens if you omit the value_if_false argument?", answer: "If the condition is FALSE and you omitted the 3rd argument entirely, Excel literally returns the boolean word FALSE." },
    { question: "Can you nest IF functions?", answer: "Yes, you can place another IF function inside the value_if_true or value_if_false arguments to test multiple conditions." }
  ],
  challengeQuestion: "How would you write an IF statement to check if a cell is completely blank before doing a calculation?"
};

export const IfLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
