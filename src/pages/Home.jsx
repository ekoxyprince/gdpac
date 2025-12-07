import React from "react";
import { FiBarChart2, FiShield, FiHeart, FiUsers } from "react-icons/fi";
import hero from "../assets/home-hero.png";
import infographic from "../assets/impact-infographic.png";
import dashboard1 from "../assets/dashboard-1.png";
import dashboard2 from "../assets/dashboard-2.png";
import dashboard3 from "../assets/dashboard-3.png";
import dashboard4 from "../assets/dashboard-4.png";

const partners = [
  { name: "UNDP", color: "from-sky-500 to-sky-700" },
  { name: "World Bank", color: "from-blue-500 to-blue-700" },
  { name: "FMARD", color: "from-emerald-500 to-emerald-700" },
  { name: "EU Delegation", color: "from-indigo-500 to-indigo-700" },
  { name: "DFID", color: "from-purple-500 to-purple-700" },
];

const features = [
  {
    title: "Real-Time Dashboards",
    desc: "Instant access to interactive analytics and progressive tracking of SEDI, GPI, and IEI across all states.",
    color: "from-blue-400 to-blue-700",
  },
  {
    title: "Evidence-Based Insights",
    desc: "Empowering policy and reform with multidimensional poverty, governance, and efficiency indices.",
    color: "from-green-400 to-green-700",
  },
  {
    title: "Inclusive Data Platform",
    desc: "Open, secure, and accessible data for researchers, government, partners, and citizens.",
    color: "from-indigo-400 to-indigo-700",
  },
];

const services = [
  {
    icon: FiBarChart2,
    title: "SEDI Analytics",
    desc: "Socioeconomic indices, poverty tracking, SDG benchmarking, and LGA/state comparison.",
  },
  {
    icon: FiShield,
    title: "GPI Governance Metrics",
    desc: "Governance reform, transparency, fiscal management, and institutional benchmarks.",
  },
  {
    icon: FiHeart,
    title: "Health & Education Insights",
    desc: "Health outcome analytics, educational attainment, and thematic policy research.",
  },
  {
    icon: FiUsers,
    title: "Civic & Partnership Tools",
    desc: "Citizen feedback, volunteer opportunities, and collaborative development programs.",
  },
];

