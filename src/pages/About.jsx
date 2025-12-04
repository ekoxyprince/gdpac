import React from "react";
import aboutHero from "../assets/about-us.png";
import visionImg from "../assets/vision.png";

const About = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 text-blue-900">
    <section className="sr-section max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-5">
        <p className="text-sm uppercase tracking-[0.2em] text-green-600 font-semibold">
          About GDPAC
        </p>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          A national platform for data-driven governance and inclusive development.
        </h1>
        <p className="text-blue-800 text-base leading-relaxed">
          The Governance and Development Performance Analytics Centre (GDPAC)
          brings together data, institutions, and citizens to track how Nigerias
          states are performing on poverty reduction, service delivery, and
          governance reforms.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white/80 border rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-green-600 mb-1">
              OUR VISION
            </div>
            <p>
              A Nigeria where transparent data empowers citizens and leaders to
              take bold, evidence-based decisions.
            </p>
          </div>
          <div className="bg-white/80 border rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-blue-700 mb-1">
              OUR MISSION
            </div>
            <p>
              To design, curate, and communicate robust indices that make
              governance performance visible and actionable.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <img
          src={aboutHero}
          alt="GDPAC team working with data dashboards"
          className="w-full max-w-md rounded-2xl shadow-xl object-cover"
        />
        <img
          src={visionImg}
          alt="Vision and impact graphic"
          className="w-full max-w-xs rounded-2xl shadow-md object-contain"
        />
      </div>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-8 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-2">
        <h2 className="text-2xl font-bold mb-1 text-blue-900">What we stand for</h2>
        <p className="text-sm text-blue-800">
          Four core values guide how GDPAC measures, shares, and protects data for
          everyone—citizens, institutions, and partners.
        </p>
      </div>
      <div className="md:col-span-2 grid sm:grid-cols-2 gap-5 text-sm">
        <div className="bg-white rounded-xl p-5 border shadow-sm">
          <h3 className="font-semibold mb-1">Transparency</h3>
          <p>
            Clear methodologies, open documentation, and public dashboards that
            anyone can interrogate.
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border shadow-sm">
          <h3 className="font-semibold mb-1">Innovation</h3>
          <p>
            Modern data engineering, visual analytics, and index design tuned to
            Nigerias governance realities.
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border shadow-sm">
          <h3 className="font-semibold mb-1">Inclusion</h3>
          <p>
            Working with states, civil society, and partners so no region or
            group is left out of the data conversation.
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border shadow-sm">
          <h3 className="font-semibold mb-1">Accountability</h3>
          <p>
            Turning numbers into narratives that encourage constructive dialogue
            and reform.
          </p>
        </div>
      </div>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-8 text-sm md:text-base">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-blue-900">Our approach</h2>
        <p className="text-blue-800">
          We build multidimensional indices like SEDI, GPI, and IEI that go
          beyond single metrics. These tools provide layered insight into
          development outcomes and governance quality across states and regions.
        </p>
        <p className="text-blue-800">
          Real-time dashboards, collaborative research, and policy engagement
          help ensure that our analytics translate into concrete reforms—from
          budget planning to institutional strengthening.
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold text-blue-900">Why it matters</h3>
        <p className="text-blue-800">
          In a rapidly changing world, governance must be adaptive, inclusive,
          and evidence-based. GDPAC exists to make sure Nigeria’s development
          decisions are guided by facts, not guesswork.
        </p>
        <p className="text-blue-800">
          By turning data into action and action into impact, we support
          institutions that are more transparent, inclusive, and accountable to
          the people they serve.
        </p>
      </div>
    </section>
  </div>
);

export default About;
