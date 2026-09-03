import React from 'react';

export default function AnimatedBackground() {
  const types = ['pill', 'plus', 'bubble', 'capsule'];
  
  // Generating elements
  const elements = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    type: types[Math.floor(Math.random() * types.length)],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * -20}s`,
    duration: `${15 + Math.random() * 25}s`,
    size: `${15 + Math.random() * 20}px`
  }));

  return (
     
      
    <div className="medical-bg">
      {elements.map((el) => (
        <span
          key={el.id}
          className={`symbol ${el.type === 'pill' ? 'pill-shape' : el.type === 'capsule' ? 'capsule-shape' : el.type === 'bubble' ? 'bubble' : 'medical-plus'}`}
          style={{
            left: el.left,
            top: el.top,
            animationDelay: el.delay,
            animationDuration: el.duration,
            fontSize: el.size,
          }}
        >
          {el.type === 'plus' ? '✚' : el.type === 'heart' ? '♥' : ''}
        </span>
      ))}
    </div>
  );
}