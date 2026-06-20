# 🏥 Healthcare & Hospital Operations Project

Welcome to the **Healthcare Analytics** project! You are a Data Analyst for a regional hospital network. The hospital administrator has tasked you with analyzing patient demographics, standardizing faulty billing data, and evaluating the clinical success of a new medication trial.

This project will rigorously test your Excel data modeling and statistical testing capabilities.

## 📂 Dataset Overview
File: `Healthcare_Analytics_RealLife_Project.xlsx`

The workbook contains the following sheets:
1. **Patient_Records:** Master list of 1,500 patients, their ages, and insurance providers.
2. **Hospital_Admissions:** Records of hospital stays, treatment costs, and departments.
3. **Messy_Billing_Data:** Flawed accounting data containing invoice errors.
4. **Medication_AB_Trial:** Clinical trial data measuring blood pressure reduction across two groups.
5. **ER_Distributions:** Emergency Room hourly arrival logs and triage wait times.

---

## 🎯 Analytical Tasks & Questions

### 1. Advanced Formulas (VLOOKUP, XLOOKUP, Text Manipulation)
*   **Patient Mapping:** The `Hospital_Admissions` sheet lacks demographic data. Use `XLOOKUP` to pull `Age` and `Insurance_Provider` from the `Patient_Records` sheet using the `Patient_ID`.
*   **Date Math:** Calculate the exact age of patients as of today using the `Date_of_Birth` column and functions like `DATEDIF` or `YEARFRAC`.

### 2. Pivot Tables and Charts (Data Aggregation & Visualization)
*   **Cost Analysis:** Build a Pivot Table calculating the Total and Average `Treatment_Cost` grouped by `Department`.
*   **Insurance Breakdown:** Create a Pie Chart or Donut Chart showing the percentage breakdown of admissions by `Insurance_Provider`.

### 3. Power Query (Data Cleaning)
*   **Standardizing Status:** Load the `Messy_Billing_Data` into Power Query. The `Status Code` column has trailing spaces and inconsistent casing (e.g., " pd", "UNPAID "). Standardize this column to only say "Paid", "Unpaid", "Pending", or "Void".
*   **Handling Errors:** Find the rows where `Billing_Date` is "ERROR-DATE" and replace them with nulls, or filter them out completely. Load the cleaned data into Excel.

### 4. Descriptive Statistics (Central Tendency & Spread)
*   **Length of Stay:** What is the average (mean) `Length_of_Stay_Days`? Calculate the standard deviation. Are there any patients staying significantly longer than the average?
*   **Cost Variance:** Calculate the variance in `Treatment_Cost`. Which department has the highest variance in its billing?

### 5. Inferential Statistics (Hypothesis Testing)
*   **Clinical Trial Results:** In the `Medication_AB_Trial` sheet, half the patients received standard meds and half received a new trial drug. Run a **Two-Sample T-Test** on the `Systolic_BP_Reduction`.
*   **Conclusion:** Does the new medication cause a statistically significant greater reduction in blood pressure than the standard medication? (Check if p-value < 0.05).

### 6. Probability Distributions
*   **ER Arrivals:** Look at the `ER_Distributions` sheet. Emergency room arrivals typically follow a Poisson distribution. Given the average arrival rate (`Patients_Arrived_This_Hour`), calculate the probability of the ER being overwhelmed with exactly 15 patients in a single hour using `POISSON.DIST`.

---
**Deliverable:** A comprehensive hospital operations report in Excel, highlighting cleaned billing metrics, the results of the clinical trial, and ER capacity risks.
