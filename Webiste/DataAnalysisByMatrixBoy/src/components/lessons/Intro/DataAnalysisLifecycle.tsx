import React from 'react';
import { TheoryLessonTemplate } from '../../ui/TheoryLessonTemplate';
import type { TheoryLessonData } from '../../../types/theory';

const lifecycleData: TheoryLessonData = {
  title: "The Data Analysis Lifecycle",
  subtitle: "A proven, step-by-step framework for solving business problems",
  introduction: "Data analysis is not just opening Excel and making a chart. It is a rigorous scientific process. If you jump straight into analyzing data without clearly defining the problem first, you will waste hours generating answers to questions that nobody actually asked. The Lifecycle ensures that your analysis is focused, accurate, and actionable.",
  definitions: [
    {
      term: "The Data Lifecycle",
      definition: "A standardized sequence of 6 phases that data goes through from its initial collection to its final visualization and action."
    },
    {
      term: "ETL",
      definition: "Stands for Extract, Transform, Load. A common sub-process within the lifecycle where data is moved and cleaned."
    },
    {
      term: "Iteration",
      definition: "The lifecycle is not a straight line; it is a loop. Insights from Phase 6 often trigger new questions that send you back to Phase 1."
    }
  ],
  mainSections: [
    {
      heading: "Phase 1: Ask (Problem Definition)",
      content: [
        "This is the most critical step. Before you touch any data, you must understand the business objective. You must talk to stakeholders to figure out exactly what they are trying to achieve.",
        "A bad question: 'Can you analyze our sales data?'",
        "A good question: 'Can you analyze our Q3 sales data to determine why revenue in the Northeast region dropped by 15%, so we can adjust our marketing spend for Q4?'"
      ]
    },
    {
      heading: "Phase 2 & 3: Prepare & Process",
      content: [
        "Prepare: Identifying where the data lives. Is it in a SQL database, an Excel spreadsheet, or a third-party API? You must extract it while ensuring data privacy and security.",
        "Process (Cleaning): Real-world data is extremely messy. You will spend 60% of your time in this phase removing duplicates, fixing typos, handling NULL values, and converting text to numbers. If you skip this, your final analysis will be factually incorrect (Garbage In, Garbage Out)."
      ]
    },
    {
      heading: "Phase 4 & 5: Analyze & Share",
      content: [
        "Analyze: This is where you use formulas, pivot tables, SQL, or Python to look for patterns, trends, and correlations. You test hypotheses to answer the question defined in Phase 1.",
        "Share (Visualizing): Nobody wants to read a spreadsheet with 10,000 rows. You must summarize your findings using clear charts and dashboards. Your visualizations must tell a compelling story that a non-technical CEO can understand in 5 seconds."
      ]
    },
    {
      heading: "Phase 6: Act",
      content: [
        "Analysis is useless if it doesn't lead to action. Based on your insights, the business will make a decision: launch a new product, fire an underperforming vendor, or double a marketing budget."
      ]
    }
  ],
  keyTakeaways: [
    {
      point: "Define the problem first",
      detail: "Never start analyzing data until you know exactly what business question you are trying to answer."
    },
    {
      point: "Cleaning takes the longest",
      detail: "Expect to spend the majority of your time fixing messy, incomplete data."
    },
    {
      point: "Storytelling is mandatory",
      detail: "Your analysis must be translated into a visual story that drives a business decision."
    }
  ]
};

export const DataAnalysisLifecycle: React.FC = () => {
  return <TheoryLessonTemplate data={lifecycleData} />;
};
