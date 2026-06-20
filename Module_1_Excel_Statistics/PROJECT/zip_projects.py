import os
import shutil
import zipfile

def create_zips():
    source_dir = r"c:\Utsav\omni\OmniDataAnalysisModule\Module_1_Excel_Statistics\PROJECT"
    target_dir = r"c:\Utsav\omni\OmniDataAnalysisModule\Webiste\DataAnalysisByMatrixBoy\public\datasets"
    
    os.makedirs(target_dir, exist_ok=True)
    
    projects = ["ECommerce_Project", "HR_Analytics_Project", "Healthcare_Project"]
    
    for project in projects:
        project_path = os.path.join(source_dir, project)
        if os.path.isdir(project_path):
            zip_path = os.path.join(target_dir, f"{project}.zip")
            # We want to zip the contents, including the folder structure
            shutil.make_archive(zip_path.replace('.zip', ''), 'zip', source_dir, project)
            print(f"Created {zip_path}")
            
    # Also copy the Master Dictionary to public so users can download it separately if they want
    master_dict_src = os.path.join(source_dir, "Master_Projects_Data_Dictionary.xlsx")
    if os.path.exists(master_dict_src):
        master_dict_dest = os.path.join(target_dir, "Master_Projects_Data_Dictionary.xlsx")
        shutil.copy2(master_dict_src, master_dict_dest)
        print(f"Copied Master Dictionary to {master_dict_dest}")

if __name__ == "__main__":
    create_zips()
