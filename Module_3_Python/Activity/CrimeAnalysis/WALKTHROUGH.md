# 🔐 Cyber Crime Investigation Demo
## Complete Walkthrough Guide for Instructors

---

## 📁 Project Files

```
cyber-crime-demo/
│
├── employee_logs.csv              ← the suspect dataset (6 employees, 18 columns)
├── cyber_crime_investigation.ipynb ← full Jupyter notebook
├── WALKTHROUGH.md                 ← this file
└── CHECKLIST.md                   ← your pre-demo to-do list
```

---

## 🧰 Installation

Open your terminal and run:

```bash
pip install jupyter pandas matplotlib seaborn numpy
```

Then launch the notebook:

```bash
jupyter notebook cyber_crime_investigation.ipynb
```

---

## 🗂️ Dataset Explanation

`employee_logs.csv` has **6 employees** and **18 columns**.

| Column | What it means | Why it matters |
|--------|---------------|----------------|
| `Employee` | Name | Identifies the suspect |
| `Department` | Team | Finance/IT = sensitive access |
| `Login_Hour` | Hour they logged in (0–23) | 1 AM login is suspicious |
| `Logout_Hour` | Hour they logged out | Very short sessions = extraction |
| `USB_Inserted` | Did they use a USB? | Classic data theft method |
| `Files_Opened` | How many files accessed | 110 files in one session is extreme |
| `Files_Deleted` | Files erased | Covering tracks after theft |
| `Failed_Logins` | Wrong password attempts | Hacking indicator |
| `Typing_Speed_WPM` | Words per minute | Very high = automated script |
| `Late_Night_Activity` | Active after midnight? | Avoids detection |
| `Data_Transfer_MB` | MB of data moved | 1200 MB = massive leak |
| `Emails_Sent` | Total emails sent | High volume = suspicious |
| `External_Emails` | Emails to outside domains | Data exfiltration route |
| `VPN_Used` | Used a VPN? | Hides activity traces |
| `Printer_Used` | Printed documents? | Physical data theft |
| `Salary_Access` | Accessed HR salary data | Unauthorized access |
| `HR_Access` | Accessed HR records | Sensitive breach |
| `Finance_Access` | Accessed financial data | Most sensitive category |

### The Suspects at a Glance

| Employee | Innocent? | Key Red Flags |
|----------|-----------|---------------|
| Alex | ✅ Yes | Normal activity, day shift, no USB |
| Sarah | ⚠️ Suspicious | Night access, USB, 900 MB transfer |
| John | ✅ Yes | Clean record, zero failed logins |
| **Mike** | 🚨 **CRIMINAL** | 1 AM, USB, 1200 MB, 8 failed logins, deleted 18 files |
| Emma | ✅ Yes | Normal HR activity |
| David | ✅ Yes | IT work, minor anomalies, no red flags |

---

## 🎬 Demo Walkthrough — Phase by Phase

---

### PHASE 1 — Story Intro (3 min)

**Say this to open:**

> *"Last night, confidential company data was leaked. Someone inside this company stole sensitive files. We have system logs from 6 employees who had access. Your job: help me identify the suspect using Data Analysis."*

Then pause. Look at the audience. Then ask:

> *"Can data reveal the criminal?"*

**Why this works:** It creates a mission. Students are now investigators, not students. They're emotionally invested before a single line of code runs.

**Do NOT say:**
- "Today we're going to learn pandas"
- "This is a tutorial on data analysis"
- "Let me explain what a DataFrame is"

---

### PHASE 2 — Load the Data (5 min)

Run **Cell 1** (imports) and **Cell 2** (load CSV).

When the table appears, stop. Ask the class:

> *"Just by reading this — who do you think is the criminal? Don't use any code. Just look."*

Take 2–3 answers. Students will guess Mike or Sarah. That's perfect. Write their guesses on a whiteboard/sticky note.

**Teaching moment:** "This is what data scientists do first — read the raw data with their eyes before writing a single line of code."

---

### PHASE 3 — Statistical Analysis (5 min)

Run **Cell 3** (`df.describe()`) and **Cell 4** (anomaly detection).

Point to the output and say:

> *"The average data transfer is about 366 MB. Mike transferred 1200 MB. That's 3 times the average. In data science, we call that an anomaly."*

Ask:
- *"What's a normal login hour? 9 or 10 AM. Mike logged in at 1 AM. What does that tell us?"*
- *"John had 0 failed logins. Mike had 8. What does that pattern suggest?"*

---

### PHASE 4 — Filtering (10 min)

Run **Cells 5–8** one by one. After each filter, announce the results dramatically:

After Filter 1 (night users):
> *"Only 2 people were active after midnight. We just cut our suspect list in half."*

After Filter 2 (USB users):
> *"Only 2 people used a USB device. And they're the same 2 from Filter 1."*

After Filter 3 (failed logins):
> *"Of those 2, one of them tried and failed to log in 8 times."*

After Filter 4 (combined):
> *"Using just 3 data filters, we've narrowed 6 suspects down to 1 primary suspect."*

**Teaching moment:** *"This is not 'writing Python'. This is how Netflix filters movies you won't like. This is how banks flag fraudulent transactions. This is real-world AI logic."*

