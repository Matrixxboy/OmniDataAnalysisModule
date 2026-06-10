import React from 'react';
import { TheoryLessonTemplate } from '../../ui/TheoryLessonTemplate';
import type { TheoryLessonData } from '../../../types/theory';

const whatIsDataAnalysisData: TheoryLessonData = {
  title: "What is Data Analysis?",
  subtitle: "Transforming raw data into actionable business intelligence",
  introduction: "In today's digital economy, data is often called the 'new oil'. However, just like raw oil, raw data is essentially useless until it is refined, processed, and analyzed. Data analysis is the process of extracting meaningful insights from raw data to help businesses make informed, strategic decisions.",
  definitions: [
    {
      term: "Data Analysis",
      definition: "The systematic application of logical and statistical techniques to describe, illustrate, condense, and evaluate data."
    },
    {
      term: "Data-Driven Decision Making",
      definition: "The practice of basing business decisions on data analysis rather than intuition or personal experience."
    },
    {
      term: "Insights",
      definition: "Actionable conclusions drawn from analyzing data that directly influence business strategy."
    }
  ],
  mainSections: [
    {
      heading: "Why is Data Analysis Important?",
      content: [
        "Without data analysis, companies are essentially flying blind. They make guesses about what their customers want, which marketing campaigns are working, and where they are losing money.",
        "Data analysis allows organizations to optimize their operations. For example, a logistics company can analyze traffic patterns to find the fastest delivery routes, saving millions of dollars in fuel costs.",
        "It also helps mitigate risks. By analyzing historical financial data, banks can predict which loan applicants are most likely to default, significantly reducing their financial exposure."
      ],
      imagePlaceholder: "Illustration of a business dashboard turning into a rocket ship"
    },
    {
      heading: "The Role of a Data Analyst",
      content: [
        "A Data Analyst is a translator. They sit exactly in the middle between raw technical databases and non-technical business stakeholders (like CEOs, Marketing Managers, or Sales Directors).",
        "Their job isn't just to write code or build spreadsheets. Their job is to answer business questions. If the CEO asks, 'Why did our sales drop last month?', the Data Analyst must query the database, clean the data, find the root cause, and present the answer in a simple, visual chart.",
        "Successful Data Analysts possess a unique blend of three skills: Technical Skills (SQL, Excel, Python), Mathematical Skills (Statistics), and Business Acumen (Understanding the company's goals)."
      ]
    }
  ],
  keyTakeaways: [
    {
      point: "Data requires refinement",
      detail: "Raw data is useless. It must be cleaned, transformed, and analyzed to hold value."
    },
    {
      point: "Analysts are translators",
      detail: "The primary job of an analyst is to translate complex data into simple business answers."
    },
    {
      point: "Reduces guesswork",
      detail: "Data analysis replaces 'gut feeling' with statistical confidence."
    }
  ]
};

export const WhatIsDataAnalysis: React.FC = () => {
  return <TheoryLessonTemplate data={whatIsDataAnalysisData} />;
};
