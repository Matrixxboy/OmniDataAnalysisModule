# 👥 Human Resources Analytics Project

Welcome to the **HR Analytics** project! In this scenario, you are a People Analytics Specialist for a fast-growing tech company with 2,000 employees. Leadership wants to understand salary equity, the effectiveness of their training programs, and the reasons behind employee turnover.

You will use Excel and Statistics to clean the HR data, test hypotheses, and generate insights.

## 📂 Dataset Overview
File: `HR_Analytics_RealLife_Project.xlsx`

The workbook contains the following sheets:
1. **Employee_Directory:** Core roster of employees, their departments, and roles.
2. **Compensation_Demographics:** Salary, bonus, age, and job satisfaction data.
3. **Messy_Performance_Data:** A heavily flawed dataset of annual reviews requiring cleanup.
4. **Training_AB_Test:** Sales revenue data comparing employees who took a new training vs. those who didn't.
5. **Attrition_Distributions:** Data on former employees, their tenure, and reasons for leaving.

---

## 🎯 Analytical Tasks & Questions

### 1. Advanced Formulas (VLOOKUP, XLOOKUP, Text Manipulation)
*   **Data Merging:** Use `XLOOKUP` or `INDEX/MATCH` to pull the `Base_Salary` and `Job_Satisfaction` from the `Compensation_Demographics` sheet into the `Employee_Directory`.
*   **Conditional Logic:** Create a new column using an `IF` statement to flag employees as "High Earner" if their Base Salary is above $120,000.

### 2. Pivot Tables and Charts (Data Aggregation & Visualization)
*   **Department Breakdown:** Create a Pivot Table showing the headcount and Average Base Salary for each `Department`.
*   **Satisfaction Analysis:** Visualize the average `Job_Satisfaction` by `Role_Level` using a line chart to see if senior management is happier than junior staff.

### 3. Power Query (Data Cleaning)
*   **Name Formatting:** Load `Messy_Performance_Data` into Power Query. The `Employee_Name_Messy` column is a disaster. Use Power Query tools to Trim, Clean, and Capitalize Each Word.
*   **Data Types:** Filter out the rows where the `Perf_Score_out_of_100` is "N/A" and convert the column to a strict numerical data type.

### 4. Descriptive Statistics (Central Tendency & Spread)
*   **Age Distribution:** Calculate the Mean, Median, Variance, and Standard Deviation of employee `Age`.
*   **Salary Spread:** Use the `QUARTILE` function to find the 25th, 50th (median), and 75th percentiles of `Base_Salary`.

### 5. Inferential Statistics (Hypothesis Testing)
*   **Training ROI:** Open the `Training_AB_Test` sheet. The company spent $50,000 on a new Q3 Sales Training program. Run a **Two-Sample T-Test** to compare the `Q3_Sales_Revenue` of the Control group vs. the Training group.
*   **Conclusion:** Is there a statistically significant increase in sales? Was the training worth the investment?

### 6. Probability Distributions
*   **Employee Tenure:** Review the `Attrition_Distributions` sheet. Assuming employee tenure (time before quitting) follows an exponential distribution, determine the probability that an employee leaves within their first 2 years.

---
**Deliverable:** An executive summary dashboard inside your Excel file that presents your findings on salary, training effectiveness, and turnover risk.
