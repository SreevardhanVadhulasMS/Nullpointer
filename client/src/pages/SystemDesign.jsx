import { useState, useEffect, useRef } from "react";
import HomeNavbar from "../components/HomeNavbar";
import "./SystemDesign.css"; 

const CHAPTERS = [
  {
    id: "foundations",
    title: "Architectural Foundations",
    icon: "ri-focus-3-line",
    color: "#e07a5f",
    tagline: "The Science of Trade-offs",
    intro: "System design isn't about finding the 'best' tool; it's about finding the 'right' compromise. To scale to millions, you must master the relationship between Latency, Throughput, and Availability while navigating the constraints of physics and networking.",
    sections: [
      {
        heading: "The Performance Triad",
        type: "framework",
        items: [
          { icon: "ri-timer-flash-line", label: "Latency (ms)", desc: "The 'wait time.' P99 latency is your goal—ensuring 99% of users experience sub-100ms responses. Optimized via Caching, CDN, and Indexing." },
          { icon: "ri-speed-up-line", label: "Throughput (RPS)", desc: "The 'bandwidth.' How many Requests Per Second your system can handle. Optimized via Horizontal Scaling and Load Balancing." },
          { icon: "ri-shield-check-line", label: "Availability (9s)", desc: "Uptime. 99.999% (Five Nines) allows only 5 minutes of downtime per YEAR. Achieved via Redundancy and Failover mechanisms." },
          { icon: "ri-instance-line", label: "Reliability", desc: "The probability that a system will perform its intended function without failure for a specified period of time." },
        ]
      },
      {
        heading: "Scaling: Vertical vs. Horizontal",
        type: "compare",
        left: {
          label: "Vertical Scaling (Scaling Up)",
          color: "#e07a5f",
          points: [
            "Adding more CPU/RAM to a single node.",
            "Upper bound dictated by hardware limits.",
            "Single Point of Failure (SPOF).",
            "Finite scalability; eventually cost-prohibitive.",
          ]
        },
        right: {
          label: "Horizontal Scaling (Scaling Out)",
          color: "#81b29a",
          points: [
            "Connecting multiple low-spec machines in a cluster.",
            "Infinite scaling potential through commodity hardware.",
            "Requires complex load distribution logic (Nginx/HAProxy).",
            "Designed for resilience—individual node failure is expected.",
          ]
        }
      }
    ],
    quiz: [
      { q: "What does 'P99 Latency' represent?", opts: ["The average response time", "The latency experienced by the slowest 1% of users", "The fastest possible response", "The total throughput"], ans: 1 },
      { q: "Five Nines (99.999%) availability allows how much annual downtime?", opts: ["5.26 minutes", "52.6 minutes", "8.77 hours", "24 hours"], ans: 0 },
      { q: "Horizontal scaling is characterized by:", opts: ["Increasing RAM on one server", "Adding more servers to a pool", "Upgrading the CPU", "Switching to a faster DB"], ans: 1 },
      { q: "A 'Single Point of Failure' is most dangerous in:", opts: ["Distributed systems", "Monolithic architectures", "Microservices", "Mesh networks"], ans: 1 },
      { q: "Throughput is best defined as:", opts: ["Time per request", "Requests per unit time", "Data stored on disk", "Number of CPU cores"], ans: 1 },
      { q: "Which is a major downside of Vertical Scaling?", opts: ["Network latency", "Hard hardware ceiling", "Complexity", "Data sharding"], ans: 1 },
      { q: "Reliability differs from Availability because it focuses on:", opts: ["Total uptime", "Performance consistency/correctness", "User count", "Cost"], ans: 1 },
      { q: "In a 'Write-Heavy' system, which metric is usually prioritized?", opts: ["P99 Latency", "Throughput", "Consistency", "Both B and C"], ans: 3 },
      { q: "Redundancy is the primary tool for achieving:", opts: ["Lower latency", "Higher Availability", "Better UI", "Easier coding"], ans: 1 },
      { q: "Which tool is essential for Horizontal Scaling?", opts: ["Compiler", "Load Balancer", "Single Database", "IDE"], ans: 1 },
    ]
  },
  {
    id: "data-layer",
    title: "Advanced Data Layer",
    icon: "ri-database-2-line",
    color: "#81b29a",
    tagline: "Consistency, Sharding & CAP",
    intro: "The data layer is where most systems fail under load. Understanding how to partition data and when to sacrifice consistency for availability is what separates a Senior Architect from a Junior Developer.",
    sections: [
      {
        heading: "The CAP Theorem Deep-Dive",
        type: "insight_block",
        insight: "In the presence of a Network Partition (P), you must choose between Consistency (C) and Availability (A). You cannot have both. If you choose C, you must reject requests if nodes can't sync. If you choose A, you accept requests but risk serving stale data.",
        takeaway: "Real-world systems are rarely 'Pure C' or 'Pure A'; they are 'Mostly A' with Eventual Consistency (e.g., DynamoDB, Cassandra)."
      },
      {
        heading: "Database Scaling Strategies",
        type: "steps",
        steps: [
          { n: "01", title: "Read Replicas", desc: "Leader-Follower setup. All writes go to the Leader; reads are distributed among Followers. Best for 90% Read / 10% Write workloads." },
          { n: "02", title: "Horizontal Partitioning (Sharding)", desc: "Splitting a single table into multiple schema-identical tables based on a Shard Key (e.g., UserID % 10). Solves the 'Huge Table' performance bottleneck." },
          { n: "03", title: "Consistent Hashing", desc: "A technique to minimize data movement when nodes are added/removed from a sharded cluster. Essential for CDNs and Distributed Caches." },
          { n: "04", title: "Denormalization", desc: "Intentionally adding redundant data to NoSQL docs to avoid expensive 'Joins' at runtime. Trade-off: Faster reads, more complex writes." },
        ]
      },
      {
        heading: "SQL vs. NoSQL Trade-offs",
        type: "compare",
        left: {
          label: "Relational (RDBMS)",
          color: "#e07a5f",
          points: [
            "ACID Compliance for strict transactions.",
            "Complex Joins and relationships.",
            "Fixed Schema (Hard to evolve).",
            "Difficult to scale horizontally.",
          ]
        },
        right: {
          label: "Non-Relational (NoSQL)",
          color: "#81b29a",
          points: [
            "Dynamic Schema (JSON/BSON).",
            "BASE (Basically Available, Soft State).",
            "Built-in horizontal scaling (Sharding).",
            "Joins are not supported; must denormalize.",
          ]
        }
      }
    ],
    quiz: [
      { q: "In CAP, what does 'Consistency' mean?", opts: ["System is always fast", "Every read receives the most recent write or an error", "Every request receives a response", "Data is never deleted"], ans: 1 },
      { q: "Sharding is an example of:", opts: ["Vertical Scaling", "Horizontal Scaling", "Data Backup", "Encryption"], ans: 1 },
      { q: "Which DB is best for a Banking Transaction system?", opts: ["MongoDB", "Cassandra", "PostgreSQL", "Redis"], ans: 2 },
      { q: "Consistent Hashing is primarily used to:", opts: ["Encrypt passwords", "Reduce data reshuffling in sharded systems", "Speed up SQL joins", "Compress images"], ans: 1 },
      { q: "A 'Page Fault' in a DB context usually means:", opts: ["The DB crashed", "Requested data is on disk, not in RAM", "Invalid SQL syntax", "Network timeout"], ans: 1 },
      { q: "Eventual Consistency means:", opts: ["Data is never correct", "Updates will propagate to all nodes eventually", "The system is always consistent", "Only the leader has the data"], ans: 1 },
      { q: "Which NoSQL type is best for a 'Leaderboard'?", opts: ["Document Store", "Graph DB", "In-memory Key-Value (Redis)", "Columnar"], ans: 2 },
      { q: "Denormalization is used to:", opts: ["Save disk space", "Improve read performance in NoSQL", "Enforce ACID", "Normalize tables"], ans: 1 },
      { q: "What is a 'Shard Key'?", opts: ["The DB password", "The column used to determine data placement", "The primary key only", "The encryption key"], ans: 1 },
      { q: "ACID 'Atomicity' ensures:", opts: ["Fast execution", "All parts of a transaction succeed or all fail", "Data is compressed", "Only one user can read"], ans: 1 },
    ]
  },
  {
    id: "messaging",
    title: "Distributed Messaging",
    icon: "ri-exchange-box-line",
    color: "#a09bc9",
    tagline: "Async Communication & Queues",
    intro: "Synchronous communication (HTTP) kills scalability. If Service A waits for Service B, and B is slow, the whole system stalls. Message Queues (Kafka, RabbitMQ) decouple these services, allowing for massive asynchronous scale.",
    sections: [
      {
        heading: "Message Patterns",
        type: "framework",
        items: [
          { icon: "ri-mail-send-line", label: "Point-to-Point", desc: "One producer, one consumer. Once a message is read, it's gone from the queue. Perfect for task processing." },
          { icon: "ri-broadcast-line", label: "Pub/Sub", desc: "Publisher sends a message to a 'Topic.' Multiple subscribers receive it simultaneously. Best for Notification systems." },
          { icon: "ri-clockwise-2-line", label: "Message Durability", desc: "Ensuring messages aren't lost if the broker crashes. Stored on disk vs. memory." },
          { icon: "ri-history-line", label: "Idempotency", desc: "Ensuring that processing the same message twice has no additional effect (crucial for payment systems)." },
        ]
      },
      {
        heading: "Kafka vs. RabbitMQ",
        type: "compare",
        left: {
          label: "RabbitMQ (Traditional)",
          color: "#e07a5f",
          points: [
            "Smart Broker / Dumb Consumer.",
            "Messages deleted after ACK.",
            "High priority on complex routing.",
            "Lower throughput than Kafka.",
          ]
        },
        right: {
          label: "Apache Kafka (Log-based)",
          color: "#81b29a",
          points: [
            "Dumb Broker / Smart Consumer.",
            "Messages persisted for a retention period.",
            "Enables 'Replaying' history.",
            "Ultra-high throughput (Millions/sec).",
          ]
        }
      }
    ],
    quiz: [
      { q: "What is 'Idempotency'?", opts: ["Message encryption", "Processing the same request multiple times with one result", "Infinite scaling", "Speed of delivery"], ans: 1 },
      { q: "In Pub/Sub, the publisher sends to a:", opts: ["Single consumer", "Queue", "Topic", "Database"], ans: 2 },
      { q: "Kafka is unique because it:", opts: ["Is written in Java", "Deletes messages after reading", "Persists messages like an append-only log", "Only supports one consumer"], ans: 2 },
      { q: "Async communication helps solve:", opts: ["Strict Consistency", "Service Decoupling", "User Login", "CSS styling"], ans: 1 },
      { q: "A 'Dead Letter Queue' is used for:", opts: ["Spam messages", "Messages that failed to process multiple times", "Encrypted mail", "System logs"], ans: 1 },
      { q: "Which is a 'Push' based messaging system?", opts: ["Kafka", "RabbitMQ", "S3", "MySQL"], ans: 1 },
      { q: "Backpressure is used to:", opts: ["Speed up the producer", "Prevent the consumer from being overwhelmed", "Cool down the server", "Delete old data"], ans: 1 },
      { q: "Message 'ACK' stands for:", opts: ["Acquire", "Acknowledgment", "Active", "Account"], ans: 1 },
      { q: "Which pattern is best for a 'News Feed' update?", opts: ["Point-to-point", "Pub/Sub", "Batch processing", "Synchronous HTTP"], ans: 1 },
      { q: "Kafka partitions allow for:", opts: ["Encryption", "Parallel processing", "Deleting data", "Smaller file sizes"], ans: 1 },
    ]
  },
  {
    id: "case-study",
    title: "Case Study: URL Shortener",
    icon: "ri-links-line",
    color: "#5fb8c8",
    tagline: "Designing TinyURL",
    intro: "The goal: Create a system that takes a long URL and returns a short 7-character alias. It must handle 100 million new URLs per month and 10 billion reads per month.",
    sections: [
      {
        heading: "1. Back-of-the-Envelope Estimation",
        type: "toolkit",
        tools: [
          { name: "Write Load", tip: "100M / 30 days / 24 hrs / 3600s ≈ 40 URLs per second." },
          { name: "Read Load", tip: "10B / 100M = 100:1 read-to-write ratio. ≈ 4,000 requests per second." },
          { name: "Storage", tip: "500 bytes per URL * 100M/month * 120 months (10 years) ≈ 6 TB total." },
          { name: "Caching", tip: "80-20 rule. Cache top 20% of URLs. 20% of 10B/month ≈ 2B reads. ~170GB RAM needed for Redis." },
        ]
      },
      {
        heading: "2. The Key Generation Service (KGS)",
        type: "insight_block",
        insight: "Instead of generating a hash on the fly (which risks collisions), we use a standalone 'Key Generation Service' that pre-generates billions of unique 7-character strings and stores them in a 'Key-DB'. When a request comes in, we simply grab a key and mark it as used.",
        takeaway: "Using a KGS eliminates concurrency issues and ensures every short link is unique without checking the main DB."
      },
      {
        heading: "3. System Components",
        type: "framework",
        items: [
          { icon: "ri-key-2-line", label: "Base-62 Encoding", desc: "[a-z, A-Z, 0-9] characters. $62^7$ combinations provides 3.5 trillion unique keys." },
          { icon: "ri-database-line", label: "NoSQL Store", desc: "Since we don't need complex joins, a Key-Value store like DynamoDB or Cassandra scales easily to TBs." },
          { icon: "ri-flashlight-line", label: "Redis Cache", desc: "Store the most frequently accessed long URLs in memory to keep redirection latency < 10ms." },
          { icon: "ri-shuffle-line", label: "Load Balancer", desc: "Layer 7 LB using Round Robin to distribute traffic across web servers." },
        ]
      }
    ],
    quiz: [
      { q: "Why use Base-62 for URL shortening?", opts: ["It's encrypted", "It uses only URL-safe characters while providing many combinations", "It's faster than Base-10", "It compresses the URL"], ans: 1 },
      { q: "How many unique keys does a 7-character Base-62 string provide?", opts: ["1 Million", "1 Billion", "3.5 Trillion", "Infinite"], ans: 2 },
      { q: "What is the primary benefit of a Key Generation Service (KGS)?", opts: ["Encryption", "Eliminating key collisions and DB overhead at runtime", "Generating shorter URLs", "Automatic backups"], ans: 1 },
      { q: "If the read-to-write ratio is 100:1, the system is:", opts: ["Write-heavy", "Read-heavy", "Balanced", "Synchronous"], ans: 1 },
      { q: "Which cache eviction policy is best for TinyURL?", opts: ["FIFO", "LRU (Least Recently Used)", "LFU", "Random"], ans: 1 },
      { q: "Where should the long-to-short mapping be stored?", opts: ["Browser cookies", "A persistent NoSQL Database", "RAM only", "Local file system"], ans: 1 },
      { q: "What happens if the Redis cache misses?", opts: ["Request fails", "App crashes", "System queries the Database and populates the cache", "It returns a 404"], ans: 2 },
      { q: "To handle 10B reads/month, what is the first scaling step?", opts: ["More CPU", "Read Replicas and Caching", "Larger Hard Drive", "Better CSS"], ans: 1 },
      { q: "Why is a 302 redirect often better than a 301 for analytics?", opts: ["It's faster", "301 is permanently cached by browser, so you miss future hits for analytics", "302 is encrypted", "301 is illegal"], ans: 1 },
      { q: "Collision handling in hashing is needed if you:", opts: ["Use KGS", "Hash the URL directly without a KGS", "Use a Database", "Use a Load Balancer"], ans: 1 },
    ]
  }
];

