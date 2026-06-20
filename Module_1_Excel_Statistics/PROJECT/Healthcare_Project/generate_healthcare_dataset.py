import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_healthcare_data():
    np.random.seed(202)
    
    # 1. Patient Records (For Advanced Formulas: Lookups, Text Functions)
    num_patients = 1500
    blood_types = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    
    patient_data = pd.DataFrame({
        'Patient_ID': [f'PT-{10000+i}' for i in range(num_patients)],
        'First_Name': [f'PatientFirst{i}' for i in range(num_patients)],
        'Last_Name': [f'PatientLast{i}' for i in range(num_patients)],
        'Date_of_Birth': [datetime(1940, 1, 1) + timedelta(days=np.random.randint(0, 25000)) for _ in range(num_patients)],
        'Blood_Type': np.random.choice(blood_types, num_patients, p=[0.3, 0.06, 0.09, 0.02, 0.03, 0.01, 0.39, 0.1]),
        'Insurance_Provider': np.random.choice(['Medicare', 'Medicaid', 'BlueCross', 'Aetna', 'Cigna', 'Uninsured'], num_patients, p=[0.25, 0.15, 0.2, 0.15, 0.15, 0.1])
    })
    patient_data['Age'] = ((datetime(2024, 1, 1) - patient_data['Date_of_Birth']).dt.days / 365.25).astype(int)

    # 2. Hospital Admissions (For Pivot Tables, Charts & Descriptive Stats)
    num_admissions = 4000
    departments = ['Emergency', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology']
    
    admissions_data = pd.DataFrame({
        'Admission_ID': [f'ADM-{50000+i}' for i in range(num_admissions)],
        'Patient_ID': np.random.choice(patient_data['Patient_ID'], num_admissions),
        'Admission_Date': [datetime(2023, 1, 1) + timedelta(days=np.random.randint(0, 365), hours=np.random.randint(0, 24)) for _ in range(num_admissions)],
        'Department': np.random.choice(departments, num_admissions, p=[0.4, 0.15, 0.1, 0.15, 0.1, 0.1]),
        'Length_of_Stay_Days': np.random.poisson(lam=4.5, size=num_admissions) + 1,
        'Treatment_Cost': np.random.lognormal(mean=7.5, sigma=1.0, size=num_admissions).round(2)
    })
    
    # 3. Messy Billing Data (For Power Query & Data Cleaning)
    messy_records = 600
    messy_dates = [datetime(2023, 1, 1) + timedelta(days=np.random.randint(0, 365)) if np.random.rand() > 0.1 else 'ERROR-DATE' for _ in range(messy_records)]
    
    messy_billing = pd.DataFrame({
        'Invoice_Num': [f'INV {np.random.randint(100, 999)} ' for _ in range(messy_records)],
        'Patient_Name_Dirty': [f'  {np.random.choice(["John", "Mary", "James", "Patricia"])}   {np.random.choice(["Smith", "Jones", "Williams", "Brown"])}' for _ in range(messy_records)],
        'Billing_Date': messy_dates,
        'Amount_Due': [np.random.uniform(500, 5000) if np.random.rand() > 0.05 else 'N/A' for _ in range(messy_records)],
        'Status Code': [np.random.choice([' pd', 'UNPAID ', ' pending', 'VOID']) if np.random.rand() > 0.08 else np.nan for _ in range(messy_records)]
    })

    # 4. Medication A/B Trial (For Inferential Statistics - T-Tests)
    # Testing a new blood pressure medication vs standard medication
    trial_size = 500
    trial_patients = np.random.choice(patient_data['Patient_ID'], trial_size, replace=False)
    
    # Control: Standard Medication (Reduction in Systolic BP)
    control_reduction = np.random.normal(loc=12.5, scale=4.0, size=int(trial_size/2))
    # Variant: New Medication
    variant_reduction = np.random.normal(loc=15.2, scale=3.5, size=int(trial_size/2))
    
    med_trial_data = pd.DataFrame({
        'Patient_ID': trial_patients,
        'Group': ['Standard_Meds'] * int(trial_size/2) + ['New_Meds'] * int(trial_size/2),
        'Systolic_BP_Reduction': np.concatenate([control_reduction, variant_reduction]).round(1),
        'Side_Effects_Reported': np.random.choice(['Yes', 'No'], trial_size, p=[0.15, 0.85])
    })

    # 5. ER Arrival & Wait Times (For Probability Distributions)
    # ER arrivals often follow Poisson distribution, wait times Exponential
    er_records = 1500
    
    er_data = pd.DataFrame({
        'Log_ID': [f'ER-{1000+i}' for i in range(er_records)],
        'Arrival_Hour_of_Day': np.random.randint(0, 24, er_records),
        'Patients_Arrived_This_Hour': np.random.poisson(lam=8, size=er_records), # Poisson for arrivals
        'Triage_Wait_Time_Mins': np.random.exponential(scale=25, size=er_records).round(1), # Exponential for wait
        'Total_ER_Time_Hours': np.random.normal(loc=4.5, scale=1.2, size=er_records).round(1) # Normal for total time
    })
    
    # Prevent negative times
    er_data['Total_ER_Time_Hours'] = np.clip(er_data['Total_ER_Time_Hours'], 0.5, 24.0)

    output_file = 'Healthcare_Analytics_RealLife_Project.xlsx'
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        patient_data.to_excel(writer, sheet_name='Patient_Records', index=False)
        admissions_data.to_excel(writer, sheet_name='Hospital_Admissions', index=False)
        messy_billing.to_excel(writer, sheet_name='Messy_Billing_Data', index=False)
        med_trial_data.to_excel(writer, sheet_name='Medication_AB_Trial', index=False)
        er_data.to_excel(writer, sheet_name='ER_Distributions', index=False)
        
    print(f"Successfully generated {output_file} with multiple sheets!")

if __name__ == '__main__':
    generate_healthcare_data()
