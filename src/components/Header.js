import React from 'react';

export default function Header({ searchQuery, setSearchQuery, stats }) {
  const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <header style={{marginBottom:'2rem'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
        <div>
          <h1 style={{
            fontFamily:'Righteous, cursive',
            fontSize:'clamp(2rem,5vw,3rem)',
            background:'linear-gradient(135deg, #7c3aed, #ec4899, #f97316)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            lineHeight:1.1
          }}>
            TaskFlow ✨
          </h1>
          <p style={{color:'var(--muted)',fontSize:'.9rem',marginTop:'.3rem',fontWeight:600}}>
            {stats.active} tasks remaining • {stats.completed} done!
          </p>
        </div>

        {/* Progress Ring */}
        <div style={{position:'relative',width:'70px',height:'70px'}}>
          <svg width="70" height="70" style={{transform:'rotate(-90deg)'}}>
            <circle cx="35" cy="35" r="28" fill="none" stroke="#e8dff5" strokeWidth="6"/>
            <circle cx="35" cy="35" r="28" fill="none"
              stroke="url(#grad)" strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{transition:'stroke-dashoffset .5s ease'}}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed"/>
                <stop offset="100%" stopColor="#ec4899"/>
              </linearGradient>
            </defs>
          </svg>
          <div style={{
            position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',
            fontFamily:'Righteous',fontSize:'.95rem',fontWeight:700,color:'var(--purple)'
          }}>{progress}%</div>
        </div>
      </div>

      {/* Search */}
      <div style={{position:'relative'}}>
        <span style={{position:'absolute',left:'1rem',top:'50%',transform:'translateY(-50%)',fontSize:'1.1rem'}}>🔍</span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            width:'100%', padding:'.85rem 1rem .85rem 2.8rem',
            border:'2px solid var(--border)', borderRadius:'var(--radius)',
            fontSize:'1rem', background:'var(--white)',
            color:'var(--ink)', fontWeight:600,
            transition:'border-color .2s, box-shadow .2s',
            boxShadow:'var(--shadow)'
          }}
          onFocus={e => { e.target.style.borderColor='var(--purple)'; e.target.style.boxShadow='0 0 0 4px rgba(124,58,237,.1)'; }}
          onBlur={e => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='var(--shadow)'; }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')}
            style={{position:'absolute',right:'1rem',top:'50%',transform:'translateY(-50%)',background:'none',color:'var(--muted)',fontSize:'1.1rem'}}>
            ✕
          </button>
        )}
      </div>
    </header>
  );
}
