import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "AND, OR, NOT",
  purpose: "Logical functions used to test multiple conditions at once. Usually nested inside an IF statement.",
  syntax: "=AND(logic1, [logic2]) | =OR(...) | =NOT(logic)",
  parameters: [
    { name: "logic1", meaning: "The first condition you want to test.", example: "A2 > 50" },
    { name: "[logic2]", meaning: "Additional conditions.", example: "B2 = \"Yes\"" }
  ],
  initialDataset: {
    headers: ["Applicant", "Test Score", "Interview Passed"],
    rows: [
      ["Alice", "90", "Yes"],
      ["Bob", "60", "Yes"],
      ["Charlie", "85", "No"]
    ]
  },
  initialUserInput: {
    headers: ["Logic Type", "Target Row (1-3)"],
    rows: [["AND", "1"]] // Default: AND logic for row 1
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const logicType = userInput.rows[0][0].toUpperCase();
    let rowIdx = parseInt(userInput.rows[0][1]) - 1;
    if (isNaN(rowIdx) || rowIdx < 0 || rowIdx >= dataset.rows.length) rowIdx = 0;
    
    const scoreStr = dataset.rows[rowIdx][1];
    const score = parseFloat(scoreStr) || 0;
    const interview = dataset.rows[rowIdx][2];
    
    // We are testing: Score > 80 AND/OR Interview == "Yes"
    const cond1 = score > 80;
    const cond2 = interview === "Yes";
    
    const formulaUsed = `=${logicType}(B${rowIdx+2}>80, C${rowIdx+2}="Yes")`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = [`Start ${logicType}`];
    
    visualSteps.push({
      title: "Step 1: Test Condition 1",
      description: `Testing if Score (${score}) > 80. Result: ${cond1.toString().toUpperCase()}`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 1 }
    });
    flowDiagram.push(`Score>80: ${cond1.toString().toUpperCase()}`);
    
    visualSteps.push({
      title: "Step 2: Test Condition 2",
      description: `Testing if Interview = "Yes" (Actual: "${interview}"). Result: ${cond2.toString().toUpperCase()}`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 2 }
    });
    flowDiagram.push(`Interview="Yes": ${cond2.toString().toUpperCase()}`);
    
    let finalRes = false;
    if (logicType === "AND") {
      finalRes = cond1 && cond2;
    } else if (logicType === "OR") {
      finalRes = cond1 || cond2;
    } else if (logicType === "NOT") {
      // NOT only takes one argument usually, let's just reverse condition 1 for demo
      finalRes = !cond1;
      visualSteps.push({
        title: "Step 3: Apply NOT",
        description: `NOT reverses the result of Condition 1. NOT(${cond1.toString().toUpperCase()}) = ${finalRes.toString().toUpperCase()}`,
        table: { ...dataset, highlightRow: rowIdx }
      });
      flowDiagram.push(`NOT(${cond1.toString().toUpperCase()})`);
      
      return {
        formulaUsed: `=NOT(B${rowIdx+2}>80)`,
        visualSteps,
        finalOutput: { headers: ["Result"], rows: [[finalRes.toString().toUpperCase()]] },
        flowDiagram
      };
    }
    
    visualSteps.push({
      title: "Step 3: Combine Logic",
      description: `Applying ${logicType} to (${cond1.toString().toUpperCase()}, ${cond2.toString().toUpperCase()}). Result: ${finalRes.toString().toUpperCase()}`,
      table: { ...dataset, highlightRow: rowIdx }
    });
    flowDiagram.push(`Combine: ${finalRes.toString().toUpperCase()}`, "Return");
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Final Result"], rows: [[finalRes.toString().toUpperCase()]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Complex IF Statements", description: "Returning 'Hired' only IF(AND(Score>80, Interview='Yes'), 'Hired', 'Reject')." }
  ],
  commonMistakes: [
    "Writing IF(A1>50 AND B1>50). Excel doesn't work like programming languages. You must wrap the conditions: IF(AND(A1>50, B1>50), ...)."
  ],
  practiceExercise: {
    question: "Write an AND formula to check if A1 is > 10 and B1 is 'Active'.",
    table: { headers: ["A", "B"], rows: [["15", "Active"]] },
    expectedFormula: "=AND(A1>10, B1=\"Active\")",
    expectedResult: "TRUE"
  },
  interviewQuestions: [
    { question: "What happens if you use math operations like (A1>5)*(B1>5) instead of AND?", answer: "It works exactly the same! TRUE is treated as 1, FALSE as 0. 1*1 = 1 (True). This is often used inside Array formulas like SUMPRODUCT." }
  ],
  challengeQuestion: "How would you write a formula that is TRUE if EITHER A1 is > 50 OR B1 is 'Yes', but NOT BOTH?"
};

export const AndOrNotLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
