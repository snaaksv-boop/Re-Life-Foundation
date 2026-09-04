import React from 'react';
import { useContent } from '../context/ContentContext';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md'
}) => {
  const { logoUrl } = useContent();
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 cursor-pointer select-none ${className}`}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Re-Life Foundation Logo"
          className="w-11 h-11 rounded-full object-cover shadow-sm border border-slate-200 shrink-0"
          referrerPolicy="no-referrer"
        />
      ) : (
        /* White circular badge as shown in the screenshot */
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center p-1 shadow-sm border border-slate-200 shrink-0">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full fill-none"
          >
            {/* Outer circles */}
            <circle cx="50" cy="50" r="46" stroke="#0f766e" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" />
            
            {/* Rising person/spirit */}
            <circle cx="50" cy="30" r="7" fill="#0f766e" />
            
            {/* Caring hands embracing */}
            <path
              d="M25 66 C 25 48, 42 38, 50 48 C 58 38, 75 48, 75 66 C 66 76, 34 76, 25 66 Z"
              fill="#0f766e"
            />
            
            {/* Healing leaf */}
            <path
              d="M50 48 Q 50 20 62 26 Q 58 42 50 48 Z"
              fill="#f59e0b"
            />
          </svg>
        </div>
      )}

      {/* Brand Typography strictly matching screenshot: "Re-Life Foundation" and "Rehabilitation & De-Addiction Centre" */}
      <div className="flex flex-col text-left">
        <span
          className={`font-heading font-bold text-lg sm:text-xl leading-none tracking-tight ${
            isDark ? 'text-slate-900' : 'text-white'
          }`}
        >
          Re-Life Foundation
        </span>
        <span
          className={`text-[11px] sm:text-xs font-normal leading-tight mt-1 tracking-normal ${
            isDark ? 'text-teal-700' : 'text-teal-200/90'
          }`}
        >
          Rehabilitation &amp; De-Addiction Centre
        </span>
      </div>
    </div>
  );
};
