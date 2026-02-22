import "./Dashboard.css";
import { FiBookOpen, FiUsers, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ConceptFlow from "../components/ConceptFlow";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      {/* ── HERO ── */}
      <div className="dashboard-hero">

        {/* LEFT */}
        <div className="hero-left">
          <h1 className="welcome-title">Welcome back</h1>

          <h2 className="main-heading">
            Build real engineering depth.
          </h2>

          <p className="main-sub">
            Pick up where you left off. Master core concepts, design scalable
            systems, and grow through consistent, structured preparation.
          </p>

          

          <button className="hero-cta" onClick={() => navigate("/study-plan")}>
            Continue Learning
            <span className="hero-cta-arrow">→</span>
          </button>
        </div>

        {/* RIGHT FLOW */}
        <div className="hero-right">
          <ConceptFlow />
        </div>

      </div>

      {/* Divider */}
      <div className="section-divider">
        <div className="section-divider-line" />
        <span className="section-divider-label">Explore the platform</span>
        <div className="section-divider-line" />
      </div>

      {/* ── CARDS ── */}
      <div className="feature-row">

        <div className="feature-card" onClick={() => navigate("/study-plan")}>
          <FiBookOpen />
          <span className="feature-card-tag">Learning</span>
          <h3>Structured Learning</h3>
          <p>
            Follow curated paths designed by senior engineers. Track every
            milestone and build depth, module by module.
          </p>
          <div className="feature-card-meta">
            <span className="feature-card-meta-dot" />
            240+ modules across 12 tracks
          </div>
        </div>

        <div className="feature-card" onClick={() => navigate("/community")}>
          <FiUsers />
          <span className="feature-card-tag">Community</span>
          <h3>Developer Community</h3>
          <p>
            Trade ideas with engineers who've been there. Get real feedback,
            share war stories, and stay accountable.
          </p>
          <div className="feature-card-meta">
            <span className="feature-card-meta-dot" />
            15k+ active members
          </div>
        </div>

        <div className="feature-card" onClick={() => navigate("/articles")}>
          <FiFileText />
          <span className="feature-card-tag">Articles</span>
          <h3>Curated Articles</h3>
          <p>
            Deep-dives into system design, distributed systems, and
            hard-won engineering lessons — written by practitioners.
          </p>
          <div className="feature-card-meta">
            <span className="feature-card-meta-dot" />
            320+ articles, updated weekly
          </div>
        </div>

      </div>

    </div>
  );
}
