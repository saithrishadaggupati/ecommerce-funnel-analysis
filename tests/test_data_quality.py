import pytest
from google.cloud import bigquery
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "credentials.json"
PROJECT = "tidy-etching-499107-r0"
client = bigquery.Client(project=PROJECT)

def run_query(sql):
    return list(client.query(sql).result())

def test_no_null_order_ids():
    rows = run_query("SELECT COUNT(*) as cnt FROM `tidy-etching-499107-r0.olist.orders` WHERE order_id IS NULL")
    assert rows[0].cnt == 0

def test_no_null_customer_ids():
    rows = run_query("SELECT COUNT(*) as cnt FROM `tidy-etching-499107-r0.olist.customers` WHERE customer_id IS NULL")
    assert rows[0].cnt == 0

def test_review_scores_in_range():
    rows = run_query("SELECT COUNT(*) as cnt FROM `tidy-etching-499107-r0.olist.reviews` WHERE review_score NOT BETWEEN 1 AND 5")
    assert rows[0].cnt == 0

def test_no_duplicate_order_ids():
    rows = run_query("SELECT COUNT(*) as cnt FROM (SELECT order_id, COUNT(*) as c FROM `tidy-etching-499107-r0.olist.orders` GROUP BY order_id HAVING c > 1)")
    assert rows[0].cnt == 0

def test_purchase_before_delivery():
    rows = run_query("""
        SELECT COUNT(*) as cnt 
        FROM `tidy-etching-499107-r0.olist.orders`
        WHERE order_delivered_customer_date < order_purchase_timestamp
        AND order_delivered_customer_date IS NOT NULL
    """)
    assert rows[0].cnt == 0