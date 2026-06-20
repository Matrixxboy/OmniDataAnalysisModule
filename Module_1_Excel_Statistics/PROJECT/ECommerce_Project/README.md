# 🛒 Global E-Commerce & Supply Chain Project

Welcome to the **E-Commerce Analytics** project! This dataset challenges you to act as a Data Analyst for a massive online retailer. You have been handed raw data encompassing global sales, customer demographics, marketing tests, and call center logs.

Your goal is to use Excel and Statistical methods to clean this data, uncover trends, and provide actionable business recommendations.

## 📂 Dataset Overview
File: `ECommerce_RealLife_Project.xlsx`

The workbook contains the following sheets:
1. **Sales_Data:** 5,000 transaction records containing order details, revenue, and discounts.
2. **Customer_Demographics:** Profiles of unique customers including their membership tiers and emails.
3. **Messy_Data_PowerQuery:** A legacy data export filled with formatting errors and missing values.
4. **Marketing_AB_Test:** Results from a recent A/B test comparing an old checkout page vs. a new design.
5. **Call_Center_Distributions:** Customer service wait times and satisfaction scores.

---

## 🎯 Analytical Tasks & Questions

### 1. Advanced Formulas (VLOOKUP, XLOOKUP, Text Manipulation)
*   **Data Merging:** The `Sales_Data` sheet only has a `CustomerID`. Use `XLOOKUP` or `VLOOKUP` to pull in the `Membership_Tier` from the `Customer_Demographics` sheet.
*   **Text Extraction:** Create a new column in `Customer_Demographics` that extracts just the email domain (e.g., `gmail.com`) using text formulas like `RIGHT`, `LEN`, and `FIND`.

### 2. Pivot Tables and Charts (Data Aggregation & Visualization)
*   **Revenue by Region:** Build a Pivot Table showing total revenue by `Region` and `Category`. 
*   **Visualization:** Create a Pivot Chart (e.g., a stacked bar chart) to visualize which categories dominate in the North versus the South.

### 3. Power Query (Data Cleaning)
*   **Standardization:** Load the `Messy_Data_PowerQuery` sheet into Power Query. 
*   **Cleaning Steps:** Remove trailing/leading spaces in the `Region_Code`, handle null values in `Sales_Amount`, and filter out any dates labeled as "Invalid Date". Load the clean data into a new worksheet.

### 4. Descriptive Statistics (Central Tendency & Spread)
*   **Sales Metrics:** Calculate the Mean, Median, and Mode of the `Total_Revenue` in the `Sales_Data` sheet.
*   **Variance:** What is the variance and standard deviation of the `Unit_Price`? Are the prices tightly clustered or widely spread?

### 5. Inferential Statistics (Hypothesis Testing)
*   **A/B Test Evaluation:** In the `Marketing_AB_Test` sheet, use a **Two-Sample T-Test** to compare the `Amount_Spent` between the Control group and the Variant group.
*   **Conclusion:** Is the difference statistically significant (p-value < 0.05)? Should the company roll out the new checkout design permanently?

### 6. Probability Distributions
*   **Wait Times:** Analyze the `Wait_Time_Minutes` in the `Call_Center_Distributions` sheet. Assuming wait times follow an exponential distribution with a mean of 3.5 minutes, calculate the theoretical probability that a customer waits longer than 5 minutes.

---
**Deliverable:** A polished, finalized Excel workbook containing your merged data, Pivot Charts, Power Query outputs, and a summary dashboard answering the questions above.
