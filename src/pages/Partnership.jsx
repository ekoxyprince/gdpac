import React from "react";
import bannerImg from "../assets/gdpac-banner.png";

const Partnership = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-green-700 text-white">
    <section className="sr-section max-w-5xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-4">
        <p className="text-xs tracking-[0.25em] uppercase text-green-300 font-semibold">
          Partnerships
        </p>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Work with GDPAC to unlock the full value of governance data.
        </h1>
        <p className="text-sm md:text-base text-blue-100">
          We collaborate with government MDAs, development partners, research
          institutions, and civic organisations to co-design indices, fund data
          collection, and scale impact.
        </p>
        <ul className="text-sm space-y-1">
          <li>
            <span className="font-semibold">Strategic partners:</span> Long-term
            collaborations around flagship indices and dashboards.
          </li>
          <li>
            <span className="font-semibold">Technical partners:</span> Data
            science, infrastructure, and tooling support.
          </li>
          <li>
            <span className="font-semibold">Funding partners:</span> Grants and
            investments in open, public-interest data.
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            href="/contact"
            className="px-4 py-2 bg-white text-blue-900 rounded-lg font-semibold shadow hover:bg-blue-50 transition"
          >
            Start a conversation
          </a>
          <span className="px-3 py-2 rounded-full border border-white/30 text-xs">
            info@gdpac.ng
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src={bannerImg}
          alt="Partner logos and collaboration graphic"
          className="rounded-2xl shadow-2xl w-full max-w-md object-cover border border-white/20"
        />
      </div>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-14 grid md:grid-cols-3 gap-6 text-sm">
      <article className="bg-white/5 border border-white/20 rounded-2xl p-5 space-y-2 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
        <h2 className="font-semibold text-sm text-green-200">Why partner with GDPAC</h2>
        <p className="text-blue-50">
          GDPAC is a trusted, non-partisan institution working at the
          intersection of governance, data, and civic innovation.
        </p>
        <p className="text-blue-100">
          By partnering with us, you strengthen Nigeria’s governance ecosystem,
          enable inclusive, evidence-based development, and support local
          capacity and institutional reform.
        </p>
      </article>
      <article className="bg-white/5 border border-white/20 rounded-2xl p-5 space-y-2 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
        <h2 className="font-semibold text-sm text-green-200">Types of support</h2>
        <p className="text-blue-100">
          We welcome technical and financial contributions in data science,
          policy research, civic technology, and capacity building.
        </p>
        <p className="text-blue-100">
          Financial support helps expand dashboards, train volunteers and
          officials, conduct field research, and sustain independent analysis.
        </p>
      </article>
      <article className="bg-white/5 border border-white/20 rounded-2xl p-5 space-y-2 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
        <h2 className="font-semibold text-sm text-green-200">Bank details (donations)</h2>
        <p className="text-blue-100 text-xs">
          <span className="font-semibold">Account Name:</span> Governance &amp; Policy
          Analysis Centre (GDPAC)
        </p>
        <p className="text-blue-100 text-xs">
          <span className="font-semibold">Bank:</span> Fidelity Bank Plc – Polo Park
          Branch, Enugu
        </p>
        <p className="text-blue-100 text-xs">
          <span className="font-semibold">Account Number:</span> 5601562851
        </p>
        <p className="text-blue-100 text-xs">
          <span className="font-semibold">SWIFT/BIC:</span> FIDTNGLAXXX
        </p>
        <p className="text-blue-100 text-xs">
          <span className="font-semibold">Reference:</span> "GDPAC Support – [Your
          Name]"
        </p>
      </article>
    </section>
  </div>
);

export default Partnership;
