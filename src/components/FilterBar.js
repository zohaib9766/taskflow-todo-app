import React from 'react';

export default function FilterBar({
  filter, setFilter,
  categoryFilter, setCategoryFilter,
  priorityFilter, setPriorityFilter,
  sortBy, setSortBy,
  categories, priorities,
  onClearCompleted, completedCount
}) {

  const tabStyle = (active) => ({
    padding:'.45rem 1rem', borderRadius:'2rem',
    fontWeight:700, fontSize:'.85rem',
    background: active ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'var(--white)',
    color: active ? 'white' : 'var(--muted)',
    border: active ? 'none' : '2px solid var(--border)',
    transition:'all .2s',
    boxShadow: active ? '0 4px 12px rgba(124,58,237,.3)' : 'none',
    cursor:'pointer'
  });

  const selStyle = {
    padding:'.45rem .8rem', border:'2px solid var(--border)',
    borderRadius:'2rem', fontSize:'.82rem', fontWeight:700,
    background:'var(--white)', color:'var(--ink)', cursor:'pointer'
  };

  return (
    <div style={{
      background:'var(--white)', borderRadius:'var(--radius)',
      padding:'1rem', marginBottom:'1rem',
      boxShadow:'var(--shadow)', border:'2px solid var(--border)'
    }}>
      {/* Status filters */}
      <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',marginBottom:'.8rem'}}>
        {[['all','All 📋'],['active','Active ⚡'],['completed','Done ✅']].map(([val,label]) => (
          <button key={val} onClick={() => setFilter(val)} style={tabStyle(filter === val)}>{label}</button>
        ))}
        {completedCount > 0 && (
          <button onClick={onClearCompleted} style={{
            ...tabStyle(false), marginLeft:'auto',
            color:'var(--red)', borderColor:'var(--red-light)'
          }}>
            🗑️ Clear Done ({completedCount})
          </button>
        )}
      </div>

      {/* Category + Priority + Sort */}
      <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',alignItems:'center'}}>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={selStyle}>
          <option value="all">🏷️ All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
        </select>

        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={selStyle}>
          <option value="all">⚡ All Priorities</option>
          {priorities.map(p => <option key={p.id} value={p.id}>{p.emoji} {p.label}</option>)}
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selStyle}>
          <option value="createdAt">🕐 Newest First</option>
          <option value="priority">🔥 By Priority</option>
          <option value="dueDate">📅 By Due Date</option>
        </select>
      </div>
    </div>
  );
}
