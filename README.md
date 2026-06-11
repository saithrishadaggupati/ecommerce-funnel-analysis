\# E-Commerce Funnel Analysis



End-to-end analytics project on the Olist Brazilian E-Commerce dataset using SQL, Python, Google BigQuery, and Looker Studio.



\## Overview



This project analyzes 100,000+ e-commerce orders through a complete analytics pipeline, transforming raw transactional data into actionable business insights. The project covers data ingestion, KPI reporting, cohort retention analysis, statistical experimentation, and interactive dashboarding.



\## What This Project Does



\- Loads and processes raw Olist CSV datasets into Google BigQuery

\- Performs SQL-based business KPI analysis

\- Conducts customer cohort retention analysis

\- Runs statistical A/B testing on delivery speed and customer satisfaction

\- Builds interactive dashboards in Looker Studio

\- Validates data quality through automated testing



\## Key Insights



\- Customer satisfaction is the largest funnel drop-off point, with 20.54% of delivered orders receiving low ratings.

\- Fast deliveries (≤7 days) achieve significantly higher customer ratings than slower deliveries (4.41 vs 4.04, p < 0.001).

\- Northeast Brazil regions (AL, MA, PI) experience late delivery rates between 15% and 24%, compared to 5–8% in Southeast regions.

\- Health \& Beauty is the highest revenue-generating category, contributing R$1.23M in sales.

\- Month-1 customer retention is below 1%, indicating predominantly one-time purchase behavior.

\- Order volume grew approximately 8× between January 2017 and August 2018.



\## Tech Stack



\### Cloud

\- Google BigQuery



\### Languages

\- Python

\- SQL



\### Libraries

\- pandas

\- scipy

\- plotly

\- google-cloud-bigquery



\### Visualization

\- Looker Studio



\### Testing

\- pytest



\## Project Structure



ecommerce-funnel-analysis/



├── src/



│   ├── load\_to\_bigquery.py



│   ├── kpi\_queries.sql



│   ├── cohort\_analysis.py



│   └── ab\_test.py



├── tests/



│   └── test\_data\_quality.py



├── dashboard/



│   └── cohort\_retention.png



└── README.md



\## How to Run



\### 1. Clone the Repository



git clone <repository-url>



cd ecommerce-funnel-analysis



\### 2. Add GCP Credentials



Place your Google Cloud service account key file as:



credentials.json



in the project root directory.



\### 3. Download Dataset



Download the Olist Brazilian E-Commerce dataset from Kaggle and place all CSV files inside:



data/



\### 4. Install Dependencies



pip install pandas google-cloud-bigquery scipy plotly pytest



\### 5. Load Data into BigQuery



python src/load\_to\_bigquery.py



\### 6. Run Data Quality Tests



python -m pytest tests/test\_data\_quality.py -v



\### 7. Run Cohort Analysis



python src/cohort\_analysis.py



\### 8. Run A/B Test



python src/ab\_test.py



\## Dashboard



📊 Live Dashboard: https://datastudio.google.com/reporting/ebc1f952-9f61-43af-9549-d74b170cdcc5



\## Results



This project demonstrates an end-to-end modern analytics workflow using cloud data warehousing, SQL-based business intelligence, statistical experimentation, and dashboard development. It showcases skills in data engineering, analytics, experimentation, and business insight generation commonly used by data analysts, BI engineers, and data-driven product teams.



\## Author



Sai Thrisha



GitHub: https://github.com/saithrishadaggupati/ecommerce-funnel-analysis



LinkedIn: https://www.linkedin.com/in/saitrishadaggupati/

