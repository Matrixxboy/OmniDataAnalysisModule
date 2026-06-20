import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_hr_data():
    np.random.seed(101)
    
    # 1. Employee Directory (For Formulas - Lookups, String manipulation)
    num_employees = 2000
    departments = ['Sales', 'Engineering', 'Marketing', 'HR', 'Finance', 'Support']
    roles = ['Junior', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director']
    
    emp_data = pd.DataFrame({
        'Emp_ID': [f'EMP{5000+i}' for i in range(num_employees)],
        'First_Name': [f'FName{i}' for i in range(num_employees)],
        'Last_Name': [f'LName{i}' for i in range(num_employees)],
        'Department': np.random.choice(departments, num_employees, p=[0.3, 0.25, 0.15, 0.05, 0.1, 0.15]),
        'Role_Level': np.random.choice(roles, num_employees, p=[0.3, 0.35, 0.2, 0.08, 0.05, 0.02]),
        'Hire_Date': [datetime(2015, 1, 1) + timedelta(days=np.random.randint(0, 3000)) for _ in range(num_employees)]
    })
    
    # 2. Compensation & Demographics (For Descriptive Stats & Pivot Tables)
    base_salaries = {
        'Junior': 50000, 'Mid-Level': 80000, 'Senior': 110000, 
        'Lead': 130000, 'Manager': 150000, 'Director': 200000
    }
    
    salaries = [base_salaries[role] + np.random.normal(0, 5000) for role in emp_data['Role_Level']]
    
    comp_data = pd.DataFrame({
        'Emp_ID': emp_data['Emp_ID'],
        'Base_Salary': np.round(salaries, 2),
        'Bonus_Pct': np.random.uniform(0.05, 0.25, num_employees).round(2),
        'Age': np.random.normal(35, 8, num_employees).astype(int),
        'Gender': np.random.choice(['Male', 'Female', 'Non-Binary'], num_employees, p=[0.48, 0.48, 0.04]),
        'Job_Satisfaction': np.random.randint(1, 6, num_employees)
    })
    # Ensure age is realistic
    comp_data['Age'] = np.clip(comp_data['Age'], 22, 65)

    # 3. Messy Performance Data (For Power Query)
    messy_records = 400
    messy_names = [f'  Fname{np.random.randint(0,num_employees)}  lName{np.random.randint(0,num_employees)} ' for _ in range(messy_records)]
    
    messy_perf_data = pd.DataFrame({
        'Review_ID': [f'REV-{np.random.randint(10000, 99999)}' for _ in range(messy_records)],
        'Employee_Name_Messy': messy_names,
        'Review_Date': [datetime(2023, 1, 1) + timedelta(days=np.random.randint(0, 365)) if np.random.rand() > 0.15 else 'Pending' for _ in range(messy_records)],
        'Perf_Score_out_of_100': [np.random.randint(40, 100) if np.random.rand() > 0.1 else 'N/A' for _ in range(messy_records)],
        'Comments': ['Good job' if np.random.rand() > 0.5 else None for _ in range(messy_records)]
    })

    # 4. Training Program A/B Test (For Inferential Stats)
    # Did the new sales training program increase sales?
    sales_employees = emp_data[emp_data['Department'] == 'Sales']['Emp_ID'].tolist()
    test_size = min(400, len(sales_employees))
    test_emps = np.random.choice(sales_employees, test_size, replace=False)
    
    # Half took training (Variant), Half didn't (Control)
    group = ['Control'] * int(test_size/2) + ['Training'] * int(test_size/2)
    
    # Control sales normal dist mean=100k, std=20k
    control_sales = np.random.normal(100000, 20000, int(test_size/2))
    # Training sales normal dist mean=110k, std=22k (significant difference)
    training_sales = np.random.normal(110000, 22000, int(test_size/2))
    
    training_test_data = pd.DataFrame({
        'Emp_ID': test_emps,
        'Group': group,
        'Q3_Sales_Revenue': np.concatenate([control_sales, training_sales]).round(2)
    })

    # 5. Attrition Data (For Probability Distributions)
    # Tenure of employees who left follows an exponential distribution
    attrition_records = 500
    tenure_years = np.random.exponential(scale=3.5, size=attrition_records).round(1) # Mean tenure 3.5 years
    exit_interviews = np.random.choice(['Better Offer', 'Management', 'Commute', 'Career Change'], attrition_records)
    
    attrition_data = pd.DataFrame({
        'Exit_ID': [f'EXT{100+i}' for i in range(attrition_records)],
        'Tenure_Years': tenure_years,
        'Reason_for_Leaving': exit_interviews,
        'Rehire_Eligible': np.random.choice(['Yes', 'No'], attrition_records, p=[0.7, 0.3])
    })

    output_file = 'HR_Analytics_RealLife_Project.xlsx'
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        emp_data.to_excel(writer, sheet_name='Employee_Directory', index=False)
        comp_data.to_excel(writer, sheet_name='Compensation_Demographics', index=False)
        messy_perf_data.to_excel(writer, sheet_name='Messy_Performance_Data', index=False)
        training_test_data.to_excel(writer, sheet_name='Training_AB_Test', index=False)
        attrition_data.to_excel(writer, sheet_name='Attrition_Distributions', index=False)
        
    print(f"Successfully generated {output_file} with multiple sheets!")

if __name__ == '__main__':
    generate_hr_data()
