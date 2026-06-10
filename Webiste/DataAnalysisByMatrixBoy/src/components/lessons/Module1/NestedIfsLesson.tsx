import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "NESTED IFS",
  purpose: "Evaluates multiple conditions sequentially by placing IF functions inside one another.",
  syntax: "=IF(condition1, value_if_true1, IF(condition2, value_if_true2, value_if_false))",
  parameters: [
    { name: "condition1", meaning: "The first condition to test.", example: "A2 > 90" },
    { name: "value_if_true1", meaning: "The value returned if the first condition is met.", example: "\"A\"" },
    { name: "IF(...)", meaning: "A secondary IF function to evaluate if the first condition is false.", example: "IF(A2 > 80, \"B\", \"C\")" }
  ],
  initialDataset: {
    headers: ["Student", "Score"],
    rows: [
      ["Alice", "92"],
      ["Bob", "75"],
      ["Charlie", "60"]
    ]
  },
  initialUserInput: {
    headers: ["Target Student"],
    rows: [["Bob"]] 
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const student = userInput.rows[0][0];
    
    // Find the student
    let rowIdx = dataset.rows.findIndex(r => r[0] === student);
    if (rowIdx === -1) rowIdx = 1; // fallback to bob
    
    const targetScoreStr = dataset.rows[rowIdx][1];
    const targetScore = parseFloat(targetScoreStr) || 0;
    
    const formulaUsed = `=IF(B${rowIdx+2} >= 90, "A", IF(B${rowIdx+2} >= 80, "B", IF(B${rowIdx+2} >= 70, "C", "F")))`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start Evaluation"];
    
    // Condition 1
    visualSteps.push({
      title: "Step 1: Check Condition 1",
      description: `Testing if Score (${targetScore}) >= 90.`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 1 }
    });
    flowDiagram.push(`Test: ${targetScore} >= 90?`);
    
    if (targetScore >= 90) {
      visualSteps.push({
        title: "Step 2: Condition 1 Met",
        description: `Since ${targetScore} >= 90 is TRUE, return "A".`,
        table: { ...dataset, highlightRow: rowIdx, highlightCol: 1 }
      });
      flowDiagram.push(`TRUE -> Return "A"`);
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Grade"], rows: [["A"]] },
        flowDiagram
      };
    }
    
    // Condition 2
    visualSteps.push({
      title: "Step 2: Condition 1 False, Check Condition 2",
      description: `Since ${targetScore} < 90, we move to the next IF. Testing if Score (${targetScore}) >= 80.`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 1 }
    });
    flowDiagram.push(`FALSE`, `Test: ${targetScore} >= 80?`);
    
    if (targetScore >= 80) {
      visualSteps.push({
        title: "Step 3: Condition 2 Met",
        description: `Since ${targetScore} >= 80 is TRUE, return "B".`,
        table: { ...dataset, highlightRow: rowIdx, highlightCol: 1 }
      });
      flowDiagram.push(`TRUE -> Return "B"`);
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Grade"], rows: [["B"]] },
        flowDiagram
      };
    }
    
    // Condition 3
    visualSteps.push({
      title: "Step 3: Condition 2 False, Check Condition 3",
      description: `Since ${targetScore} < 80, we move to the final IF. Testing if Score (${targetScore}) >= 70.`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 1 }
    });
    flowDiagram.push(`FALSE`, `Test: ${targetScore} >= 70?`);
    
    if (targetScore >= 70) {
      visualSteps.push({
        title: "Step 4: Condition 3 Met",
        description: `Since ${targetScore} >= 70 is TRUE, return "C".`,
        table: { ...dataset, highlightRow: rowIdx, highlightCol: 1 }
      });
      flowDiagram.push(`TRUE -> Return "C"`);
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Grade"], rows: [["C"]] },
        flowDiagram
      };
    }
    
    // Final False
    visualSteps.push({
      title: "Step 4: All Conditions False",
      description: `Since all conditions failed, return the final value_if_false: "F".`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 1 }
    });
    flowDiagram.push(`FALSE -> Return "F"`);
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Grade"], rows: [["F"]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Tiered Commissions", description: "Calculating sales commissions where >$10k gets 10%, >$5k gets 5%, else 0%." },
    { title: "Performance Ratings", description: "Assigning 'Excellent', 'Good', or 'Poor' based on evaluation scores." }
  ],
  commonMistakes: [
    "Ordering conditions incorrectly. Nested IFs evaluate from left to right. Always put the hardest-to-reach condition (e.g. >= 90) first.",
    "Forgetting closing parentheses. If you nest 3 IFs, you need 3 closing parentheses at the very end."
  ],
  practiceExercise: {
    question: "Write a Nested IF to return 'Hot' if >30, 'Warm' if >20, else 'Cold'. Assume cell A1 has value 25.",
    table: { headers: ["A"], rows: [["25"]] },
    expectedFormula: "=IF(A1>30, \"Hot\", IF(A1>20, \"Warm\", \"Cold\"))",
    expectedResult: "Warm"
  },
  interviewQuestions: [
    { question: "What is a modern alternative to writing complex nested IFs?", answer: "The IFS() function, or using VLOOKUP/XLOOKUP with an approximate match table." }
  ],
  challengeQuestion: "How would you rewrite this grade calculation using an approximate match VLOOKUP instead of Nested IFs?"
};

export const NestedIfsLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
