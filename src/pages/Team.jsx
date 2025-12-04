import React from "react";
import founderImg from "../assets/Founder.png";
import lawrenceImg from "../assets/Lawrence.png";
import teamGrid from "../assets/team-advisors.png";

const Team = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-blue-900">
    <section className="sr-section max-w-6xl mx-auto px-6 py-14 text-center space-y-3">
      <p className="text-xs tracking-[0.25em] uppercase text-green-600 font-semibold">
        Team & advisors
      </p>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">
        A multidisciplinary team of governance, data, and policy experts.
      </h1>
      <p className="max-w-3xl mx-auto text-sm md:text-base text-blue-800">
        GDPAC is led by practitioners who have worked across federal and state
        government, international development, academia, and civic tech.
      </p>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 pb-10">
      <article className="md:col-span-1 bg-white rounded-2xl border shadow-sm p-5 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
        <img
          src={founderImg}
          alt="Founder portrait"
          className="w-32 h-32 rounded-full object-cover mb-3 shadow"
        />
        <h2 className="font-semibold text-lg">Founder / Director</h2>
        <p className="text-xs mt-2 text-blue-800">
          Provides strategic direction, leads engagement with states and partners,
          and oversees the design of GDPACs indices.
        </p>
      </article>

      <article className="md:col-span-1 bg-white rounded-2xl border shadow-sm p-5 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
        <img
          src={lawrenceImg}
          alt="Technical lead portrait"
          className="w-32 h-32 rounded-full object-cover mb-3 shadow"
        />
        <h2 className="font-semibold text-lg">Technical & Data Lead</h2>
        <p className="text-xs mt-2 text-blue-800">
          Oversees data engineering, analytics infrastructure, and the robustness
          of methods behind each index.
        </p>
      </article>

      <article className="md:col-span-1 bg-white rounded-2xl border shadow-sm p-5 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
        <img
          src={teamGrid}
          alt="Advisory council collage"
          className="w-full rounded-xl object-cover mb-3"
        />
        <h2 className="font-semibold text-lg">Advisory council</h2>
        <p className="text-xs mt-2 text-blue-800">
          A network of advisors from academia, civil society, and development
          agencies providing guidance on metrics and ethics.
        </p>
      </article>
    </section>
  </div>
);

export default Team;
