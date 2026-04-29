import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onEdit, categories, priorities }) {
  if (todos.length === 0) {
    return (
      <div style={{
        textAlign:'center', padding:'4rem 2rem',
        background:'var(--white)', borderRadius:'var(--radius)',
        border:'2px dashed var(--border)'
      }}>
        <div style={{fontSize:'4rem',marginBottom:'1rem'}}></div>
        <h3 style={{fontFamily:'Righteous',fontSize:'1.5rem',color:'var(--purple)',marginBottom:'.5rem'}}>
          All Clear!
        </h3>
        <p style={{color:'var(--muted)',fontWeight:600}}>No tasks found. Add one above!</p>
      </div>
    );
  }

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'.7rem'}}>
      {todos.map((todo, i) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          categories={categories}
          priorities={priorities}
          index={i}
        />
      ))}
    </div>
  );
}
