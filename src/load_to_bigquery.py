import pandas as pd
from google.cloud import bigquery
import os

# Config
PROJECT_ID = "tidy-etching-499107-r0"
DATASET_ID = "olist"
CREDENTIALS_PATH = "credentials.json"

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = CREDENTIALS_PATH

client = bigquery.Client(project=PROJECT_ID)

# Create dataset if not exists
dataset_ref = bigquery.Dataset(f"{PROJECT_ID}.{DATASET_ID}")
dataset_ref.location = "US"
try:
    client.create_dataset(dataset_ref)
    print(f"Dataset {DATASET_ID} created")
except Exception:
    print(f"Dataset {DATASET_ID} already exists")

# CSV to table mapping
tables = {
    "orders": "data/olist_orders_dataset.csv",
    "customers": "data/olist_customers_dataset.csv",
    "order_items": "data/olist_order_items_dataset.csv",
    "payments": "data/olist_order_payments_dataset.csv",
    "reviews": "data/olist_order_reviews_dataset.csv",
    "products": "data/olist_products_dataset.csv",
    "sellers": "data/olist_sellers_dataset.csv",
}

for table_name, csv_path in tables.items():
    print(f"Loading {table_name}...")
    df = pd.read_csv(csv_path)
    destination = f"{PROJECT_ID}.{DATASET_ID}.{table_name}"
    job = client.load_table_from_dataframe(df, destination, job_config=bigquery.LoadJobConfig(write_disposition="WRITE_TRUNCATE"))
    job.result()
    print(f"  {table_name}: {len(df)} rows loaded")

print("All tables loaded.")