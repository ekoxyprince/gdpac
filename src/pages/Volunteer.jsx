import React from "react";
import volunteerImg from "../assets/volunteer-section.png";

const Volunteer = () => (
  <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50 text-blue-900">
    <section className="sr-section max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-4">
        <p className="text-xs tracking-[0.25em] uppercase text-green-600 font-semibold">
          Volunteer network
        </p>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Join a community of data champions across Nigeria.
        </h1>
        <p className="text-sm md:text-base text-blue-800">
          GDPAC volunteers help collect ground-level insights, support data
          literacy events, and co-create stories that bring performance data to
          life.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <h2 className="font-semibold mb-1">Who can join?</h2>
            <p>Students, researchers, civic actors, and professionals who care about evidence-based reform.</p>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <h2 className="font-semibold mb-1">Sample activities</h2>
            <p>Data clinics, townhalls, community surveys, and dashboard demos in local communities.</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src={volunteerImg}
          alt="Volunteers collaborating"
          className="rounded-2xl shadow-xl w-full max-w-md object-cover"
        />
      </div>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-14 text-sm md:text-base space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-blue-900">Why volunteer with GDPAC?</h2>
        <p className="text-blue-800">
          Volunteering is ideal for students, NYSC members, professionals, and
          civic actors who want hands-on experience with governance, data, and
          reform.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border shadow-sm p-4 transition-transform duration-300 hover:-translate-y-1">
          <h3 className="font-semibold mb-1">Current opportunities</h3>
          <ul className="list-disc pl-5 space-y-1 text-blue-800 text-sm">
            <li>Data Collection Assistant – SEDI fieldwork (all states &amp; FCT)</li>
            <li>Civic Engagement Volunteer – community outreach (all states)</li>
            <li>Research Support Fellow – governance metrics (remote)</li>
            <li>Dashboard Tester – platform QA &amp; feedback (remote)</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-4 text-sm text-blue-800 transition-transform duration-300 hover:-translate-y-1">
          <h3 className="font-semibold mb-1">How to join</h3>
          <p>
            Review the available roles, prepare a short motivation letter (max
            300 words) and your CV or LinkedIn profile, then submit your
            application to <span className="font-semibold">volunteer@thegdpac.com</span> with the
            subject line: <span className="italic">Volunteer Application – [Role] – [Your Name]</span>.
          </p>
        </div>
      </div>
      <p className="text-xs text-blue-700">
        All volunteers must commit to GDPAC’s values of transparency, inclusion,
        and nonpartisanship.
      </p>
    </section>
  </div>
);

export default Volunteer;
