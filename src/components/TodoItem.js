import React, { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit, categories, priorities, index }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  const [hovered, setHovered] = useState(false);

  const cat = categories.find(c => c.id === todo.category) || categories[0];
  const pri = priorities.find(p => p.id === todo.priority) || priorities[0];

  const isOverdue = !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date();
  const isDueToday = todo.dueDate && new Date(todo.dueDate).toDateString() === new Date().toDateString();

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isDueToday) return '📅 Today';
    if (isOverdue) return `⚠️ Overdue: ${date.toLocaleDateString('en-US', {month:'short',day:'numeric'})}`;
    return `📅 ${date.toLocaleDateString('en-US', {month:'short',day:'numeric'})}`;
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    onEdit(todo.id, { text: editText.trim(), category: editCategory, priority: editPriority, dueDate: editDueDate });
    setEditing(false);
  };

  const selStyle = {
    padding:'.3rem .6rem', border:'2px solid var(--border)',
    borderRadius:'.6rem', fontSize:'.8rem', fontWeight:700,
    background:'var(--white)', color:'var(--ink)', cursor:'pointer'
  };

  if (editing) {
    return (
      <div className="fade-in" style={{
        background:'var(--white)', borderRadius:'var(--radius)',
        padding:'1.2rem', border:`2px solid ${cat.color}`,
        boxShadow:`0 4px 20px ${cat.color}22`
      }}>
        <input
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={e => { if(e.key==='Enter') saveEdit(); if(e.key==='Escape') setEditing(false); }}
          autoFocus
          style={{
            width:'100%', border:'2px solid var(--purple)', borderRadius:'.8rem',
            padding:'.6rem .9rem', fontSize:'1rem', fontWeight:700,
            color:'var(--ink)', marginBottom:'.8rem',
            boxShadow:'0 0 0 3px rgba(124,58,237,.1)'
          }}
        />
        <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',alignItems:'center'}}>
          <select value={editCategory} onChange={e => setEditCategory(e.target.value)} style={selStyle}>
            {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
          </select>
          <select value={editPriority} onChange={e => setEditPriority(e.target.value)} style={selStyle}>
            {priorities.map(p => <option key={p.id} value={p.id}>{p.emoji} {p.label}</option>)}
          </select>
          <input type="date" value={editDueDate} onChange={e => setEditDueDate(e.target.value)} style={selStyle} />
          <button onClick={saveEdit} style={{
            background:'linear-gradient(135deg,#7c3aed,#ec4899)',
            color:'white', padding:'.4rem 1rem', borderRadius:'2rem',
            fontWeight:800, fontSize:'.85rem', marginLeft:'auto'
          }}>Save ✓</button>
          <button onClick={() => setEditing(false)} style={{
            background:'none', color:'var(--muted)', fontWeight:700, fontSize:'.85rem'
          }}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="slide-in"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: todo.completed ? '#f8f5ff' : 'var(--white)',
        borderRadius:'var(--radius)',
        padding:'1rem 1.2rem',
        border:`2px solid ${todo.completed ? '#e8dff5' : cat.color + '44'}`,
        boxShadow: hovered ? `0 8px 25px ${cat.color}22` : 'var(--shadow)',
        transition:'all .25s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        animationDelay:`${index * 0.05}s`,
        opacity: todo.completed ? 0.75 : 1,
      }}
    >
      <div style={{display:'flex',alignItems:'flex-start',gap:'1rem'}}>
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          style={{
            width:'1.6rem', height:'1.6rem', borderRadius:'50%', flexShrink:0,
            border:`3px solid ${todo.completed ? cat.color : '#d1c4e9'}`,
            background: todo.completed ? `linear-gradient(135deg,${cat.color},${pri.color})` : 'white',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all .2s', marginTop:'.1rem',
            boxShadow: todo.completed ? `0 3px 10px ${cat.color}44` : 'none'
          }}
          style={{
            width:'1.6rem', height:'1.6rem', borderRadius:'50%', flexShrink:0,
            border:`3px solid ${todo.completed ? cat.color : '#d1c4e9'}`,
            background: todo.completed ? `linear-gradient(135deg,${cat.color},${pri.color})` : 'white',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all .2s', marginTop:'.1rem',
            animation: todo.completed ? 'pop .3s ease' : 'none'
          }}
        >
          {todo.completed && <span style={{color:'white',fontSize:'.75rem',fontWeight:900}}>✓</span>}
        </button>

        {/* Content */}
        <div style={{flex:1,minWidth:0}}>
          <p style={{
            fontSize:'1rem', fontWeight:700, color:'var(--ink)',
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.6 : 1,
            marginBottom:'.4rem', wordBreak:'break-word'
          }}>{todo.text}</p>

          {/* Tags */}
          <div style={{display:'flex',gap:'.4rem',flexWrap:'wrap',alignItems:'center'}}>
            <span style={{
              background:cat.bg, color:cat.color,
              padding:'.2rem .6rem', borderRadius:'2rem',
              fontSize:'.72rem', fontWeight:800,
              border:`1.5px solid ${cat.color}33`
            }}>{cat.emoji} {cat.label}</span>

            <span style={{
              background:pri.bg, color:pri.color,
              padding:'.2rem .6rem', borderRadius:'2rem',
              fontSize:'.72rem', fontWeight:800,
              border:`1.5px solid ${pri.color}33`
            }}>{pri.emoji} {pri.label}</span>

            {todo.dueDate && (
              <span style={{
                background: isOverdue ? '#fee2e2' : isDueToday ? '#fef3c7' : '#f0fdf4',
                color: isOverdue ? '#ef4444' : isDueToday ? '#d97706' : '#059669',
                padding:'.2rem .6rem', borderRadius:'2rem',
                fontSize:'.72rem', fontWeight:800
              }}>{formatDate(todo.dueDate)}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{
          display:'flex', gap:'.4rem',
          opacity: hovered ? 1 : 0,
          transition:'opacity .2s',
          flexShrink:0
        }}>
          <button onClick={() => setEditing(true)} style={{
            width:'2rem', height:'2rem', borderRadius:'50%',
            background:'#ede9fe', color:'#7c3aed',
            fontSize:'.85rem', display:'flex', alignItems:'center', justifyContent:'center',
            transition:'transform .2s'
          }}
            onMouseOver={e => e.currentTarget.style.transform='scale(1.15)'}
            onMouseOut={e => e.currentTarget.style.transform='none'}
          >✏️</button>

          <button onClick={() => onDelete(todo.id)} style={{
            width:'2rem', height:'2rem', borderRadius:'50%',
            background:'#fee2e2', color:'#ef4444',
            fontSize:'.85rem', display:'flex', alignItems:'center', justifyContent:'center',
            transition:'transform .2s'
          }}
            onMouseOver={e => e.currentTarget.style.transform='scale(1.15)'}
            onMouseOut={e => e.currentTarget.style.transform='none'}
          >🗑️</button>
        </div>
      </div>
    </div>
  );
}
