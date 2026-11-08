import React from 'react';

interface BreakerLogoProps {
  className?: string;
  size?: number;
}

export const BreakerLogo: React.FC<BreakerLogoProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="3" width="22" height="26" rx="3" stroke="#D1D1C7" strokeWidth="1.5" fill="#FFFFFF"/>
      <rect x="9" y="7" width="14" height="18" rx="2" stroke="#E3E3DC" strokeWidth="1" fill="#F4F4F0"/>
      <path d="M12 20 L20 22 L22 19 L14 17 Z" fill="#C26700" />
      <path d="M14 17 L18 9 L21 10 L17 18 Z" fill="#C26700" />
      <line x1="15" y1="11.5" x2="19" y2="13" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14" y1="14.5" x2="18" y2="16" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="16" cy="8.5" r="1.2" fill="#4D5156" />
    </svg>
  );
};
