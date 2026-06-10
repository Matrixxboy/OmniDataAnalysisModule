const fs = require('fs');
const path = require('path');

const lessons = [
  { id: 'sum', name: 'SUM & AVERAGE', cmp: 'SumLesson', formula: 'SUM/AVERAGE', purpose: 'Calculate totals and averages.' },
  { id: 'count', name: 'COUNT & COUNTA', cmp: 'CountLesson', formula: 'COUNT', purpose: 'Count numbers and non-empty cells.' },
  { id: 'max-min', name: 'MAX & MIN', cmp: 'MaxMinLesson', formula: 'MAX/MIN', purpose: 'Find the largest or smallest value.' },
  { id: 'round-abs', name: 'ROUND & ABS', cmp: 'RoundAbsLesson', formula: 'ROUND/ABS', purpose: 'Round numbers or find absolute values.' },
  { id: 'if', name: 'IF Statement', cmp: 'IfLesson', formula: 'IF', purpose: 'Perform logical tests.' },
  { id: 'and-or-not', name: 'AND, OR, NOT', cmp: 'AndOrNotLesson', formula: 'AND/OR', purpose: 'Combine multiple logical tests.' },
  { id: 'vlookup', name: 'VLOOKUP', cmp: 'VlookupLesson', formula: 'VLOOKUP', purpose: 'Vertical lookup in the first column.' },
  { id: 'hlookup', name: 'HLOOKUP', cmp: 'HlookupLesson', formula: 'HLOOKUP', purpose: 'Horizontal lookup in the first row.' },
  { id: 'sumif', name: 'SUMIF', cmp: 'SumifLesson', formula: 'SUMIF', purpose: 'Sum values based on one condition.' },
  { id: 'countifs', name: 'COUNTIF & COUNTIFS', cmp: 'CountifsLesson', formula: 'COUNTIFS', purpose: 'Count cells based on multiple criteria.' },
  { id: 'averageifs', name: 'AVERAGEIF & AVERAGEIFS', cmp: 'AverageifsLesson', formula: 'AVERAGEIFS', purpose: 'Average cells based on criteria.' },
  { id: 'text-extraction', name: 'LEFT, RIGHT, MID, LEN', cmp: 'TextExtractionLesson', formula: 'LEFT/RIGHT/MID', purpose: 'Extract substrings from text.' },
  { id: 'text-cleaning', name: 'TRIM, CONCAT, TEXTJOIN', cmp: 'TextCleaningLesson', formula: 'TRIM/TEXTJOIN', purpose: 'Clean and combine text strings.' },
  { id: 'filter', name: 'FILTER', cmp: 'FilterLesson', formula: 'FILTER', purpose: 'Filter a range based on boolean arrays.' },
  { id: 'sort-unique', name: 'SORT & UNIQUE', cmp: 'SortUniqueLesson', formula: 'SORT/UNIQUE', purpose: 'Sort arrays and extract unique values.' },
  { id: 'sequence', name: 'SEQUENCE', cmp: 'SequenceLesson', formula: 'SEQUENCE', purpose: 'Generate an array of sequential numbers.' },
  { id: 'date-basics', name: 'TODAY & NOW', cmp: 'DateBasicsLesson', formula: 'TODAY/NOW', purpose: 'Get current date and time.' },
  { id: 'date-advanced', name: 'DATEDIF, EDATE, EOMONTH', cmp: 'DateAdvancedLesson', formula: 'DATEDIF/EDATE', purpose: 'Advanced date math.' },
  { id: 'offset', name: 'OFFSET', cmp: 'OffsetLesson', formula: 'OFFSET', purpose: 'Return a reference offset from a starting cell.' },
  { id: 'indirect', name: 'INDIRECT', cmp: 'IndirectLesson', formula: 'INDIRECT', purpose: 'Return a reference specified by a text string.' },
  { id: 'choose', name: 'CHOOSE & TRANSPOSE', cmp: 'ChooseLesson', formula: 'CHOOSE', purpose: 'Choose a value from a list based on index.' }
];

const template = function(cmp, name, formula, purpose) {
  return "import React from 'react';\n" +
"import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';\n" +
"import type { FormulaLessonData, TableData, EvaluationResult } from '../../../types/formula';\n\n" +
"const lessonData: FormulaLessonData = {\n" +
"  formulaName: \"" + name + "\",\n" +
"  purpose: \"" + purpose + " This module covers the core mechanics of " + formula + ".\",\n" +
"  syntax: \"=" + formula + "(...)\",\n" +
"  parameters: [\n" +
"    { name: \"arg1\", meaning: \"First argument\", example: \"A1:A10\" }\n" +
"  ],\n" +
"  initialDataset: {\n" +
"    headers: [\"Category\", \"Value\"],\n" +
"    rows: [\n" +
"      [\"A\", \"10\"],\n" +
"      [\"B\", \"20\"],\n" +
"      [\"C\", \"30\"]\n" +
"    ]\n" +
"  },\n" +
"  initialUserInput: {\n" +
"    headers: [\"Input\"],\n" +
"    rows: [[\"Value\"]]\n" +
"  },\n" +
"  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {\n" +
"    return {\n" +
"      formulaUsed: \"=" + formula + "(...)\",\n" +
"      visualSteps: [\n" +
"        {\n" +
"          title: \"Step 1: Execute\",\n" +
"          description: \"Evaluating the formula.\",\n" +
"          table: dataset\n" +
"        }\n" +
"      ],\n" +
"      finalOutput: { headers: [\"Result\"], rows: [[\"Success\"]] },\n" +
"      flowDiagram: [\"Start\", \"Process\", \"Return Result\"]\n" +
"    };\n" +
"  },\n" +
"  realWorldExamples: [\n" +
"    { title: \"Example 1\", description: \"Use case for " + formula + ".\" }\n" +
"  ],\n" +
"  commonMistakes: [\n" +
"    \"Common mistake 1\"\n" +
"  ],\n" +
"  practiceExercise: {\n" +
"    question: \"Practice " + formula + "\",\n" +
"    table: { headers: [\"A\"], rows: [[\"1\"]] },\n" +
"    expectedFormula: \"=" + formula + "()\",\n" +
"    expectedResult: \"Result\"\n" +
"  },\n" +
"  interviewQuestions: [\n" +
"    { question: \"Question 1?\", answer: \"Answer 1\" }\n" +
"  ],\n" +
"  challengeQuestion: \"Challenge for " + formula + "\"\n" +
"};\n\n" +
"export const " + cmp + ": React.FC = () => {\n" +
"  return <FormulaLessonTemplate data={lessonData} />;\n" +
"};\n";
};

const dir = path.join(__dirname, 'src', 'components', 'lessons', 'Module1');

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

lessons.forEach(l => {
  const filePath = path.join(dir, l.cmp + '.tsx');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, template(l.cmp, l.name, l.formula, l.purpose));
    console.log("Generated " + l.cmp + ".tsx");
  }
});
