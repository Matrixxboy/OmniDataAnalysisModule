import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# =========================================================
# OMNI DATA ANALYSIS PROFESSIONAL MASTER WORKBOOK
# =========================================================
# Features:
# - Professional dashboard
# - Real-world datasets
# - Tasks + guided examples
# - Formula demonstrations
# - Statistical analysis
# - Charts & conditional formatting
# - Power Query / Data Cleaning examples
# - Financial modeling
# - Interview-style exercises
# =========================================================

def generate_pro_excel():
    
    filename = "Omni_Data_Analysis_Professional_Master.xlsx"

    writer = pd.ExcelWriter(filename, engine="xlsxwriter")
    workbook = writer.book

    # =========================================================
    # GLOBAL FORMATS
    # =========================================================
    
    title_fmt = workbook.add_format({
        'bold': True,
        'font_size': 24,
        'font_color': '#1F4E78'
    })

    subtitle_fmt = workbook.add_format({
        'bold': True,
        'font_size': 14,
        'font_color': '#404040'
    })

    header_fmt = workbook.add_format({
        'bold': True,
        'bg_color': '#1F4E78',
        'font_color': 'white',
        'border': 1,
        'align': 'center',
        'valign': 'vcenter'
    })

    task_fmt = workbook.add_format({
        'bold': True,
        'bg_color': '#FFC000',
        'border': 1,
        'align': 'center',
        'font_color': '#000000'
    })

    example_fmt = workbook.add_format({
        'bold': True,
        'bg_color': '#D9EAD3',
        'border': 1,
        'font_color': '#274E13'
    })

    hint_fmt = workbook.add_format({
        'italic': True,
        'font_color': '#666666',
        'text_wrap': True
    })

    data_fmt = workbook.add_format({
        'border': 1
    })

    money_fmt = workbook.add_format({
        'num_format': '₹#,##0.00',
        'border': 1
    })

    percent_fmt = workbook.add_format({
        'num_format': '0.00%',
        'border': 1
    })

    number_fmt = workbook.add_format({
        'num_format': '#,##0',
        'border': 1
    })

    section_fmt = workbook.add_format({
        'bold': True,
        'font_size': 16,
        'font_color': '#0B5394'
    })

    # =========================================================
    # 1. DASHBOARD
    # =========================================================
    
    ws_dashboard = workbook.add_worksheet("Dashboard")

    ws_dashboard.write("B2", "OMNI DATA ANALYSIS PROFESSIONAL CERTIFICATION", title_fmt)

    ws_dashboard.write("B4", "Program Overview", section_fmt)

    dashboard_text = [
        ["Module", "Topic", "Industry Use Case", "Difficulty"],
        ["1", "Advanced Excel Formulas", "HR Payroll Automation", "Medium"],
        ["2", "Sales Analytics", "Retail Business Intelligence", "Hard"],
        ["3", "Data Engineering", "CRM Cleaning Pipeline", "Easy"],
        ["4", "Descriptive Statistics", "Real Estate Market Analysis", "Medium"],
        ["5", "Inferential Statistics", "A/B Testing for Product Teams", "Hard"],
        ["6", "Probability & Risk", "Financial Portfolio Modeling", "Advanced"]
    ]

    for r, row in enumerate(dashboard_text):
        for c, value in enumerate(row):
            fmt = header_fmt if r == 0 else data_fmt
            ws_dashboard.write(r + 5, c + 1, value, fmt)

    ws_dashboard.write("B15", "Workbook Features", section_fmt)

    features = [
        "✔ Real-world business datasets",
        "✔ Industry-level Excel formulas",
        "✔ Guided practical exercises",
        "✔ Statistical analysis examples",
        "✔ Visualization & charting",
        "✔ Interview-oriented tasks",
        "✔ Automation examples",
        "✔ Financial analytics"
    ]

    for i, feature in enumerate(features):
        ws_dashboard.write(i + 16, 1, feature)

    ws_dashboard.set_column("B:E", 35)

    # =========================================================
    # 2. MODULE 1 — ADVANCED FORMULAS
    # =========================================================

    ws1 = workbook.add_worksheet("1_Advanced_Formulas")

    ws1.write("A1", "Module 1: Advanced Excel Formulas", title_fmt)
    ws1.write("A3", "HR Payroll & Performance Dataset", subtitle_fmt)

    hr_data = {
        'Employee': ['Arjun', 'Sanya', 'Kabir', 'Riya', 'Ishaan', 'Ananya', 'Rohan', 'Myra'],
        'Department': ['Sales', 'Tech', 'Sales', 'HR', 'Tech', 'Marketing', 'Sales', 'Finance'],
        'Performance_Score': [92, 78, 85, 95, 88, 72, 65, 91],
        'Salary': [65000, 85000, 62000, 55000, 92000, 58000, 60000, 88000],
        'Region': ['North', 'West', 'South', 'North', 'East', 'West', 'North', 'South']
    }

    df_hr = pd.DataFrame(hr_data)

    df_hr.to_excel(writer, sheet_name="1_Advanced_Formulas", startrow=4, index=False)

    # ---------- TASKS ----------
    ws1.write("H5", "🎯 PRACTICAL TASKS", task_fmt)

    tasks = [
        "1. Find employee salary using XLOOKUP",
        "2. Create performance bonus using IF",
        "3. Calculate Tech department total salary",
        "4. Find highest salary using MAX",
        "5. Count employees in Sales department",
        "6. Calculate average performance score",
        "7. Use FILTER to extract Tech employees",
        "8. Use INDEX + MATCH instead of VLOOKUP"
    ]

    for i, task in enumerate(tasks):
        ws1.write(i + 6, 7, task, hint_fmt)

    # ---------- FORMULA EXAMPLES ----------
    ws1.write("H16", "📘 FORMULA EXAMPLES", example_fmt)

    examples = [
        ("XLOOKUP", '=XLOOKUP("Ishaan",A6:A13,D6:D13)'),
        ("SUMIFS", '=SUMIFS(D6:D13,B6:B13,"Tech")'),
        ("AVERAGE", '=AVERAGE(C6:C13)'),
        ("MAX", '=MAX(D6:D13)'),
        ("MIN", '=MIN(D6:D13)'),
        ("COUNTIF", '=COUNTIF(B6:B13,"Sales")'),
        ("IF", '=IF(C6>90,"Excellent","Good")'),
        ("INDEX MATCH", '=INDEX(D6:D13,MATCH("Riya",A6:A13,0))')
    ]

    for i, (name, formula) in enumerate(examples):
        ws1.write(i + 17, 7, name, header_fmt)
        ws1.write(i + 17, 8, formula, data_fmt)

    # =========================================================
    # 3. MODULE 2 — SALES ANALYTICS
    # =========================================================

    ws2 = workbook.add_worksheet("2_Sales_Analytics")

    ws2.write("A1", "Module 2: Sales Analytics & BI", title_fmt)

    np.random.seed(42)

    n = 300

    sales_df = pd.DataFrame({
        'Date': [(datetime(2024, 1, 1) + timedelta(days=i)).date() for i in range(n)],
        'Category': np.random.choice(['Technology', 'Furniture', 'Office Supplies'], n),
        'Sales': np.random.normal(5000, 1500, n).round(2),
        'Profit': np.random.normal(800, 500, n).round(2),
        'Region': np.random.choice(['North', 'South', 'East', 'West'], n)
    })

    sales_df.to_excel(writer, sheet_name="2_Sales_Analytics", startrow=4, index=False)

    ws2.write("H5", "🎯 ANALYTICS TASKS", task_fmt)

    analytics_tasks = [
        "1. Create Pivot Table for Sales by Region",
        "2. Find most profitable category",
        "3. Apply conditional formatting",
        "4. Create monthly sales trend chart",
        "5. Calculate Profit Margin",
        "6. Find top 5 highest sales days",
        "7. Build dashboard KPI cards"
    ]

    for i, t in enumerate(analytics_tasks):
        ws2.write(i + 6, 7, t, hint_fmt)

    ws2.write("H15", "📘 ANALYTICS EXAMPLES", example_fmt)

    examples2 = [
        ("Profit Margin", '=D6/C6'),
        ("Total Sales", '=SUM(C6:C305)'),
        ("Average Profit", '=AVERAGE(D6:D305)'),
        ("Highest Sale", '=MAX(C6:C305)'),
        ("Lowest Profit", '=MIN(D6:D305)')
    ]

    for i, (name, formula) in enumerate(examples2):
        ws2.write(i + 16, 7, name, header_fmt)
        ws2.write(i + 16, 8, formula, data_fmt)

    # =========================================================
    # 4. MODULE 3 — DATA ENGINEERING
    # =========================================================

    ws3 = workbook.add_worksheet("3_Data_Engineering")

    ws3.write("A1", "Module 3: Data Engineering & Cleaning", title_fmt)

    crm_data = {
        'Raw_Name': ['  john doe', 'PRIYA SHARMA', 'rahul_99', '  ananya'],
        'Phone': ['9876543210', '+91-9998887777', 'unknown', '8887776665'],
        'Tags': ['VIP;NEW', 'B2B;VIP', 'OLD', 'NEW']
    }

    crm_df = pd.DataFrame(crm_data)

    crm_df.to_excel(writer, sheet_name="3_Data_Engineering", startrow=4, index=False)

    ws3.write("F5", "🎯 CLEANING TASKS", task_fmt)

    cleaning_tasks = [
        "1. Remove extra spaces using TRIM",
        "2. Convert names using PROPER",
        "3. Split Tags using delimiter",
        "4. Remove invalid phone numbers",
        "5. Standardize country codes",
        "6. Remove duplicates",
        "7. Identify null values"
    ]

    for i, t in enumerate(cleaning_tasks):
        ws3.write(i + 6, 5, t, hint_fmt)

    ws3.write("F15", "📘 DATA CLEANING EXAMPLES", example_fmt)

    cleaning_examples = [
        ("TRIM", '=TRIM(A6)'),
        ("PROPER", '=PROPER(A6)'),
        ("LOWER", '=LOWER(A6)'),
        ("UPPER", '=UPPER(A6)'),
        ("TEXTSPLIT", '=TEXTSPLIT(C6,";")'),
        ("LEN", '=LEN(B6)'),
    ]

    for i, (name, formula) in enumerate(cleaning_examples):
        ws3.write(i + 16, 5, name, header_fmt)
        ws3.write(i + 16, 6, formula, data_fmt)

    # =========================================================
    # 5. MODULE 4 — DESCRIPTIVE STATISTICS
    # =========================================================

    ws4 = workbook.add_worksheet("4_Descriptive_Stats")

    ws4.write("A1", "Module 4: Descriptive Statistics", title_fmt)

    prices = np.random.lognormal(mean=16, sigma=0.5, size=200)

    stats_df = pd.DataFrame({
        'House_Price': prices.round(0)
    })

    stats_df.to_excel(writer, sheet_name="4_Descriptive_Stats", startrow=4, index=False)

    ws4.write("D5", "🎯 STATISTICS TASKS", task_fmt)

    stats_tasks = [
        "1. Calculate Mean",
        "2. Calculate Median",
        "3. Find Mode",
        "4. Measure Standard Deviation",
        "5. Identify Skewness",
        "6. Detect Outliers",
        "7. Create Histogram"
    ]

    for i, t in enumerate(stats_tasks):
        ws4.write(i + 6, 3, t, hint_fmt)

    ws4.write("D15", "📘 STATISTICAL FORMULAS", example_fmt)

    stat_examples = [
        ("AVERAGE", '=AVERAGE(A6:A205)'),
        ("MEDIAN", '=MEDIAN(A6:A205)'),
        ("MODE", '=MODE(A6:A205)'),
        ("STDEV", '=STDEV(A6:A205)'),
        ("VARIANCE", '=VAR(A6:A205)'),
        ("SKEWNESS", '=SKEW(A6:A205)'),
        ("QUARTILE", '=QUARTILE(A6:A205,1)')
    ]

    for i, (name, formula) in enumerate(stat_examples):
        ws4.write(i + 16, 3, name, header_fmt)
        ws4.write(i + 16, 4, formula, data_fmt)

    # =========================================================
    # 6. MODULE 5 — INFERENTIAL STATISTICS
    # =========================================================

    ws5 = workbook.add_worksheet("5_Inferential_Stats")

    ws5.write("A1", "Module 5: Inferential Statistics & A/B Testing", title_fmt)

    control = np.random.choice([0,1], size=150, p=[0.88,0.12])
    variant = np.random.choice([0,1], size=150, p=[0.83,0.17])

    ab_df = pd.DataFrame({
        'Control_A': control,
        'Variant_B': variant
    })

    ab_df.to_excel(writer, sheet_name="5_Inferential_Stats", startrow=4, index=False)

    ws5.write("D5", "🎯 HYPOTHESIS TEST TASKS", task_fmt)

    infer_tasks = [
        "1. Perform T-Test",
        "2. Compare conversion rates",
        "3. Calculate p-value",
        "4. Interpret statistical significance",
        "5. Build confidence intervals",
        "6. Decide winning variant"
    ]

    for i, t in enumerate(infer_tasks):
        ws5.write(i + 6, 3, t, hint_fmt)

    ws5.write("D14", "📘 INFERENTIAL EXAMPLES", example_fmt)

    infer_examples = [
        ("T.TEST", '=T.TEST(A6:A155,B6:B155,2,3)'),
        ("AVERAGE A", '=AVERAGE(A6:A155)'),
        ("AVERAGE B", '=AVERAGE(B6:B155)'),
        ("COUNT", '=COUNT(A6:A155)')
    ]

    for i, (name, formula) in enumerate(infer_examples):
        ws5.write(i + 15, 3, name, header_fmt)
        ws5.write(i + 15, 4, formula, data_fmt)

    # =========================================================
    # 7. MODULE 6 — PROBABILITY & RISK
    # =========================================================

    ws6 = workbook.add_worksheet("6_Risk_Modeling")

    ws6.write("A1", "Module 6: Probability & Financial Risk", title_fmt)

    returns = np.random.normal(0.001, 0.02, 250)

    risk_df = pd.DataFrame({
        'Daily_Return': returns
    })

    risk_df.to_excel(writer, sheet_name="6_Risk_Modeling", startrow=4, index=False)

    ws6.write("D5", "🎯 RISK ANALYSIS TASKS", task_fmt)

    risk_tasks = [
        "1. Calculate volatility",
        "2. Measure Value at Risk",
        "3. Create normal distribution chart",
        "4. Find probability of loss",
        "5. Simulate portfolio returns",
        "6. Compare expected vs actual returns"
    ]

    for i, t in enumerate(risk_tasks):
        ws6.write(i + 6, 3, t, hint_fmt)

    ws6.write("D14", "📘 PROBABILITY EXAMPLES", example_fmt)

    risk_examples = [
        ("STDEV", '=STDEV(A6:A255)'),
        ("AVERAGE", '=AVERAGE(A6:A255)'),
        ("NORM.DIST", '=NORM.DIST(0,AVERAGE(A6:A255),STDEV(A6:A255),TRUE)'),
        ("NORM.INV", '=NORM.INV(0.05,AVERAGE(A6:A255),STDEV(A6:A255))')
    ]

    for i, (name, formula) in enumerate(risk_examples):
        ws6.write(i + 15, 3, name, header_fmt)
        ws6.write(i + 15, 4, formula, data_fmt)

    # =========================================================
    # CHART EXAMPLE
    # =========================================================

    chart = workbook.add_chart({'type': 'line'})

    chart.add_series({
        'name': 'Daily Returns',
        'categories': '=6_Risk_Modeling!$A$6:$A$255',
        'values': '=6_Risk_Modeling!$A$6:$A$255',
    })

    chart.set_title({'name': 'Portfolio Return Trend'})
    chart.set_x_axis({'name': 'Observation'})
    chart.set_y_axis({'name': 'Return'})

    ws6.insert_chart('H5', chart)


    # =========================================================
    # 8. MODULE 7 — ADVANCED DATA CLEANING & MULTI-CHARTING
    # =========================================================

    ws7 = workbook.add_worksheet("7_Advanced_Insights")
    ws7.write("A1", "Module 7: Log Cleaning & Advanced Visual Analytics", title_fmt)

    # Simulated "Dirty" Marketing Data
    marketing_logs = {
        'Raw_Data_Log': [
            '2026-05-10 | search_ads | $$450.50 | "RE_ENGAGEMENT"',
            '2026-05-11 | social_media | $$1200.00 | "AWARENESS"',
            '2026-05-12 | email_blast | $$85.20 | "CONVERSION"',
            '2026-05-13 | search_ads | $$600.00 | "CONVERSION"',
            '2026-05-14 | influencer | $$2500.00 | "AWARENESS"',
            '2026-05-15 | social_media | $$950.00 | "RE_ENGAGEMENT"',
            '2026-05-16 | email_blast | $$110.00 | "RETENTION"',
            '2026-05-17 | affiliate | $$400.00 | "CONVERSION"'
        ],
        'Leads_Generated': [45, 120, 12, 65, 250, 88, 30, 50],
        'Actual_Conversions': [2, 5, 4, 12, 3, 8, 10, 6]
    }

    df_mkt = pd.DataFrame(marketing_logs)
    df_mkt.to_excel(writer, sheet_name="7_Advanced_Insights", startrow=4, index=False)

    # ---------- CLEANING TASKS ----------
    ws7.write("E5", "🎯 CLEANING TASKS (FORMULAS ONLY)", task_fmt)
    mkt_tasks = [
        "1. Extract Platform Name from Log string",
        "2. Extract Numeric Spend (remove $$ and |)",
        "3. Clean Intent Tag (remove quotes)",
        "4. Calculate Cost Per Acquisition (CPA)",
        "5. Calculate Conversion Rate (%)",
        "6. Create a 'Performance Score' column"
    ]
    for i, t in enumerate(mkt_tasks):
        ws7.write(i + 6, 4, t, hint_fmt)

    # ---------- ADVANCED FORMULA EXAMPLES ----------
    ws7.write("E14", "📘 ADVANCED STRING FORMULAS", example_fmt)
    mkt_examples = [
        ("Platform", '=TRIM(MID(A6, FIND("|", A6) + 1, FIND("|", A6, FIND("|", A6) + 1) - FIND("|", A6) - 1))'),
        ("Clean Spend", '=VALUE(SUBSTITUTE(MID(A6, FIND("$$", A6) + 2, 7), " ", ""))'),
        ("Intent", '=SUBSTITUTE(RIGHT(A6, LEN(A6) - FIND("\"", A6) + 1), "\"", "")'),
        ("CPA", '=E6/C6')
    ]
    for i, (name, formula) in enumerate(mkt_examples):
        ws7.write(i + 15, 4, name, header_fmt)
        ws7.write(i + 15, 5, formula, data_fmt)

    # =========================================================
    # MULTI-CHART INSIGHTS GENERATION
    # =========================================================

    # 1. COLUMN CHART: Lead vs Conversion Comparison
    chart_comp = workbook.add_chart({'type': 'column'})
    chart_comp.add_series({
        'name': 'Leads Generated',
        'values': '=7_Advanced_Insights!$B$6:$B$13',
        'fill': {'color': '#1F4E78'}
    })
    chart_comp.add_series({
        'name': 'Actual Conversions',
        'values': '=7_Advanced_Insights!$C$6:$C$13',
        'fill': {'color': '#FFC000'}
    })
    chart_comp.set_title({'name': 'Funnel Performance: Leads vs. Conversions'})
    ws7.insert_chart('H5', chart_comp)

    # 2. PIE CHART: Conversion Share by Row
    chart_pie = workbook.add_chart({'type': 'pie'})
    chart_pie.add_series({
        'name': 'Conversion Distribution',
        'categories': '=7_Advanced_Insights!$A$6:$A$13',
        'values': '=7_Advanced_Insights!$C$6:$C$13',
    })
    chart_pie.set_title({'name': 'Conversion Contribution (%)'})
    ws7.insert_chart('H20', chart_pie)

    # 3. SCATTER CHART: Spend vs. Efficiency (Placeholder for cleaned data)
    chart_scatter = workbook.add_chart({'type': 'scatter', 'subtype': 'smooth_with_markers'})
    chart_scatter.add_series({
        'name': 'ROI Trend',
        'categories': '=7_Advanced_Insights!$B$6:$B$13',
        'values': '=7_Advanced_Insights!$C$6:$C$13',
        'marker': {'type': 'circle', 'size': 8, 'border': {'color': 'red'}, 'fill': {'color': 'yellow'}},
    })
    chart_scatter.set_title({'name': 'Correlation: Leads vs. Conversion Density'})
    ws7.insert_chart('P5', chart_scatter)

    # =========================================================
    # 8. MODULE 8 — FINANCIAL MODELLING
    # =========================================================

    ws8 = workbook.add_worksheet("8_Financial_Model")
    ws8.write("A1", "Module 8: Financial Modeling & Sensitivity Analysis", title_fmt)

    # Simulated 5-Year Revenue Projection Data
    financial_data = {
        'Year': [2024, 2025, 2026, 2027, 2028],
        'Base_Revenue': [100000, 120000, 145000, 170000, 200000],
        'Growth_Rate': [0.20, 0.175, 0.2069, 0.1724, 0.1765],
        'Cost_Rate': [0.70, 0.68, 0.65, 0.64, 0.62],
        'OPEX': [15000, 16000, 18000, 19000, 22000]
    }

    df_fin = pd.DataFrame(financial_data)
    df_fin.to_excel(writer, sheet_name="8_Financial_Model", startrow=4, index=False)

    # ---------- MODELING TASKS ----------
    ws8.write("E5", "🎯 FINANCIAL MODELING TASKS", task_fmt)
    fin_tasks = [
        "1. Calculate Revenue for 5 Years",
        "2. Calculate Gross Profit",
        "3. Calculate EBITDA",
        "4. Build Sensitivity Grid (Cost vs Growth)",
        "5. Calculate Net Present Value",
        "6. Build Monte Carlo Simulation"
    ]
    for i, t in enumerate(fin_tasks):
        ws8.write(i + 6, 4, t, hint_fmt)

    # ---------- SENSITIVITY GRID (2D ARRAY) ----------
    # This demonstrates how Excel formulas reference ranges across rows and columns
    ws8.write("E16", "📘 SENSITIVITY GRID SETUP", example_fmt)
    ws8.write("E17", "Row Headers: Growth Rate (%)", hint_fmt)
    ws8.write("F17", "Col Headers: Cost Rate (%)", hint_fmt)

    # Build the Growth Rate column (F18:F22)
    for i, rate in enumerate([0.15, 0.20, 0.25]):
        ws8.write_number(i + 17, 5, rate, data_fmt)

    # Build the Cost Rate row (G18:J18)
    for i, cost in enumerate([0.60, 0.65, 0.70, 0.75]):
        ws8.write_number(17, i + 6, cost, data_fmt)

    # Formula: Calculate EBITDA for each intersection
    # E.g., G19 = (Revenue * (1 - Cost Rate)) - OPEX
    # Formula in G19: '=$B$6*(1-F19)-H$6' (Using Base Revenue B6 and OPEX H6)
    ws8.write_formula('G19', '=$B$6*(1-F19)-H$6', data_fmt)
    ws8.write_formula('G20', '=$B$6*(1-F20)-H$6', data_fmt)
    ws8.write_formula('G21', '=$B$6*(1-F21)-H$6', data_fmt)
    ws8.write_formula('H19', '=$B$6*(1-G19)-H$6', data_fmt)
    ws8.write_formula('H20', '=$B$6*(1-G20)-H$6', data_fmt)
    ws8.write_formula('H21', '=$B$6*(1-G21)-H$6', data_fmt)
    ws8.write_formula('J19', '=$B$6*(1-J19)-H$6', data_fmt)
    ws8.write_formula('J20', '=$B$6*(1-J20)-H$6', data_fmt)
    ws8.write_formula('J21', '=$B$6*(1-J21)-H$6', data_fmt)

    # =========================================================
    # 8. MODULE 9 — DATA ANALYTICS & VISUALIZATION
    # =========================================================

    ws9 = workbook.add_worksheet("9_Analytics_Viz")
    ws9.write("A1", "Module 9: Sales Analytics & Visualization", title_fmt)

    sales_data = {
        'Region': ['North', 'South', 'East', 'West', 'North', 'South', 'East', 'West', 'North', 'South'],
        'Salesperson': ['Ravi', 'Priya', 'Amit', 'Sneha', 'Ravi', 'Priya', 'Amit', 'Sneha', 'Ravi', 'Priya'],
        'Units_Sold': [150, 200, 120, 180, 130, 220, 110, 190, 160, 210],
        'Revenue': [150000, 200000, 120000, 180000, 130000, 220000, 110000, 190000, 160000, 210000]
    }
    df_sales = pd.DataFrame(sales_data)
    df_sales.to_excel(writer, sheet_name="9_Analytics_Viz", startrow=4, index=False)

    # ---------- ANALYTICS TASKS ----------
    ws9.write("E5", "🎯 DATA ANALYTICS TASKS", task_fmt)
    analytics_tasks = [
        "1. Calculate Total Revenue by Region",
        "2. Find Top Salesperson in North",
        "3. Compare Regional Performance",
        "4. Calculate Units per Salesperson",
        "5. Create Dashboard Layout"
    ]
    for i, t in enumerate(analytics_tasks):
        ws9.write(i + 6, 4, t, hint_fmt)

    # ---------- PIVOT TABLE SETUP ----------
    # We manually define where the Pivot Table will be placed
    ws9.write("E16", "📘 PIVOT TABLE SETUP", example_fmt)
    ws9.write("E17", "Data Range: A6:D15", hint_fmt)
    ws9.write("F17", "Pivot Destination: A18", hint_fmt)

    # Instruction to create Pivot Table (Manual Steps in Excel)
    pivot_instructions = [
        "1. Select Data Range (A6:D15)",
        "2. Insert > PivotTable",
        "3. Choose 'Existing Worksheet' -> $A$18",
        "4. Drag 'Region' to Rows",
        "5. Drag 'Revenue' to Values (Sum)",
        "6. Drag 'Salesperson' to Values (Count)"
    ]
    for i, instr in enumerate(pivot_instructions):
        ws9.write(i + 18, 4, instr, data_fmt)

    # =========================================================
    # 9. MODULE 10 — POWER QUERY AUTOMATION
    # =========================================================

    for sheet in writer.sheets.values():
        sheet.set_column('A:Z', 22)
        sheet.freeze_panes(5, 0)

    # =========================================================
    # SAVE
    # =========================================================

    writer.close()

    print(f"\n✅ Professional Excel Workbook Generated Successfully!")
    print(f"📁 File Name: {filename}")


# =========================================================
# MAIN
# =========================================================

if __name__ == "__main__":
    generate_pro_excel()