import React from "react";
import mobileImg from "../assets/mobile-optimized.png";

const mockNews = [
  {
    date: "Oct 2025",
    title: "GDPAC launches pilot dashboards with three Nigerian states",
    tag: "Pilot",
  },
  {
    date: "Aug 2025",
    title: "New methodology note for SEDI, GPI, and IEI released",
    tag: "Publication",
  },
  {
    date: "Jun 2025",
    title: "Civic partners co-design citizen scorecard template",
    tag: "Civic engagement",
  },
];

const News = () => (
  <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-green-50 text-blue-900">
    <section className="sr-section max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-start">
      <div className="space-y-4">
        <p className="text-xs tracking-[0.25em] uppercase text-green-600 font-semibold">
          News &amp; events
        </p>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Updates from the GDPAC community.
        </h1>
        <p className="text-sm md:text-base text-blue-800">
          Stay tuned for official releases, methodology notes, partner stories,
          and upcoming events as the platform evolves.
        </p>
        <img
          src={mobileImg}
          alt="Mobile view of analytics dashboards"
          className="rounded-2xl shadow-xl w-full max-w-sm object-cover"
        />
      </div>

      <div className="space-y-4 bg-white rounded-2xl border shadow-sm p-5 transition-transform duration-300 hover:-translate-y-1">
        {mockNews.map((item) => (
          <article key={item.title} className="border-b last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-blue-500">
                {item.date}
              </span>
              <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {item.tag}
              </span>
            </div>
            <h2 className="text-sm md:text-base font-semibold text-blue-900">
              {item.title}
            </h2>
          </article>
        ))}
      </div>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-10 grid md:grid-cols-3 gap-6 text-sm">
      <article className="bg-white rounded-2xl border shadow-sm p-5 space-y-2">
        <h2 className="font-semibold text-blue-900">Upcoming events</h2>
        <p className="text-blue-800">
          Demo webinars, civic data clinics, and partner roundtables will be
          announced here as the platform scales.
        </p>
      </article>
      <article className="bg-white rounded-2xl border shadow-sm p-5 space-y-2">
        <h2 className="font-semibold text-blue-900">Methodology notes</h2>
        <p className="text-blue-800">
          Key updates to SEDI, GPI, IEI and other indices will be shared as short
          bulletins and downloadable briefs.
        </p>
      </article>
      <article className="bg-white rounded-2xl border shadow-sm p-5 space-y-2">
        <h2 className="font-semibold text-blue-900">Media &amp; press</h2>
        <p className="text-blue-800">
          Journalists and storytellers can access press kits, quotes, and data
          visuals for responsible reporting.
        </p>
      </article>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-16 text-sm md:text-base">
      <div className="bg-blue-900 rounded-3xl px-6 py-8 md:px-10 md:py-10 text-blue-50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-2xl font-bold">Stay in the loop</h2>
          <p>
            Subscribe to a future newsletter or RSS feed to receive GDPAC news,
            release notes, and impact stories in your inbox.
          </p>
        </div>
        <div className="w-full md:w-auto flex flex-col gap-2 text-xs">
          <input
            type="email"
            className="w-full md:w-64 px-3 py-2 rounded-lg text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@example.org (demo field)"
          />
          <button className="px-4 py-2 rounded-lg bg-white text-blue-900 font-semibold shadow hover:bg-blue-50">
            Join mailing list (demo)
          </button>
        </div>
      </div>
    </section>
  </div>
);

export default News;
