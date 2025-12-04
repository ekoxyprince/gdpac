import React from "react";
import dashboard1 from "../assets/dashboard-1.png";
import dashboard2 from "../assets/dashboard-2.png";
import dashboard3 from "../assets/dashboard-3.png";
import dashboard4 from "../assets/dashboard-4.png";

const services = [
  {
    title: "Analytics Dashboards",
    desc: "Interactive SEDI, GPI, and IEI dashboards for benchmarking state performance.",
    image: dashboard1,
    tag: "Flagship tool",
  },
  {
    title: "Custom Policy Briefs",
    desc: "Tailored evidence packs for governors, MDAs, and development partners.",
    image: dashboard2,
    tag: "On demand",
  },
  {
    title: "Capacity Building",
    desc: "Training for state analysts on data literacy and performance management.",
    image: dashboard3,
    tag: "Workshops",
  },
  {
    title: "Open Data & APIs",
    desc: "Secure, standards-based access for researchers and civic tech partners.",
    image: dashboard4,
    tag: "Developers",
  },
];

const Services = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-blue-900">
    <section className="sr-section max-w-6xl mx-auto px-6 py-14 text-center space-y-3">
      <p className="text-xs font-semibold tracking-[0.25em] text-green-600 uppercase">
        Services
      </p>
      <h1 className="text-3xl md:text-4xl font-bold mt-2">
        From raw data to decision-ready insight.
      </h1>
      <p className="max-w-2xl mx-auto text-blue-800 text-sm md:text-base">
        Explore how GDPAC helps governments, institutions, and partners turn
        complex development challenges into clear, actionable intelligence.
      </p>
      <p className="max-w-3xl mx-auto text-blue-700 text-xs md:text-sm">
        We look at our services as an integrated stack—from core analytics
        platforms and advisory work to capacity building and open data access.
      </p>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <article
          key={s.title}
          className="bg-white rounded-2xl shadow border overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-transform"
        >
          <div className="h-32 bg-blue-100 overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <span className="inline-block text-[0.65rem] tracking-wide uppercase text-green-600 bg-green-50 border border-green-100 rounded-full px-2 py-0.5 mb-2">
              {s.tag}
            </span>
            <h2 className="font-semibold mb-1 text-sm md:text-base">{s.title}</h2>
            <p className="text-xs md:text-sm text-blue-800 flex-1">{s.desc}</p>
          </div>
        </article>
      ))}
    </section>
  </div>
);

export default Services;
