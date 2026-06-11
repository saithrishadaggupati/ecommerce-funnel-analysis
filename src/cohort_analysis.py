import pandas as pd
from google.cloud import bigquery
import plotly.express as px
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "credentials.json"
PROJECT = "tidy-etching-499107-r0"
client = bigquery.Client(project=PROJECT)

# Extract orders with customer cohort month
query = """
SELECT
  c.customer_unique_id,
  DATE_TRUNC(DATE(o.order_purchase_timestamp), MONTH) AS order_month
FROM `tidy-etching-499107-r0.olist.orders` o
JOIN `tidy-etching-499107-r0.olist.customers` c USING (customer_id)
WHERE o.order_status = 'delivered'
"""

df = client.query(query).to_dataframe()

# Get each customer's first purchase month = cohort month
df['order_month'] = pd.to_datetime(df['order_month'])
cohort_month = df.groupby('customer_unique_id')['order_month'].min().reset_index()
cohort_month.columns = ['customer_unique_id', 'cohort_month']

# Merge back
df = df.merge(cohort_month, on='customer_unique_id')

# Calculate months since first purchase
df['month_number'] = ((df['order_month'].dt.year - df['cohort_month'].dt.year) * 12 +
                      (df['order_month'].dt.month - df['cohort_month'].dt.month))

# Build cohort table
cohort_data = df.groupby(['cohort_month', 'month_number'])['customer_unique_id'].nunique().reset_index()
cohort_data.columns = ['cohort_month', 'month_number', 'customers']

# Pivot
cohort_pivot = cohort_data.pivot_table(index='cohort_month', columns='month_number', values='customers')

# Calculate retention rates
cohort_size = cohort_pivot[0]
retention = cohort_pivot.divide(cohort_size, axis=0).round(3) * 100

# Print key finding
print("Cohort sizes (month 0):")
print(cohort_size.sort_index().tail(10))
print("\nMonth-1 retention rates:")
print(retention[1].dropna().sort_index().tail(10))

# Visualize
fig = px.imshow(
    retention.iloc[:, :6],
    labels=dict(x="Months After First Purchase", y="Cohort Month", color="Retention %"),
    title="Customer Cohort Retention Heatmap",
    color_continuous_scale="Blues",
    text_auto=".1f"
)
fig.write_image("dashboard/cohort_retention.png")
print("\nHeatmap saved to dashboard/cohort_retention.png")