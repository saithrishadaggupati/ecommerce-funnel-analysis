import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState, useEffect } from 'react';
import React from 'react';

const KPICard = ({ title, value, subtitle, index }) => {
  const accents = ['#E85D26', '#1C1C1C', '#E85D26', '#1C1C1C'];
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1.5px solid #E8E8E3',
      borderRadius: '4px',
      padding: '32px 28px',
      minWidth: '220px',
      flex: '1',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '160px'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        background: accents[index % 2]
      }} />
      <p style={{
        color: '#888',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '16px',
        fontFamily: 'Inter, sans-serif'
      }}>{title}</p>
      <h2 style={{
        fontSize: '42px',
        fontWeight: '700',
        color: '#1C1C1C',
        margin: '0',
        fontFamily: 'Courier New, monospace',
        letterSpacing: '-2px'
      }}>{value}</h2>
      <p style={{
        color: '#AAAAAA',
        fontSize: '12px',
        marginTop: '12px',
        fontFamily: 'Inter, sans-serif'
      }}>{subtitle}</p>
    </div>
  );
};

const Home = () => {
  const [kpis, setKpis] = useState({
    total_orders: 99992,
    delivery_rate: 97.01,
    avg_rating: 4.09,
    satisfaction_rate: 76.48
  });

  useEffect(() => {
    fetch('https://ecommerce-api-721141274431.asia-south1.run.app/api/kpis')
      .then(res => res.json())
      .then(data => setKpis(data))
      .catch(() => console.log('Using hardcoded data'));
  }, []);

  const kpiCards = [
    { title: 'Total Orders', value: kpis.total_orders.toLocaleString(), subtitle: 'Aug 2016 – Aug 2018' },
    { title: 'Delivery Rate', value: kpis.delivery_rate + '%', subtitle: 'Orders successfully delivered' },
    { title: 'Avg Rating', value: kpis.avg_rating, subtitle: 'Out of 5.0' },
    { title: 'Satisfaction Rate', value: kpis.satisfaction_rate + '%', subtitle: 'Orders rated 4 or above' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1.5px solid #E8E8E3', padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '8px', height: '8px', background: '#E85D26', borderRadius: '50%' }} />
          <span style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1C1C1C' }}>Olist E-Commerce Analysis</span>
        </div>
        <span style={{ fontSize: '12px', color: '#AAAAAA' }}>100,000+ Orders · Brazil · 2016–2018</span>
      </div>

      {/* Hero */}
      <div style={{ padding: '64px 48px 40px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E85D26', marginBottom: '16px' }}>Funnel Intelligence</p>
        <h1 style={{ fontSize: '52px', fontWeight: '800', color: '#1C1C1C', margin: '0', lineHeight: '1.1', letterSpacing: '-2px', maxWidth: '600px' }}>
          Where does<br />satisfaction break?
        </h1>
        <p style={{ color: '#888', fontSize: '15px', marginTop: '20px', maxWidth: '480px', lineHeight: '1.7' }}>
          97% of orders are delivered. But 1 in 5 customers leaves unsatisfied. This dashboard shows where and why.
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ padding: '0 48px 64px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {kpiCards.map((kpi, i) => (
          <KPICard key={i} {...kpi} index={i} />
        ))}
      </div>

      {/* Key Finding Banner */}
      <div style={{ margin: '0 48px', background: '#1C1C1C', borderRadius: '4px', padding: '48px', display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ color: '#E85D26', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Key Finding</p>
          <p style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '600', margin: '0', lineHeight: '1.5' }}>
            Fast delivery (≤7 days) scores <span style={{ color: '#E85D26' }}>4.41</span> vs slow delivery at <span style={{ color: '#888' }}>4.04</span>
          </p>
        </div>
        <div style={{ borderLeft: '1px solid #333', paddingLeft: '40px' }}>
          <p style={{ color: '#888', fontSize: '12px', margin: '0 0 4px' }}>p-value</p>
          <p style={{ color: '#FFFFFF', fontFamily: 'Courier New, monospace', fontSize: '28px', fontWeight: '700', margin: '0' }}>≈ 0.000</p>
        </div>
        <div style={{ borderLeft: '1px solid #333', paddingLeft: '40px' }}>
          <p style={{ color: '#888', fontSize: '12px', margin: '0 0 4px' }}>t-statistic</p>
          <p style={{ color: '#FFFFFF', fontFamily: 'Courier New, monospace', fontSize: '28px', fontWeight: '700', margin: '0' }}>42.74</p>
        </div>
      </div>
{/* Charts */}
      <div style={{ padding: '64px 48px 0', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        
        {/* Funnel Chart */}
        <div style={{ flex: '1', minWidth: '300px', background: '#FFFFFF', border: '1.5px solid #E8E8E3', borderRadius: '4px', padding: '32px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: '4px' }}>Order Funnel</p>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1C1C1C', margin: '0 0 32px' }}>Conversion at each stage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { stage: 'Total', orders: 99992 },
              { stage: 'Confirmed', orders: 98752 },
              { stage: 'Delivered', orders: 97007 },
              { stage: 'Satisfied', orders: 76470 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#888' }} />
              <YAxis tick={{ fontSize: 11, fill: '#888' }} />
              <Tooltip />
              <Bar dataKey="orders" radius={[2, 2, 0, 0]}>
                <Cell fill="#E85D26" />
                <Cell fill="#1C1C1C" />
                <Cell fill="#1C1C1C" />
                <Cell fill="#E85D26" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Delivery Chart */}
        <div style={{ flex: '1', minWidth: '300px', background: '#FFFFFF', border: '1.5px solid #E8E8E3', borderRadius: '4px', padding: '32px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: '4px' }}>A/B Test Result</p>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1C1C1C', margin: '0 0 32px' }}>Delivery speed vs rating</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { group: 'Fast (≤7d)', avg_score: 4.41 },
              { group: 'Slow (>7d)', avg_score: 4.04 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="group" tick={{ fontSize: 11, fill: '#888' }} />
              <YAxis domain={[3.8, 4.6]} tick={{ fontSize: 11, fill: '#888' }} />
              <Tooltip />
              <Bar dataKey="avg_score" radius={[2, 2, 0, 0]}>
                <Cell fill="#E85D26" />
                <Cell fill="#1C1C1C" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
      {/* Footer */}
      <div style={{ padding: '32px 48px', borderTop: '1.5px solid #E8E8E3', marginTop: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#AAAAAA' }}>Daggupati Sai Thrisha · NITK Surathkal</span>
        <span style={{ fontSize: '12px', color: '#AAAAAA' }}>Built with React · Data from BigQuery</span>
      </div>
    </div>
  );
};

export default Home;