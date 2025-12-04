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
          News & events
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
  </div>
);

export default News;
