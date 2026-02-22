import { useState, useMemo } from "react";
import HomeNavbar from "../components/HomeNavbar";
import "./Articles.css";

/* ═══════════════════════════════════════════════
   30 CURATED TECH ARTICLES
═══════════════════════════════════════════════ */
const ARTICLES = [
  /* ── AI & ML (6) ── */
  {
    id: 1, subject: "AI & ML", tag: "ai", date: "Jan 2025", readTime: "6 min", likes: 1247,
    title: "OpenAI's o3 Scores 87.5% on ARC-AGI — What It Actually Means",
    summary: "o3 crossed the human-level threshold on the ARC-AGI benchmark — a test designed to resist memorisation. Is this genuine reasoning, or expensive brute-force search?",
    body: `OpenAI's o3 model scored 87.5% on the ARC-AGI benchmark in late 2024 — a result that shook the AI research community. ARC-AGI was designed by François Chollet specifically to resist pattern memorisation, requiring generalisation from just a few visual examples. Previous SOTA models scored under 30%; GPT-4 hit ~5%. Human average is ~85%.

**The Compute Concern**
The headline score used "high compute" — running thousands of candidate solutions and voting on the best. Estimated cost per task: $1,000–$10,000. At efficient compute settings, o3 scored 75.7%. This raises a fundamental question: is this intelligence, or elaborate search?

**What's Actually New**
o3 uses "deliberative alignment" — it reasons through an extended chain-of-thought before responding, allowing it to backtrack, explore hypotheses, and self-correct in ways GPT-4 couldn't. This is qualitatively different from single-pass generation.

**Chollet's Response**
The test's creator called it "impressive but not AGI," arguing that o3's compute-heavy approach is qualitatively different from how humans solve the same problems with a single glance and no test-time search.

**The Real Signal**
The ARC-AGI jump is the fastest benchmark progression in modern AI history. Whether or not it's AGI, the acceleration curve has real implications for how organisations plan AI strategy over the next 24 months. The benchmark ceiling is no longer a comfortable distance away.`
  },
  {
    id: 2, subject: "AI & ML", tag: "ai", date: "Dec 2024", readTime: "5 min", likes: 1089,
    title: "AlphaFold 3 Extends to DNA, RNA, and Small Molecules",
    summary: "DeepMind's AlphaFold 3 predicts how proteins interact with DNA, RNA, and drug-like molecules — not just their isolated structures. The implications for drug discovery are substantial.",
    body: `AlphaFold 2 earned its creators the 2024 Nobel Prize in Chemistry. AlphaFold 3, released May 2024, extends the architecture far beyond protein folding alone.

**What's New**
AF3 models the full biological complex: protein–DNA, protein–RNA, protein–ligand, and ion interactions. This matters enormously because most drugs work by binding to these complexes — not to isolated proteins.

**Architecture Shift: Diffusion Models**
AF3 replaces the Evoformer backbone with a diffusion architecture, similar in spirit to Stable Diffusion but for 3D molecular geometry. Instead of predicting coordinates directly, it learns a distribution over possible structures and samples from it — producing more physically plausible conformations.

**Drug Discovery Impact**
AF3 accelerates the "hit-to-lead" phase — understanding exactly how a promising molecule binds its target. Insilico Medicine, Recursion Pharmaceuticals, and Relay Therapeutics are already building AF3-native pipelines.

**The Access Controversy**
Unlike AF2 (fully open-source), AF3's weights are not publicly released. Researchers can use the web server but cannot run it locally. Over 500 researchers signed an open letter requesting full release. DeepMind has not yet complied.

**The Nobel Moment**
The 2024 Chemistry Prize went to David Baker (de novo protein design) and Demis Hassabis/John Jumper (AlphaFold) — the first time an AI system was centrally recognised with a Nobel in the natural sciences. A landmark for the field.`
  },
  {
    id: 3, subject: "AI & ML", tag: "ai", date: "Nov 2024", readTime: "5 min", likes: 743,
    title: "Small Language Models: Why Phi-3, Gemma 2, and Llama 3.2 Are Reshaping Deployment",
    summary: "Models under 10B parameters are closing the gap with massive LLMs for most practical tasks — and they run on a laptop. The deployment economics are compelling.",
    body: `The AI narrative of 2023 was scale — bigger models, more compute, higher benchmarks. 2024 shifted toward efficiency. Small Language Models (SLMs) under 10B parameters now handle the vast majority of real-world tasks at a fraction of the cost and latency.

**Microsoft Phi-3 Mini (3.8B)**
Achieves GPT-3.5-level performance at 3.8 billion parameters — a ~50× parameter reduction. The secret: exceptional training data curation. Microsoft used high-quality textbooks, educational content, and carefully filtered synthetic data rather than raw web crawl.

**Google Gemma 2 (9B)**
Gemma 2 at 9B outperforms Llama 2 70B on multiple benchmarks — 8× fewer parameters, better results. Google applied knowledge distillation from Gemini plus novel training techniques to compress capability.

**Meta Llama 3.2 (1B and 3B)**
Specifically designed for edge and mobile deployment. Runs in real-time on Qualcomm Snapdragon devices. Meta also released multimodal versions (11B and 90B) with vision capabilities for larger deployments.

**The Deployment Economics**
Running Phi-3-mini costs ~50× less than GPT-4 per token. On-device inference means zero network latency, complete data privacy, and offline operation. For most classification, summarisation, and Q&A tasks, the quality difference is negligible.

**Where Large Models Still Win**
SLMs struggle with complex multi-step reasoning, very long context (128K+ tokens), and genuinely novel problem formulation. For frontier tasks, large models maintain a significant advantage — but frontier tasks are a small fraction of most applications.`
  },
  {
    id: 4, subject: "AI & ML", tag: "ai", date: "Oct 2024", readTime: "7 min", likes: 912,
    title: "AI Agents in 2024: From Demos to Deployment — The Honest Reality",
    summary: "Every company is building AI agents. Most are failing in production. Here's what actually works, where agents break, and why the gap between demo and deployment is so wide.",
    body: `The AI agent hype cycle peaked in early 2024. The vision: autonomous systems that browse the web, write code, and complete multi-step tasks with minimal oversight. The reality: most production agent systems fail in predictable and frustrating ways.

**What an Agent Actually Is**
An AI agent is a system where a language model has access to tools (APIs, browsers, code execution) and decides which tools to use, when, and in what sequence. The model generates plans and executes them iteratively.

**Where Agents Work**
Coding assistants (GitHub Copilot Workspace, Cursor) succeed because the environment is well-defined and outputs are easy to verify. Data pipeline agents that query databases and generate reports also work well — bounded action spaces and deterministic results.

**The Reliability Math**
If each step in a task has 95% success probability and the task requires 20 steps: 0.95²⁰ = 36% overall success rate. Most real-world agent tasks have lower per-step reliability and more steps. This is the fundamental problem nobody in the demo videos shows you.

**Where Agents Fail**
Long-horizon tasks accumulate errors. Agents optimise for what you said, not what you meant — subtle prompt ambiguity causes dramatic divergence. Real-world interfaces (web UIs, APIs) change unexpectedly and agents don't handle novel states gracefully.

**The Path Forward**
The most successful 2024 agent deployments are "human-in-the-loop" — agents handle routine steps automatically but escalate at decision points. Full autonomy for complex tasks is a 2026+ problem. The gap between capability demos and reliable production systems remains the defining challenge.`
  },
  {
    id: 5, subject: "AI & ML", tag: "ai", date: "Sep 2024", readTime: "6 min", likes: 823,
    title: "The Open Source AI War: Llama 3.1, Mistral, and the Closed Model Gap",
    summary: "Open-source AI models have reached a point where they're genuinely competitive with closed models for most use cases. We break down the 2024 landscape honestly.",
    body: `The open-source AI ecosystem in 2024 matured dramatically. Meta's Llama series, Mistral AI's models, and hundreds of community fine-tunes have created a rich alternative to OpenAI and Google's APIs.

**Meta Llama 3.1 (July 2024)**
Llama 3.1 405B directly competes with GPT-4 on most benchmarks. The 8B and 70B variants are the most widely deployed open models. Training data: 15 trillion tokens, including multilingual content. Llama 3.1 also introduced the 128K context window across all sizes.

**Mistral's Approach: Efficient Architectures**
Mixtral 8×7B uses Sparse Mixture-of-Experts — only 2 of 8 expert layers activate per token. This gives 56B total parameters but only 14B active parameter cost, delivering strong performance at manageable inference cost.

**The Fine-Tuning Ecosystem**
The real power of open-source is fine-tuning on proprietary data. QLoRA enables fine-tuning a 70B model on a single A100 GPU. Organizations build specialised models without API dependency or data privacy concerns.

**Where Closed Models Still Win**
Frontier reasoning (o3, Claude 3.5 Sonnet), very long context (Gemini 1.5's 1M tokens), multimodal sophistication, and safety/reliability at scale. The gap is narrowing but not gone.

**The Licensing Landscape**
Llama's custom license allows commercial use but prohibits building competing foundation model services. Mistral (Apache 2.0) and Falcon (Apache 2.0) are truly open. License nuances matter for enterprise adoption.`
  },
  {
    id: 6, subject: "AI & ML", tag: "ai", date: "Aug 2024", readTime: "6 min", likes: 756,
    title: "Multimodal AI in 2024: GPT-4o, Gemini 1.5, and Native Cross-Modal Reasoning",
    summary: "2024 brought the first truly capable multimodal models — processing text, image, audio natively in a single architecture. Here's what changed and what's still broken.",
    body: `AI has historically been siloed: one model for images, another for text, another for audio. 2024 broke those silos. Natively multimodal models now process all modalities through a unified transformer, enabling genuine cross-modal reasoning.

**GPT-4o: Omni Architecture**
OpenAI's GPT-4o (May 2024) processes text, audio, and image in a single end-to-end model — not a pipeline of separate models. This eliminates latency from chaining (Whisper → GPT-4 → TTS) and allows reasoning across modalities simultaneously: describing the emotion in someone's voice while analysing their facial expression.

**Gemini 1.5 Pro: 1 Million Token Context**
Google's Gemini 1.5 Pro handles 1 million tokens — about 700,000 words or 1 hour of video. This enables analysing an entire codebase, searching through 1,000 documents, or processing a full feature film with natural language questions. The architecture uses Mixture-of-Experts (MoE) to maintain efficiency.

**What Actually Works in 2024**
Screenshot → working code (GPT-4o, Claude 3.5). Voice conversations with emotional nuance and interruption handling (GPT-4o real-time API). Video understanding with temporal reasoning (Gemini 1.5). Document parsing including handwriting, tables, and charts.

**What's Still Broken**
Counting objects in complex images (fails above ~10 items). Precise spatial reasoning (left/right in cluttered scenes). Consistent identity across video frames. Fine-grained text recognition in natural scene photographs — all remain stubbornly hard.`
  },

  /* ── DSA (5) ── */
  {
    id: 7, subject: "DSA", tag: "dsa", date: "Jan 2025", readTime: "6 min", likes: 1432,
    title: "Why Dynamic Programming Remains the #1 Interview Topic in 2025",
    summary: "Despite years of industry complaints, FAANG and tier-1 companies still lean heavily on DP. Here's why — and how the format is actually evolving.",
    body: `Dynamic Programming has been the most dreaded interview topic for a decade. In 2025, it remains central — but the context has shifted significantly toward understanding over memorisation.

**Why Companies Still Use DP**
DP tests a specific cognitive ability: recognising overlapping subproblems and optimal substructure in a novel problem you've never seen. This is genuinely harder to coach than pure memorisation, and research by Google and Meta shows DP performance correlates well with on-the-job performance on ambiguous system problems.

**The Most Common Patterns in 2025**
Linear DP (LIS, LCS, Coin Change), Grid DP (Unique Paths, Minimum Path Sum), Interval DP (Burst Balloons, Palindrome Partitioning), Tree DP (House Robber III), Bitmask DP (assignment problems), and Digit DP (count numbers with specific digit properties).

**The Format Shift**
2024–2025 saw more emphasis on explaining the recurrence relation and intuition before coding. Google interviewers now specifically ask: "Walk me through why this has optimal substructure." Getting the answer without explaining the why is no longer enough.

**Practice Recommendation**
Solve problems by pattern, not randomly. For each problem, write the recurrence relation before writing any code. Practice explaining your approach aloud — interviewers weigh communication as heavily as correctness. Neetcode's DP playlist organised by pattern is the current community favourite.

**The DP Mindset**
The shift that unlocks DP: stop thinking "what is the answer?" and start thinking "what decision do I make at each step, and what information do I need to make it optimally?" Every DP problem is a decision sequence with optimal substructure.`
  },
  {
    id: 8, subject: "DSA", tag: "dsa", date: "Dec 2024", readTime: "7 min", likes: 1124,
    title: "Binary Search Beyond Arrays: The Universal Monotonic Function Template",
    summary: "Binary search is not just for sorted arrays. Framing it as a search over a monotonic predicate unlocks solutions to problems that don't look like binary search at all.",
    body: `Most engineers know binary search for sorted arrays. The real power is using it as a general framework for any problem where you can evaluate a monotonic predicate — and the template transfers universally.

**The Core Insight**
Binary search answers: "Find the first position where a monotonic predicate becomes true." The predicate doesn't need to operate on an array — it can be a space of possible answers, a time axis, or any ordered parameter space.

**The Universal Template**
\`\`\`python
def binary_search(lo, hi):
    while lo < hi:
        mid = (lo + hi) // 2
        if predicate(mid):  # monotonic: once True, stays True
            hi = mid
        else:
            lo = mid + 1
    return lo  # first True position
\`\`\`

**Non-Array Applications**
Koko Eating Bananas (LC 875): Binary search on eating speed. Predicate: "can she finish all piles in H hours at speed k?" Aggressive Cows (Classic): Binary search on minimum distance between cows. Predicate: "can we place all cows with ≥D gap?" Minimize Max Distance to Gas Station: Binary search on the answer itself, not an array.

**The Interview Signal**
When you see "minimize the maximum" or "maximize the minimum" in a problem statement — that phrase is almost always a direct signal for binary search on the answer. Recognising this pattern instantly upgrades your solution from O(N²) brute force to O(N log N).

**Floating Point Binary Search**
For continuous domains (exact square root, equilibrium price), use a fixed number of iterations (50–100) instead of lo < hi, since you're narrowing a continuous interval rather than searching discrete positions.`
  },
  {
    id: 9, subject: "DSA", tag: "dsa", date: "Nov 2024", readTime: "6 min", likes: 1389,
    title: "Monotonic Stack: The Pattern Behind 15 LeetCode Problems",
    summary: "Monotonic stacks are an underrated pattern that solves an entire class of 'next greater/smaller element' problems. Master the pattern once and 15 problems become recognisable.",
    body: `The monotonic stack is a pattern experienced competitive programmers reach for instinctively — and that most interview candidates learn too late. Once you see it, you start recognising it everywhere.

**The Core Pattern**
A monotonic stack maintains elements in strictly increasing or decreasing order. When a new element violates the order, you pop elements until the order is restored. Each element is pushed and popped at most once — O(n) amortised.

**The Template**
\`\`\`python
stack = []  # stores indices
for i in range(n):
    while stack and condition(arr[stack[-1]], arr[i]):
        idx = stack.pop()
        # process the popped element — this is where the answer is computed
    stack.append(i)
\`\`\`
Condition: arr[stack[-1]] >= arr[i] for decreasing stack, <= for increasing.

**Problems That Use This Pattern**
Next Greater Element (trivial). Largest Rectangle in Histogram (LC 84) — maintain increasing stack, compute width when a smaller bar is found. Trapping Rain Water (LC 42) — decreasing stack, compute trapped water between bars. Daily Temperatures (LC 739) — next-greater with index tracking. Remove Duplicate Letters (LC 316) — monotonic with character frequency. Stock Span Problem — how many consecutive days was the price ≤ today.

**When to Reach For It**
Any problem involving "find the nearest X to the left/right" — where X is larger, smaller, or satisfies some property — is a monotonic stack candidate. The phrase "previous/next greater/smaller element" in the problem statement is a near-certain signal.`
  },
{
  id: 10,
  subject: "DSA",
  tag: "dsa",
  date: "Oct 2024",
  readTime: "6 min",
  likes: 892,
  title: "Graph Algorithms in Production: Where Theory Meets Real Systems",
  summary:
    "BFS, Dijkstra, and topological sort aren't just interview topics — they power Google Maps, npm dependency resolution, and LinkedIn's People You May Know. Here's the connection.",
  body: `Graph algorithms often feel abstract in interview prep. But they're embedded in some of the most critical production systems on the planet.

**Dijkstra → Google Maps and Uber**
Google Maps and Uber Eats routing use variants of Dijkstra and A* (with heuristic speedup). The graph: nodes are intersections, edges are roads weighted by travel time. At scale: the road network has billions of edges, traffic weights update in real time. Solution: Contraction Hierarchies precompute a hierarchical graph that reduces search space by 1000×.

**Topological Sort → Build Systems**
Gradle, Bazel, Make, and npm all use topological sort on a dependency DAG. When you run \`npm install\`, Kahn's algorithm (BFS-based toposort) determines installation order. Circular dependencies cause the "circular dependency detected" errors you've seen.

**BFS → Social Networks**
LinkedIn's "People You May Know," Facebook's friend suggestions, and Twitter's "Who to Follow" all use BFS-based reachability on social graphs. Facebook's graph has 3 billion nodes — BFS on the full graph is impossible, so they use distributed graph processing (GraphX) and approximate algorithms.

**Union-Find → Network Connectivity**
Kruskal's MST algorithm (used in network infrastructure design) uses Union-Find as its core data structure. Percolation problems (does a network stay connected if 30% of nodes fail?) use the same structure.

**The Interview Bridge**
When asked about Dijkstra, mention Contraction Hierarchies. When asked about BFS, mention social graph algorithms. This signals you understand algorithms as engineering tools, not just puzzle solutions — and that distinction matters to senior interviewers.`
},
  {
    id: 11, subject: "DSA", tag: "dsa", date: "Sep 2024", readTime: "7 min", likes: 743,
    title: "Segment Trees: The Data Structure Everyone Avoids but Needs",
    summary: "Segment trees appear in competitive programming and real systems alike. If you've been avoiding them, here's the complete picture: theory, implementation, and where they live in production.",
    body: `Segment trees are the data structure most engineers learn once, find intimidating, and avoid until they desperately need them. They're worth confronting directly.

**The Problem They Solve**
You have an array and need to: query aggregate information over a range (sum, min, max, GCD) in O(log n), AND update individual elements in O(log n). Prefix sums give O(1) queries but O(n) updates. Segment trees give O(log n) for both.

**The Structure**
A binary tree where each node stores an aggregate of its range. Root covers the full array. Leaves cover individual elements. Building takes O(n) time and O(4n) space.

**Lazy Propagation**
Range updates without lazy propagation are O(n log n). With lazy propagation — deferring updates to children until needed — they become O(log n). This is the key technique that makes segment trees practical for competitive programming.

**Where They Appear in Real Systems**
Database BRIN indexes use range aggregation similar to segment trees for time-series data. Game engine collision detection uses spatial range queries with segment tree structures. Sweep line algorithms for polygon intersection in computational geometry.

**Interview Appearance**
LeetCode Hard problems involving range queries with updates almost always have a segment tree or Binary Indexed Tree (BIT/Fenwick) solution. Problems: Count of Range Sum, Rectangle Area II, My Calendar series. Knowing both segment trees and BIT (simpler to implement but less general) gives you coverage of this entire problem class.`
  },

  /* ── System Design (5) ── */
  {
    id: 12, subject: "System Design", tag: "system", date: "Jan 2025", readTime: "9 min", likes: 2341,
    title: "How Netflix Handles 500 Million Hours of Streaming Daily",
    summary: "Netflix streams to 260M subscribers with <0.1% buffering. The architecture — from Open Connect CDN to chaos engineering — is a masterclass in distributed systems at scale.",
    body: `Netflix is one of the most studied distributed systems on the planet. At peak hours it accounts for 15% of all internet downstream traffic in North America. Here's what makes it work.

**The Open Connect CDN**
Netflix built their own CDN rather than rely on AWS CloudFront or Akamai. Open Connect Appliances (OCAs) are physically installed in ISP data centers globally. Content is pre-positioned on OCAs near users before anyone requests it — reducing latency from potentially 200ms+ to single-digit milliseconds.

**Adaptive Bitrate Streaming (ABR)**
Netflix encodes each title in 120+ quality levels (combinations of resolution + bitrate). The client player monitors bandwidth every few seconds and switches quality levels seamlessly. When your connection drops, quality degrades gracefully — no buffering. The algorithm is personalised per device and network type.

**The Recommendation Engine**
Netflix processes 500 billion events per day. Architecture: Apache Kafka for event streaming, Apache Spark for batch processing, custom ML models for ranking. 250+ simultaneous A/B experiments test every UI element and recommendation position continuously.

**Chaos Engineering**
Netflix pioneered Chaos Engineering — deliberately injecting failures into production to verify resilience. Chaos Monkey randomly terminates EC2 instances. Chaos Gorilla shuts down entire availability zones. The principle: if you don't test failure, you'll be surprised by it at the worst moment.

**Key Architectural Lessons**
Stateless services at every layer enable horizontal scaling with no session affinity. Pre-positioning data at the edge — rather than computing on demand — dramatically reduces origin load. And invest in observability: Netflix has more monitoring code than product code.`
  },
  {
    id: 13, subject: "System Design", tag: "system", date: "Dec 2024", readTime: "8 min", likes: 1654,
    title: "Designing a Rate Limiter: 5 Algorithms and Their Real Trade-offs",
    summary: "Rate limiting is one of the most common system design interview topics and one of the most misunderstood. Here's a rigorous walkthrough of every major algorithm.",
    body: `Rate limiting controls how frequently a client can make requests. It protects against DoS, prevents resource exhaustion, enables fair use, and enforces API pricing tiers. Every production API uses some form of it.

**Token Bucket**
A bucket holds N tokens. Tokens refill at rate R/second. Each request consumes one token. If empty, request is rejected or queued. Allows bursting up to N requests — ideal for APIs where occasional spikes are acceptable.

**Leaky Bucket**
Requests enter a FIFO queue and exit at a fixed rate regardless of input rate. Excess requests drop. Produces a perfectly smooth output rate but doesn't handle legitimate bursts gracefully — spikes get throttled identically to attacks.

**Fixed Window Counter**
Divide time into fixed windows (1-minute buckets). Count requests per window. Simple, low memory. The boundary problem: 100 requests at 11:59:59 + 100 at 12:00:01 = 200 requests in 2 seconds, both within separate windows but violating the spirit of the limit.

**Sliding Window Log**
Store timestamps of all requests. For each new request, count timestamps in the last window. Perfectly smooth — no boundary problem. Impractical at scale: O(requests) memory per user.

**Sliding Window Counter (Best Practical Choice)**
Hybrid: use two fixed windows. Calculate: limit × (% remaining in previous window) + current window count. O(1) memory, approximately smooth, no boundary spike. Stripe, Cloudflare, and GitHub use Redis-based implementations of this pattern.

**Distributed Rate Limiting**
If your API runs on 100 servers and the limit is 100 req/min per user, each server can't independently count — they'd collectively allow 10,000. Solution: centralised Redis store with atomic operations (INCR + EXPIRE).`
  },
  {
    id: 14, subject: "System Design", tag: "system", date: "Nov 2024", readTime: "8 min", likes: 2156,
    title: "Designing Twitter's Timeline: Fan-Out Trade-offs at Scale",
    summary: "Twitter's timeline is one of the most famous system design problems. The naive approaches collapse at scale — and the solutions reveal deep insights about how real social networks work.",
    body: `The Twitter timeline design problem appears in nearly every senior engineering interview at social companies. It's a perfect case study in how scale forces counterintuitive architectural decisions.

**The Problem**
A user has 100 million followers. They tweet. All 100 million followers' timelines must show that tweet. How do you make this work efficiently?

**Approach 1: Fan-Out-on-Read (Pull Model)**
When a user loads their timeline, query all accounts they follow, fetch recent tweets, merge and sort. Problem: if you follow 500 accounts, that's 500 database queries per timeline load. At 10M loads/hour = 5 billion queries/hour. Completely infeasible.

**Approach 2: Fan-Out-on-Write (Push Model)**
When a user tweets, push the tweet ID to all followers' timeline caches immediately (async). Pros: timeline reads are O(1) from cache. Cons: Lady Gaga (50M followers) tweeting causes 50M cache write operations — the celebrity problem.

**Twitter's Hybrid Solution**
Regular users: fan-out-on-write. Tweets are pushed to followers' precomputed timeline caches. Celebrities (high follower count): fan-out-on-read. Their tweets are excluded from the push step. Timeline computation merges precomputed cache (regular follows) + real-time pull (celebrity follows).

**The Read Path**
Fetch precomputed timeline from Redis (~150 tweet IDs) → identify celebrity follows → pull recent celebrity tweets → merge and sort → hydrate tweet IDs into full tweet objects from the tweet store. This keeps read latency under 50ms even at full scale.

**The 80/20 Insight**
80% of Twitter reads come from users following mostly non-celebrities. The hybrid optimises for the common case while handling the edge case correctly — the most important principle in performance engineering.`
  },
  {
    id: 15, subject: "System Design", tag: "system", date: "Oct 2024", readTime: "7 min", likes: 1876,
    title: "Database Indexing: The Difference Between 2ms and 2 Seconds",
    summary: "A missing or wrong index is the most common cause of production database performance issues. Here's the complete mental model you need in 2024.",
    body: `Every production database performance crisis traces back to one of three causes: missing indexes, wrong indexes, or too many indexes. Understanding the internals helps you make the right call every time.

**B-Tree Index: The Default**
PostgreSQL, MySQL, and most RDBMS use B-Tree indexes. A balanced tree where leaf nodes hold data pointers. Lookups, range queries, and sorts are O(log N). This is the right default for most situations.

**The Write Overhead Reality**
Every index adds cost to INSERT, UPDATE, and DELETE — the index must be updated for each write. A table with 10 indexes pays 10× write overhead. Production databases with hundreds of indexes on write-heavy tables are a common anti-pattern that's painful to fix.

**Composite Index Column Order**
Index (A, B, C) supports queries on: A alone, A+B, A+B+C. It does NOT efficiently support: B alone, C alone, or B+C. The leftmost prefix rule is the single most frequently violated index design principle. Column order must match your most common query patterns.

**Covering Index**
An index that contains ALL columns needed for a query. The database never reads the actual row — the index itself provides everything. For \`SELECT name, email FROM users WHERE city='NYC'\`, an index on (city, name, email) is covering and dramatically faster.

**Partial Index**
Index only rows matching a condition. E.g., index on (status) WHERE status='pending'. If 95% of rows are 'completed', a partial index is 20× smaller and faster. This is one of the most underused PostgreSQL features in production.

**EXPLAIN ANALYZE Is Your Best Friend**
Never guess about index usage. EXPLAIN ANALYZE shows exactly what happened: which indexes were used, estimated vs actual row counts, and time at each step. The most important field: if estimated rows = 10 but actual = 100,000, your statistics need updating — run ANALYZE.`
  },
  {
    id: 16, subject: "System Design", tag: "system", date: "Sep 2024", readTime: "8 min", likes: 1987,
    title: "Microservices vs Monolith in 2025: The Honest Answer",
    summary: "After years of microservices hype, Prime Video and Basecamp returned to monoliths. The pendulum has swung — here's the nuanced, real answer.",
    body: `Microservices were positioned as the solution to every software architecture problem from 2015–2020. In 2024–2025, the conversation has matured. The question is no longer ideology but: which problems justify microservices' operational complexity?

**The Real Costs of Microservices**
Distributed systems complexity becomes your problem — network failures, partial failures, and latency add up. Each service needs CI/CD, monitoring, alerting, and on-call rotation. No ACID transactions across services means compensating transactions, sagas, and eventual consistency. Local development with 50 services running simultaneously is genuinely painful.

**Amazon Prime Video's 2023 Case Study**
Prime Video moved a video monitoring service from microservices back to a monolith, reducing infrastructure costs by 90% and improving latency. The service had high coordination overhead between its microservice components — a clear sign it was better suited for in-process function calls.

**The Modular Monolith**
The pragmatic middle ground: a single deployable unit with clear internal module boundaries. Start here. Extract microservices only when: a specific component has dramatically different scaling needs, independent deployment is truly necessary, or team boundaries genuinely demand it.

**When Microservices Are Actually Justified**
Different technology stacks per service. Dramatically different scaling requirements (auth vs ML inference). Team autonomy at genuine org scale (100+ engineers). Independent release cycles that would otherwise cause release train bottlenecks.

**The Decision Framework**
Start with a monolith. Extract services when the team can no longer safely deploy together, a component needs to scale independently, or team ownership genuinely demands independence. This is the order — not the reverse.`
  },

  /* ── Computer Networks (5) ── */
  {
    id: 17, subject: "Networks", tag: "networks", date: "Jan 2025", readTime: "8 min", likes: 1234,
    title: "How QUIC Is Replacing TCP: HTTP/3 and What Changed",
    summary: "QUIC, now standardised as HTTP/3, solves TCP's fundamental limitations. Adoption has reached 25% of web traffic — here's the technical deep dive.",
    body: `TCP has been the backbone of internet communication since 1974. QUIC throws out TCP entirely and rebuilds from UDP, fixing problems that have accumulated over 50 years.

**TCP's Core Problems**
Head-of-line blocking: In HTTP/2, multiple streams share one TCP connection. If one packet is lost, ALL streams stall waiting for retransmission — even if they don't need that packet. This is fundamental TCP behaviour; you cannot fix it at the HTTP layer.

Slow connection establishment: TCP's 3-way handshake requires 1.5 RTT. TLS adds another 1–2 RTTs. Total: 2–3 RTTs before the first byte of application data arrives. For mobile users with 50–100ms RTT, this is 200–300ms of pure overhead just for setup.

**How QUIC Solves This**
0-RTT connection establishment: QUIC combines transport and cryptographic handshakes. New connection to a known server: 1 RTT. Resumed connection: 0 RTT — data in the first packet.

Independent streams: Each stream has its own flow control and loss recovery. A lost packet on stream 3 does not block stream 7. True multiplexing at the transport layer.

Connection migration: QUIC connections are identified by a Connection ID, not IP+port. When you switch from WiFi to cellular, the QUIC connection migrates seamlessly — no reconnection, no latency spike.

Encrypted by default: QUIC uses TLS 1.3 internally. No unencrypted mode exists. Middleboxes cannot inspect QUIC traffic — by design.

**Adoption in 2025**
Over 25% of global web traffic is HTTP/3 (QUIC). Google, Meta, Cloudflare, and Fastly have deployed it. Chrome has QUIC enabled by default. The remaining challenge: some enterprise networks block UDP, causing fallback to HTTP/2.`
  },
  {
    id: 18, subject: "Networks", tag: "networks", date: "Dec 2024", readTime: "7 min", likes: 1087,
    title: "DNS Deep Dive: From Browser URL to Server in 13 Steps",
    summary: "DNS is the internet's phone book — but the resolution process involves complex caching, delegation chains, and security mechanisms most engineers never fully learn.",
    body: `Most engineers understand DNS as "converts domain to IP." The full resolution process is significantly richer and understanding it matters for debugging production issues.

**The Complete Resolution Chain**
Browser checks its own DNS cache → OS checks hosts file (/etc/hosts) → OS checks resolver cache → OS sends query to configured DNS resolver (your router or ISP) → Resolver checks its cache → If miss: resolver queries a Root Name Server → Root returns NS records for the TLD (.com) → Resolver queries the TLD server → TLD returns NS for the specific domain → Resolver queries the authoritative name server → Authoritative server returns the A record (IP address) → Resolver caches with TTL → Returns IP to browser.

**TTL: The Caching Variable**
Low TTL (60s): changes propagate quickly, high resolver load. High TTL (86400s = 1 day): propagation takes up to 24 hours, but 99%+ of requests are cache hits. Most engineers set TTL too high before migrations and pay for it.

**DNSSEC**
Traditional DNS responses are unauthenticated — a malicious resolver can return any IP. DNSSEC adds cryptographic signatures. Resolvers verify signatures before accepting results. Adoption is growing but still far from universal.

**DNS over HTTPS (DoH)**
Traditional DNS queries are unencrypted — your ISP sees every domain you visit. DoH encrypts DNS queries using HTTPS on port 443. Firefox defaults to DoH via Cloudflare (1.1.1.1). Chrome supports it. The trade-off: centralises DNS traffic to a few large resolvers.

**Why Cloudflare 1.1.1.1 Is Fast**
Cloudflare operates on anycast — the same IP (1.1.1.1) routes to the nearest PoP. With 300+ PoPs globally, average resolution is 11ms vs 40–100ms for typical ISP resolvers. The caching hit rate across Cloudflare's massive user base also means far fewer upstream queries.`
  },
  {
    id: 19, subject: "Networks", tag: "networks", date: "Nov 2024", readTime: "7 min", likes: 1156,
    title: "How CDNs Actually Work: Anycast, Edge Caching, and Origin Shielding",
    summary: "CDN seems simple — cache content near users. The actual mechanisms involve anycast routing, TLS termination at the edge, and sophisticated origin shielding architectures.",
    body: `Cloudflare handles 20% of global web traffic. Akamai delivers 30% of internet traffic. CDNs are everywhere — yet most engineers have only a surface-level understanding of how they actually work.

**Anycast Routing: The Core Mechanism**
CDNs advertise the same IP address from multiple geographic locations simultaneously via BGP anycast. When your request goes to Cloudflare's IP, your router automatically routes to the nearest PoP based on BGP path selection — no DNS round-trip, no app logic needed. You get the geographically closest server automatically.

**TLS Termination at the Edge**
Without a CDN, TLS handshake latency = distance to your origin server (potentially 200ms for cross-continental connections). With a CDN, TLS terminates at the nearest edge PoP (typically 5–20ms away). The CDN maintains a persistent, already-warmed TLS connection to your origin and reuses it across thousands of client requests.

**Cache Hit Logic**
CDN caches based on your Cache-Control headers. \`Cache-Control: public, max-age=86400\` allows 24-hour caching. \`Vary: Accept-Encoding\` creates separate cache entries for gzip and Brotli responses. The most common mistake: forgetting to set proper cache headers on static assets, forcing every request to hit origin.

**Origin Shield**
Without origin shield: 300 edge PoPs all simultaneously miss cache and hammer your origin. With origin shield: cache misses from all PoPs in a region route through one designated shield PoP before reaching origin. A single cache miss on your origin becomes hundreds of cache hits at the shield — one origin request serves an entire region.

**Edge Computing**
Cloudflare Workers, Lambda@Edge, and Fastly Compute@Edge execute code at the CDN edge. Latency: ~1ms (no cold start). Use cases: A/B testing, authentication, personalisation, request routing — all without touching your origin server.`
  },
  {
    id: 20, subject: "Networks", tag: "networks", date: "Oct 2024", readTime: "7 min", likes: 1087,
    title: "WebSockets vs SSE vs Long Polling: Choosing Real-Time Communication",
    summary: "Three ways to push data from server to client. Each has different complexity, browser support, and operational characteristics. Here's the decision framework.",
    body: `When browsers need server-initiated updates — chat messages, notifications, live prices — there are three primary techniques. The right choice depends on update pattern, scale, and infrastructure.

**Long Polling: The HTTP Workaround**
Client sends a request. Server holds it open until data is ready or timeout (~30s). When data arrives, server responds and client immediately re-requests. Works everywhere, uses standard HTTP infrastructure. Cons: one persistent connection per client, HTTP header overhead per message, and any proxy with a short timeout breaks it.

**Server-Sent Events (SSE): Unidirectional Streams**
HTTP response with \`Content-Type: text/event-stream\`. Server pushes events as chunks. Browser uses the EventSource API. Automatic reconnection built in. Works over standard HTTP/2 (solving the 6-connection-per-domain limit of HTTP/1.1). Use when you only need server → client data: dashboards, notification feeds, live logs, AI streaming responses.

**WebSockets: Full Duplex**
HTTP Upgrade establishes a persistent TCP connection. Both sides send frames at any time. Sub-millisecond latency after setup. 2-byte frame header vs HTTP headers. Use for: chat, collaborative editing, online gaming, trading platforms — anything requiring bidirectional real-time communication.

**The Operational Difference**
SSE works transparently with existing load balancers and proxies. WebSockets require WebSocket-aware load balancers, sticky sessions or stateful routing, and custom reconnection logic on the client. The operational simplicity of SSE is often undervalued.

**2024 Reality**
Most "real-time" features are actually server → client only (notifications, live counts, streaming AI text). SSE handles these perfectly with far less operational complexity than WebSockets. Use WebSockets only when bidirectional communication is genuinely needed.`
  },
  {
    id: 21, subject: "Networks", tag: "networks", date: "Sep 2024", readTime: "7 min", likes: 934,
    title: "How BGP Works — and Why the Internet Is More Fragile Than You Think",
    summary: "BGP stitches the internet together. It's also 35 years old, was designed for trust over correctness, and is why Facebook went down for 6 hours in 2021.",
    body: `BGP (Border Gateway Protocol) connects the ~70,000 autonomous systems (AS) that make up the internet. It's remarkably old, fundamentally trust-based, and yet runs critical global infrastructure.

**What BGP Does**
Each ISP, cloud provider, and large network operates as an AS with a unique ASN. BGP is how ASes announce: "I can reach these IP prefixes." The global routing table contains ~900,000 prefix entries. Every router on the internet uses BGP to determine where to send traffic next.

**How Facebook Went Down (October 2021)**
A routine BGP configuration update accidentally withdrew all of Facebook's routes from the global BGP table. Suddenly, no router anywhere knew how to reach Facebook's IP addresses. DNS queries timed out. Engineers couldn't access internal tools (also on Facebook infrastructure) to fix it remotely. The outage lasted ~6 hours and cost an estimated $60M in lost revenue.

**BGP Hijacking**
BGP accepts route announcements from peers without cryptographic verification. In 2018, an ISP accidentally announced being the best path to Google's IPs. Traffic briefly routed through Nigeria and China Telecom before reaching Google. This type of "hijack" happens multiple times per year globally.

**RPKI: The Partial Fix**
Resource Public Key Infrastructure adds cryptographic origin validation to BGP. Route Origin Authorizations (ROAs) cryptographically sign which ASN can announce which prefixes. Adoption is ~50% of global prefixes as of 2024. Cloudflare, Akamai, and major cloud providers have deployed RPKI — when universal coverage is reached, most hijack scenarios become detectable and rejectable within minutes.`
  },

  /* ── DBMS (5) ── */
  {
    id: 22, subject: "DBMS", tag: "dbms", date: "Jan 2025", readTime: "7 min", likes: 1654,
    title: "PostgreSQL in 2025: The Database That's Eating Everything",
    summary: "PostgreSQL has displaced MySQL, challenged MongoDB with JSONB, threatened Pinecone with pgvector, and challenged Elasticsearch with full-text search. Here's how it became the default.",
    body: `PostgreSQL's rise over the past five years has been remarkable. Its extensibility has allowed it to compete in domains previously dominated by dedicated solutions — often winning on the grounds of operational simplicity and ACID guarantees.

**JSONB: The Document Database Inside PostgreSQL**
JSONB stores JSON data efficiently with indexing support. GIN indexes on JSONB columns enable queries like: "find all rows where JSON field 'tags' contains 'backend'" — directly inside PostgreSQL. Benchmark: JSONB queries with GIN indexes are 3–10× faster than MongoDB for most document retrieval patterns, with the added benefit of full ACID transactions.

**pgvector: Challenging Pinecone**
The pgvector extension adds vector similarity search with HNSW and IVFFlat indexes. For AI applications needing semantic search, this replaces dedicated vector databases like Pinecone for datasets under ~1M vectors. Simpler operations, one less database, full transactional guarantees.

**Full-Text Search**
Built-in tsvector/tsquery with GIN indexes replaces Elasticsearch for many applications. What's missing: advanced relevance tuning, complex query DSL, and distributed horizontal scaling for very large corpora.

**Extensions as the Real Power**
TimescaleDB (time-series), PostGIS (geospatial), Citus (horizontal sharding), pg_partman (automated partitioning), and pg_cron (scheduled jobs) make PostgreSQL a platform. Each extension adds a specialised database's capabilities without a separate operational burden.

**What PostgreSQL Still Can't Do Well**
High-write horizontal scaling without Citus. Sub-millisecond latency at extreme scale. Multi-model workloads mixing graph, document, and wide-column access patterns. But for the vast majority of applications, it's the right default — and increasingly, the right final answer.`
  },
  {
    id: 23, subject: "DBMS", tag: "dbms", date: "Dec 2024", readTime: "7 min", likes: 1423,
    title: "ACID vs BASE: The Transaction Model Decision That Matters Most",
    summary: "ACID and BASE are the two fundamental database transaction models. Understanding them deeply — not just the acronyms — determines whether you pick the right database for each use case.",
    body: `ACID and BASE are frequently name-dropped but rarely understood in depth. The choice between them has real consequences — picking wrong means either data corruption or unnecessary operational complexity.

**ACID: The Relational Guarantee**
Atomicity: A transaction is all-or-nothing. Transfer ₹1000 from A to B: both the debit and credit happen, or neither does. No partial transactions — ever.

Consistency: A transaction brings the database from one valid state to another. Foreign keys, check constraints, and unique indexes are enforced at every commit.

Isolation: Concurrent transactions don't see each other's intermediate state. Isolation levels trade anomaly prevention for throughput: READ COMMITTED (PostgreSQL default, sees only committed data) vs SERIALIZABLE (transactions appear sequential, 30-40% throughput reduction).

Durability: Once committed, data survives crashes. PostgreSQL's WAL (Write-Ahead Log) ensures this — the log is written to disk before the transaction is acknowledged.

**BASE: The NoSQL Trade-off**
Basically Available: The system responds even during partial failures, possibly with stale data. Soft State: System state may change over time due to replication convergence. Eventually Consistent: Given time without new updates, all replicas converge to the same value.

**The Decision Framework**
ACID for: financial transactions, inventory counts, any domain where correctness is non-negotiable. BASE for: social media like counts, view counts, shopping carts, cached data — where availability matters more than immediate precision.

The critical insight: many engineers choose BASE databases because they're "more scalable" without honestly evaluating whether their data model actually requires eventual consistency. PostgreSQL at scale handles far more than most teams will ever need.`
  },
  {
    id: 24, subject: "DBMS", tag: "dbms", date: "Nov 2024", readTime: "7 min", likes: 1365,
    title: "Vector Databases Explained: The Architecture Behind AI Memory",
    summary: "Vector databases store and search high-dimensional embeddings — the backbone of semantic search, RAG, and recommendation systems. Here's how they work and when you need one.",
    body: `The AI application boom created an entire new database category: vector databases. They store and efficiently search high-dimensional vectors (embeddings), enabling semantic search and AI memory systems.

**What Is a Vector Embedding?**
ML models represent concepts as high-dimensional vectors. OpenAI's text-embedding-3-small produces 1,536-dimensional vectors. Two semantically similar texts have vectors that are close in this high-dimensional space (high cosine similarity). This enables semantic search: "find documents similar in meaning" even when they share no keywords.

**The Core Operation: Approximate Nearest Neighbor (ANN)**
Given a query vector, find the K most similar vectors among N total. Exact search: O(N×D) — too slow for 10M+ vectors at 1,536 dimensions. ANN trades exactness for speed using:

HNSW (Hierarchical Navigable Small World): Graph-based index. Navigate hierarchical layers from coarse to fine. O(log N) query time. Used by pgvector, Weaviate, Milvus. Best accuracy/speed trade-off.

IVFFlat: Cluster vectors into k-means cells. Search only nearby cells. Faster training, less accurate than HNSW.

**pgvector vs Dedicated Vector DB**
Under 1M vectors with simple use cases: pgvector in PostgreSQL is sufficient and operationally simpler. Over 10M vectors with complex metadata filtering or high QPS: dedicated vector databases (Pinecone, Qdrant, Weaviate) provide better performance. The crossover point is roughly 1–5M vectors.

**The RAG Architecture**
Retrieval-Augmented Generation uses a vector database as the "memory" for an LLM: embed documents → store in vector DB → at query time, embed the question → retrieve top-K semantically similar documents → pass to LLM as context. This enables LLMs to answer questions about your private data without fine-tuning.`
  },
  {
    id: 25, subject: "DBMS", tag: "dbms", date: "Oct 2024", readTime: "7 min", likes: 1187,
    title: "Database Normalisation vs Denormalisation: When Each Is Right",
    summary: "Textbooks teach normalisation as correct. Production databases denormalise aggressively. The truth involves understanding read/write ratios and acceptable consistency trade-offs.",
    body: `Database design courses teach normalisation as the one right approach. Production databases at scale often look nothing like what you learned. Understanding when each is appropriate separates architects from users.

**Normal Forms in Brief**
1NF: Atomic values per cell. 2NF: No partial dependencies on composite keys. 3NF: No transitive dependencies — non-key attributes depend only on the key. BCNF: Every determinant is a candidate key.

**The Case for Denormalisation**
Normalised schemas require JOINs. JOINs are expensive at scale. If you query users with their orders and order items 10,000 times per second, join overhead becomes the bottleneck. Denormalisation trades write complexity for read performance.

Storing \`order_total\` on the order row (instead of computing SUM of order_items each time) is the canonical example. Every update to order_items must update order too — but reads become 10× faster. For read-heavy workloads (>90% reads), this trade-off is almost always worth it.

**Read/Write Ratio: The Deciding Variable**
Read-heavy: aggressive denormalisation justified. Materialise computed columns, duplicate data to avoid joins. Write-heavy: normalise. Denormalisation's update cascades become expensive and complex to keep consistent.

**Materialised Views: The Middle Ground**
PostgreSQL materialised views compute and store query results. \`REFRESH MATERIALIZED VIEW CONCURRENTLY\` updates without locking reads. This gives you read performance without duplicating application-level update logic.

**Event Sourcing as Extreme Normalisation**
Store every change as an immutable event. Derive current state by replaying events. The event log is normalised (append-only truth). The read model is aggressively denormalised (derived for specific queries). CQRS applies this distinction at the architecture level.`
  },
  {
    id: 26, subject: "DBMS", tag: "dbms", date: "Sep 2024", readTime: "7 min", likes: 1098,
    title: "NoSQL Selection Guide: When Cassandra, MongoDB, Redis, and DynamoDB Each Win",
    summary: "The NoSQL landscape spans fundamentally different data models. Choosing the wrong one is a painful migration. Here's the decision framework used at scale.",
    body: `"Use a NoSQL database" is meaninglessly vague advice. Cassandra, MongoDB, Redis, and DynamoDB have different data models, consistency guarantees, and optimal use cases. Choosing wrong means a multi-month migration later.

**Redis: In-Memory Data Structures**
Not a general-purpose database — an in-memory key-value store with rich data structures (strings, hashes, lists, sets, sorted sets, streams). Data must fit in RAM. Use for: session storage, caching, rate limiting, pub/sub, leaderboards, distributed locks. Never as primary data store unless data genuinely fits in RAM and loss is acceptable.

**MongoDB: The Document Database**
Stores JSON-like documents with flexible schemas. Good fit when data is naturally document-shaped (e.g., product catalog with varying attributes) and access patterns are by document ID or simple field queries. Struggles with: complex joins, ACID across documents, and exact text search.

**Cassandra: Write-Heavy Scale**
Wide-column store optimised for write-heavy workloads distributed across many nodes. Model around your query patterns, not normalisation — tables are designed specifically for each query. Use for: time-series, IoT sensor data, activity feeds, any workload needing linear write scaling. Netflix, Apple, and Instagram use Cassandra for exactly this.

**DynamoDB: AWS-Native Serverless NoSQL**
Fully managed, serverless, single-digit millisecond latency. Data model: partition key + optional sort key. Anything else requires Global Secondary Indexes. Critical: your access patterns must fit PK/SK lookups. If they don't, DynamoDB is the wrong choice — and this mistake is very common and very expensive to fix.`
  },

  /* ── Cloud & DevOps (4) ── */
  {
    id: 27, subject: "Cloud & DevOps", tag: "cloud", date: "Jan 2025", readTime: "7 min", likes: 1543,
    title: "Kubernetes in 2025: What's Worth Learning vs What's Abstracted Away",
    summary: "Kubernetes is vast. Most engineers never interact with 70% of it. Here's a prioritised guide to what actually matters for different roles.",
    body: `Kubernetes has become the dominant container orchestration platform. It's also infamous for complexity. In 2025, much of the low-level operational work is abstracted by managed services (EKS, GKE, AKS) — but certain concepts are unavoidable regardless of your role.

**What Everyone Using Kubernetes Needs to Know**
Pods, Deployments, Services, ConfigMaps, Secrets. How CPU requests/limits work (throttling vs OOM kills — very different failure modes). How readiness and liveness probes affect traffic and restart behaviour. How HPA (Horizontal Pod Autoscaler) triggers and what metrics it uses.

**What Application Engineers Need**
Kubernetes networking at a conceptual level: how a request flows from Ingress → Service → Pod. How DNS works within a cluster (CoreDNS, \`service.namespace.svc.cluster.local\`). How PersistentVolumeClaims work for stateful applications. Basic \`kubectl\` for debugging: logs, exec, describe, port-forward.

**What Only Platform/SRE Teams Need**
RBAC configuration, admission webhooks, CRDs (Custom Resource Definitions), cluster autoscaler tuning, etcd operations, certificate management, network policy deep-dive. Most application engineers will never touch these — and shouldn't.

**What's New in 2025**
Gateway API replacing Ingress for more expressive routing rules. Sidecar containers as first-class citizens (previously required init container hacks). WebAssembly (Wasm) as an alternative runtime for cold-start sensitive workloads — seconds faster than container startup.

**The Platform Engineering Shift**
Teams are building Internal Developer Platforms (IDPs) using Backstage (service catalog), Crossplane (infrastructure via K8s CRDs), and ArgoCD (GitOps). The goal: developers interact with higher-level abstractions and never write raw Kubernetes YAML. This trend is accelerating — learning the platform layer is high value for 2025.`
  },
  {
    id: 28, subject: "Cloud & DevOps", tag: "cloud", date: "Dec 2024", readTime: "7 min", likes: 1234,
    title: "Observability in 2024: Metrics, Logs, and Traces — Why You Need All Three",
    summary: "Most teams have one or two of the three observability pillars and wonder why debugging is still hard. Here's why all three are necessary and how they work together.",
    body: `Observability is the ability to understand a system's internal state from its external outputs. The three pillars — metrics, logs, and traces — each answer fundamentally different questions. Missing one leaves critical blind spots.

**Metrics: What Is Happening at Scale**
Metrics are numerical measurements aggregated over time: request rate, error rate, latency percentiles (p50/p95/p99), CPU and memory utilisation. Prometheus scrapes from application /metrics endpoints. Grafana visualises. Alertmanager fires when thresholds are crossed.

What metrics answer: Is my system healthy? Is latency trending up? What's the current error rate?
What metrics can't answer: Which specific request failed? Which user was affected? What was the actual error?

**Logs: What Happened Specifically**
Logs are discrete events with context: timestamps, request IDs, user IDs, stack traces. Structured JSON logging makes logs queryable. Centralised logging (ELK, Loki, Datadog) aggregates from all pods.

What logs answer: What specific error occurred? What was the full stack trace? What did the user request?
What logs can't answer: How does this error correlate with the latency spike? Where in the request flow did this fail?

**Traces: How It Happened Across Services**
Distributed tracing follows a request through multiple services. Each service creates a span; spans form a tree. OpenTelemetry is the standard instrumentation library. Jaeger, Tempo, and Datadog store and visualise traces.

What traces answer: Which service added the most latency? Where exactly did this specific request fail across 12 microservices?

**The Correlation Principle**
An alert fires (metrics) → you find relevant logs (logs) → you trace the specific request through the system (traces). Without all three, at least one debugging scenario will be completely blind. All three together create genuine observability.`
  },
  {
    id: 29, subject: "Cloud & DevOps", tag: "cloud", date: "Nov 2024", readTime: "8 min", likes: 1367,
    title: "Zero Trust Security: From Philosophy to Practical Implementation",
    summary: "Zero Trust assumes breach from day one — no implicit trust based on network location. Here's how to implement it practically, not just philosophically.",
    body: `Zero Trust is a security model based on "never trust, always verify." Unlike traditional perimeter security (inside firewall = trusted), Zero Trust applies rigorous verification to every request regardless of where it originates.

**Why Traditional Perimeter Security Fails**
The traditional model assumes inside the firewall is safe. Problems: lateral movement (attackers with access can move freely), cloud computing (no clear perimeter), remote work (employees outside the perimeter), insider threats. The 2020 SolarWinds attack was the definitive perimeter failure — attackers in the build pipeline spread across hundreds of "trusted" networks.

**Zero Trust Principles**
Verify explicitly: authenticate and authorise every request using identity, device health, location, and behavioural signals. Use least privilege: limit access with just-in-time, just-enough-access. No standing admin privileges. Assume breach: design with attackers already inside — encrypt everything, monitor everything, limit blast radius.

**Identity Layer**
Okta/Azure AD with MFA for users. mTLS certificates for service-to-service communication via service mesh (Istio, Linkerd). SPIFFE/SPIRE for workload identity in Kubernetes — every pod gets a cryptographic identity at startup.

**Network Layer**
Micro-segmentation: services communicate only with explicitly allowed destinations. Kubernetes NetworkPolicies. AWS Security Groups as allow-lists, not deny-lists. The "trusted internal network" concept is abolished entirely.

**Application Layer**
API gateways enforce authentication on every request. PAM (Privileged Access Management) for admin access with session recording. No direct database access from developer laptops — all access through audited jump hosts.

**Google's BeyondCorp**
Google moved its entire corporate network to Zero Trust after the 2010 Aurora attacks. Employees work from "untrusted" networks — all security is at the application level. Their published BeyondCorp papers are the canonical reference implementation.`
  },
  {
    id: 30, subject: "Cloud & DevOps", tag: "cloud", date: "Oct 2024", readTime: "7 min", likes: 1098,
    title: "FinOps: Cutting Cloud Bills by 40% Without Sacrificing Performance",
    summary: "Cloud bills are growing faster than most companies expect. FinOps — applying financial accountability to cloud spending — can dramatically reduce waste without impacting users.",
    body: `Cloud computing promised predictable operational costs. For many companies it delivered the opposite: rapidly growing monthly bills with poor visibility. FinOps fixes this by applying engineering rigour to cloud financial management.

**The Hidden Cost Drivers**
Data transfer charges are the most commonly missed: AWS charges $0.09/GB for data leaving a region, $0.01/GB cross-AZ. A system with frequent cross-region calls or large external payloads accumulates surprising charges. Idle resources — EC2 at 5% CPU, barely-queried RDS instances, over-provisioned Elasticsearch — account for ~35% of cloud spend in most organisations.

**The FinOps Toolkit**
Reserved Instances / Savings Plans: Commit to 1 or 3 years, save 30–70% vs on-demand. For stable baseline workloads, this is the single highest-ROI action available. AWS Savings Plans are more flexible than RIs — apply to any EC2 usage.

Spot Instances: Up to 90% discount for interruptible workloads. Ideal for CI/CD runners, batch processing, stateless services with graceful interruption handling (using Spot interruption notices with 2-minute warning).

Right-sizing: AWS Compute Optimizer analyses CloudWatch utilisation and recommends instance size changes. Teams consistently find 30–50% of instances are over-provisioned by at least one size.

S3 Intelligent-Tiering: Automatically moves infrequently accessed objects to cheaper storage classes. For a 100TB bucket with mixed access patterns, this typically saves 50–70% on storage costs with zero application changes.

**The Cultural Barrier**
Engineers don't see cloud bills; finance doesn't understand cloud. FinOps bridges this gap: resource tagging by team/product, showback reports (here's what your team spent), and including cloud efficiency in engineering KPIs. The technology is the easy part — the organisational change is what takes work.`
  },
];

