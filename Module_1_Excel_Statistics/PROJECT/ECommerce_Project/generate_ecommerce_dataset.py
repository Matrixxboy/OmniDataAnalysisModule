import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

def generate_ecommerce_data():
    np.random.seed(42)
    
    # 1. Sales Data (For Pivot Tables, Charts, Descriptive Stats)
    num_records = 5000
    dates = [datetime(2023, 1, 1) + timedelta(days=np.random.randint(0, 365)) for _ in range(num_records)]
    categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books']
    regions = ['North', 'South', 'East', 'West']
    
    sales_data = pd.DataFrame({
        'OrderID': [f'ORD-{1000+i}' for i in range(num_records)],
        'Date': dates,
        'CustomerID': np.random.randint(1000, 2000, num_records),
        'Category': np.random.choice(categories, num_records, p=[0.3, 0.25, 0.2, 0.15, 0.1]),
        'Region': np.random.choice(regions, num_records),
        'Quantity': np.random.poisson(3, num_records) + 1,  # Poisson dist for quantity
        'Unit_Price': np.random.uniform(10, 500, num_records).round(2),
        'Discount': np.random.choice([0, 0.05, 0.1, 0.15, 0.2], num_records, p=[0.5, 0.2, 0.15, 0.1, 0.05])
    })
    sales_data['Total_Revenue'] = (sales_data['Quantity'] * sales_data['Unit_Price'] * (1 - sales_data['Discount'])).round(2)
    
    # 2. Customer Demographics (For Advanced Formulas: VLOOKUP/XLOOKUP, Text functions)
    unique_customers = sales_data['CustomerID'].unique()
    domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com']
    customer_data = pd.DataFrame({
        'CustomerID': unique_customers,
        'First_Name': [f'First{i}' for i in range(len(unique_customers))],
        'Last_Name': [f'Last{i}' for i in range(len(unique_customers))],
        'Email': [f'user{c}@{np.random.choice(domains)}' for c in unique_customers],
        'Membership_Tier': np.random.choice(['Bronze', 'Silver', 'Gold', 'Platinum'], len(unique_customers), p=[0.5, 0.3, 0.15, 0.05]),
        'Signup_Date': [datetime(2020, 1, 1) + timedelta(days=np.random.randint(0, 1000)) for _ in range(len(unique_customers))]
    })

    # 3. Messy Data (For Power Query and Data Cleaning)
    messy_records = 500
    messy_dates = [datetime(2023, 1, 1) + timedelta(days=np.random.randint(0, 365)) if np.random.rand() > 0.1 else 'Invalid Date' for _ in range(messy_records)]
    messy_regions = ['North ', ' south', 'EAST', 'weSt', 'N/A', None]
    
    messy_data = pd.DataFrame({
        'Trans_ID': [f'TRX {2000+i}' for i in range(messy_records)],
        'Transaction_Date': messy_dates,
        'Customer_Name': [f' {np.random.choice(["John", "Jane", "Alice", "Bob"])} {np.random.choice(["Doe", "Smith", "Johnson", ""])} ' for _ in range(messy_records)],
        'Region_Code': np.random.choice(messy_regions, messy_records),
        'Sales_Amount': [np.random.uniform(10, 1000) if np.random.rand() > 0.05 else 'Error' for _ in range(messy_records)],
        'Product_Category': [np.random.choice(['elec', 'cloth', 'home', 'SPORT', 'book']) if np.random.rand() > 0.05 else np.nan for _ in range(messy_records)]
    })

    # 4. Marketing A/B Testing (For Inferential Statistics - T-Tests, Z-Tests)
    # Testing a new checkout page design vs old
    ab_records = 1000
    # Control Group
    control_conv = np.random.binomial(1, 0.12, int(ab_records/2)) # 12% conversion
    control_spend = np.where(control_conv == 1, np.random.normal(50, 15, int(ab_records/2)), 0)
    # Variant Group
    variant_conv = np.random.binomial(1, 0.16, int(ab_records/2)) # 16% conversion
    variant_spend = np.where(variant_conv == 1, np.random.normal(55, 18, int(ab_records/2)), 0)
    
    ab_data = pd.DataFrame({
        'Visitor_ID': [f'V-{i}' for i in range(ab_records)],
        'Group': ['Control'] * int(ab_records/2) + ['Variant'] * int(ab_records/2),
        'Converted': np.concatenate([control_conv, variant_conv]),
        'Amount_Spent': np.concatenate([control_spend, variant_spend]).round(2)
    })
    
    # 5. Call Center Wait Times (For Probability Distributions & Descriptive Stats)
    # Call wait times usually follow an exponential or log-normal distribution
    call_records = 2000
    wait_times = np.random.exponential(scale=3.5, size=call_records).round(1) # Mean 3.5 minutes
    call_duration = np.random.lognormal(mean=1.5, sigma=0.5, size=call_records).round(1)
    satisfaction_score = np.clip(np.random.normal(loc=7.5, scale=1.5, size=call_records), 1, 10).round(0)
    
    call_data = pd.DataFrame({
        'Call_ID': [f'C-{3000+i}' for i in range(call_records)],
        'Wait_Time_Minutes': wait_times,
        'Call_Duration_Minutes': call_duration,
        'Satisfaction_Score': satisfaction_score,
        'Issue_Resolved': np.random.choice(['Yes', 'No'], call_records, p=[0.85, 0.15])
    })

    # Write all to Excel
    output_file = 'ECommerce_RealLife_Project.xlsx'
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        sales_data.to_excel(writer, sheet_name='Sales_Data', index=False)
        customer_data.to_excel(writer, sheet_name='Customer_Demographics', index=False)
        messy_data.to_excel(writer, sheet_name='Messy_Data_PowerQuery', index=False)
        ab_data.to_excel(writer, sheet_name='Marketing_AB_Test', index=False)
        call_data.to_excel(writer, sheet_name='Call_Center_Distributions', index=False)
        
    print(f"Successfully generated {output_file} with multiple sheets!")

if __name__ == '__main__':
    generate_ecommerce_data()
