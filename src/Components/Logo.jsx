import React from 'react';
import LogoImg from '../assets/logo-no-background.svg';

function Logo({ width = '150px' }) {
  return (
    <div className="relative overflow-hidden flex justify-center items-center">
      <img
        src={LogoImg}
        alt="Logo"
        width={width}
        className="relative z-10"
      />
      {/* First soft glow layer (horizontal) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-soft-glow-horizontal blur-lg opacity-90"></div>
      </div>
      
      {/* Second soft glow layer (diagonal) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full bg-gradient-to-br from-transparent via-white/70 to-transparent animate-soft-glow-diagonal blur-2xl opacity-80"></div>
      </div>
    </div>
  );
}

export default Logo;

