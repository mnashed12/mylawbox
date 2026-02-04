import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
