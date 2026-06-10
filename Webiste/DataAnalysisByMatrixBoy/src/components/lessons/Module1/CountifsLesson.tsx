import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "COUNTIFS",
  purpose: "Counts the number of cells that meet multiple criteria.",
  syntax: "=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
  parameters: [
    { name: "criteria_range1", meaning: "The first range of cells to evaluate.", example: "A2:A5 (Status)" },
    { name: "criteria1", meaning: "The condition that must be met in the first range.", example: "\"Complete\"" },
    { name: "[criteria_range2, criteria2]", meaning: "Additional ranges and criteria.", example: "B2:B5, \"High\"" }
  ],
  initialDataset: {
    headers: ["Project", "Status", "Priority"],
    rows: [
      ["Alpha", "Complete", "High"],
      ["Beta", "In Progress", "High"],
      ["Gamma", "Complete", "Low"],
      ["Delta", "Complete", "High"]
    ]
  },
  initialUserInput: {
    headers: ["Criteria 1 (Status)", "Criteria 2 (Priority)"],
    rows: [["Complete", "High"]] 
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const targetStatus = userInput.rows[0][0];
    const targetPriority = userInput.rows[0][1];
    
    const formulaUsed = `=COUNTIFS(B2:B5, "${targetStatus}", C2:C5, "${targetPriority}")`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start COUNTIFS"];
    
    visualSteps.push({
      title: "Step 1: Identify Criteria",
      description: `Excel will count rows where Status is "${targetStatus}" AND Priority is "${targetPriority}".`,
      table: { ...dataset }
    });
    flowDiagram.push(`Set Criteria`, "Initialize Count = 0");
    
    let countTotal = 0;
    
    for (let i = 0; i < dataset.rows.length; i++) {
      const status = dataset.rows[i][1];
      const priority = dataset.rows[i][2];
      
      if (status === targetStatus && priority === targetPriority) {
        countTotal += 1;
        visualSteps.push({
          title: `Step ${i + 2}: Match Found`,
          description: `Row ${i + 1} matches BOTH criteria. Count incremented.`,
          table: { ...dataset, highlightRow: i }
        });
        flowDiagram.push(`Match Row ${i+1}`, `Count: ${countTotal}`);
      } else {
        visualSteps.push({
          title: `Step ${i + 2}: No Match`,
          description: `Row ${i + 1} does not match all criteria. Ignored.`,
          table: { ...dataset, highlightRow: i }
        });
        flowDiagram.push(`Skip Row ${i+1}`);
      }
    }
    
    visualSteps.push({
      title: `Final Step: Return Total`,
      description: `Excel has evaluated all rows and returns the final count.`,
      table: { ...dataset }
    });
    flowDiagram.push(`Return Count`);
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Total Count"], rows: [[countTotal.toString()]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Project Management", description: "Counting how many High Priority tasks are currently 'In Progress'." },
    { title: "HR Reporting", description: "Counting how many employees are in the 'Engineering' department AND have 'Active' status." }
  ],
  commonMistakes: [
    "Mismatched range sizes. All criteria_ranges MUST be the exact same height and width."
  ],
  practiceExercise: {
    question: "Write a COUNTIFS to count rows where Col A is 'Apple' and Col B is 'Red'.",
    table: { headers: ["A", "B"], rows: [["Apple", "Red"]] },
    expectedFormula: "=COUNTIFS(A1:A2, \"Apple\", B1:B2, \"Red\")",
    expectedResult: "1"
  },
  interviewQuestions: [
    { question: "How does COUNTIFS handle wildcards?", answer: "You can use wildcards like * (multiple characters) and ? (single character) in your criteria strings to do partial matches." }
  ],
  challengeQuestion: "How would you use COUNTIFS to find duplicate rows across two columns?"
};

export const CountifsLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
