import React from 'react';

const features = [
  {
    title: 'Fast iteration',
    desc: 'Make changes and see them instantly with live preview and hot reloading.',
  },
  {
    title: 'Clean aesthetics',
    desc: 'Blue-to-purple gradients, soft textures, and modern UI patterns by default.',
  },
  {
    title: 'Backend ready',
    desc: 'A fully wired API is included so you can add real features right away.',
  },
];

const Features = () => {
  return (
    <section id="learn-more" className="relative w-full py-16 sm:py-20 md:py-24 bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-purple-500/10" />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-7 hover:bg-white/[0.08] transition-colors"
            >
              <div className="text-sm uppercase tracking-wider text-blue-200/80">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="mt-3 text-xl font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-blue-100/80">{f.desc}</p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <button className="mt-6 inline-flex items-center text-sm font-medium text-blue-200 group-hover:text-white transition-colors">
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-2 h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
