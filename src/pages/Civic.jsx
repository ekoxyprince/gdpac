import React from "react";
import civicImg from "../assets/civic-engagement.png";

const Civic = () => (
  <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 text-blue-900">
    <section className="sr-section max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-4">
        <p className="text-xs tracking-[0.25em] uppercase text-green-600 font-semibold">
          Civic engagement
        </p>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Bringing citizen voice into the heart of performance data.
        </h1>
        <p className="text-sm md:text-base text-blue-800">
          GDPAC is built for citizens as much as for policymakers. From digital
          feedback tools to public scorecards, we want people to understand and
          shape how their states are performing.
        </p>
        <ul className="text-sm list-disc pl-5 space-y-1">
          <li>Simple visual scorecards for community meetings.</li>
          <li>Feedback widgets embedded in dashboards.</li>
          <li>Storytelling and explainer content around key reforms.</li>
        </ul>
      </div>
      <div className="flex justify-center">
        <img
          src={civicImg}
          alt="Citizens engaging with data"
          className="rounded-2xl shadow-xl w-full max-w-md object-cover"
        />
      </div>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-14 grid md:grid-cols-3 gap-6 text-sm">
      <article className="bg-white rounded-2xl border shadow-sm p-5 space-y-2 transition-transform duration-300 hover:-translate-y-1">
        <h2 className="font-semibold text-blue-900">Citizen feedback tools</h2>
        <p className="text-blue-800">
          Digital feedback widgets and sentiment dashboards surface real-time
          perspectives from citizens on service delivery and governance
          priorities.
        </p>
      </article>
      <article className="bg-white rounded-2xl border shadow-sm p-5 space-y-2 transition-transform duration-300 hover:-translate-y-1">
        <h2 className="font-semibold text-blue-900">Town hall highlights</h2>
        <p className="text-blue-800">
          Data-backed scorecards support community meetings and town halls,
          making performance conversations concrete and inclusive.
        </p>
      </article>
      <article className="bg-white rounded-2xl border shadow-sm p-5 space-y-2 transition-transform duration-300 hover:-translate-y-1">
        <h2 className="font-semibold text-blue-900">Community outreach</h2>
        <p className="text-blue-800">
          Outreach programs and civic partnerships ensure that people in rural
          and urban areas alike can see, question, and contribute to the data.
        </p>
      </article>
    </section>
  </div>
);

export default Civic;
