import React from "react";
import flagship1 from "../assets/flagship-indices.png";
import flagship2 from "../assets/flagship-indices-2.png";

const cards = [
  {
    code: "SEDI",
    name: "Socioeconomic Development Index",
    color: "from-blue-500 to-indigo-700",
    text: "Tracks poverty, education, health, and living conditions across states.",
  },
  {
    code: "GPI",
    name: "Governance Performance Index",
    color: "from-emerald-500 to-green-700",
    text: "Measures fiscal discipline, transparency, civic participation, and rule of law.",
  },
  {
    code: "IEI",
    name: "Institutional Efficiency Index",
    color: "from-sky-500 to-cyan-700",
    text: "Assesses budget execution, compliance, service delivery, and stakeholder feedback.",
  },
];

const Indices = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 text-blue-900">
    <section className="sr-section max-w-5xl mx-auto px-6 py-14 text-center space-y-3">
      <p className="text-xs tracking-[0.25em] uppercase text-green-600 font-semibold">
        Flagship indices
      </p>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-1">
        Tracking development. Measuring governance. Empowering reform.
      </h1>
      <p className="max-w-2xl mx-auto text-sm md:text-base text-blue-800">
        GDPAC’s indices provide multidimensional, evidence-based insights into
        Nigeria’s development and governance landscape, helping leaders and
        citizens understand where progress is happening—and where more work is
        needed.
      </p>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-12 grid md:grid-cols-3 gap-6">
      {cards.map((c) => (
        <article key={c.code} className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col">
          <div className={`bg-gradient-to-br ${c.color} text-white p-5 pb-6`}>
            <div className="text-xs uppercase tracking-[0.25em] mb-2">{c.code}</div>
            <h2 className="font-semibold text-lg leading-snug">{c.name}</h2>
            <p className="text-xs mt-2 text-white/90 max-w-xs">{c.text}</p>
          </div>
        </article>
      ))}
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-3 text-sm md:text-base">
        <h2 className="text-2xl font-bold text-blue-900 mb-1">How the indices work</h2>
        <p>
          Each index is built from carefully selected indicators, normalised to a
          0–1 scale and aggregated using transparent, published rules.
        </p>
        <p>
          States can use these scores to set targets, track reforms, and engage
          citizens in evidence-based conversations about progress.
        </p>
      </div>
      <div className="grid gap-4">
        <img
          src={flagship1}
          alt="Index cards illustration"
          className="rounded-2xl shadow-lg object-cover w-full"
        />
        <img
          src={flagship2}
          alt="Nigeria map and metrics"
          className="rounded-2xl shadow-md object-cover w-full max-w-md ml-auto"
        />
      </div>
    </section>
  </div>
);

export default Indices;
