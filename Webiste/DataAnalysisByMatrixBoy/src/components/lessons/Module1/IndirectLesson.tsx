import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "INDIRECT",
  purpose: "Returns the reference specified by a text string. It converts text that looks like a cell reference into an actual, functional cell reference.",
  syntax: "=INDIRECT(ref_text, [a1])",
  parameters: [
    { name: "ref_text", meaning: "A text string that describes a cell reference.", example: "\"B2\" or A1" },
    { name: "[a1]", meaning: "Optional. TRUE (default) means A1-style reference. FALSE means R1C1-style.", example: "TRUE" }
  ],
  initialDataset: {
    headers: ["A", "B", "C"],
    rows: [
      ["B2", "Hidden Treasure!", "C3"],
      ["C2", "Empty", "Empty"],
      ["A1", "Empty", "Another Treasure!"]
    ]
  },
  initialUserInput: {
    headers: ["Text to Evaluate"],
    rows: [["A2"]] // User types A2. A2 contains the text "B2". INDIRECT("B2") returns "Hidden Treasure!"
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const inputRef = userInput.rows[0][0].toUpperCase();
    
    const formulaUsed = `=INDIRECT(${inputRef})`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start INDIRECT"];
    
    // Parse the inputRef (e.g. A2) to find what text is inside it
    const colChar = inputRef.charAt(0);
    const rowNum = parseInt(inputRef.substring(1));
    
    const colIdx = colChar.charCodeAt(0) - 65; // A=0, B=1, C=2
    const rowIdx = rowNum - 2; // Data starts at row 2 in UI, so row 2 is index 0
    
    if (isNaN(rowIdx) || rowIdx < 0 || rowIdx >= dataset.rows.length || colIdx < 0 || colIdx >= dataset.headers.length) {
      visualSteps.push({
        title: "Step 1: Invalid Initial Reference",
        description: `The cell ${inputRef} doesn't exist in our demo table.`,
        table: { ...dataset }
      });
      flowDiagram.push("Invalid Reference", "Return #REF!");
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Result"], rows: [["#REF!"]] },
        flowDiagram
      };
    }
    
    const stringValueInside = dataset.rows[rowIdx][colIdx];
    
    visualSteps.push({
      title: "Step 1: Read the Text",
      description: `Excel goes to ${inputRef} and reads the text inside it: "${stringValueInside}".`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: colIdx }
    });
    flowDiagram.push(`Go to ${inputRef}`, `Read Text: "${stringValueInside}"`);
    
    // Parse the stringValueInside (e.g. B2) to find the final value
    const finalColChar = stringValueInside.charAt(0);
    const finalRowNum = parseInt(stringValueInside.substring(1));
    
    const finalColIdx = finalColChar.charCodeAt(0) - 65;
    const finalRowIdx = finalRowNum - 2;
    
    if (isNaN(finalRowIdx) || finalRowIdx < 0 || finalRowIdx >= dataset.rows.length || finalColIdx < 0 || finalColIdx >= dataset.headers.length) {
      visualSteps.push({
        title: "Step 2: Evaluate the Text as a Reference",
        description: `INDIRECT converts "${stringValueInside}" into a reference, but ${stringValueInside} is invalid or out of bounds.`,
        table: { ...dataset }
      });
      flowDiagram.push(`Convert to Ref`, `Invalid Target`, `Return #REF!`);
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Result"], rows: [["#REF!"]] },
        flowDiagram
      };
    }
    
    const finalValue = dataset.rows[finalRowIdx][finalColIdx];
    
    visualSteps.push({
      title: "Step 2: Evaluate as Reference",
      description: `INDIRECT treats the text "${stringValueInside}" as a cell address and grabs the value there. Result: "${finalValue}"`,
      table: { ...dataset, highlightRow: finalRowIdx, highlightCol: finalColIdx }
    });
    flowDiagram.push(`Convert text to Ref`, `Extract "${finalValue}"`);
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Result"], rows: [[finalValue]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Dynamic Sheet References", description: "Creating a summary sheet where you can type 'Jan', 'Feb', 'Mar' in a cell, and formulas automatically pull data from the corresponding monthly tabs (e.g., =INDIRECT(A1 & \"!B2\"))." },
    { title: "Dependent Dropdowns", description: "Using Data Validation where the second dropdown's options are based on the named range selected in the first dropdown." }
  ],
  commonMistakes: [
    "Like OFFSET, INDIRECT is a volatile function. It recalculates constantly and can slow down large files.",
    "Forgetting quotes around text when building the reference manually (e.g. INDIRECT(\"A\" & 1) is correct, INDIRECT(A & 1) is not)."
  ],
  practiceExercise: {
    question: "If A1 contains the text 'B1', and B1 contains 'Hello', what does =INDIRECT(A1) return?",
    table: { headers: ["A", "B"], rows: [["B1", "Hello"]] },
    expectedFormula: "=INDIRECT(A1)",
    expectedResult: "Hello"
  },
  interviewQuestions: [
    { question: "Why does =INDIRECT(\"A1\") return a value, but =INDIRECT(A1) returns #REF! (assuming A1 has a number in it)?", answer: "With quotes, it directly targets cell A1. Without quotes, it reads the contents of A1. If A1 contains '500', it tries to find cell '500', which doesn't exist, causing a #REF! error." }
  ],
  challengeQuestion: "How would you use INDIRECT to sum a range dynamically if the starting and ending rows change?"
};

export const IndirectLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
