import React, { useState } from 'react';

export default function AddTodo({ onAdd, categories, priorities }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onAdd({ text: text.trim(), category, priority, dueDate });
    setText('');
    setDueDate('');
    setExpanded(false);
  };

  const selStyle = {
    padding:'.5rem .8rem', border:'2px solid var(--border)',
    borderRadius:'.8rem', fontSize:'.85rem', fontWeight:700,
    background:'var(--white)', color:'var(--ink)', cursor:'pointer'
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background:'var(--white)', borderRadius:'var(--radius)',
      padding:'1.2rem', marginBottom:'1.2rem',
      boxShadow:'var(--shadow-lg)',
      border:'2px solid var(--border)',
      animation: shake ? 'shake .4s ease' : 'none'
    }}>
      {/* Main input */}
      <div style={{display:'flex',gap:'.8rem',alignItems:'center'}}>
        <span style={{fontSize:'1.3rem'}}></span>
        <input
          type="text"
          placeholder="Enter a new task?"
          value={text}
          onChange={e => { setText(e.target.value); if (!expanded && e.target.value) setExpanded(true); }}
          onFocus={() => setExpanded(true)}
          style={{
            flex:1, border:'none', fontSize:'1rem', fontWeight:700,
            color:'var(--ink)', background:'transparent',
            placeholder:'var(--muted)'
          }}
        />
        <button type="submit" style={{
          background:'linear-gradient(135deg, #7c3aed, #ec4899)',
          color:'white', padding:'.6rem 1.4rem', borderRadius:'2rem',
          fontWeight:800, fontSize:'.9rem',
          boxShadow:'0 4px 15px rgba(124,58,237,.4)',
          transition:'transform .2s, box-shadow .2s'
        }}
          onMouseOver={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 20px rgba(124,58,237,.5)'; }}
          onMouseOut={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 15px rgba(124,58,237,.4)'; }}
        >
          + Add
        </button>
      </div>

      {/* Expanded options */}
      {expanded && (
        <div className="fade-in" style={{
          marginTop:'1rem', paddingTop:'1rem',
          borderTop:'2px dashed var(--border)',
          display:'flex', gap:'.8rem', flexWrap:'wrap', alignItems:'center'
        }}>
          {/* Category */}
          <select value={category} onChange={e => setCategory(e.target.value)} style={selStyle}>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
            ))}
          </select>

          {/* Priority */}
          <select value={priority} onChange={e => setPriority(e.target.value)} style={selStyle}>
            {priorities.map(p => (
              <option key={p.id} value={p.id}>{p.emoji} {p.label}</option>
            ))}
          </select>

          {/* Due Date */}
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            style={{...selStyle, color: dueDate ? 'var(--ink)' : 'var(--muted)'}}
          />

          <button type="button" onClick={() => setExpanded(false)}
            style={{background:'none',color:'var(--muted)',fontSize:'.85rem',fontWeight:700,marginLeft:'auto'}}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
