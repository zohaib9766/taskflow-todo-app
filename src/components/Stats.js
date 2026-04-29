import React from 'react';

export default function Stats({ stats, categories, todos }) {
  const cards = [
    { label: 'Total', value: stats.total, emoji: '📋', color: '#7c3aed', bg: '#ede9fe' },
    { label: 'Active', value: stats.active, emoji: '⚡', color: '#f97316', bg: '#ffedd5' },
    { label: 'Done', value: stats.completed, emoji: '✅', color: '#10b981', bg: '#d1fae5' },
    { label: 'Overdue', value: stats.overdue, emoji: '⏰', color: '#ef4444', bg: '#fee2e2' },
  ];

  return (
    <div style={{
      display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'.8rem',
      marginBottom:'1.5rem'
    }}>
      {cards.map((card, i) => (
        <div key={card.label} className="fade-in" style={{
          background: card.bg,
          borderRadius:'var(--radius)',
          padding:'1rem .8rem',
          textAlign:'center',
          border:`2px solid ${card.color}22`,
          animationDelay:`${i * 0.08}s`
        }}>
          <div style={{fontSize:'1.5rem',marginBottom:'.3rem'}}>{card.emoji}</div>
          <div style={{fontFamily:'Righteous',fontSize:'1.6rem',color:card.color,lineHeight:1}}>{card.value}</div>
          <div style={{fontSize:'.75rem',fontWeight:700,color:card.color,opacity:.8,marginTop:'.2rem',textTransform:'uppercase',letterSpacing:'.06em'}}>{card.label}</div>
        </div>
      ))}
    </div>
  );
}
