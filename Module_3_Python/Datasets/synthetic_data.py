import pandas as pd
import numpy as np
from faker import Faker

fake = Faker()
np.random.seed(42)

n = 2000

# --------------------------
# BASE DATA
# --------------------------
df = pd.DataFrame({
    "order_id": range(10000, 10000 + n),
    "customer_id": np.random.randint(1000, 1200, n),
    "order_date": pd.date_range(start="2024-01-01", periods=n, freq="H"),
    "product_category": np.random.choice(
        ["Electronics", "Clothing", "Home", "Sports"], n
    ),
    "product_name": np.random.choice(
        ["Laptop", "Phone", "T-shirt", "Shoes", "Mixer", "Watch"], n
    ),
    "region": np.random.choice(
        ["North", "South", "East", "West"], n
    ),
    "payment_method": np.random.choice(
        ["UPI", "Card", "Cash", "Net Banking"], n
    ),
    "price": np.random.randint(500, 80000, n),
    "quantity": np.random.randint(1, 5, n)
})

# --------------------------
# BUSINESS LOGIC
# --------------------------

# revenue
df["revenue"] = df["price"] * df["quantity"]

# discount logic
df["discount"] = np.where(df["quantity"] >= 3, 0.1, 0.05)
df["discount_amount"] = df["revenue"] * df["discount"]

# final amount
df["final_amount"] = df["revenue"] - df["discount_amount"]

# shipping cost
df["shipping_cost"] = np.random.randint(50, 500, n)

# delivery days
df["delivery_days"] = np.random.randint(1, 10, n)

# delivery date
df["delivery_date"] = df["order_date"] + pd.to_timedelta(df["delivery_days"], unit="D")

# --------------------------
# ADD CUSTOMER INFO
# --------------------------

df["customer_name"] = [fake.name() for _ in range(n)]
df["city"] = [fake.city() for _ in range(n)]
df["email"] = [fake.email() for _ in range(n)]

# --------------------------
# FEATURE ENGINEERING
# --------------------------

df["month"] = df["order_date"].dt.month
df["day_of_week"] = df["order_date"].dt.day_name()

# weekend boost
df.loc[df["day_of_week"].isin(["Saturday", "Sunday"]), "quantity"] += 1

# seasonal spike (festive effect)
df.loc[df["month"].isin([10, 11, 12]), "revenue"] *= 1.2

# --------------------------
# MAKE DATA DIRTY
# --------------------------

# 1. Missing values
df.loc[df.sample(frac=0.05).index, "price"] = np.nan
df.loc[df.sample(frac=0.05).index, "region"] = None
df.loc[df.sample(frac=0.03).index, "customer_name"] = ""

# 2. Duplicates
df = pd.concat([df, df.sample(100)])

# 3. Inconsistent categories
df.loc[df["region"] == "North", "region"] = np.random.choice(
    ["North", "north", "NORTH"], size=len(df[df["region"] == "North"])
)

# 4. Wrong date formats
df.loc[df.sample(frac=0.1).index, "order_date"] = df["order_date"].astype(str)
df.loc[df.sample(frac=0.05).index, "order_date"] = "01-02-2024"

# 5. Outliers
df.loc[df.sample(20).index, "price"] = df["price"] * 15

# 6. Negative values
df.loc[df.sample(10).index, "quantity"] = -2

# 7. Mixed data types
df.loc[df.sample(frac=0.05).index, "price"] = "unknown"

# 8. Extra useless column
df["Unnamed: 0"] = np.random.randint(1000, 9999, len(df))

# 9. Random null delivery dates
df.loc[df.sample(frac=0.05).index, "delivery_date"] = pd.NaT

# --------------------------
# SAVE FILE
# --------------------------
df.to_csv("messy_sales_dataset.csv", index=False)

print("Dataset generated: messy_sales_dataset.csv")