---

### PHASE 5 — Visualization (10 min)

Run **Cells 9–12** for charts 1–4.

**Chart 1 (Files Opened):**
> *"One bar is way taller than the others. That's what an outlier looks like in a chart."*

**Chart 2 (Data Transfer):**
> *"Mike's bar is not just bigger — it's 60x bigger than John's. The chart makes that obvious in a way numbers alone don't."*

**Chart 3 (Failed Logins):**
> *"Hackers often try multiple passwords before getting in. Banks lock your account after 3 tries. Mike had 8."*

**Chart 4 (Heatmap):**
> *"This is every piece of evidence at once. Which row is the reddest? That is our suspect. One chart. Total clarity."*

Ask the class: *"Which row is the reddest?"* They'll all say Mike.

---

### PHASE 6 — AI Suspicion Scoring (10 min)

Run **Cell 13** (build the formula) and **Cell 14** (bar chart).

Explain the formula:

> *"Each suspicious behavior gets a weight based on how serious it is. Failed logins get 10 points each — because that's a strong signal. Data transfer gets 0.05 per MB — because volume matters. Then we add all the scores up. The highest total = most likely criminal. This is exactly how credit scores work."*

**Interactive moment:** Change one weight value in the code and re-run.

```python
W_FAILED_LOGINS = 20  # change from 10 to 20
```

Then say: *"I just changed how much the AI values failed logins. Watch how the score updates."*

Students see the score change live. This is the "mind blown" moment.

Ask: *"If you were building this for a bank, which factor would you weight highest? Why?"*

---

### PHASE 7 — Final Reveal (5 min)

Run **Cells 15 and 16**.

Read the output out loud, dramatically:

> *"Name: Mike. Department: Finance. Suspicion Score: 155. Evidence: logged in at 1 AM, inserted a USB drive, transferred 1200 MB of data, opened 110 files, deleted 18 files to cover his tracks, failed to log in 8 times, sent 41 emails to external addresses, and accessed the company's most sensitive financial records."*

Pause.

> *"The AI verdict: 95% probability of insider threat. Case closed."*

**Closing line — say this exactly:**

> *"Today we identified a criminal using only data. Imagine what companies like Google, Netflix, or banks can do with millions of records. That's data science."*

---

## 💡 Teaching Tips

### Language to use

| Instead of... | Say... |
|---------------|--------|
| "pandas syntax" | "reading the evidence" |
| "filtering a DataFrame" | "eliminating suspects" |
| "bar chart" | "evidence chart" |
| "anomaly detection" | "spotting what doesn't belong" |
| "weighted scoring model" | "AI decision system" |
| "describe()" | "finding what normal looks like" |

### Questions to ask throughout

1. *"Why is logging in at 1 AM suspicious but logging in at 9 AM isn't?"*
2. *"If you were the criminal, which behavior would you try to hide first?"*
3. *"Can you think of a way Mike could fake being innocent in this dataset?"*
4. *"What data would you add to make this model smarter?"*
5. *"Where else do you think companies use this kind of scoring system?"*

### Handling wrong guesses

If a student guesses Sarah first (she's also suspicious), say:

> *"Great instinct! Sarah IS suspicious. This is actually a real problem in AI called false positives — when the model suspects the wrong person. Let's dig into why Mike scores higher."*

This teaches an important ML concept naturally.

---

## 🔧 Customization Options

### Make it harder (advanced groups)

Add noise to the dataset — give Alex 3 failed logins and a slightly elevated transfer:

```csv
Alex,Marketing,9,18,No,12,0,3,45,No,180,8,1,No,Yes,No,No,No
```

Now students have to think harder — Alex looks a bit suspicious too. Great discussion starter.

### Add a new suspect (role-play)

Tell students: *"You are now Mike's defense attorney. What arguments would you make to explain his data? Is there an innocent explanation?"*

This teaches the limits of data-based conclusions.

### Make the scoring interactive

Let students vote on weights:

```
"How many points should 1 failed login be worth?"
→ Students suggest: 5, 10, 15
→ Vote, then enter the winning number
→ Re-run and see if the verdict changes
```

---

## ⏱️ Timing Reference

| Phase | Cells | Duration |
|-------|-------|----------|
| Intro story | none | 3 min |
| Load data + explore | 1–2 | 5 min |
| Statistics + anomalies | 3–4 | 5 min |
| Filtering suspects | 5–8 | 10 min |
| Visualization (4 charts) | 9–12 | 10 min |
| AI scoring model | 13–14 | 10 min |
| Final reveal | 15–16 | 5 min |
| **Total** | | **~48 min** |

---

## 🎯 Learning Outcomes

By the end, students have used (without being told):

- `pd.read_csv()` — data loading
- `.describe()` — descriptive statistics
- Boolean indexing — filtering
- `matplotlib` bar charts — visualization
- `seaborn` heatmap — multi-variable analysis
- Weighted formula — scoring model / ML concept
- `.sort_values()` — ranking
- `.astype(int)` — encoding categorical to numeric

And they **remember it** — because they used it to solve a crime.

---

*"The goal is not to teach Python. The goal is to show how data tells stories."*
