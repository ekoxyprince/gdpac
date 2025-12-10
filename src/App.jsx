import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import ScrollReveal from "scrollreveal";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Indices from "./pages/Indices";
import Research from "./pages/Research";
import Civic from "./pages/Civic";
import Volunteer from "./pages/Volunteer";
import Partnership from "./pages/Partnership";
import Team from "./pages/Team";
import News from "./pages/News";
import SEDIDashboard from "./pages/dashboard/SEDIDashboard";
import GPIDashboard from "./pages/dashboard/GPIDashboard";
import IEIDashboard from "./pages/dashboard/IEIDashboard";
import BudgetTracker from "./pages/dashboard/BudgetTracker";
import EducationMetrics from "./pages/dashboard/EducationMetrics";
import HealthMetrics from "./pages/dashboard/HealthMetrics";
import CitizenSentiment from "./pages/dashboard/CitizenSentiment";
import StateComparison from "./pages/dashboard/StateComparison";
import DashboardLibrary from "./pages/dashboard/DashboardLibrary";
import Login from "./pages/Login";
import { useAuth } from "./AuthContext.jsx";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About GDPAC" },
  { to: "/indices", label: "Flagship indices" },
  { to: "/dashboards", label: "Dashboards" },
  { to: "/research", label: "Research & Insights" },
  { to: "/civic", label: "Civic Engagement" },
  { to: "/partnership", label: "Partnership & Support" },
  { to: "/team", label: "Team & Advisors" },
  { to: "/news", label: "News & Events" },
  { to: "/contact", label: "Contact & Support" },
];

function ProtectedRoute({ children }) {
  const { isAuthed } = useAuth();
  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only animate public (non-dashboard, non-login) pages
    if (location.pathname.startsWith("/dashboard")) return;
    if (location.pathname === "/login") return;

    ScrollReveal().reveal(".sr-section", {
      distance: "40px",
      duration: 800,
      origin: "bottom",
      interval: 120,
      easing: "ease-out",
      opacity: 0,
      reset: false,
    });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      if (typeof window === "undefined") return;
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header
        className={
          "sticky top-0 z-50 transition-all duration-300 " +
          (scrolled
            ? "border-b border-blue-100 bg-white/95 shadow-sm backdrop-blur"
            : "border-b border-transparent bg-transparent")
        }
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-2 group">
            <span className="text-xs font-semibold tracking-[0.35em] uppercase text-green-600">
              GDPAC
            </span>
            <span className="hidden sm:inline text-[0.7rem] text-blue-700 group-hover:text-blue-900 transition-colors">
              Governance &amp; Development Performance Analytics Centre
            </span>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-3 text-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-2 py-1 rounded-md transition-colors ${
                    isActive
                      ? "text-blue-900 bg-blue-50 font-semibold"
                      : "text-blue-700 hover:text-blue-900 hover:bg-blue-50"
                  }`
                }
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-blue-100 bg-white/80 text-blue-900 shadow-sm hover:bg-blue-50 transition-colors"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="gdpac-mobile-nav"
            >
              <span className="sr-only">Toggle navigation</span>
              <span
                className={`absolute h-[2px] w-5 rounded-full bg-blue-900 transition-all duration-300 ${
                  menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 rounded-full bg-blue-900 transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 rounded-full bg-blue-900 transition-all duration-300 ${
                  menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="gdpac-mobile-nav"
            className="lg:hidden border-t border-blue-100 bg-white/95 backdrop-blur shadow-lg text-sm"
          >
            <div className="max-w-6xl mx-auto px-4 pb-4 pt-2 flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg ${
                      isActive
                        ? "bg-blue-50 text-blue-900 font-semibold"
                        : "text-blue-800 hover:bg-blue-50"
                    }`
                  }
                  end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-blue-100 bg-blue-950 text-slate-100 mt-6">
        <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-4 text-xs md:text-sm">
          <div className="md:col-span-2 space-y-2">
            <div className="text-[0.7rem] tracking-[0.3em] uppercase text-green-400 font-semibold">
              GDPAC
            </div>
            <p className="font-semibold">
              Governance &amp; Development Performance Analytics Centre
            </p>
            <p className="text-slate-300">
              Transforming governance through data, insight, and innovation.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-slate-50 text-xs uppercase tracking-wide">
              Platform
            </h3>
            <ul className="space-y-1 text-slate-300">
              <li>SEDI, GPI, IEI dashboards</li>
              <li>Budget, education, and health trackers</li>
              <li>Research &amp; data library</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-slate-50 text-xs uppercase tracking-wide">
              Contact &amp; support
            </h3>
            <p className="text-slate-300">
              Suit C6, Bethel Plaza, Garden Avenue, Nigeria.
            </p>
            <p className="text-slate-300">info@thegdpac.com</p>
            <p className="text-slate-300 text-[0.7rem]">
              For partnerships: partnerships@thegdpac.com
            </p>
            <div className="mt-3">
              <h4 className="font-semibold text-slate-50 text-[0.7rem] uppercase tracking-wide mb-1">
                Connect with us
              </h4>
              <div className="flex items-center gap-3 text-lg">
                <a
                  href="https://facebook.com/thegdpac"
                  aria-label="GDPAC on Facebook"
                  className="text-slate-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiFacebook />
                </a>
                <a
                  href="https://twitter.com/thegdpac"
                  aria-label="GDPAC on Twitter"
                  className="text-slate-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiTwitter />
                </a>
                <a
                  href="https://instagram.com/thegdpac"
                  aria-label="GDPAC on Instagram"
                  className="text-slate-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiInstagram />
                </a>
                <a
                  href="https://youtube.com/@thegdpac"
                  aria-label="GDPAC on YouTube"
                  className="text-slate-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-900 bg-blue-950/95">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2 text-[0.7rem] text-slate-400">
            <span>
              &copy; {new Date().getFullYear()} GDPAC. All rights reserved.
            </span>
            <span>
              Built as a analytics interface for governance and development
              performance in Nigeria.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBootLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (bootLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="gdpac-loader">
            <span className="gdpac-letter">G</span>
            <span className="gdpac-letter">D</span>
            <span className="gdpac-letter">P</span>
            <span className="gdpac-letter">A</span>
            <span className="gdpac-letter">C</span>
            <span className="gdpac-dots">
              <span className="gdpac-dot" />
              <span className="gdpac-dot" />
              <span className="gdpac-dot" />
            </span>
          </div>
          <p className="mt-4 text-xs md:text-sm text-slate-300 tracking-[0.3em] uppercase">
            Your no1 Data Analytics Platform
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboards" element={<Services />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/indices" element={<Indices />} />
          <Route path="/research" element={<Research />} />
          <Route path="/civic" element={<Civic />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/team" element={<Team />} />
          <Route path="/news" element={<News />} />

          <Route
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard/sedi" element={<SEDIDashboard />} />
            <Route path="/dashboard/gpi" element={<GPIDashboard />} />
            <Route path="/dashboard/iei" element={<IEIDashboard />} />
            <Route path="/dashboard/budget" element={<BudgetTracker />} />
            <Route path="/dashboard/education" element={<EducationMetrics />} />
            <Route path="/dashboard/health" element={<HealthMetrics />} />
            <Route path="/dashboard/sentiment" element={<CitizenSentiment />} />
            <Route path="/dashboard/comparison" element={<StateComparison />} />
            <Route path="/dashboard/library" element={<DashboardLibrary />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
