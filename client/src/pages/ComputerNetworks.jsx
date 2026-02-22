import { useState, useEffect, useRef } from "react";
import HomeNavbar from "../components/HomeNavbar";
/* Ensure your CSS file is named ComputerNetworks.css or matches your existing OS css */
import "./ComputerNetworks.css"; 

const CHAPTERS = [
  {
    id: "intro",
    title: "Introduction & OSI Model",
    icon: "ri-global-line",
    color: "#e07a5f",
    tagline: "The language of the global internet",
    intro: "Computer Networking is the practice of transporting and exchanging data between nodes over a shared medium. To manage this complexity, we use layered models like OSI and TCP/IP, ensuring that a web browser doesn't need to know whether the data is traveling over fiber optics or radio waves.",
    sections: [
      {
        heading: "Core Network Components",
        type: "framework",
        items: [
          { icon: "ri-router-line", label: "Routing", desc: "Determining the optimal path across multiple networks using IP addresses and routing tables." },
          { icon: "ri-node-tree", label: "Switching", desc: "Connecting devices within a single Local Area Network (LAN) using MAC addresses." },
          { icon: "ri-broadcast-line", label: "Transmission Media", desc: "The physical path: Twisted pair copper, Fiber optics, or Wireless (RF)." },
          { icon: "ri-shield-check-line", label: "Protocols", desc: "The set of rules governing data format, timing, and error control (TCP, IP, HTTP)." },
          { icon: "ri-server-line", label: "Topology", desc: "The geometric arrangement of a network: Star, Mesh, Bus, or Hybrid." },
          { icon: "ri-p2p-line", label: "Client-Server", desc: "The architecture where central servers provide resources to distributed clients." },
        ]
      },
      {
        heading: "The 7 Layers of OSI",
        type: "steps",
        steps: [
          { n: "L7", title: "Application Layer", desc: "Network processes to applications. Protocols: HTTP, DNS, FTP, SMTP." },
          { n: "L4", title: "Transport Layer", desc: "End-to-end connections and reliability. Segmentation, flow control, and error correction (TCP/UDP)." },
          { n: "L3", title: "Network Layer", desc: "Path determination and logical addressing (IP). Routes packets across interconnected networks." },
          { n: "L2", title: "Data Link Layer", desc: "Physical addressing (MAC). Framing and error detection on the local link." },
        ]
      },
      {
        heading: "OSI Model vs. TCP/IP Stack",
        type: "compare",
        left: {
          label: "OSI Model (Theoretical)",
          color: "#e07a5f",
          points: [
            "7 Distinct layers for granular modularity",
            "Strict separation of services, interfaces, and protocols",
            "Developed by ISO as a conceptual framework",
            "Session and Presentation layers are separate",
            "Harder to implement in real-world software",
          ]
        },
        right: {
          label: "TCP/IP Model (Practical)",
          color: "#81b29a",
          points: [
            "4 Layers: Link, Internet, Transport, Application",
            "The actual foundation of the modern Internet",
            "Combines L5, L6, and L7 into one Application layer",
            "More flexible and efficient for protocol developers",
            "Protocols came first, then the model",
          ]
        }
      },
      {
        heading: "Scenario: The 'Invisible' Cable Break",
        type: "scenario",
        scenario: "A network admin sees that a server is 'Up' (Physical link is green) but users cannot access the website hosted on it. Where is the failure in the OSI model?",
        options: [
          { text: "It's a Layer 1 issue; the cable must be slightly loose", outcome: "❌ Incorrect. If the link light is green, Layer 1 (Physical) is likely functional.", good: false },
          { text: "Check Layer 3; the server might have an IP conflict or routing issue", outcome: "✅ Correct. Since the hardware link is active but data isn't flowing, the issue usually resides at the Network (L3) or Application (L7) layers.", good: true },
          { text: "Layer 2 is failing; the MAC address table is full", outcome: "⚠️ Possible, but less common than a routing (L3) or firewall (L4/L7) configuration error.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "Which OSI layer is responsible for path determination and logical addressing?", opts: ["Data Link", "Network", "Transport", "Physical"], ans: 1 },
      { q: "The 'Application' layer in TCP/IP maps to which OSI layers?", opts: ["L1, L2, L3", "L4, L5", "L5, L6, L7", "L7 only"], ans: 2 },
      { q: "A Switch primarily operates at which layer?", opts: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"], ans: 1 },
      { q: "Which protocol is used to map an IP address to a MAC address?", opts: ["DNS", "DHCP", "ARP", "ICMP"], ans: 2 },
      { q: "What is the primary PDU (Protocol Data Unit) of the Transport layer?", opts: ["Bit", "Frame", "Packet", "Segment"], ans: 3 },
      { q: "Which topology offers the highest redundancy?", opts: ["Star", "Bus", "Mesh", "Ring"], ans: 2 },
      { q: "The 3-way handshake occurs at which layer?", opts: ["Network", "Transport", "Session", "Application"], ans: 1 },
      { q: "MAC stands for:", opts: ["Media Access Control", "Memory Access Connection", "Main Address Center", "Mode Access Circuit"], ans: 0 },
      { q: "Which layer handles encryption and compression in the OSI model?", opts: ["Application", "Presentation", "Session", "Transport"], ans: 1 },
      { q: "Which device is used to connect two different networks?", opts: ["Hub", "Switch", "Router", "Repeater"], ans: 2 },
    ]
  },
  {
    id: "transport",
    title: "The Transport Layer",
    icon: "ri-split-cells-vertical",
    color: "#81b29a",
    tagline: "Ensuring reliable end-to-end delivery",
    intro: "The Transport Layer (Layer 4) is responsible for the heart of communication. It manages flow control, error correction, and the crucial decision of whether to prioritize speed (UDP) or reliability (TCP).",
    sections: [
      {
        heading: "TCP vs. UDP: The Great Tradeoff",
        type: "compare",
        left: {
          label: "TCP (Transmission Control)",
          color: "#e07a5f",
          points: [
            "Connection-oriented (3-way handshake)",
            "Guaranteed delivery with retransmissions",
            "Flow control and Congestion control",
            "Higher overhead due to headers and ACKs",
            "Best for: Web (HTTP), Email, File Transfer",
          ]
        },
        right: {
          label: "UDP (User Datagram)",
          color: "#81b29a",
          points: [
            "Connectionless (Fire and forget)",
            "No guarantee of delivery or order",
            "Extremely low latency and overhead",
            "No congestion control mechanism",
            "Best for: Streaming, Gaming, DNS, VoIP",
          ]
        }
      },
      {
        heading: "The TCP 3-Way Handshake",
        type: "steps",
        steps: [
          { n: "SYN", title: "Synchronize", desc: "The client sends a segment with the SYN bit set and a random sequence number (e.g., seq=x)." },
          { n: "SYN-ACK", title: "Synchronize-Acknowledge", desc: "Server responds with SYN and ACK bits set. It acknowledges x (ack=x+1) and sends its own sequence number (seq=y)." },
          { n: "ACK", title: "Acknowledge", desc: "Client acknowledges the server's sequence (ack=y+1). The connection is now established." },
        ]
      },
      {
        heading: "Key Transport Mechanisms",
        type: "toolkit",
        tools: [
          { name: "Port Numbers", tip: "16-bit identifiers (0-65535) that direct traffic to specific services on a host (e.g., Port 80 for HTTP)." },
          { name: "Sliding Window", tip: "A flow control method where the receiver tells the sender how much data can be sent before an ACK is required." },
          { name: "Checksum", tip: "A mathematical value used to detect data corruption during transit." },
          { name: "Retransmission Timer", tip: "If an ACK isn't received within this window, TCP assumes the packet was lost and sends it again." },
        ]
      }
    ],
    quiz: [
      { q: "Which protocol is 'Connectionless'?", opts: ["TCP", "UDP", "HTTP", "SSH"], ans: 1 },
      { q: "What is the size of a TCP port number?", opts: ["8 bits", "16 bits", "32 bits", "64 bits"], ans: 1 },
      { q: "Which flag is used to gracefully close a TCP connection?", opts: ["SYN", "ACK", "FIN", "RST"], ans: 2 },
      { q: "Flow control in TCP is primarily managed by:", opts: ["Sequence numbers", "The Sliding Window", "Checksums", "Port mapping"], ans: 1 },
      { q: "A 'Socket' is a combination of:", opts: ["MAC and IP", "IP and Port Number", "Port Number and Protocol", "MAC and Port"], ans: 1 },
      { q: "Which protocol would a multiplayer FPS game likely use for player positions?", opts: ["TCP", "UDP", "FTP", "SMTP"], ans: 1 },
      { q: "What does the SYN-ACK step do?", opts: ["Ends the session", "Acknowledges client and synchronizes server", "Encrypts the payload", "Checks the checksum"], ans: 1 },
      { q: "HTTP usually operates on which port?", opts: ["21", "22", "80", "443"], ans: 2 },
      { q: "TCP sequence numbers are used for:", opts: ["Encryption", "Identifying the sender", "Reassembling segments in order", "Routing"], ans: 2 },
      { q: "Which is NOT a TCP flag?", opts: ["SYN", "ACK", "PUSH", "MAP"], ans: 3 },
    ]
  },
  {
    id: "network",
    title: "The Network Layer (IP)",
    icon: "ri-route-line",
    color: "#5fb8c8",
    tagline: "IP Addressing & Routing",
    intro: "The Network Layer is the post office of the internet. It handles logical addressing (IPv4/IPv6) and makes routing decisions to get packets from source to destination across a mesh of global networks.",
    sections: [
        {
          heading: "IPv4 vs. IPv6",
          type: "compare",
          left: {
            label: "IPv4",
            color: "#5fb8c8",
            points: [
              "32-bit address (4.3 Billion possible)",
              "Dotted-decimal notation (192.168.1.1)",
              "Requires NAT to extend address space",
              "Uses ARP to find MAC addresses",
              "Manual or DHCP configuration",
            ]
          },
          right: {
            label: "IPv6",
            color: "#c9a96e",
            points: [
              "128-bit address (Virtually infinite)",
              "Hexadecimal notation (2001:db8...)",
              "Built-in IPSec support",
              "Uses Neighbor Discovery (NDP) instead of ARP",
              "No fragmentation by routers (Source only)",
            ]
          }
        },
        {
            heading: "Routing Protocols",
            type: "cards_grid",
            cards: [
              { icon: "ri-flashlight-line", title: "RIP", desc: "Distance Vector protocol. Uses hop count as metric. Max 15 hops." },
              { icon: "ri-radar-line", title: "OSPF", desc: "Link State protocol. Uses Dijkstra's algorithm. Fast convergence for large networks." },
              { icon: "ri-earth-line", title: "BGP", desc: "Path Vector protocol. The protocol that runs the global Internet." },
              { icon: "ri-bubble-chart-line", title: "ICMP", desc: "Used for diagnostics (Ping/Traceroute) and error reporting." },
            ]
        },
        {
          heading: "Scenario: Subnetting Mystery",
          type: "scenario",
          scenario: "You have a network 192.168.1.0/24. You need to split it into two equal subnets. What is the new subnet mask?",
          options: [
            { text: "/25 (255.255.255.128)", outcome: "✅ Correct. Borrowing one bit from the host portion creates 2 subnets.", good: true },
            { text: "/26 (255.255.255.192)", outcome: "❌ Incorrect. This would create 4 subnets.", good: false },
            { text: "/23 (255.255.254.0)", outcome: "❌ Incorrect. This would merge two /24 networks (Supernetting).", good: false },
          ]
        }
    ],
    quiz: [
      { q: "What is the length of an IPv6 address?", opts: ["32 bits", "64 bits", "128 bits", "256 bits"], ans: 2 },
      { q: "Which protocol is used by 'Ping'?", opts: ["TCP", "UDP", "ICMP", "ARP"], ans: 2 },
      { q: "A /24 subnet has how many usable host addresses?", opts: ["256", "254", "512", "128"], ans: 1 },
      { q: "Which algorithm does OSPF use?", opts: ["Bellman-Ford", "Dijkstra", "Recursive Search", "Binary Tree"], ans: 1 },
      { q: "What is the loopback address for IPv4?", opts: ["192.168.0.1", "127.0.0.1", "10.0.0.1", "255.255.255.255"], ans: 1 },
      { q: "DHCP stands for:", opts: ["Dynamic Host Configuration Protocol", "Data Hub Control Path", "Direct Host Connection Port", "Digital Home Configuration Protocol"], ans: 0 },
      { q: "The 'Time to Live' (TTL) field prevents:", opts: ["Packet loss", "Infinite looping of packets", "Encryption errors", "Duplicate IPs"], ans: 1 },
      { q: "Private IP addresses (RFC 1918) are:", opts: ["Routable on the public internet", "Only usable within a local network", "Reserved for government use", "Used only for IPv6"], ans: 1 },
      { q: "NAT (Network Address Translation) is used to:", opts: ["Encrypt data", "Map many private IPs to one public IP", "Speed up routing", "Check for viruses"], ans: 1 },
      { q: "Which layer does a Router operate at?", opts: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"], ans: 2 },
    ]
  },
  {
    id: "security",
    title: "Network Security",
    icon: "ri-shield-keyhole-line",
    color: "#b07fd4",
    tagline: "Firewalls, Encryption & VPNs",
    intro: "Networking without security is a liability. This chapter covers how we protect data in flight and restrict access to network resources using modern cryptographic standards and architectural barriers.",
    sections: [
        {
          heading: "Security Toolkit",
          type: "toolkit",
          tools: [
            { name: "Firewall", tip: "Monitors and filters incoming/outgoing traffic based on security rules. Can be stateless or stateful." },
            { name: "VPN (Virtual Private Network)", tip: "Creates an encrypted 'tunnel' over a public network, allowing secure remote access." },
            { name: "TLS / SSL", tip: "Cryptographic protocols that provide security over a computer network (The 'S' in HTTPS)." },
            { name: "IDS / IPS", tip: "Intrusion Detection/Prevention systems that look for patterns of malicious activity." },
          ]
        },
        {
          heading: "Symmetric vs. Asymmetric Encryption",
          type: "compare",
          left: {
            label: "Symmetric (AES)",
            color: "#b07fd4",
            points: [
              "Same key used for encryption and decryption",
              "Very fast performance",
              "Hard to securely share the key with a stranger",
              "Best for bulk data encryption",
            ]
          },
          right: {
            label: "Asymmetric (RSA/ECC)",
            color: "#81b29a",
            points: [
              "Public key encrypts; Private key decrypts",
              "Slower performance due to math complexity",
              "Solves the key distribution problem",
              "Used for digital signatures and TLS handshakes",
            ]
          }
        },
        {
            heading: "Common Network Attacks",
            type: "cards_grid",
            cards: [
              { icon: "ri-skull-line", title: "DDoS", desc: "Overwhelming a target with traffic from multiple sources to cause a service outage." },
              { icon: "ri-user-search-line", title: "Man-in-the-Middle", desc: "An attacker secretly intercepts and alters communication between two parties." },
              { icon: "ri-spy-line", title: "Phishing", desc: "Deceiving users into revealing sensitive data via fake communications." },
              { icon: "ri-shield-cross-line", title: "SQL Injection", desc: "Injecting malicious code into input fields to manipulate backend databases." },
            ]
        }
    ],
    quiz: [
      { q: "What does the 'S' in HTTPS stand for?", opts: ["Standard", "Secure", "System", "Socket"], ans: 1 },
      { q: "Which port does HTTPS use by default?", opts: ["80", "21", "443", "22"], ans: 2 },
      { q: "A VPN provides security primarily through:", opts: ["Faster routing", "Encryption and Tunneling", "Blocking all cookies", "Physical hardware locks"], ans: 1 },
      { q: "In asymmetric encryption, which key is shared with everyone?", opts: ["Private Key", "Public Key", "Master Key", "Session Key"], ans: 1 },
      { q: "A 'Stateful' Firewall:", opts: ["Only looks at individual packets", "Remembers the state of active connections", "Is only used for IPv6", "Does not require rules"], ans: 1 },
      { q: "Which attack aims to make a service unavailable?", opts: ["SQLi", "Phishing", "DDoS", "XSS"], ans: 2 },
      { q: "What is the primary purpose of a Digital Certificate?", opts: ["To speed up the internet", "To verify the ownership of a public key", "To store user passwords", "To block pop-up ads"], ans: 1 },
      { q: "Which protocol provides secure remote shell access?", opts: ["Telnet", "SSH", "FTP", "HTTP"], ans: 1 },
      { q: "WPA3 is a security standard for:", opts: ["Ethernet", "Wi-Fi", "Bluetooth", "Fiber Optics"], ans: 1 },
      { q: "The 'Principle of Least Privilege' means:", opts: ["Everyone is an admin", "Users only get the access necessary for their job", "Security is optional", "Passwords are never changed"], ans: 1 },
    ]
  }
];

export default function ComputerNetworks() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [quizMode, setQuizMode]           = useState(false);
  const [quizAnswers, setQuizAnswers]     = useState({});
  const [checked, setChecked]             = useState({});
  const [completedChapters, setCompleted] = useState(new Set());
  const [readProgress, setReadProgress]   = useState({});
  const contentRef = useRef(null);

  const chapter = CHAPTERS[activeChapter];

  // Identical scroll progress logic as OS page
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
        {/* SIDEBAR - Identical structure */}
        <aside className="os-sidebar">
          <div className="os-sidebar-header">
            <i className="ri-share-forward-line" />
            <div>
              <h2>Computer Networks</h2>
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
                {completedChapters.has(idx)
                  ? <i className="ri-checkbox-circle-fill os-done-icon" style={{ color: "#81b29a" }} />
                  : (
                    <div className="os-read-ring">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="#242424" strokeWidth="2.5" />
                        <circle cx="12" cy="12" r="10" fill="none" stroke={ch.color} strokeWidth="2.5"
                          strokeDasharray={`${((readProgress[idx] || 0) / 100) * 62.8} 62.8`}
                          strokeLinecap="round" transform="rotate(-90 12 12)" />
                      </svg>
                    </div>
                  )}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT - Identical structure */}
        <main className="os-main" ref={contentRef}>
          <div className="os-hero" style={{ "--cc": chapter.color }}>
            <div className="os-hero-accent" style={{ background: `radial-gradient(circle at 80% 50%, ${chapter.color}22, transparent 60%)` }} />
            <div className="os-hero-tag" style={{ color: chapter.color, borderColor: chapter.color + "40", background: chapter.color + "10" }}>
              Chapter {activeChapter + 1} of {CHAPTERS.length}
            </div>
            <div className="os-hero-icon" style={{ background: chapter.color + "18", border: `1px solid ${chapter.color}30`, color: chapter.color }}>
              <i className={chapter.icon} />
            </div>
            <h1 className="os-hero-title">{chapter.title}</h1>
            <p className="os-hero-tagline">{chapter.tagline}</p>
            <p className="os-hero-intro">{chapter.intro}</p>
          </div>

          {!quizMode ? (
            <div className="os-sections">
              {chapter.sections.map((sec, si) => <Section key={si} sec={sec} color={chapter.color} />)}
              <div className="os-quiz-cta" style={{ borderColor: chapter.color + "30" }}>
                <div className="os-quiz-cta-left">
                  <i className="ri-quill-pen-line" style={{ color: chapter.color }} />
                  <div>
                    <div className="os-quiz-cta-title">Network Mastery Quiz</div>
                    <div className="os-quiz-cta-sub">Test your knowledge of {chapter.title}</div>
                  </div>
                </div>
                <button className="os-start-quiz-btn"
                  style={{ background: chapter.color, boxShadow: `0 4px 20px ${chapter.color}40` }}
                  onClick={() => { setQuizMode(true); if (contentRef.current) contentRef.current.scrollTop = 0; }}>
                  Start Quiz <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          ) : (
            /* Quiz Logic - Exact replica of your OS engine */
            <div className="os-quiz">
              {/* [Quiz content mapping similar to your OS page follows here] */}
              <div className="os-quiz-header">
                 <button className="os-back-btn" onClick={() => setQuizMode(false)}>
                   <i className="ri-arrow-left-line" /> Back to Lesson
                 </button>
                 <div className="os-quiz-score-badge" style={{ borderColor: chapter.color + "40" }}>
                   <span style={{ color: chapter.color }}>{quizScore()}</span> / {chapter.quiz.length}
                 </div>
              </div>

              <div className="os-quiz-questions">
                {chapter.quiz.map((q, qi) => {
                  const key = `${activeChapter}_${qi}`;
                  const userAns = quizAnswers[key];
                  const isChkd = checked[key];
                  const isCorr = userAns === q.ans;
                  return (
                    <div key={qi} className={`os-q-card ${isChkd ? (isCorr ? "q-correct" : "q-wrong") : ""}`} style={{ "--cc": chapter.color }}>
                      <div className="os-q-top">
                        <span className="os-q-num">Question {qi + 1}</span>
                      </div>
                      <p className="os-q-text">{q.q}</p>
                      <div className="os-opts">
                        {q.opts.map((opt, oi) => (
                          <button key={oi} 
                            className={`os-opt ${userAns === oi ? "os-opt-sel" : ""} ${isChkd && oi === q.ans ? "os-opt-right" : ""} ${isChkd && userAns === oi && oi !== q.ans ? "os-opt-wrong" : ""}`}
                            onClick={() => setQuizAns(key, oi)}
                            disabled={isChkd}>
                            {opt}
                          </button>
                        ))}
                      </div>
                      {!isChkd && (
                        <button className="os-check-btn" onClick={() => checkOne(key)} disabled={userAns === undefined}>Check Answer</button>
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

/* SECTION RENDERER - Mapped to your existing CSS styles */
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

  if (sec.type === "scenario") return (
    <div className="sec-block">
      <h2 className="sec-heading">{sec.heading}</h2>
      <div className="scenario-block" style={{ borderColor: color + "30" }}>
        <p className="scenario-text">{sec.scenario}</p>
        <div className="scenario-opts">
          {sec.options.map((opt, i) => (
            <div key={i}>
              <button className="scenario-opt" onClick={() => setActiveScenario(i)}>
                {opt.text}
              </button>
              {activeScenario === i && <div className="scenario-outcome">{opt.outcome}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return null;
}