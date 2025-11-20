import React from 'react';

const Hero = () => {
  const bgUrl = "https://cdn.dribbble.com/userupload/16537236/file/original-3c9baf8044faac370974ead6e9a41217.jpg?resize=1504x1003&vertical=center";
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      {/* Background cover image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${bgUrl})` }}
        aria-hidden="true"
      />

      {/* Gradient overlay (blue -> purple, diagonal) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/60 via-indigo-600/50 to-purple-700/60 mix-blend-multiply" />

      {/* Subtle texture / vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(255,255,255,0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(0,0,0,0.35),transparent_60%)]" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 py-24 sm:py-28 md:py-32 flex items-center">
        <div className="w-full text-center">
          <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium text-blue-100 ring-1 ring-white/20 shadow-sm">Modern • Abstract • Vibrant</span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_6px_30px_rgba(59,130,246,0.45)]">
            Build modern apps with a blue–purple vibe
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto">
            Describe what you want. Watch it appear. Iterate in seconds — all on a sleek gradient canvas.
          </p>
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-4">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-100 px-5 py-3 text-sm sm:text-base font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-colors"
            >
              Get started
            </a>
            <a
              href="#learn-more"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/15 px-5 py-3 text-sm sm:text-base font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-white/10 backdrop-blur-md transition-colors"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
