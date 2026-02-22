import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import "./StudyPlan.css";

const SUBJECTS = [
  // DSA — standalone featured
  {
    id: "dsa",
    section: "dsa",
    icon: "ri-code-box-line",
    tag: "DSA",
    title: "Data Structures & Algorithms",
    desc: "Arrays, trees, graphs, dynamic programming, greedy, and beyond. The non-negotiable foundation of every engineering interview.",
    insight:
      "Google, Meta & Amazon allocate 60–70% of coding rounds to DSA. Google favours graph and DP questions; Amazon focuses on trees and sliding window; Microsoft emphasises strings and recursion.",
    insightCompanies: ["Google", "Meta", "Amazon", "Microsoft"],
    topics: ["Arrays", "Trees", "Graphs", "DP", "Greedy", "Backtracking"],
    color: "#e07a5f",
    stats: [
      { n: "450+", l: "Problems" },
      { n: "18", l: "Topics" },
      { n: "3", l: "Difficulty Tiers" },
    ],
    route: "/study-plan/dsa",
  },

  // Aptitude & Soft Skills
  {
    id: "aptitude",
    section: "skills",
    icon: "ri-calculator-line",
    tag: "Aptitude",
    title: "Quantitative Aptitude",
    desc: "Number systems, percentages, time & work, probability, and logical reasoning — built around real placement exam patterns.",
    insight:
      "TCS, Infosys, Wipro & Cognizant use aptitude scores as the primary shortlisting filter, often eliminating 60–70% of applicants before any technical round.",
    insightCompanies: ["TCS", "Infosys", "Wipro", "Cognizant"],
    topics: ["Quant", "Logical Reasoning", "Verbal", "Data Interpretation"],
    color: "#81b29a",
    route: "/study-plan/aptitude",
  },
  {
    id: "softskills",
    section: "skills",
    icon: "ri-speak-line",
    tag: "Soft Skills",
    title: "Communication & Soft Skills",
    desc: "Structured communication, HR interview prep, professional etiquette, and team dynamics that separate good engineers from great ones.",
    insight:
      "LinkedIn's Global Talent Trends report found that 92% of hiring managers say soft skills matter as much as technical skills. Amazon's Leadership Principles are assessed entirely via behavioural rounds.",
    insightCompanies: ["Amazon", "Google", "LinkedIn", "McKinsey"],
    topics: ["HR Prep", "Communication", "Leadership", "Conflict Resolution"],
    color: "#a09bc9",
    route: "/study-plan/softskills",
  },

  // Core CS
  {
    id: "os",
    section: "core",
    icon: "ri-computer-line",
    tag: "OS",
    title: "Operating Systems",
    desc: "Processes, threads, CPU scheduling, memory management, deadlocks, and file systems — the bedrock of systems interviews.",
    insight:
      "Google, Uber & Cloudflare routinely ask OS questions in backend and SDE-II+ roles. Scheduling and memory management are the most frequently tested areas.",
    insightCompanies: ["Google", "Uber", "Cloudflare"],
    topics: ["Scheduling", "Memory", "Deadlocks", "File Systems", "Concurrency"],
    color: "#5fb8c8",
    route: "/study-plan/operatingsystem",
  },
  {
    id: "cn",
    section: "core",
    icon: "ri-global-line",
    tag: "CN",
    title: "Computer Networks",
    desc: "OSI model, TCP/IP, routing, DNS, HTTP/HTTPS, subnetting, and security — essential for backend, DevOps, and cloud roles.",
    insight:
      "Cisco, Akamai & AWS SDE roles test CN heavily. Meta and Netflix ask CN questions to assess how engineers think about latency, reliability, and distributed systems.",
    insightCompanies: ["AWS", "Meta", "Netflix", "Cisco"],
    topics: ["TCP/IP", "DNS", "OSI Model", "HTTP", "Subnetting"],
    color: "#b07fd4",
    route: "/study-plan/computernetworks",
  },
  {
    id: "dbms",
    section: "core",
    icon: "ri-database-2-line",
    tag: "DBMS",
    title: "Database Management",
    desc: "SQL, relational algebra, normalization, ACID transactions, indexing, and NoSQL — critical for full-stack and backend interviews.",
    insight:
      "Oracle, Salesforce & Microsoft ask DBMS in nearly every backend round. Amazon specifically tests query optimization and indexing for AWS RDS and DynamoDB roles.",
    insightCompanies: ["Oracle", "Salesforce", "Amazon", "Microsoft"],
    topics: ["SQL", "Normalization", "Indexing", "Transactions", "NoSQL"],
    color: "#81b29a",
    route: "/study-plan/dbms",
  },
  {
    id: "sd",
    section: "core",
    icon: "ri-layout-grid-line",
    tag: "System Design",
    title: "System Design",
    desc: "Design scalable distributed systems — load balancers, caches, queues, sharding, and real-world architectures like URL shorteners and Instagram.",
    insight:
      "Google, Meta, Uber & Airbnb require system design in every SDE-II+ interview. Google is known to evaluate candidates almost entirely on system design at senior levels.",
    insightCompanies: ["Google", "Meta", "Uber", "Airbnb"],
    topics: ["Scalability", "Caching", "Microservices", "CAP Theorem", "Sharding"],
    color: "#e07a5f",
    route: "/study-plan/systemdesign",
  },

];

