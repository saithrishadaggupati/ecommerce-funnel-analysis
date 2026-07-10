# E-Commerce Funnel Analysis

Most e-commerce dashboards tell you what happened. I wanted to know why customers leave unhappy even after their order arrives.

This project runs a full analysis on 100,000+ real orders from Olist, a Brazilian marketplace — from raw CSVs into BigQuery, through SQL and statistical testing, to a live React dashboard backed by a FastAPI API on GCP.

## What I Found

Logistics isn't the problem. 97% of orders are delivered successfully. The drop happens at satisfaction — 1 in 5 delivered customers rates the experience poorly.

Three findings stood out:

**Delivery speed drives ratings more than anything else.** Fast deliveries (under 7 days) average 4.41 stars. Slow ones average 4.04. The difference is statistically significant — t = 42.74, p ≈ 0. This isn't noise.

**Northeast Brazil is being underserved.** States like AL, MA, and PI see late delivery rates of 15–24%. Southeast states sit at 5–8%. Same platform, completely different experience depending on where you live.

**This is a one-time buyer marketplace.** Month-1 retention is below 1%. The business model isn't about loyalty — it's about acquisition. That changes how you think about the funnel entirely.

## What I Built

- Loaded 7 CSV tables (100K+ rows) into BigQuery using Python
- Wrote 8 SQL queries: funnel conversion, delivery performance, revenue by category, seller rankings, regional late delivery rates
- Built a cohort retention matrix in pandas — confirmed the one-time buyer hypothesis
- Ran an independent samples t-test in scipy to validate the delivery speed finding
- Built a React frontend with recharts visualizations, served by a FastAPI backend
- Deployed backend to GCP Cloud Run, frontend to Vercel
- Exported daily KPI snapshots to GCP Cloud Storage
- Connected everything to a 3-page Looker Studio dashboard

## Live

- Frontend: https://ecommerce-funnel-analysis-six.vercel.app
- API: https://ecommerce-api-721141274431.asia-south1.run.app
- Dashboard: https://datastudio.google.com/reporting/ebc1f952-9f61-43af-9549-d74b170cdcc5

## Stack

Python · SQL · Google BigQuery · React · FastAPI · Docker · GCP Cloud Run · GCP Cloud Storage · Looker Studio · Vercel · pandas · scipy · plotly · pytest

## How to Run

1. Clone the repo
2. Add credentials.json (GCP service account key) to root
3. Download Olist dataset from Kaggle, place CSVs in data/
4. pip install pandas google-cloud-bigquery scipy plotly pytest google-cloud-storage fastapi uvicorn
5. python src/load_to_bigquery.py
6. python -m pytest tests/test_data_quality.py -v
7. python src/cohort_analysis.py
8. python src/ab_test.py
9. python src/export_to_gcs.py
10. cd backend && uvicorn main:app --reload
11. cd frontend && npm install && npm start

## Author

Sai Thrisha Daggupati · NITK Surathkal · 

GitHub: https://github.com/saithrishadaggupati
