export interface Lesson {
  id: string;
  title: string;
  duration?: string;
  isCompleted: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const courseModules: Module[] = [
  {
    id: 'mod1',
    title: 'Module 1: Introduction to Data Analysis',
    description: 'Understand the core concepts, lifecycle, and real-world applications of data analysis.',
    lessons: [
      { id: 'what-is-da', title: 'What is Data Analysis?', duration: '5 min', isCompleted: false },
      { id: 'types-of-data', title: 'Types of Data', duration: '8 min', isCompleted: false },
      { id: 'da-lifecycle', title: 'Data Analysis Lifecycle', duration: '10 min', isCompleted: false },
      { id: 'da-applications', title: 'Real-world Applications', duration: '7 min', isCompleted: false },
    ]
  },
  {
    id: 'mod2',
    title: 'Module 2: Excel for Data Analysis',
    description: 'Master everything from basic functions to advanced dynamic arrays and nested lookups.',
    lessons: [
      // Beginner Formulas
      { id: 'sum', title: 'SUM & AVERAGE', duration: '5 min', isCompleted: false },
      { id: 'count', title: 'COUNT & COUNTA', duration: '5 min', isCompleted: false },
      { id: 'max-min', title: 'MAX & MIN', duration: '5 min', isCompleted: false },
      { id: 'round-abs', title: 'ROUND & ABS', duration: '5 min', isCompleted: false },
      
      // Logical Formulas
      { id: 'if', title: 'IF Statement', duration: '8 min', isCompleted: false },
      { id: 'nested-ifs', title: 'Nested IFS (Modern)', duration: '10 min', isCompleted: false },
      { id: 'and-or-not', title: 'AND, OR, NOT', duration: '8 min', isCompleted: false },
      
      // Lookup Formulas
      { id: 'vlookup', title: 'VLOOKUP', duration: '12 min', isCompleted: false },
      { id: 'hlookup', title: 'HLOOKUP', duration: '8 min', isCompleted: false },
      { id: 'xlookup', title: 'XLOOKUP (Advanced Search)', duration: '15 min', isCompleted: false },
      { id: 'index-match', title: 'INDEX + MATCH Power', duration: '15 min', isCompleted: false },
      
      // Conditional Formulas
      { id: 'sumif', title: 'SUMIF', duration: '8 min', isCompleted: false },
      { id: 'sumifs-iferror', title: 'SUMIFS & Error Handling', duration: '12 min', isCompleted: false },
      { id: 'countifs', title: 'COUNTIF & COUNTIFS', duration: '10 min', isCompleted: false },
      { id: 'averageifs', title: 'AVERAGEIF & AVERAGEIFS', duration: '8 min', isCompleted: false },
      
      // Text Formulas
      { id: 'text-extraction', title: 'LEFT, RIGHT, MID, LEN', duration: '12 min', isCompleted: false },
      { id: 'text-cleaning', title: 'TRIM, CONCAT, TEXTJOIN', duration: '10 min', isCompleted: false },
      
      // Dynamic Array Formulas
      { id: 'filter', title: 'FILTER', duration: '12 min', isCompleted: false },
      { id: 'sort-unique', title: 'SORT & UNIQUE', duration: '10 min', isCompleted: false },
      { id: 'sequence', title: 'SEQUENCE', duration: '5 min', isCompleted: false },
      
      // Date & Time Formulas
      { id: 'date-basics', title: 'TODAY & NOW', duration: '5 min', isCompleted: false },
      { id: 'date-advanced', title: 'DATEDIF, EDATE, EOMONTH', duration: '12 min', isCompleted: false },
      
      // Advanced Formulas
      { id: 'offset', title: 'OFFSET', duration: '15 min', isCompleted: false },
      { id: 'indirect', title: 'INDIRECT', duration: '12 min', isCompleted: false },
      { id: 'choose', title: 'CHOOSE & TRANSPOSE', duration: '10 min', isCompleted: false },
    ]
  },
  {
    id: 'mod3',
    title: 'Module 3: SQL Fundamentals',
    description: 'Learn to query databases, filter data, and join multiple tables together.',
    lessons: [
      { id: 'sql-basics', title: 'SQL Basics (SELECT, WHERE)', duration: '15 min', isCompleted: false },
      { id: 'sql-joins', title: 'Joins & Aggregations', duration: '20 min', isCompleted: false },
      { id: 'sql-advanced', title: 'Advanced SQL (Window Functions)', duration: '25 min', isCompleted: false },
    ]
  },
  {
    id: 'mod4',
    title: 'Module 4: Data Cleaning',
    description: 'Transform messy, real-world data into clean formats ready for analysis.',
    lessons: [
      { id: 'missing-values', title: 'Handling Missing Values', duration: '10 min', isCompleted: false },
      { id: 'duplicates', title: 'Duplicate Removal', duration: '8 min', isCompleted: false },
      { id: 'standardization', title: 'Data Standardization', duration: '12 min', isCompleted: false },
      { id: 'validation', title: 'Data Validation', duration: '10 min', isCompleted: false },
    ]
  },
  {
    id: 'mod5',
    title: 'Module 5: Statistics for Data Analysis',
    description: 'Understand the mathematical foundations of data behavior.',
    lessons: [
      { id: 'central-tendency', title: 'Mean, Median, Mode', duration: '10 min', isCompleted: false },
      { id: 'variance-std', title: 'Variance & Standard Deviation', duration: '15 min', isCompleted: false },
      { id: 'probability-distributions', title: 'Probability Distributions', duration: '15 min', isCompleted: false },
      { id: 'correlation', title: 'Correlation vs Causation', duration: '12 min', isCompleted: false },
      { id: 'hypothesis-testing', title: 'Hypothesis Testing (T-Test)', duration: '20 min', isCompleted: false },
      { id: 'confidence-intervals', title: 'Confidence Intervals', duration: '15 min', isCompleted: false },
      { id: 'z-score', title: 'Interactive Z-Scores', duration: '15 min', isCompleted: false },
      { id: 'linear-regression', title: 'Linear Regression Simulator', duration: '20 min', isCompleted: false },
    ]
  },
  {
    id: 'mod6',
    title: 'Module 6: Python for Data Analysis',
    description: 'Automate analysis and handle massive datasets using Python, Pandas, and NumPy.',
    lessons: [
      { id: 'python-basics', title: 'Python Basics', duration: '15 min', isCompleted: false },
      { id: 'numpy', title: 'Intro to NumPy', duration: '15 min', isCompleted: false },
      { id: 'pandas-series', title: 'Pandas Series & DataFrames', duration: '20 min', isCompleted: false },
      { id: 'reading-csv', title: 'Reading CSV & Excel Files', duration: '10 min', isCompleted: false },
      { id: 'data-manipulation', title: 'Data Manipulation in Pandas', duration: '25 min', isCompleted: false },
    ]
  },
  {
    id: 'mod7',
    title: 'Module 7: Data Visualization',
    description: 'Design compelling charts, dashboards, and reports that tell a story.',
    lessons: [
      { id: 'chart-types', title: 'Choosing the Right Chart', duration: '10 min', isCompleted: false },
      { id: 'bar-line-pie', title: 'Bar, Line & Pie Charts', duration: '12 min', isCompleted: false },
      { id: 'scatter-plots', title: 'Scatter Plots & Distributions', duration: '10 min', isCompleted: false },
      { id: 'dashboard-design', title: 'KPI & Dashboard Design', duration: '15 min', isCompleted: false },
    ]
  },
  {
    id: 'mod8',
    title: 'Module 8: Business Analytics',
    description: 'Apply data analysis directly to real-world business scenarios.',
    lessons: [
      { id: 'kpi-tracking', title: 'KPI Tracking', duration: '12 min', isCompleted: false },
      { id: 'revenue-analysis', title: 'Revenue Analysis', duration: '15 min', isCompleted: false },
      { id: 'customer-segmentation', title: 'Customer Segmentation', duration: '15 min', isCompleted: false },
      { id: 'sales-performance', title: 'Sales Performance', duration: '15 min', isCompleted: false },
    ]
  },
  {
    id: 'mod9',
    title: 'Module 9: Final Project',
    description: 'End-to-end capstone: Clean, analyze, and visualize a complete dataset.',
    lessons: [
      { id: 'capstone-intro', title: 'Project Overview & Dataset', duration: '5 min', isCompleted: false },
      { id: 'capstone-clean', title: 'Step 1: Data Cleaning', duration: '30 min', isCompleted: false },
      { id: 'capstone-analyze', title: 'Step 2: SQL & Python Analysis', duration: '45 min', isCompleted: false },
      { id: 'capstone-visualize', title: 'Step 3: Building the Dashboard', duration: '40 min', isCompleted: false },
    ]
  }
];
