-- ============================================
-- QUERY 1: Conversion Funnel
-- ============================================
SELECT
  COUNT(*) AS total_orders,
  COUNTIF(order_status != 'canceled' AND order_status != 'unavailable') AS confirmed_orders,
  COUNTIF(order_status = 'delivered') AS delivered_orders,
  COUNTIF(r.review_score >= 4) AS satisfied_orders,
  ROUND(COUNTIF(order_status != 'canceled' AND order_status != 'unavailable') / COUNT(*) * 100, 2) AS confirmed_rate,
  ROUND(COUNTIF(order_status = 'delivered') / COUNT(*) * 100, 2) AS delivered_rate,
  ROUND(COUNTIF(r.review_score >= 4) / COUNT(*) * 100, 2) AS satisfied_rate
FROM `tidy-etching-499107-r0.olist.orders` o
LEFT JOIN `tidy-etching-499107-r0.olist.reviews` r USING (order_id);

-- ============================================
-- QUERY 2: Drop-off Rate at Each Funnel Stage
-- ============================================
WITH funnel AS (
  SELECT
    COUNT(*) AS total,
    COUNTIF(order_status NOT IN ('canceled','unavailable')) AS confirmed,
    COUNTIF(order_status = 'delivered') AS delivered,
    COUNTIF(r.review_score >= 4) AS satisfied
  FROM `tidy-etching-499107-r0.olist.orders` o
  LEFT JOIN `tidy-etching-499107-r0.olist.reviews` r USING (order_id)
)
SELECT
  ROUND((total - confirmed) / total * 100, 2) AS dropoff_total_to_confirmed,
  ROUND((confirmed - delivered) / total * 100, 2) AS dropoff_confirmed_to_delivered,
  ROUND((delivered - satisfied) / total * 100, 2) AS dropoff_delivered_to_satisfied
FROM funnel;

-- ============================================
-- QUERY 3: Average Delivery Time by Seller State
-- ============================================
SELECT
  s.seller_state,
  ROUND(AVG(DATE_DIFF(DATE(o.order_delivered_customer_date), DATE(o.order_purchase_timestamp), DAY)), 1) AS avg_delivery_days,
  COUNT(*) AS total_orders
FROM `tidy-etching-499107-r0.olist.orders` o
JOIN `tidy-etching-499107-r0.olist.order_items` oi USING (order_id)
JOIN `tidy-etching-499107-r0.olist.sellers` s USING (seller_id)
WHERE o.order_delivered_customer_date IS NOT NULL
GROUP BY s.seller_state
ORDER BY avg_delivery_days;

-- ============================================
-- QUERY 4: Top 10 Product Categories by Revenue
-- ============================================
SELECT
  t.string_field_1 AS category_english,
  ROUND(SUM(oi.price), 2) AS total_revenue,
  COUNT(DISTINCT oi.order_id) AS total_orders
FROM `tidy-etching-499107-r0.olist.order_items` oi
JOIN `tidy-etching-499107-r0.olist.products` p USING (product_id)
JOIN `tidy-etching-499107-r0.olist.orders` o USING (order_id)
LEFT JOIN `tidy-etching-499107-r0.olist.` t ON p.product_category_name = t.string_field_0
WHERE o.order_status = 'delivered'
GROUP BY category_english
ORDER BY total_revenue DESC
LIMIT 10;

-- ============================================
-- QUERY 5: Monthly Order Volume Trend
-- ============================================
SELECT
  FORMAT_DATE('%Y-%m', DATE(order_purchase_timestamp)) AS month,
  COUNT(*) AS total_orders
FROM `tidy-etching-499107-r0.olist.orders`
WHERE order_status = 'delivered'
GROUP BY month
ORDER BY month;

-- ============================================
-- QUERY 6: Payment Method Distribution
-- ============================================
SELECT
  payment_type,
  COUNT(*) AS total_transactions,
  ROUND(COUNT(*) / SUM(COUNT(*)) OVER () * 100, 2) AS percentage
FROM `tidy-etching-499107-r0.olist.payments`
GROUP BY payment_type
ORDER BY total_transactions DESC;

-- ============================================
-- QUERY 7: Seller Performance Ranking
-- ============================================
SELECT
  s.seller_id,
  s.seller_state,
  COUNT(DISTINCT oi.order_id) AS total_orders,
  ROUND(AVG(r.review_score), 2) AS avg_rating,
  ROUND(SUM(oi.price), 2) AS total_revenue
FROM `tidy-etching-499107-r0.olist.sellers` s
JOIN `tidy-etching-499107-r0.olist.order_items` oi USING (seller_id)
JOIN `tidy-etching-499107-r0.olist.orders` o USING (order_id)
LEFT JOIN `tidy-etching-499107-r0.olist.reviews` r USING (order_id)
WHERE o.order_status = 'delivered'
GROUP BY s.seller_id, s.seller_state
ORDER BY total_revenue DESC
LIMIT 20;

-- ============================================
-- QUERY 8: Late Delivery Rate by Region
-- ============================================
SELECT
  c.customer_state,
  COUNT(*) AS total_delivered,
  COUNTIF(o.order_delivered_customer_date > o.order_estimated_delivery_date) AS late_deliveries,
  ROUND(COUNTIF(o.order_delivered_customer_date > o.order_estimated_delivery_date) / COUNT(*) * 100, 2) AS late_rate_pct
FROM `tidy-etching-499107-r0.olist.orders` o
JOIN `tidy-etching-499107-r0.olist.customers` c USING (customer_id)
WHERE o.order_delivered_customer_date IS NOT NULL
GROUP BY c.customer_state
ORDER BY late_rate_pct DESC;