import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "AVERAGEIFS",
  purpose: "Calculates the average (arithmetic mean) of all cells that meet multiple criteria.",
  syntax: "=AVERAGEIFS(average_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
  parameters: [
    { name: "average_range", meaning: "The range of cells to average.", example: "C2:C5 (Scores)" },
    { name: "criteria_range1", meaning: "The range of cells to evaluate against criteria1.", example: "A2:A5 (Class)" },
    { name: "criteria1", meaning: "The condition that must be met in criteria_range1.", example: "\"Math\"" }
  ],
  initialDataset: {
    headers: ["Class", "Student", "Score"],
    rows: [
      ["Math", "Alice", "90"],
      ["Science", "Bob", "85"],
      ["Math", "Charlie", "80"],
      ["Math", "Diana", "70"]
    ]
  },
  initialUserInput: {
    headers: ["Criteria 1 (Class)"],
    rows: [["Math"]] 
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const targetClass = userInput.rows[0][0];
    
    const formulaUsed = `=AVERAGEIFS(C2:C5, A2:A5, "${targetClass}")`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start AVERAGEIFS"];
    
    visualSteps.push({
      title: "Step 1: Identify Average Range & Criteria",
      description: `Excel targets 'Score' (Col C) to average, where Class is "${targetClass}".`,
      table: { ...dataset }
    });
    flowDiagram.push(`Set Criteria`, "Init Total=0, Count=0");
    
    let runningTotal = 0;
    let matchCount = 0;
    
    for (let i = 0; i < dataset.rows.length; i++) {
      const cls = dataset.rows[i][0];
      const score = parseFloat(dataset.rows[i][2]) || 0;
      
      if (cls === targetClass) {
        runningTotal += score;
        matchCount += 1;
        visualSteps.push({
          title: `Step ${i + 2}: Match Found`,
          description: `Row ${i + 1} matches criteria (Class="${cls}"). Adding ${score} to total. (Current count: ${matchCount})`,
          table: { ...dataset, highlightRow: i, highlightCol: 2 }
        });
        flowDiagram.push(`Match Row ${i+1}`, `Sum: ${runningTotal}`);
      } else {
        visualSteps.push({
          title: `Step ${i + 2}: No Match`,
          description: `Row ${i + 1} does not match criteria. (Class="${cls}"). Ignored.`,
          table: { ...dataset, highlightRow: i }
        });
        flowDiagram.push(`Skip Row ${i+1}`);
      }
    }
    
    const finalAverage = matchCount > 0 ? (runningTotal / matchCount) : 0;
    
    visualSteps.push({
      title: `Final Step: Calculate Average`,
      description: `Excel divides the Total Sum (${runningTotal}) by the Match Count (${matchCount}) to get ${finalAverage}.`,
      table: { ...dataset }
    });
    flowDiagram.push(`Divide by ${matchCount}`, `Return Average`);
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Average Score"], rows: [[finalAverage.toString()]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Education", description: "Calculating the average test score for students in a specific section." },
    { title: "Sales Analysis", description: "Finding the average order value for a specific product category." }
  ],
  commonMistakes: [
    "Getting a #DIV/0! error. This happens if NO cells meet your criteria, because Excel tries to divide by zero.",
    "Putting the average_range at the end. Like SUMIFS, it MUST be the first argument."
  ],
  practiceExercise: {
    question: "Write an AVERAGEIFS to average Col C where Col A is 'Dog' and Col B is 'Brown'.",
    table: { headers: ["A", "B", "C"], rows: [["Dog", "Brown", "50"]] },
    expectedFormula: "=AVERAGEIFS(C1:C2, A1:A2, \"Dog\", B1:B2, \"Brown\")",
    expectedResult: "50"
  },
  interviewQuestions: [
    { question: "How do you handle the #DIV/0! error in AVERAGEIFS?", answer: "Wrap the entire AVERAGEIFS function in an IFERROR function: =IFERROR(AVERAGEIFS(...), 0)." }
  ],
  challengeQuestion: "How would you average only the top 10% of scores within a specific class?"
};

export const AverageifsLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
