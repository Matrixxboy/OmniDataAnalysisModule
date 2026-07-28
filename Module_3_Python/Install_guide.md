# Python Development Environment Setup Guide (Windows)

This guide will help you install everything required for Python development, data science, machine learning, and Jupyter Notebook.

---

# 1. Install Python 3.11 (64-bit)

### Download

Go to:

> [https://www.python.org/downloads/release/python-3119/](https://www.python.org/downloads/release/python-3119/)

or

> [https://www.python.org/downloads/](https://www.python.org/downloads/)

Download the latest **Python 3.11.x (64-bit)** installer.

---

### During Installation

**IMPORTANT**

Enable these options:

✅ Add Python to PATH

Then choose

> **Customize Installation**

Enable:

* pip
* tcl/tk and IDLE
* Python test suite
* py launcher
* Documentation

Click **Next**

Then enable:

* Install for all users (Recommended)
* Add Python to environment variables
* Associate files with Python
* Create shortcuts

Install.

---

### Verify Installation

Open Command Prompt.

```bash
python --version
```

Expected

```
Python 3.11.x
```

Also check

```bash
pip --version
```

---

# 2. Upgrade pip

```bash
python -m pip install --upgrade pip
```

Verify

```bash
pip --version
```

---

# 3. Install Visual Studio Code

Download

[https://code.visualstudio.com/](https://code.visualstudio.com/)

During installation enable

* Add "Open with Code"
* Add to PATH
* Register Code as editor
* Register Supported File Types

---

# 4. Install VS Code Extensions

Open VS Code.

Install the following extensions.

### Required

* Python (Microsoft)
* Pylance
* Jupyter
* Python Debugger

### Recommended

* GitLens
* Error Lens
* Black Formatter
* Ruff
* autoDocstring
* Better Comments
* Material Icon Theme
* Path Intellisense
* Thunder Client
* Markdown All in One

---

# 5. Install Git

Download

[https://git-scm.com/downloads](https://git-scm.com/downloads)

Verify

```bash
git --version
```

---

# 6. Install Jupyter Notebook

Open Command Prompt

```bash
pip install notebook
```

Verify


```bash
jupyter notebook
```

```bash
python -m notebook 
```

or 

```bash
py -m notebook 
```


The browser should open automatically.

---

# 7. Install JupyterLab (Recommended)

```bash
pip install jupyterlab
```

Launch

```bash
jupyter lab
```

---

# 8. Install IPython

```bash
pip install ipython
```

Launch

```bash
ipython
```

---

# 9. Install Virtual Environment Support

```bash
pip install virtualenv
```

Create a virtual environment

```bash
python -m venv venv
```

Activate

### Windows CMD

```cmd
venv\Scripts\activate
```

### PowerShell

```powershell
venv\Scripts\Activate.ps1
```

Deactivate

```bash
deactivate
```

---

# 10. Install Common Python Packages

```bash
pip install numpy
pip install pandas
pip install matplotlib
pip install seaborn
pip install scipy
pip install scikit-learn
pip install jupyter
pip install notebook
pip install jupyterlab
pip install ipykernel
pip install openpyxl
pip install xlrd
pip install requests
pip install beautifulsoup4
pip install lxml
pip install pillow
pip install opencv-python
pip install tqdm
pip install plotly
pip install streamlit
pip install fastapi
pip install uvicorn
pip install flask
```

Or install all at once

```bash
pip install numpy pandas matplotlib seaborn scipy scikit-learn jupyter notebook jupyterlab ipykernel openpyxl xlrd requests beautifulsoup4 lxml pillow opencv-python tqdm plotly streamlit fastapi uvicorn flask
```

---

# 11. Register Python with Jupyter

```bash
python -m ipykernel install --user --name python311 --display-name "Python 3.11"
```

---

# 12. Verify Jupyter Kernel

```bash
jupyter kernelspec list
```

You should see

```
Python 3.11
```

---

# 13. Configure VS Code

Open VS Code.

Press

```
Ctrl + Shift + P
```

Search

```
Python: Select Interpreter
```

Choose

```
Python 3.11
```

For notebooks

Open any `.ipynb` file and select the **Python 3.11** kernel.

---

# 14. Test Everything

Create

```python
print("Hello World")
```

Run it.

Create a notebook.

Run

```python
import numpy as np
import pandas as pd

print(np.__version__)
print(pd.__version__)
```

If it executes successfully, your environment is ready.

---

# 15. Recommended Project Structure

```
Project/
│
├── venv/
├── data/
├── notebooks/
├── src/
├── outputs/
├── requirements.txt
├── README.md
└── main.py
```

---

# 16. Export Installed Packages

Generate a requirements file

```bash
pip freeze > requirements.txt
```

Install later using

```bash
pip install -r requirements.txt
```

---

# 17. Useful Commands

Check Python version

```bash
python --version
```

Check pip version

```bash
pip --version
```

Check installed packages

```bash
pip list
```

Update pip

```bash
python -m pip install --upgrade pip
```

Start Jupyter Notebook

```bash
jupyter notebook
```

Start JupyterLab

```bash
jupyter lab
```

Create virtual environment

```bash
python -m venv venv
```

Activate virtual environment (Windows CMD)

```cmd
venv\Scripts\activate
```

Deactivate virtual environment

```bash
deactivate
```

Freeze dependencies

```bash
pip freeze > requirements.txt
```

---

> ## ✅ Python Development Setup Checklist

| Status | Task |
|:------:|------|
| ☐ | Install Python 3.11 (64-bit) |
| ☐ | Update `pip` to the latest version |
| ☐ | Install Visual Studio Code |
| ☐ | Install **Python** extension (Microsoft) |
| ☐ | Install **Pylance** extension |
| ☐ | Install **Jupyter** extension |
| ☐ | Install **Python Debugger** extension |
| ☐ | Install Git |
| ☐ | Install Jupyter Notebook |
| ☐ | Install JupyterLab |
| ☐ | Install IPython |
| ☐ | Configure Virtual Environment (`venv`) support |
| ☐ | Install common Python packages |
| ☐ | Register the Python 3.11 kernel with Jupyter |
| ☐ | Configure VS Code to use the correct Python interpreter |
| ☐ | Test the Python development environment |
| ☐ | Environment ready for development 🚀 |