/* ═══════════════════════════════════════════════
   SUBJECTS CONFIG
═══════════════════════════════════════════════ */
const SUBJECTS = [
  { id: "all",      label: "All Articles", icon: "ri-apps-line" },
  { id: "ai",       label: "AI & ML",      icon: "ri-brain-line",             color: "#e07a5f" },
  { id: "dsa",      label: "DSA",          icon: "ri-code-box-line",          color: "#81b29a" },
  { id: "system",   label: "System Design",icon: "ri-layout-masonry-line",    color: "#a09bc9" },
  { id: "networks", label: "Networks",     icon: "ri-global-line",            color: "#5fb8c8" },
  { id: "dbms",     label: "DBMS",         icon: "ri-database-2-line",        color: "#c9a96e" },
  { id: "cloud",    label: "Cloud & DevOps",icon:"ri-cloud-line",             color: "#b07fd4" },
];

const TAG_COLOR = {
  ai: "#e07a5f", dsa: "#81b29a", system: "#a09bc9",
  networks: "#5fb8c8", dbms: "#c9a96e", cloud: "#b07fd4",
};

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
export default function Articles() {
  const [activeTag,  setActiveTag]  = useState("all");
  const [expanded,   setExpanded]   = useState(null);
  const [liked,      setLiked]      = useState({});          // { id: bool }
  const [likeCounts, setLikeCounts] = useState(() =>
    Object.fromEntries(ARTICLES.map(a => [a.id, a.likes]))
  );
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = activeTag === "all" ? ARTICLES : ARTICLES.filter(a => a.tag === activeTag);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.subject.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTag, search]);

  const toggleExpand = (id) => setExpanded(prev => prev === id ? null : id);

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLiked(prev => {
      const nowLiked = !prev[id];
      setLikeCounts(c => ({ ...c, [id]: c[id] + (nowLiked ? 1 : -1) }));
      return { ...prev, [id]: nowLiked };
    });
  };

  /* Parse body markdown-lite (bold + code blocks) */
  const renderBody = (text) => {
    const lines = text.split("\n");
    const elements = [];
    let inCode = false;
    let codeLines = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("```")) {
        if (!inCode) { inCode = true; codeLines = []; }
        else {
          elements.push(<pre key={key++} className="art-code"><code>{codeLines.join("\n")}</code></pre>);
          inCode = false;
        }
        continue;
      }
      if (inCode) { codeLines.push(line); continue; }
      if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
        elements.push(<h4 key={key++} className="art-body-h">{line.slice(2, -2)}</h4>);
      } else if (line.trim() === "") {
        elements.push(<div key={key++} className="art-spacer" />);
      } else {
        // inline bold
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        elements.push(
          <p key={key++} className="art-body-p">
            {parts.map((p, pi) =>
              p.startsWith("**") && p.endsWith("**")
                ? <strong key={pi}>{p.slice(2, -2)}</strong>
                : p
            )}
          </p>
        );
      }
    }
    return elements;
  };

  return (
    <>
      <HomeNavbar />
      <div className="art-page">

        {/* ── HERO ── */}
        <div className="art-hero">
          <div className="art-hero-badge">
            <i className="ri-newspaper-line" /> NullPointer — Tech Intelligence
          </div>
          <h1 className="art-hero-title">
            Curated Tech<br /><span className="art-hero-accent">Articles</span>
          </h1>
          <p className="art-hero-sub">
            Articles across AI, DSA, System Design, Networks, DBMS, and Cloud. No fluff. Real depth.
          </p>

          {/* Search */}
          <div className="art-search-wrap">
            <i className="ri-search-line art-search-icon" />
            <input
              className="art-search"
              placeholder="Search articles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="art-search-clear" onClick={() => setSearch("")}>
                <i className="ri-close-line" />
              </button>
            )}
          </div>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="art-filters">
          {SUBJECTS.map(s => (
            <button
              key={s.id}
              className={`art-filter ${activeTag === s.id ? "active" : ""}`}
              style={activeTag === s.id && s.color ? {
                borderColor: s.color, color: s.color, background: s.color + "14"
              } : activeTag === s.id ? {} : {}}
              onClick={() => { setActiveTag(s.id); setExpanded(null); }}
            >
              <i className={s.icon} />
              {s.label}
            </button>
          ))}
        </div>

        {/* ── COUNT ── */}
        <div className="art-count">
          <span>{filtered.length} article{filtered.length !== 1 ? "s" : ""}</span>
          {search && <span className="art-count-query">for "{search}"</span>}
        </div>

        {/* ── ARTICLES GRID ── */}
        <div className="art-grid">
          {filtered.length === 0 && (
            <div className="art-empty">
              <i className="ri-search-2-line" />
              <p>No articles found. Try a different search or filter.</p>
            </div>
          )}

          {filtered.map((article, idx) => {
            const isOpen  = expanded === article.id;
            const isLiked = liked[article.id];
            const color   = TAG_COLOR[article.tag];

            return (
              <div
                key={article.id}
                className={`art-card ${isOpen ? "open" : ""}`}
                style={{ "--ac": color, animationDelay: `${idx * 0.04}s` }}
              >
                {/* Card Header — always visible */}
                <div className="art-card-header" onClick={() => toggleExpand(article.id)}>

                  {/* Top row */}
                  <div className="art-card-top">
                    <span className="art-subject-badge" style={{ color, borderColor: color + "40", background: color + "12" }}>
                      <i className={SUBJECTS.find(s => s.id === article.tag)?.icon} />
                      {article.subject}
                    </span>
                    <div className="art-meta">
                      <span><i className="ri-calendar-line" />{article.date}</span>
                      <span><i className="ri-time-line" />{article.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="art-title">{article.title}</h2>

                  {/* Summary */}
                  <p className="art-summary">{article.summary}</p>

                  {/* Bottom row */}
                  <div className="art-card-bottom">
                    <button
                      className={`art-like-btn ${isLiked ? "liked" : ""}`}
                      onClick={e => toggleLike(e, article.id)}
                    >
                      <i className={isLiked ? "ri-heart-fill" : "ri-heart-line"} />
                      <span>{likeCounts[article.id].toLocaleString()}</span>
                    </button>

                    <button className="art-expand-btn">
                      {isOpen
                        ? <><i className="ri-arrow-up-s-line" /> Collapse</>
                        : <><i className="ri-article-line" /> Read Article</>
                      }
                    </button>
                  </div>
                </div>

                {/* Expanded body */}
                {isOpen && (
                  <div className="art-body" onClick={e => e.stopPropagation()}>
                    <div className="art-body-divider" style={{ background: color }} />
                    <div className="art-body-content">
                      {renderBody(article.body)}
                    </div>
                    <div className="art-body-footer">
                      <button
                        className={`art-like-btn large ${isLiked ? "liked" : ""}`}
                        onClick={e => toggleLike(e, article.id)}
                      >
                        <i className={isLiked ? "ri-heart-fill" : "ri-heart-line"} />
                        {isLiked ? "Liked" : "Like this article"}
                        <span className="art-like-count">{likeCounts[article.id].toLocaleString()}</span>
                      </button>
                      <button className="art-collapse-btn" onClick={() => setExpanded(null)}>
                        <i className="ri-arrow-up-s-line" /> Collapse Article
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}