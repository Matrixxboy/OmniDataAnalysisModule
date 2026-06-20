import os
import shutil
import pandas as pd

def organize_and_document():
    base_dir = r"c:\Utsav\omni\OmniDataAnalysisModule\Module_1_Excel_Statistics\PROJECT"
    
    # Define project folders and associated files
    projects = {
        "ECommerce_Project": [
            "ECommerce_RealLife_Project.xlsx",
            "generate_ecommerce_dataset.py"
        ],
        "HR_Analytics_Project": [
            "HR_Analytics_RealLife_Project.xlsx",
            "generate_hr_dataset.py"
        ],
        "Healthcare_Project": [
            "Healthcare_Analytics_RealLife_Project.xlsx",
            "generate_healthcare_dataset.py"
        ]
    }
    
    # 1. Create Folders and Move Files
    for folder, files in projects.items():
        folder_path = os.path.join(base_dir, folder)
        os.makedirs(folder_path, exist_ok=True)
        
        for file in files:
            src = os.path.join(base_dir, file)
            dest = os.path.join(folder_path, file)
            if os.path.exists(src):
                shutil.move(src, dest)
                print(f"Moved {file} to {folder}")
                
    # 2. Create the Data Dictionary Excel File
    # We will create a list of dictionaries to convert to a DataFrame
    
    data_dictionary = []
    
    # E-Commerce Dictionary
    ecommerce_fields = {
        "Sales_Data": ["OrderID", "Date", "CustomerID", "Category", "Region", "Quantity", "Unit_Price", "Discount", "Total_Revenue"],
        "Customer_Demographics": ["CustomerID", "First_Name", "Last_Name", "Email", "Membership_Tier", "Signup_Date"],
        "Messy_Data_PowerQuery": ["Trans_ID", "Transaction_Date", "Customer_Name", "Region_Code", "Sales_Amount", "Product_Category"],
        "Marketing_AB_Test": ["Visitor_ID", "Group", "Converted", "Amount_Spent"],
        "Call_Center_Distributions": ["Call_ID", "Wait_Time_Minutes", "Call_Duration_Minutes", "Satisfaction_Score", "Issue_Resolved"]
    }
    
    for sheet, fields in ecommerce_fields.items():
        for field in fields:
            data_dictionary.append({
                "Project": "E-Commerce",
                "Excel_Sheet": sheet,
                "Field_Name": field,
                "Description": "Data field for analysis" # Can be expanded later
            })

    # HR Dictionary
    hr_fields = {
        "Employee_Directory": ["Emp_ID", "First_Name", "Last_Name", "Department", "Role_Level", "Hire_Date"],
        "Compensation_Demographics": ["Emp_ID", "Base_Salary", "Bonus_Pct", "Age", "Gender", "Job_Satisfaction"],
        "Messy_Performance_Data": ["Review_ID", "Employee_Name_Messy", "Review_Date", "Perf_Score_out_of_100", "Comments"],
        "Training_AB_Test": ["Emp_ID", "Group", "Q3_Sales_Revenue"],
        "Attrition_Distributions": ["Exit_ID", "Tenure_Years", "Reason_for_Leaving", "Rehire_Eligible"]
    }
    
    for sheet, fields in hr_fields.items():
        for field in fields:
            data_dictionary.append({
                "Project": "HR Analytics",
                "Excel_Sheet": sheet,
                "Field_Name": field,
                "Description": "Data field for analysis"
            })

    # Healthcare Dictionary
    healthcare_fields = {
        "Patient_Records": ["Patient_ID", "First_Name", "Last_Name", "Date_of_Birth", "Blood_Type", "Insurance_Provider", "Age"],
        "Hospital_Admissions": ["Admission_ID", "Patient_ID", "Admission_Date", "Department", "Length_of_Stay_Days", "Treatment_Cost"],
        "Messy_Billing_Data": ["Invoice_Num", "Patient_Name_Dirty", "Billing_Date", "Amount_Due", "Status Code"],
        "Medication_AB_Trial": ["Patient_ID", "Group", "Systolic_BP_Reduction", "Side_Effects_Reported"],
        "ER_Distributions": ["Log_ID", "Arrival_Hour_of_Day", "Patients_Arrived_This_Hour", "Triage_Wait_Time_Mins", "Total_ER_Time_Hours"]
    }
    
    for sheet, fields in healthcare_fields.items():
        for field in fields:
            data_dictionary.append({
                "Project": "Healthcare",
                "Excel_Sheet": sheet,
                "Field_Name": field,
                "Description": "Data field for analysis"
            })
            
    df_dict = pd.DataFrame(data_dictionary)
    
    dict_file_path = os.path.join(base_dir, "Master_Projects_Data_Dictionary.xlsx")
    
    # Save to excel with multiple sheets (one for each project to make it cleaner)
    with pd.ExcelWriter(dict_file_path, engine='openpyxl') as writer:
        df_dict[df_dict['Project'] == 'E-Commerce'].to_excel(writer, sheet_name='ECommerce_Dictionary', index=False)
        df_dict[df_dict['Project'] == 'HR Analytics'].to_excel(writer, sheet_name='HR_Dictionary', index=False)
        df_dict[df_dict['Project'] == 'Healthcare'].to_excel(writer, sheet_name='Healthcare_Dictionary', index=False)
        
    print(f"Successfully organized folders and generated {dict_file_path}")

if __name__ == '__main__':
    organize_and_document()
