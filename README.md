# E-Commerce Funnel Analysis

I built this project to understand what actually drives customer satisfaction in e-commerce — not just track orders, but find where things go wrong and why.

The dataset is from Olist, a Brazilian e-commerce platform with 100,000+ real orders. I loaded it into BigQuery, wrote SQL to extract KPIs, ran a proper statistical test, and built a dashboard in Looker Studio.

## What I Found

The biggest insight surprised me — logistics isn't the problem. 97% of orders get delivered. The real drop-off happens at satisfaction: 1 in 5 delivered customers gives a low rating.

Digging deeper:
- Fast deliveries (under 7 days) get an average rating of 4.41. Slow ones get 4.04. That gap is statistically significant (p ≈ 0, t = 42.74) — not noise.
- Northeast Brazil (AL, MA, PI) has late delivery rates of 15–24%. Southeast states are at 5–8%. Same platform, very different experience.
- Health & Beauty is the top revenue category at R$1.23M — nearly R$70K ahead of second place.
- Less than 1% of customers come back for a second purchase. This is a one-time buyer marketplace, not a retention business.
- Orders grew 8x between January 2017 and August 2018 — consistent growth with no major drops.

## What I Built

- Loaded 7 CSV tables into BigQuery using Python
- Wrote 8 SQL queries covering funnel analysis, delivery performance, revenue breakdown, and seller rankings
- Built a cohort retention matrix in pandas to confirm the repeat-purchase hypothesis
- Ran an independent samples t-test using scipy to validate the delivery speed finding
- Connected everything to a 3-page Looker Studio dashboard

## Dashboard

Live: https://datastudio.google.com/reporting/ebc1f952-9f61-43af-9549-d74b170cdcc5
Live Frontend: https://ecommerce-funnel-analysis-six.vercel.app
API (Cloud Run): https://ecommerce-api-721141274431.asia-south1.run.app

## Tech

Python, SQL, Google BigQuery, Looker Studio, pandas, scipy, plotly, pytest

## How to Run

1. Clone the repo
2. Add credentials.json (GCP service account key) to root
3. Download Olist dataset from Kaggle, place CSVs in data/
4. pip install pandas google-cloud-bigquery scipy plotly pytest
5. python src/load_to_bigquery.py
6. python -m pytest tests/test_data_quality.py -v
7. python src/cohort_analysis.py
8. python src/ab_test.py

## Author

Daggupati Sai Thrisha

GitHub: https://github.com/saithrishadaggupati