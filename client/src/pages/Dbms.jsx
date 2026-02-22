import { useState, useEffect, useRef } from "react";
import HomeNavbar from "../components/HomeNavbar";
import "./Dbms.css"; 

const CHAPTERS = [
  {
    id: "storage-engine",
    title: "The Storage Engine: Pages & B+ Trees",
    icon: "ri-database-2-line",
    color: "#5fb8c8",
    tagline: "Internal Physical Organization",
    intro: "The storage engine is the DBMS subsystem responsible for storing, retrieving, and updating data on disk. It abstracts the physical hardware into logical blocks called Pages. Efficiency here determines whether your query takes 10ms or 10 seconds.",
    sections: [
      {
        heading: "1. The Anatomy of a Page (Slotted Pages)",
        type: "steps",
        steps: [
          { n: "Header", title: "Page Header", desc: "Contains metadata: Page ID, Free Space Pointer, Checksum (for corruption detection), and Log Sequence Number (LSN) for WAL sync." },
          { n: "Slots", title: "Slot Directory", desc: "An array of offsets. Each 'slot' points to the exact byte location of a record within the page. This allows records to be moved within a page without breaking external pointers." },
          { n: "Data", title: "Record Storage", desc: "The actual row data. In a row-store, attributes are packed together. In a column-store, a page only contains values for one specific attribute." },
          { n: "Free", title: "Free Space", desc: "The gap between the slot directory (growing down) and records (growing up). When they meet, the page is full." },
        ]
      },
      /* Strategic Visual Placement */
      ,
      {
        heading: "2. B+ Tree Internals: Why Not Binary Trees?",
        type: "compare",
        left: {
          label: "Binary Search Tree (BST)",
          color: "#e07a5f",
          points: [
            "2 children per node (Low Fan-out).",
            "Height is O(log2 N). For 1M rows, height is ~20.",
            "Requires 20 Disk I/Os to find a leaf.",
            "Nodes are small; poor disk cache utilization.",
          ]
        },
        right: {
          label: "B+ Tree (Database Standard)",
          color: "#81b29a",
          points: [
            "M children per node (High Fan-out, M=100+).",
            "Height is O(logM N). For 1M rows, height is ~3.",
            "Requires only 3 Disk I/Os to find a leaf.",
            "Leaves are linked in a Doubly Linked List for range scans.",
          ]
        }
      },
      {
        heading: "3. Indexing Strategies & Performance",
        type: "framework",
        items: [
          { icon: "ri-filter-3-line", label: "Composite Index", desc: "Index on multiple columns (A, B). The 'Leftmost Prefix' rule applies—it can search (A) or (A, B) but not (B) alone." },
          { icon: "ri-scan-line", label: "Index Only Scan", desc: "When the index contains all columns requested in the SELECT. The engine never touches the actual table (Heap), saving massive I/O." },
          { icon: "ri-bubble-chart-line", label: "Hash Index", desc: "O(1) lookup speed but does NOT support range queries. Best for unique ID lookups only." },
          { icon: "ri-shape-line", label: "Sparse vs Dense", desc: "Sparse indexes have entries for only some data values; Dense indexes have an entry for every search key value in the file." },
        ]
      }
    ],
    quiz: [
      { q: "Why is high 'Fan-out' important in B+ Trees?", opts: ["It saves RAM", "It reduces the height of the tree, minimizing Disk I/O", "It makes the index encrypted", "It allows duplicate keys"], ans: 1 },
      { q: "What does the 'LSN' in a page header track?", opts: ["Last Search Number", "Log Sequence Number for recovery", "List of Serial Numbers", "Length of Slots"], ans: 1 },
      { q: "A 'Composite Index' on (Name, Age) can optimize which query?", opts: ["WHERE Age = 25", "WHERE Name = 'Vardhan'", "ORDER BY Age", "None of these"], ans: 1 },
      { q: "What is a 'Dirty Page'?", opts: ["A page with corrupted data", "A page modified in RAM but not yet written to disk", "A page with deleted rows", "A page that failed checksum"], ans: 1 },
      { q: "Leaf nodes in a B+ Tree are linked to support:", opts: ["Faster single lookups", "Range scans and ordered retrieval", "Encryption", "Sharding"], ans: 1 },
      { q: "The 'Fill Factor' of an index refers to:", opts: ["How much of each page is filled with data initially", "The total number of rows", "The size of the primary key", "The speed of the disk"], ans: 0 },
      { q: "An 'Index Only Scan' is possible when:", opts: ["The table is empty", "The index leaf contains all columns in the SELECT clause", "The query uses a LIMIT", "There are no WHERE clauses"], ans: 1 },
      { q: "Which index type is best for equality checks (=) but worst for range scans (>)?", opts: ["B+ Tree", "Bitmap Index", "Hash Index", "Clustered Index"], ans: 2 },
      { q: "What is 'Internal Fragmentation' in a page?", opts: ["Unused space within a fixed-size page", "Data spread across multiple disks", "Broken pointers", "Multiple indexes on one table"], ans: 0 },
      { q: "In a 'Row-Oriented' DB, how is data stored on a page?", opts: ["All values for one column are together", "Attributes of a single row are stored contiguously", "Data is compressed by type", "Data is stored as JSON only"], ans: 1 },
    ]
  },
  {
    id: "query-optim",
    title: "Query Optimization & Execution",
    icon: "ri-flashlight-line",
    color: "#a09bc9",
    tagline: "The Brain of the Database",
    intro: "When you send a SQL string, the DBMS doesn't just run it. It parses it, binds it to schema, and then the Optimizer calculates thousands of possible paths (Plans) to find the one with the lowest estimated cost.",
    sections: [
      {
        heading: "1. The Query Pipeline",
        type: "steps",
        steps: [
          { n: "Parse", title: "Parser & Lexer", desc: "Checks SQL syntax and converts the string into a Parse Tree." },
          { n: "Bind", title: "Binder / Catalog", desc: "Checks if tables and columns actually exist in the System Catalog. Replaces aliases with real names." },
          { n: "Opt", title: "Cost-Based Optimizer", desc: "Uses statistics (histograms) to estimate the cost of different Join orders and Index paths." },
          { n: "Exec", title: "Executor", desc: "Iterates through the chosen plan, pulling pages from the Buffer Pool and returning tuples to the user." },
        ]
      },
      ,
      {
        heading: "2. Join Algorithms Deep-Dive",
        type: "framework",
        items: [
          { icon: "ri-node-tree", label: "Nested Loop Join", desc: "For every row in Table A, scan Table B. Good for small tables or when B has an index on the join key." },
          { icon: "ri-shuffle-line", label: "Hash Join", desc: "Builds a hash table of the smaller table in RAM, then probes it with the larger table. Fast for large, unsorted datasets." },
          { icon: "ri-sort-asc", label: "Sort-Merge Join", desc: "Sorts both tables on the join key first, then merges them. Best for range-based joins or already sorted data." },
          { icon: "ri-focus-line", label: "Index Nested Loop", desc: "The 'Outer' table rows trigger an index lookup on the 'Inner' table. Much faster than a full scan." },
        ]
      },
      {
        heading: "3. Understanding EXPLAIN ANALYZE",
        type: "insight_block",
        insight: "EXPLAIN shows you the plan the optimizer *thinks* is best. ANALYZE actually runs the query and shows the *real* timing. If the 'Estimated Rows' differ significantly from 'Actual Rows', your statistics are stale and need an ANALYZE command to refresh the histograms.",
        takeaway: "The most common performance killer is the Optimizer choosing a 'Sequential Scan' instead of an 'Index Scan' due to outdated statistics."
      }
    ],
    quiz: [
      { q: "Which Join algorithm is generally best for two very large, unsorted tables?", opts: ["Nested Loop", "Hash Join", "Index Join", "Sequential Join"], ans: 1 },
      { q: "What is the 'Cost' in a Query Plan?", opts: ["The price of the license", "A unitless measure of estimated Disk I/O and CPU usage", "The number of rows returned", "The storage space used"], ans: 1 },
      { q: "The 'System Catalog' stores:", opts: ["User data", "Metadata about tables, columns, and indexes", "The Write-Ahead Log", "The query results"], ans: 1 },
      { q: "Why would an optimizer ignore an index?", opts: ["The table is too small to justify the overhead", "The statistics are outdated", "The query asks for >30% of the table rows", "All of the above"], ans: 3 },
      { q: "What does 'EXPLAIN' do in SQL?", opts: ["Explains the error", "Shows the execution plan without running the query", "Optimizes the code automatically", "Formats the output"], ans: 1 },
      { q: "Which Join algorithm uses a B-Tree structure if available?", opts: ["Hash Join", "Index Nested Loop Join", "Block Nested Loop", "Full Scan"], ans: 1 },
      { q: "What is 'Predicate Pushdown'?", opts: ["Moving filters (WHERE) as close to the data source as possible to reduce rows early", "Deleting rows", "Sorting results", "Encryption"], ans: 0 },
      { q: "A 'Histogram' in DBMS statistics tracks:", opts: ["Database uptime", "Distribution of values in a column", "User login frequency", "The size of the log file"], ans: 1 },
      { q: "The 'Execution Plan' is usually represented as a:", opts: ["Linked List", "Tree of operators", "Hash Table", "Flat file"], ans: 1 },
      { q: "Which part of the DBMS decides whether to use an Index?", opts: ["The Parser", "The Buffer Manager", "The Optimizer", "The Transaction Manager"], ans: 2 },
    ]
  },
  {
    id: "recovery",
    title: "Concurrency Control & Recovery",
    icon: "ri-restart-line",
    color: "#e07a5f",
    tagline: "The ARIES Recovery Protocol",
    intro: "What happens if the power cuts while the DB is halfway through a 1GB write? Concurrency control manages simultaneous access using locks, while Recovery ensures the database returns to a consistent state using logs.",
    sections: [
      {
        heading: "1. Lock Modes & Hierarchy",
        type: "compare",
        left: {
          label: "Shared Lock (S-Lock)",
          color: "#81b29a",
          points: [
            "Required for Reading data.",
            "Multiple transactions can hold S-locks on the same row.",
            "Does not block other S-locks.",
            "Blocks any Exclusive (X) locks.",
          ]
        },
        right: {
          label: "Exclusive Lock (X-Lock)",
          color: "#e07a5f",
          points: [
            "Required for Writing/Modifying data.",
            "Only one transaction can hold an X-lock on a row.",
            "Blocks both S-locks and other X-locks.",
            "Highest level of isolation for a single record.",
          ]
        }
      },
      ,
      {
        heading: "2. Deadlock Detection & Prevention",
        type: "framework",
        items: [
          { icon: "ri-radar-line", label: "Wait-For Graph", desc: "A directed graph where nodes are transactions. An edge A -> B means A is waiting for a lock held by B. A cycle = a Deadlock." },
          { icon: "ri-alarm-warning-line", label: "Timeout", desc: "If a transaction waits too long, the DBMS assumes a deadlock and aborts it. Simple but blunt." },
          { icon: "ri-history-line", label: "Wait-Die Scheme", desc: "Non-preemptive technique. If a younger transaction requests a lock held by an older one, it 'Dies' and restarts." },
          { icon: "ri-user-voice-line", label: "Wound-Wait", desc: "Preemptive. An older transaction 'Wounds' (restarts) a younger one if the younger holds a needed lock." },
        ]
      },
      {
        heading: "3. The ARIES Recovery Algorithm",
        type: "steps",
        steps: [
          { n: "Analysis", title: "Analysis Phase", desc: "Read the WAL from the last checkpoint. Identify 'Dirty Pages' in RAM and active transactions at the time of crash." },
          { n: "Redo", title: "Redo Phase", desc: "Repeat history. Re-apply all changes in the log (even for aborted transactions) to bring the DB to the exact state before the crash." },
          { n: "Undo", title: "Undo Phase", desc: "Roll back transactions that were never committed. This ensures the database is left in a consistent state." },
        ]
      }
    ],
    quiz: [
      { q: "Which phase of ARIES 'repeats history'?", opts: ["Analysis", "Redo", "Undo", "Checkpoint"], ans: 1 },
      { q: "A 'Wait-For Graph' cycle indicates:", opts: ["A successful commit", "A deadlock", "A full disk", "A fast query"], ans: 1 },
      { q: "In Wound-Wait, if an older transaction needs a lock held by a younger one:", opts: ["The older one dies", "The younger one is 'wounded' (restarted)", "Both wait forever", "The older one waits"], ans: 1 },
      { q: "Two-Phase Locking (2PL) Growing Phase allows:", opts: ["Releasing locks", "Acquiring new locks only", "Both acquiring and releasing", "Deleting data"], ans: 1 },
      { q: "Cascading Rollbacks are a problem in:", opts: ["Strict 2PL", "Basic 2PL", "Serializable Isolation", "WAL"], ans: 1 },
      { q: "A Shared (S) lock is compatible with which other lock?", opts: ["Exclusive (X)", "Another Shared (S)", "None", "Both"], ans: 1 },
      { q: "What is a 'Checkpoint' in DBMS recovery?", opts: ["The end of the log", "A point where all dirty pages are flushed to disk to limit recovery time", "A security check", "The start of a transaction"], ans: 1 },
      { q: "Recovery logs are stored as:", opts: ["B+ Trees", "Append-only sequential files", "Hash tables", "JSON"], ans: 1 },
      { q: "The 'Analysis' phase of ARIES starts from:", opts: ["The beginning of the log", "The most recent checkpoint", "The end of the log", "The last system error"], ans: 1 },
      { q: "Intent Locks (IS/IX) are used for:", opts: ["Data encryption", "Multi-granularity locking (e.g., locking a whole table vs one row)", "Faster writes", "Deleting indexes"], ans: 1 },
    ]
  }
];

export default function Dbms() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [quizMode, setQuizMode]           = useState(false);
  const [quizAnswers, setQuizAnswers]     = useState({});
  const [checked, setChecked]             = useState({});
  const [completedChapters, setCompleted] = useState(new Set());
  const [readProgress, setReadProgress]   = useState({});
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
  const checkOne   = (key) => { if (quizAnswers[key] === undefined) return; setChecked(p => ({ ...p, [key]: true })); };

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
            <i className="ri-database-2-line" />
            <div>
              <h2>DBMS Mastery</h2>
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
                   Engine Score: {quizScore()} / {chapter.quiz.length}
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
                     Mark Chapter as Resolved
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
  const [activeScenario, setActiveScenario] = useState(null);

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

  return null;
}