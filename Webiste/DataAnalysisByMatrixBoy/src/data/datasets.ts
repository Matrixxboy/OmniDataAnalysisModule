export interface Dataset {
  id: string;
  slug: string;
  title: string;
  industry: string;
  description: string;
  scenario: string;
  fileName: string;
  downloadUrl: string;
  analyticalTasks: {
    category: string;
    questions: string[];
  }[];
}

export const datasets: Dataset[] = [
  {
    id: 'ecommerce',
    slug: 'ecommerce-supply-chain',
    title: 'Global E-Commerce & Supply Chain Project',
    industry: 'Retail & Global Supply Chain',
    description: 'A massive online retailer dataset encompassing global sales, customer demographics, marketing tests, and call center logs.',
    scenario: 'You have been handed raw data encompassing global sales, customer demographics, marketing tests, and call center logs. Your goal is to use Excel and Statistical methods to clean this data, uncover trends, and provide actionable business recommendations.',
    fileName: 'ECommerce_Project.zip',
    downloadUrl: '/datasets/ECommerce_Project.zip',
    analyticalTasks: [
      {
        category: 'Advanced Formulas',
        questions: [
          'Use XLOOKUP or VLOOKUP to pull in Membership_Tier from the Customer_Demographics sheet.',
          'Extract just the email domain (e.g., gmail.com) using text formulas like RIGHT, LEN, and FIND.'
        ]
      },
      {
        category: 'Pivot Tables & Charts',
        questions: [
          'Build a Pivot Table showing total revenue by Region and Category.',
          'Create a Pivot Chart to visualize which categories dominate in the North versus the South.'
        ]
      },
      {
        category: 'Power Query',
        questions: [
          'Remove trailing/leading spaces in the Region_Code.',
          'Handle null values in Sales_Amount, and filter out any dates labeled as "Invalid Date".'
        ]
      },
      {
        category: 'Descriptive Statistics',
        questions: [
          'Calculate the Mean, Median, and Mode of the Total_Revenue.',
          'What is the variance and standard deviation of the Unit_Price?'
        ]
      },
      {
        category: 'Inferential Statistics',
        questions: [
          'Use a Two-Sample T-Test to compare the Amount_Spent between the Control group and the Variant group.',
          'Is the difference statistically significant (p-value < 0.05)?'
        ]
      },
      {
        category: 'Probability Distributions',
        questions: [
          'Assuming wait times follow an exponential distribution with a mean of 3.5 minutes, calculate the theoretical probability that a customer waits longer than 5 minutes.'
        ]
      }
    ]
  },
  {
    id: 'hr-analytics',
    slug: 'hr-analytics-project',
    title: 'Human Resources Analytics Project',
    industry: 'Corporate HR & People Analytics',
    description: 'A 2,000-person tech company HR dataset covering compensation, performance reviews, training efficacy, and employee attrition.',
    scenario: 'You are a People Analytics Specialist. Leadership wants to understand salary equity, the effectiveness of their training programs, and the reasons behind employee turnover.',
    fileName: 'HR_Analytics_Project.zip',
    downloadUrl: '/datasets/HR_Analytics_Project.zip',
    analyticalTasks: [
      {
        category: 'Advanced Formulas',
        questions: [
          'Use XLOOKUP or INDEX/MATCH to pull the Base_Salary and Job_Satisfaction into the Employee_Directory.',
          'Create a new column using an IF statement to flag employees as "High Earner" if Base Salary > $120,000.'
        ]
      },
      {
        category: 'Pivot Tables & Charts',
        questions: [
          'Create a Pivot Table showing the headcount and Average Base Salary for each Department.',
          'Visualize the average Job_Satisfaction by Role_Level using a line chart.'
        ]
      },
      {
        category: 'Power Query',
        questions: [
          'Use Power Query tools to Trim, Clean, and Capitalize Each Word in the Employee_Name_Messy column.',
          'Filter out rows where Perf_Score_out_of_100 is "N/A" and convert to numerical data type.'
        ]
      },
      {
        category: 'Descriptive Statistics',
        questions: [
          'Calculate the Mean, Median, Variance, and Standard Deviation of employee Age.',
          'Use the QUARTILE function to find the 25th, 50th (median), and 75th percentiles of Base_Salary.'
        ]
      },
      {
        category: 'Inferential Statistics',
        questions: [
          'Run a Two-Sample T-Test to compare Q3_Sales_Revenue of the Control group vs. the Training group.',
          'Is there a statistically significant increase in sales? Was the $50,000 training worth the investment?'
        ]
      },
      {
        category: 'Probability Distributions',
        questions: [
          'Assuming employee tenure follows an exponential distribution, determine the probability that an employee leaves within their first 2 years.'
        ]
      }
    ]
  },
  {
    id: 'healthcare',
    slug: 'healthcare-hospital-operations',
    title: 'Healthcare & Hospital Operations Project',
    industry: 'Medical Operations & Clinical Research',
    description: 'A regional hospital network dataset analyzing patient demographics, standardizing faulty billing data, and evaluating a clinical medication trial.',
    scenario: 'You are a Data Analyst for a hospital network. The administrator has tasked you with analyzing patient demographics, standardizing faulty billing data, and evaluating the clinical success of a new medication trial.',
    fileName: 'Healthcare_Project.zip',
    downloadUrl: '/datasets/Healthcare_Project.zip',
    analyticalTasks: [
      {
        category: 'Advanced Formulas',
        questions: [
          'Use XLOOKUP to pull Age and Insurance_Provider from the Patient_Records sheet using the Patient_ID.',
          'Calculate the exact age of patients using Date_of_Birth and functions like DATEDIF or YEARFRAC.'
        ]
      },
      {
        category: 'Pivot Tables & Charts',
        questions: [
          'Build a Pivot Table calculating Total and Average Treatment_Cost grouped by Department.',
          'Create a Donut Chart showing the percentage breakdown of admissions by Insurance_Provider.'
        ]
      },
      {
        category: 'Power Query',
        questions: [
          'Standardize the Status Code column to only say "Paid", "Unpaid", "Pending", or "Void".',
          'Find rows where Billing_Date is "ERROR-DATE" and replace them with nulls, or filter them out.'
        ]
      },
      {
        category: 'Descriptive Statistics',
        questions: [
          'What is the average Length_of_Stay_Days? Calculate the standard deviation.',
          'Calculate the variance in Treatment_Cost. Which department has the highest variance?'
        ]
      },
      {
        category: 'Inferential Statistics',
        questions: [
          'Run a Two-Sample T-Test on the Systolic_BP_Reduction between standard meds and new trial drug.',
          'Does the new medication cause a statistically significant greater reduction in blood pressure?'
        ]
      },
      {
        category: 'Probability Distributions',
        questions: [
          'Given the average arrival rate, calculate the probability of the ER being overwhelmed with exactly 15 patients in a single hour using POISSON.DIST.'
        ]
      }
    ]
  }
];