const SECTIONS = [
  { id: "dsa",   label: "DSA",               color: "#e07a5f" },
  { id: "skills",label: "Aptitude & Soft Skills", color: "#81b29a" },
  { id: "core",  label: "Core CS Subjects",   color: "#c9a96e" },
];

export default function StudyPlan() {
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("card-in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const bySection = (sec) => SUBJECTS.filter((s) => s.section === sec);

  return (
    <>
      <HomeNavbar />

      <div className="learn-page">

        {SECTIONS.map((sec) => (
          <section className="learn-section" key={sec.id} id={sec.id}>

            {/* Section header */}
            <div className="sec-head">
              <span className="sec-dot" style={{ background: sec.color, boxShadow: `0 0 8px ${sec.color}` }} />
              <h2 className="sec-title">{sec.label}</h2>
              <span className="sec-count">{bySection(sec.id).length} subject{bySection(sec.id).length > 1 ? "s" : ""}</span>
              <div className="sec-rule" />
            </div>

            {/* Cards */}
            <div className={`cards-grid ${sec.id === "dsa" ? "g1" : sec.id === "skills" ? "g2" : "bento"}`}>
              {bySection(sec.id).map((sub, i) => (
                <div
                  key={sub.id}
                  ref={(el) => cardRefs.current.push(el)}
                  className={`subject-card ${sub.featured ? "featured" : ""} ${sec.id === "core" ? bentoSpan(sub.id) : ""}`}
                  style={{ "--c": sub.color, animationDelay: `${i * 0.08}s` }}
                  onClick={() => navigate(sub.route)}
                >
                  {sub.featured ? (
                    /* ── FEATURED DSA LAYOUT ── */
                    <>
                      <div className="feat-left">
                        <div className="card-top-row">
                          <i className={`${sub.icon} card-icon`} />
                          <span className="card-tag">{sub.tag}</span>
                        </div>
                        <div className="card-title">{sub.title}</div>
                        <div className="card-desc">{sub.desc}</div>
                        <div className="insight-bar">
                          <i className="ri-bar-chart-grouped-line insight-icon" />
                          <span className="insight-text">
                            <strong>{sub.insightCompanies.join(", ")}</strong> — {sub.insight}
                          </span>
                        </div>
                        <button className="feat-btn" onClick={(e) => { e.stopPropagation(); navigate(sub.route); }}>
                          Start Practice <i className="ri-arrow-right-line" />
                        </button>
                      </div>
                      <div className="feat-stats">
                        {sub.stats.map((s) => (
                          <div className="stat" key={s.l}>
                            <div className="stat-n">{s.n}</div>
                            <div className="stat-l">{s.l}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* ── REGULAR CARD LAYOUT ── */
                    <>
                      <div className="card-top-row">
                        <i className={`${sub.icon} card-icon`} />
                        <span className="card-tag">{sub.tag}</span>
                      </div>
                      <div className="card-title">{sub.title}</div>
                      <div className="card-desc">{sub.desc}</div>
                      <div className="insight-bar">
                        <i className="ri-building-line insight-icon" />
                        <span className="insight-text">
                          <strong>{sub.insightCompanies.join(" · ")}</strong> — {sub.insight}
                        </span>
                      </div>
                      <div className="card-foot">
                        <div className="topics">
                          {sub.topics.slice(0, 4).map((t) => (
                            <span className="tp" key={t}>{t}</span>
                          ))}
                        </div>
                        <span className="cta">
                          Start <i className="ri-arrow-right-line" />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

      </div>
    </>
  );
}

function bentoSpan(id) {
  // OS, CN, DBMS → 4 cols each (fills row 1)
  // SD → alone in row 2, center it with offset
  return ["os", "cn", "dbms"].includes(id) ? "b4" : "b12-center";
}
