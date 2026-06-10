import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "SUMIFS",
  purpose: "Adds all numbers in a range of cells that meet multiple criteria.",
  syntax: "=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
  parameters: [
    { name: "sum_range", meaning: "The range of cells to sum.", example: "C2:C5 (Sales Amount)" },
    { name: "criteria_range1", meaning: "The range of cells to evaluate against criteria1.", example: "A2:A5 (Region)" },
    { name: "criteria1", meaning: "The condition that must be met in criteria_range1.", example: "\"North\"" },
    { name: "[criteria_range2, criteria2]", meaning: "Additional ranges and criteria to evaluate.", example: "B2:B5, \">100\"" }
  ],
  initialDataset: {
    headers: ["Region", "Product", "Sales ($)"],
    rows: [
      ["North", "Widget", "500"],
      ["South", "Gadget", "300"],
      ["North", "Gadget", "700"],
      ["North", "Widget", "200"]
    ]
  },
  initialUserInput: {
    headers: ["Criteria 1 (Region)", "Criteria 2 (Product)"],
    rows: [["North", "Widget"]] // Summing sales for North Region AND Widget Product
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const targetRegion = userInput.rows[0][0];
    const targetProduct = userInput.rows[0][1];
    
    const formulaUsed = `=SUMIFS(C2:C5, A2:A5, "${targetRegion}", B2:B5, "${targetProduct}")`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start SUMIFS"];
    
    visualSteps.push({
      title: "Step 1: Identify Sum Range & Criteria",
      description: `Excel targets 'Sales' (Col C) to sum, where Region is "${targetRegion}" AND Product is "${targetProduct}".`,
      table: { ...dataset }
    });
    flowDiagram.push(`Set Criteria`, "Initialize Total = 0");
    
    let runningTotal = 0;
    
    for (let i = 0; i < dataset.rows.length; i++) {
      const region = dataset.rows[i][0];
      const product = dataset.rows[i][1];
      const sales = parseFloat(dataset.rows[i][2]) || 0;
      
      if (region === targetRegion && product === targetProduct) {
        runningTotal += sales;
        visualSteps.push({
          title: `Step ${i + 2}: Match Found`,
          description: `Row ${i + 1} matches BOTH criteria (Region="${region}", Product="${product}"). Adding ${sales} to total.`,
          table: { ...dataset, highlightRow: i, highlightCol: 2 }
        });
        flowDiagram.push(`Match Row ${i+1}`, `Total: ${runningTotal}`);
      } else {
        visualSteps.push({
          title: `Step ${i + 2}: No Match`,
          description: `Row ${i + 1} does not match all criteria. (Region="${region}", Product="${product}"). Ignored.`,
          table: { ...dataset, highlightRow: i }
        });
        flowDiagram.push(`Skip Row ${i+1}`);
      }
    }
    
    visualSteps.push({
      title: `Final Step: Return Total`,
      description: `Excel has evaluated all rows and returns the final accumulated total.`,
      table: { ...dataset }
    });
    flowDiagram.push(`Return Total`);
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Total Sales"], rows: [[runningTotal.toString()]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Financial Analysis", description: "Summing Q1 expenses ONLY for the Marketing department." },
    { title: "Sales Dashboards", description: "Calculating total revenue for a specific salesperson in a specific region." }
  ],
  commonMistakes: [
    "Putting the sum_range at the end. In SUMIFS, the sum_range is the FIRST argument. (In SUMIF, it's the last).",
    "Mismatched range sizes. The sum_range and all criteria_ranges MUST be the exact same height and width."
  ],
  practiceExercise: {
    question: "Write a SUMIFS to add Sales (C1:C3) if Region (A1:A3) is 'East' AND Status (B1:B3) is 'Done'.",
    table: { headers: ["A", "B", "C"], rows: [["East", "Done", "100"]] },
    expectedFormula: "=SUMIFS(C1:C3, A1:A3, \"East\", B1:B3, \"Done\")",
    expectedResult: "100"
  },
  interviewQuestions: [
    { question: "Can SUMIFS handle OR logic natively?", answer: "No, SUMIFS strictly uses AND logic for all its criteria. To do OR logic, you often have to add two separate SUMIFS functions together." }
  ],
  challengeQuestion: "How would you write a SUMIFS to sum all sales that occurred between two dates?"
};

export const SumifsLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
