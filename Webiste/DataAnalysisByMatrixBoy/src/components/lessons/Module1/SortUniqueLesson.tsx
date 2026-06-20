import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "SORT & UNIQUE",
  purpose: "SORT orders data alphabetically or numerically. UNIQUE extracts a list of distinct values, removing duplicates.",
  syntax: "=SORT(UNIQUE(array))",
  parameters: [
    { name: "array", meaning: "The range to sort or find unique values for.", example: "A2:A10" }
  ],
  initialDataset: {
    headers: ["Categories"],
    rows: [
      ["Electronics"],
      ["Clothing"],
      ["Electronics"],
      ["Books"],
      ["Clothing"],
      ["Appliances"]
    ]
  },
  initialUserInput: {
    headers: ["Operation"],
    rows: [["SORT & UNIQUE"]] 
  },
  evaluate: (dataset: TableData, _userInput: TableData): EvaluationResult => {
    const formulaUsed = `=SORT(UNIQUE(A2:A7))`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start"];
    
    visualSteps.push({
      title: "Step 1: Read Array",
      description: `Reading the original column of Categories.`,
      table: { ...dataset, highlightCol: 0 }
    });
    flowDiagram.push("Read Column A", "Execute UNIQUE");
    
    // Step 2: UNIQUE
    const uniqueVals = new Set<string>();
    const uniqueRows: string[][] = [];
    
    for (let i = 0; i < dataset.rows.length; i++) {
      const val = dataset.rows[i][0];
      if (!uniqueVals.has(val)) {
        uniqueVals.add(val);
        uniqueRows.push([val]);
      }
    }
    
    visualSteps.push({
      title: "Step 2: Apply UNIQUE",
      description: `Removed duplicate 'Electronics' and 'Clothing'. We now have ${uniqueRows.length} distinct categories.`,
      table: { headers: ["UNIQUE Categories"], rows: uniqueRows }
    });
    flowDiagram.push(`Removed Duplicates`, "Execute SORT");
    
    // Step 3: SORT
    const sortedRows = [...uniqueRows].sort((a, b) => a[0].localeCompare(b[0]));
    
    visualSteps.push({
      title: "Step 3: Apply SORT",
      description: `Sorting the unique list alphabetically from A to Z.`,
      table: { headers: ["SORTED UNIQUE Categories"], rows: sortedRows }
    });
    flowDiagram.push(`Sort A-Z`, "Spill Results");
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Result"], rows: sortedRows },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Dropdown Menus", description: "Creating a clean, alphabetical list of choices for Data Validation dropdowns." }
  ],
  commonMistakes: [
    "Not leaving enough empty space below the formula for the results to #SPILL!."
  ],
  practiceExercise: {
    question: "Write a formula to get unique values from A1:A4, then sort them.",
    table: { headers: ["A"], rows: [["Cat"], ["Dog"], ["Cat"], ["Ant"]] },
    expectedFormula: "=SORT(UNIQUE(A1:A4))",
    expectedResult: "Ant, Cat, Dog"
  },
  interviewQuestions: [
    { question: "Can UNIQUE check across multiple columns?", answer: "Yes, if you pass a multi-column array to UNIQUE, it will extract distinct ROW combinations." }
  ],
  challengeQuestion: "How would you sort a table based on the 3rd column instead of the 1st?"
};

export const SortUniqueLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
