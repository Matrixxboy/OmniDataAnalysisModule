import React from 'react';
import { TheoryLessonTemplate } from '../../ui/TheoryLessonTemplate';
import type { TheoryLessonData } from '../../../types/theory';

const realWorldApplicationsData: TheoryLessonData = {
  title: "Real-World Applications",
  subtitle: "How data analysis drives the modern economy across all industries",
  introduction: "Data analysis is not restricted to tech companies in Silicon Valley. Today, every single industry—from farming to healthcare, retail to professional sports—relies heavily on data analysts to optimize operations and predict the future.",
  definitions: [
    {
      term: "Descriptive Analytics",
      definition: "What happened? (e.g., Analyzing last month's sales report to see that revenue dropped by 10%)."
    },
    {
      term: "Predictive Analytics",
      definition: "What will happen? (e.g., Using historical sales data and seasonal trends to forecast next month's revenue)."
    },
    {
      term: "Prescriptive Analytics",
      definition: "What should we do? (e.g., Using an algorithm to automatically adjust product prices in real-time to maximize profit)."
    }
  ],
  mainSections: [
    {
      heading: "E-Commerce & Retail",
      content: [
        "Companies like Amazon use predictive analytics for 'Recommendation Engines'. By analyzing your past purchases and the purchases of millions of similar users, the system predicts what you are most likely to buy next and puts it on your homepage.",
        "Retailers use data for Inventory Management. By analyzing purchasing trends, a grocery store knows exactly how many extra turkeys to stock the week before Thanksgiving, preventing both lost sales and spoiled food."
      ]
    },
    {
      heading: "Healthcare & Medicine",
      content: [
        "Hospitals analyze patient intake data to predict emergency room wait times and optimize nurse staffing schedules.",
        "On a larger scale, epidemiological data analysis is used to track the spread of infectious diseases across continents, allowing governments to allocate vaccines and resources to the areas that will be hit hardest next week."
      ]
    },
    {
      heading: "Finance & Banking",
      content: [
        "Credit card companies use real-time data analysis for Fraud Detection. If your credit card is used in New York at 1:00 PM and then used in London at 2:00 PM, an algorithm instantly flags the transaction as physically impossible and blocks it.",
        "Investment firms use automated algorithms to analyze millions of data points (news articles, earnings reports, social media sentiment) to execute stock trades in milliseconds."
      ]
    },
    {
      heading: "Sports & Entertainment",
      content: [
        "Professional sports teams use 'Moneyball' analytics. Instead of relying on a scout's intuition, baseball teams analyze player statistics to find undervalued players who have high on-base percentages.",
        "Netflix uses data to decide which TV shows to produce. They analyzed viewership data to realize that users who liked David Fincher movies also liked Kevin Spacey, which led directly to their multi-million dollar investment in the hit show House of Cards."
      ]
    }
  ],
  keyTakeaways: [
    {
      point: "Universal Need",
      detail: "Data analysts are hired in every single sector, not just technology."
    },
    {
      point: "Three Levels of Analysis",
      detail: "Analysis progresses from Descriptive (what happened) to Predictive (what will happen) to Prescriptive (what to do)."
    },
    {
      point: "Massive ROI",
      detail: "Effective data analysis directly generates revenue or saves costs, making analysts highly valuable to businesses."
    }
  ]
};

export const RealWorldApplications: React.FC = () => {
  return <TheoryLessonTemplate data={realWorldApplicationsData} />;
};