const dashboardPreviews = [
  {
    title: "SEDI dashboard",
    image: dashboard1,
    href: "/dashboard/sedi",
    tag: "Socioeconomic Development Index",
  },
  {
    title: "GPI dashboard",
    image: dashboard2,
    href: "/dashboard/gpi",
    tag: "Governance Performance Index",
  },
  {
    title: "IEI dashboard",
    image: dashboard3,
    href: "/dashboard/iei",
    tag: "Institutional Efficiency Index",
  },
  {
    title: "Civic sentiment dashboard",
    image: dashboard4,
    href: "/dashboard/sentiment",
    tag: "Citizen feedback & engagement",
  },
];

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-50 text-blue-900">
    {/* 1. HERO */}
    <header className="sr-section flex flex-col md:flex-row items-center md:justify-between p-8 max-w-6xl mx-auto w-full py-16 gap-12">
      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Transforming governance
          <br />
          through <span className="text-green-600">data, insight</span> <br />&
          innovation
        </h1>
        <p className="text-lg text-blue-800 font-medium mt-1">
          Data-driven tools for measuring, tracking, and empowering development
          across Nigeria.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <a
            href="/dashboard/sedi"
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg shadow font-semibold hover:from-blue-700 hover:to-green-600 transition-transform transform hover:-translate-y-0.5"
          >
            Explore SEDI dashboard
          </a>
          <a
            href="/about"
            className="px-6 py-2 border border-blue-500 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition"
          >
            About GDPAC
          </a>
        </div>
      </div>
      <img
        src={hero}
        alt="GDPAC platform hero"
        className="w-full md:w-1/2 max-w-lg rounded-2xl shadow-xl object-cover"
      />
    </header>

    {/* 3. FEATURES */}
    <section className="sr-section py-12 px-4">
      <div className="max-w-6xl mx-auto mb-6 text-center space-y-2">
        <h2 className="text-2xl font-bold text-blue-900">Why GDPAC matters</h2>
        <p className="text-sm md:text-base text-blue-800 max-w-3xl mx-auto">
          In a rapidly changing world, governance must be adaptive, inclusive, and
          evidence-based. GDPAC exists to ensure that Nigeria’s development
          decisions are guided by facts, not guesswork.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div
            className={`rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-lg p-7 min-h-[220px] flex flex-col items-start`}
            key={f.title}
          >
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-white/90">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 3b. FLAGSHIP DASHBOARDS PREVIEW */}
    <section className="sr-section py-10 px-4 bg-white border-y">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">Flagship dashboards</h2>
            <p className="text-sm md:text-base text-blue-800 max-w-xl">
              Get a quick glimpse of the core GDPAC dashboards tracking
              socioeconomic development, governance performance, institutional
              efficiency, and citizen voice.
            </p>
          </div>
          <p className="text-xs md:text-sm text-blue-700 max-w-sm">
            These previews mirror the dedicated Dashboards page and link into the
            full analytics experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardPreviews.map((d) => (
            <article
              key={d.title}
              className="bg-blue-50 rounded-2xl border border-blue-100 shadow-sm overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-md transition-transform"
            >
              <div className="h-28 bg-blue-100 overflow-hidden">
                <img
                  src={d.image}
                  alt={d.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <span className="inline-block text-[0.65rem] tracking-wide uppercase text-green-600 mb-1">
                  {d.tag}
                </span>
                <h3 className="font-semibold text-sm md:text-base text-blue-900 mb-1">
                  {d.title}
                </h3>
                <a
                  href={d.href}
                  className="text-xs md:text-sm text-blue-700 font-semibold mt-auto inline-flex items-center gap-1 hover:text-blue-900"
                >
                  Open dashboard
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* 4. SERVICES */}
    <section className="sr-section py-10 px-4 mb-2 bg-blue-50 border-y">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-800">Our services</h2>
            <p className="text-sm md:text-base text-blue-700 max-w-xl">
              Explore the tools, analytics, and advisory support we provide to
              governments, institutions, and development partners across Nigeria.
            </p>
          </div>
          <p className="text-xs md:text-sm text-blue-600 max-w-sm">
            We look at our services end-to-end—from data collection and model
            design to dashboards, research outputs, and capacity building.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-xl p-6 border shadow hover:shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <s.icon className="w-7 h-7 text-emerald-600 mb-3" />
              <div className="font-bold text-blue-800 mb-1">{s.title}</div>
              <div className="text-blue-700 text-sm md:text-base">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 5. WHY GDPAC/IMPACT */}
    <section className="sr-section py-12 px-4 bg-white border-b">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="">
          <h2 className="text-2xl font-bold text-blue-800 mb-3">Why GDPAC?</h2>
          <ul className="list-disc pl-6 text-blue-900 space-y-2 text-lg font-medium">
            <li>
              Transparent governance and real-time tracking across Nigeria’s 36
              states
            </li>
            <li>
              Rich analytical dashboards for policy, research, and public
              engagement
            </li>
            <li>Collaborative platform, trusted by international partners</li>
          </ul>
        </div>
        <div className="flex items-center justify-center min-h-[200px]">
          {/* Placeholder for infographic or diagram */}
          <img
            src={infographic}
            alt="Impact infographic"
            className="rounded-2xl w-full max-w-sm shadow-lg object-contain"
          />
        </div>
      </div>
    </section>

    {/* 6. CTA/CONTACT FOOTER */}
    <footer className="sr-section bg-gradient-to-r from-blue-900 to-green-600 py-12 mt-8 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">
          Ready to unlock the power of data?
        </h2>
        <p className="text-lg mb-5">
          Join our network of analysts, policymakers, and reformers using GDPAC
          tools to build a more transparent, inclusive, and accountable Nigeria.
        </p>
        <a
          href="/contact"
          className="bg-white text-blue-900 px-7 py-3 font-semibold rounded shadow-lg hover:bg-blue-50 transition"
        >
          Contact Us
        </a>
      </div>
    </footer>
  </div>
);

export default Home;
