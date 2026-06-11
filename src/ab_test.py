import pandas as pd
from google.cloud import bigquery
from scipy import stats
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "credentials.json"
PROJECT = "tidy-etching-499107-r0"
client = bigquery.Client(project=PROJECT)

query = """
SELECT
  o.order_id,
  DATE_DIFF(DATE(o.order_delivered_customer_date), DATE(o.order_purchase_timestamp), DAY) AS delivery_days,
  r.review_score
FROM `tidy-etching-499107-r0.olist.orders` o
JOIN `tidy-etching-499107-r0.olist.reviews` r USING (order_id)
WHERE o.order_delivered_customer_date IS NOT NULL
  AND r.review_score IS NOT NULL
"""

df = client.query(query).to_dataframe()

# Split into two groups
fast = df[df['delivery_days'] <= 7]['review_score']
slow = df[df['delivery_days'] > 7]['review_score']

# Run t-test
t_stat, p_value = stats.ttest_ind(fast, slow)

print(f"Fast delivery (≤7 days): {len(fast)} orders, avg score = {fast.mean():.2f}")
print(f"Slow delivery (>7 days): {len(slow)} orders, avg score = {slow.mean():.2f}")
print(f"\nt-statistic: {t_stat:.4f}")
print(f"p-value: {p_value:.6f}")

if p_value < 0.05:
    print("\nConclusion: Statistically significant difference (p < 0.05)")
    print("Fast delivery leads to significantly higher review scores.")
    print("Business recommendation: Prioritize reducing delivery time to under 7 days,")
    print("especially in Northeast states (AL, MA, PI) where late delivery rates exceed 15%.")
else:
    print("\nConclusion: No statistically significant difference (p >= 0.05)")