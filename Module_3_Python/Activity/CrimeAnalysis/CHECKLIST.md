# ✅ Pre-Demo Checklist
## Cyber Crime Investigation — Run This Before Every Session

---

## 🖥️ SETUP (do 24 hours before)

- [ ] Python 3.8+ installed on your machine
- [ ] Run: `pip install jupyter pandas matplotlib seaborn numpy`
- [ ] Confirm `jupyter notebook` launches without errors
- [ ] Both files in the same folder: `employee_logs.csv` + `cyber_crime_investigation.ipynb`
- [ ] Open the notebook and run ALL cells once — confirm zero errors
- [ ] All 6 charts render correctly (Charts 1–6)
- [ ] Final reveal cell prints Mike as the criminal
- [ ] Save the notebook with all outputs cleared (Cell → All Output → Clear)

---

## 🎯 CONTENT (do 1 hour before)

- [ ] Read WALKTHROUGH.md fully at least once
- [ ] Memorize the opening line: *"Last night, confidential company data was leaked..."*
- [ ] Memorize the closing line: *"Today we identified a criminal using only data..."*
- [ ] Know all 5 engagement questions (pg 3 of WALKTHROUGH)
- [ ] Know the answer to: *"Why is Sarah also suspicious but not the criminal?"*
- [ ] Prepare your own wrong answer (e.g., "At first I thought Sarah...") for relatability

---

## 🧪 DAY-OF CHECKS (do 30 min before students arrive)

- [ ] Laptop plugged in (demos drain battery fast)
- [ ] Jupyter notebook open and at Cell 1
- [ ] Browser font size set to 130%+ (audience needs to see the output)
- [ ] Dark theme active in the notebook (View → Theme → Dark)
- [ ] All previous cell outputs cleared
- [ ] Close all other tabs/apps — no distractions on screen
- [ ] Terminal open in the right folder (just in case)
- [ ] Test: run Cell 1 (imports) — must print "Investigation tools loaded"
- [ ] Test: run Cell 2 (load CSV) — table must show 6 rows
- [ ] Test: run Cell 15 (final reveal) — must print Mike as the criminal

---

## 👥 ROOM SETUP

- [ ] Screen/projector clearly visible to everyone
- [ ] Whiteboard or sticky note for writing student guesses in Phase 2
- [ ] If possible: dim the room lights slightly (hacker atmosphere)
- [ ] Students seated where they can see the screen clearly

---

## 🧠 MENTAL PREP

- [ ] You are a **cybersecurity analyst**, not a teacher
- [ ] Every line of code is **investigation logic**, not syntax
- [ ] When students guess wrong → celebrate it, don't correct it coldly
- [ ] Slow down during the heatmap (Phase 5) — it's the visual wow moment
- [ ] Speed up during the reveal (Phase 7) — build the drama

---

## 🚨 EMERGENCY BACKUP

If something breaks during the demo:

- [ ] Save a pre-run version of the notebook with all outputs visible as backup
- [ ] Know how to restart kernel: Kernel → Restart & Run All
- [ ] If CSV won't load: paste it manually as a Python dict (see below)

```python
# Emergency fallback — paste this if CSV fails to load
import pandas as pd
data = {
    'Employee':            ['Alex', 'Sarah', 'John', 'Mike', 'Emma', 'David'],
    'Department':          ['Marketing', 'IT', 'Sales', 'Finance', 'HR', 'IT'],
    'Login_Hour':          [9, 2, 10, 1, 9, 8],
    'Files_Opened':        [12, 95, 18, 110, 20, 30],
    'Files_Deleted':       [0, 12, 0, 18, 1, 2],
    'Failed_Logins':       [1, 6, 0, 8, 0, 2],
    'Data_Transfer_MB':    [20, 900, 15, 1200, 25, 40],
    'External_Emails':     [1, 23, 2, 41, 3, 4],
    'Late_Night_Activity': ['No', 'Yes', 'No', 'Yes', 'No', 'No'],
    'USB_Inserted':        ['No', 'Yes', 'No', 'Yes', 'No', 'No'],
}
df = pd.DataFrame(data)
print('✅ Emergency data loaded.')
df
```

---

## ✅ FINAL GO / NO-GO CHECK

Before students walk in, answer these:

1. Does `employee_logs.csv` load without errors? **Yes / No**
2. Do all 6 charts render? **Yes / No**
3. Does the final reveal show Mike? **Yes / No**
4. Do you know your opening and closing lines? **Yes / No**
5. Is your screen visible to everyone? **Yes / No**

**All yes? You're ready. Go teach.**
