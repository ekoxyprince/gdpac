import React from "react";

const Research = () => (
  <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-slate-100 text-blue-900">
    <section className="sr-section max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-start">
      <div className="space-y-4">
        <p className="text-xs tracking-[0.25em] uppercase text-green-600 font-semibold">
          Research &amp; insights
        </p>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Access the data. Read the insights. Drive the change.
        </h1>
        <p className="text-sm md:text-base text-blue-800">
          Welcome to GDPACs Download Center, your gateway to evidence-based
          research, policy briefs, and analytical tools that support governance
          reform and inclusive development in Nigeria.
        </p>
        <p className="text-sm md:text-base text-blue-800">
          We work with academic institutions, development partners, and
          communities to co-create solutions that are rigorous, practical, and
          grounded in local realities.
        </p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-5 space-y-3 text-sm">
        <h2 className="font-semibold text-blue-900 text-base">
          Search &amp; filter tools
        </h2>
        <p className="text-blue-800 text-sm">
          Use filters to quickly find the resources you need for your work.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <div className="font-semibold text-blue-900">Filter by</div>
            <ul className="list-disc pl-4 space-y-1 text-blue-800">
              <li>Year</li>
              <li>Region</li>
              <li>Index (SEDI, GPI, IEI)</li>
              <li>Document type</li>
            </ul>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-blue-900">Keyword search</div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-xs text-blue-500">🔍</span>
              <span className="text-xs text-blue-700">
                Enter keyword or title (e.g. "SEDI poverty brief")
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-12 grid md:grid-cols-3 gap-6 text-sm">
      <article className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col">
        <h2 className="font-semibold text-blue-900 mb-1">Policy briefs</h2>
        <p className="text-blue-800 mb-3">
          Concise, actionable summaries of key findings and recommendations for
          policymakers, civil society, and development partners.
        </p>
        <ul className="list-disc pl-4 space-y-1 text-blue-800 flex-1">
          <li>
            "Civic Participation and Governance Reform: Lessons from Enugu"
          </li>
          <li>"SEDI and the Future of Local Development Planning"</li>
        </ul>
        <button className="mt-4 inline-flex justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow hover:bg-blue-700">
          Download policy briefs (demo)
        </button>
      </article>

      <article className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col">
        <h2 className="font-semibold text-blue-900 mb-1">Working papers</h2>
        <p className="text-blue-800 mb-3">
          In-depth research on governance, institutional efficiency, and
          development metrics authored by GDPAC analysts and collaborators.
        </p>
        <ul className="list-disc pl-4 space-y-1 text-blue-800 flex-1">
          <li>
            "Modeling Civic Response in Governance: Validating the Civic Response
            Maturation Model (CRMM) in Nigeria"
          </li>
          <li>"Evaluating Governance Performance Across Nigerias Regions"</li>
          <li>
            "Institutional Bottlenecks and Reform Strategies in Public Service
            Delivery"
          </li>
        </ul>
        <button className="mt-4 inline-flex justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold shadow hover:bg-emerald-700">
          Download working papers (demo)
        </button>
      </article>

      <article className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col">
        <h2 className="font-semibold text-blue-900 mb-1">Data sets &amp; visuals</h2>
        <p className="text-blue-800 mb-3">
          Download raw data, charts, and maps from GDPACs dashboards for your
          own analysis, presentations, or policy work.
        </p>
        <ul className="list-disc pl-4 space-y-1 text-blue-800 flex-1">
          <li>
            <span className="font-semibold">SEDI Data Pack:</span> poverty,
            education, health, and income indicators by state and LGA.
          </li>
          <li>
            <span className="font-semibold">GPI visuals:</span> governance
            pillar charts for presentations.
          </li>
          <li>
            <span className="font-semibold">IEI agency scores:</span> raw
            performance metrics for MDAs.
          </li>
        </ul>
        <button className="mt-4 inline-flex justify-center px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow hover:bg-slate-800">
          Access data library (demo)
        </button>
      </article>
    </section>

    <section className="sr-section max-w-6xl mx-auto px-6 pb-16 text-xs md:text-sm text-blue-800 space-y-2">
      <h2 className="font-semibold text-blue-900">Citation &amp; usage</h2>
      <p>
        All materials are free to use for academic, policy, and civic purposes.
        Please cite GDPAC appropriately in your work.
      </p>
      <p>
        <span className="font-semibold">Suggested citation (APA):</span> GDPAC.
        (2025). Title of Document. Governance and Development Performance
        Analytics Centre. www.thegdpac.ng
      </p>
    </section>
  </div>
);

export default Research;
