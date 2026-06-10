import React from 'react';
import { TheoryLessonTemplate } from '../../ui/TheoryLessonTemplate';
import type { TheoryLessonData } from '../../../types/theory';

const typesOfDataData: TheoryLessonData = {
  title: "Types of Data",
  subtitle: "Qualitative vs Quantitative: The building blocks of analysis",
  introduction: "Before you can analyze data, you must understand what kind of data you are looking at. Different types of data require completely different mathematical techniques and visualizations. If you try to calculate the 'average' of a list of zip codes, the math will work, but the answer will be completely meaningless!",
  definitions: [
    {
      term: "Quantitative Data",
      definition: "Numerical data that can be measured or counted. It answers questions like 'How much?' or 'How many?'"
    },
    {
      term: "Qualitative Data",
      definition: "Categorical or descriptive data that cannot be measured mathematically. It answers 'What type?' or 'Which category?'"
    },
    {
      term: "Discrete vs Continuous",
      definition: "Quantitative data can be Discrete (counted in whole numbers, like cars) or Continuous (measured infinitely, like height)."
    }
  ],
  mainSections: [
    {
      heading: "Quantitative Data (The Numbers)",
      content: [
        "Quantitative data is the bread and butter of statistical analysis. Because it consists of raw numbers, you can perform mathematical operations on it (like sum, average, variance).",
        "It is split into two sub-types: Discrete and Continuous.",
        "Discrete Data represents countable, distinct items. You can have 2 or 3 employees, but you cannot have 2.5 employees.",
        "Continuous Data represents measurements on a scale. A person's height could be 175cm, 175.5cm, or 175.534cm. Temperature, weight, and time are all continuous."
      ]
    },
    {
      heading: "Qualitative Data (The Categories)",
      content: [
        "Qualitative data describes qualities or characteristics. It is grouped into categories rather than measured by numbers.",
        "It is split into two sub-types: Nominal and Ordinal.",
        "Nominal Data represents categories with NO inherent order. Examples include eye color (Blue, Brown, Green) or car brands (Toyota, Ford, Honda). One is not 'higher' or 'better' than the other.",
        "Ordinal Data represents categories that HAVE a specific logical order, but the distance between them isn't mathematically uniform. A classic example is a customer satisfaction survey: 'Poor, Fair, Good, Excellent'. We know 'Good' is better than 'Fair', but we can't mathematically say it is exactly 2x better."
      ]
    },
    {
      heading: "Why Does This Matter?",
      content: [
        "Your data type dictates your entire analysis approach. If you have Continuous Quantitative data (like stock prices), you might use a Line Chart to show trends over time.",
        "If you have Nominal Qualitative data (like product categories), you cannot make a line chart. You must use a Bar Chart or a Pie Chart to show the count of each category."
      ]
    }
  ],
  keyTakeaways: [
    {
      point: "Quantitative = Numbers",
      detail: "Used for math and statistical measurements."
    },
    {
      point: "Qualitative = Categories",
      detail: "Used for grouping and segmenting data."
    },
    {
      point: "Dictates Visualizations",
      detail: "The type of data strictly determines which chart types are valid."
    }
  ]
};

export const TypesOfData: React.FC = () => {
  return <TheoryLessonTemplate data={typesOfDataData} />;
};
