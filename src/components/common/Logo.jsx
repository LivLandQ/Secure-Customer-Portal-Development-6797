import React from 'react';

const Logo = ({ className = "h-8 w-auto", alt = "Company Logo" }) => {
  return (
    <img 
      src="/src/assets/logo.png" 
      alt={alt}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default Logo;