export default function SystemDesign() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [completedChapters, setCompleted] = useState(new Set());
  const [readProgress, setReadProgress] = useState({});
  const contentRef = useRef(null);

  const chapter = CHAPTERS[activeChapter];

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      const pct = Math.min(100, Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100));
      setReadProgress(p => ({ ...p, [activeChapter]: Math.max(p[activeChapter] || 0, pct) }));
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [activeChapter]);

  const switchChapter = (idx) => {
    setActiveChapter(idx);
    setQuizMode(false);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const setQuizAns = (key, val) => { if (checked[key]) return; setQuizAnswers(p => ({ ...p, [key]: val })); };
  const checkOne = (key) => { if (quizAnswers[key] === undefined) return; setChecked(p => ({ ...p, [key]: true })); };

  const quizScore = () => chapter.quiz.reduce((acc, q, qi) => {
    const key = `${activeChapter}_${qi}`;
    if (!checked[key]) return acc;
    return acc + (quizAnswers[key] === q.ans ? 1 : 0);
  }, 0);

  const allChecked = chapter.quiz.every((_, qi) => checked[`${activeChapter}_${qi}`]);

  return (
    <>
      <HomeNavbar />
      <div className="os-layout">
        <aside className="os-sidebar">
          <div className="os-sidebar-header">
            <i className="ri-layout-masonry-line" />
            <div>
              <h2>System Design</h2>
              <span>{completedChapters.size} / {CHAPTERS.length} complete</span>
            </div>
          </div>
          <div className="os-overall-bar">
            <div className="os-overall-fill" style={{ width: `${(completedChapters.size / CHAPTERS.length) * 100}%` }} />
          </div>
          <nav className="os-nav">
            {CHAPTERS.map((ch, idx) => (
              <button key={ch.id}
                className={`os-nav-item ${activeChapter === idx ? "active" : ""} ${completedChapters.has(idx) ? "done" : ""}`}
                style={activeChapter === idx ? { "--cc": ch.color, borderLeftColor: ch.color } : { "--cc": ch.color }}
                onClick={() => switchChapter(idx)}
              >
                <div className="os-nav-icon" style={activeChapter === idx ? { background: ch.color + "20", color: ch.color } : {}}>
                  <i className={ch.icon} />
                </div>
                <div className="os-nav-text">
                  <span className="os-nav-title">{ch.title}</span>
                  <span className="os-nav-sub">{ch.tagline}</span>
                </div>
                {completedChapters.has(idx) && <i className="ri-checkbox-circle-fill os-done-icon" style={{ color: "#81b29a" }} />}
              </button>
            ))}
          </nav>
        </aside>

        <main className="os-main" ref={contentRef}>
          <div className="os-hero" style={{ "--cc": chapter.color }}>
            <div className="os-hero-accent" style={{ background: `radial-gradient(circle at 80% 50%, ${chapter.color}22, transparent 60%)` }} />
            <h1 className="os-hero-title">{chapter.title}</h1>
            <p className="os-hero-tagline">{chapter.tagline}</p>
            <p className="os-hero-intro">{chapter.intro}</p>
          </div>

          {!quizMode ? (
            <div className="os-sections">
              {chapter.sections.map((sec, si) => <Section key={si} sec={sec} color={chapter.color} />)}
              <div className="os-quiz-cta" style={{ borderColor: chapter.color + "30" }}>
                <button className="os-start-quiz-btn"
                  style={{ background: chapter.color }}
                  onClick={() => { setQuizMode(true); if (contentRef.current) contentRef.current.scrollTop = 0; }}>
                  Start Performance Quiz <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          ) : (
            <div className="os-quiz">
              <div className="os-quiz-header">
                 <button className="os-back-btn" onClick={() => setQuizMode(false)}>
                   <i className="ri-arrow-left-line" /> Back to Chapter
                 </button>
                 <div className="os-quiz-score-badge">
                   Score: {quizScore()} / {chapter.quiz.length}
                 </div>
              </div>
              <div className="os-quiz-questions">
                {chapter.quiz.map((q, qi) => {
                  const key = `${activeChapter}_${qi}`;
                  const userAns = quizAnswers[key];
                  const isChkd = checked[key];
                  return (
                    <div key={qi} className={`os-q-card ${isChkd ? (userAns === q.ans ? "q-correct" : "q-wrong") : ""}`} style={{ "--cc": chapter.color }}>
                      <p className="os-q-text"><strong>Q{qi+1}:</strong> {q.q}</p>
                      <div className="os-opts">
                        {q.opts.map((opt, oi) => (
                          <button key={oi} 
                            className={`os-opt ${userAns === oi ? "os-opt-sel" : ""} ${isChkd && oi === q.ans ? "os-opt-right" : ""}`}
                            onClick={() => setQuizAns(key, oi)}
                            disabled={isChkd}>
                            {opt}
                          </button>
                        ))}
                      </div>
                      {!isChkd && (
                        <button className="os-check-btn" onClick={() => checkOne(key)} disabled={userAns === undefined}>Commit Answer</button>
                      )}
                    </div>
                  );
                })}
              </div>
              {allChecked && (
                <div className="os-quiz-finish">
                   <button className="os-finish-btn" 
                     style={{ background: chapter.color }}
                     onClick={() => setCompleted(p => new Set([...p, activeChapter]))}>
                     Mark Chapter Complete
                   </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

function Section({ sec, color }) {
  if (sec.type === "framework") return (
    <div className="sec-block">
      <h2 className="sec-heading">{sec.heading}</h2>
      <div className="framework-grid">
        {sec.items.map((item, i) => (
          <div key={i} className="fw-card" style={{ "--cc": color }}>
            <div className="fw-icon" style={{ color, background: color + "15" }}><i className={item.icon} /></div>
            <div className="fw-label" style={{ color }}>{item.label}</div>
            <div className="fw-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (sec.type === "compare") return (
    <div className="sec-block">
      <h2 className="sec-heading">{sec.heading}</h2>
      <div className="compare-grid">
        <div className="compare-col">
          <div className="compare-label" style={{ color: sec.left.color }}>{sec.left.label}</div>
          {sec.left.points.map((p, i) => <div key={i} className="compare-point"><i className="ri-close-circle-line" />{p}</div>)}
        </div>
        <div className="compare-divider" />
        <div className="compare-col">
          <div className="compare-label" style={{ color: sec.right.color }}>{sec.right.label}</div>
          {sec.right.points.map((p, i) => <div key={i} className="compare-point"><i className="ri-checkbox-circle-line" />{p}</div>)}
        </div>
      </div>
    </div>
  );

  if (sec.type === "steps") return (
    <div className="sec-block">
      <h2 className="sec-heading">{sec.heading}</h2>
      <div className="steps-list">
        {sec.steps.map((step, i) => (
          <div key={i} className="step-item" style={{ "--cc": color }}>
            <div className="step-n" style={{ color, borderColor: color + "40" }}>{step.n}</div>
            <div className="step-connector" style={{ background: color + "20" }} />
            <div className="step-body">
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (sec.type === "insight_block") return (
    <div className="sec-block">
      <h2 className="sec-heading">{sec.heading}</h2>
      <div className="insight-block" style={{ borderLeftColor: color, background: color + "08" }}>
        <p className="insight-text">{sec.insight}</p>
        <div className="insight-takeaway">
          <i className="ri-lightbulb-flash-line" style={{ color: "#c9a96e" }} />
          <span>{sec.takeaway}</span>
        </div>
      </div>
    </div>
  );

  if (sec.type === "toolkit") return (
    <div className="sec-block">
      <h2 className="sec-heading">{sec.heading}</h2>
      <div className="toolkit-list">
        {sec.tools.map((tool, i) => (
          <div key={i} className="tool-item" style={{ "--cc": color }}>
            <div className="tool-name" style={{ color }}>{tool.name}</div>
            <div className="tool-tip">{tool.tip}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return null;
}