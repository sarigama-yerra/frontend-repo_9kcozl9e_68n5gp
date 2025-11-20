import React from 'react';

const Footer = () => {
  return (
    <footer className="relative w-full bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-200/70">Built on a modern, vibrant gradient aesthetic.</p>
          <div className="text-sm text-blue-200/70">© {new Date().getFullYear()} Flames Blue</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
