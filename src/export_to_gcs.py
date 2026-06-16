from google.cloud import storage
from google.cloud import bigquery
import json
import os
from datetime import date

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "credentials.json"

PROJECT = "tidy-etching-499107-r0"
BUCKET_NAME = "ecommerce-insights-olist"

def create_bucket_if_not_exists():
    client = storage.Client(project=PROJECT)
    try:
        bucket = client.create_bucket(BUCKET_NAME, location="asia-south1")
        print(f"Bucket {BUCKET_NAME} created")
    except Exception as e:
        print(f"Note: {e}")
    return client.bucket(BUCKET_NAME)

def export_kpis_to_gcs():
    bq_client = bigquery.Client(project=PROJECT)
    
    query = """
        SELECT
          COUNT(*) AS total_orders,
          ROUND(COUNTIF(order_status = 'delivered') / COUNT(*) * 100, 2) AS delivery_rate,
          ROUND(AVG(r.review_score), 2) AS avg_rating
        FROM `tidy-etching-499107-r0.olist.orders` o
        LEFT JOIN `tidy-etching-499107-r0.olist.reviews` r USING (order_id)
    """
    
    rows = list(bq_client.query(query).result())
    data = {
        "export_date": str(date.today()),
        "total_orders": rows[0].total_orders,
        "delivery_rate": rows[0].delivery_rate,
        "avg_rating": float(rows[0].avg_rating)
    }
    
    bucket = create_bucket_if_not_exists()
    blob = bucket.blob(f"exports/{date.today()}.json")
    blob.upload_from_string(json.dumps(data, indent=2))
    
    print(f"Exported to gs://{BUCKET_NAME}/exports/{date.today()}.json")
    print(json.dumps(data, indent=2))

if __name__ == "__main__":
    export_kpis_to_gcs()