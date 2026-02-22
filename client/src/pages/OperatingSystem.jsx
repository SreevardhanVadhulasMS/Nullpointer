import { useState, useEffect, useRef } from "react";
import HomeNavbar from "../components/HomeNavbar";
import "./OperatingSystem.css";

const CHAPTERS = [
  {
    id: "intro",
    title: "Introduction to OS",
    icon: "ri-computer-line",
    color: "#e07a5f",
    tagline: "The invisible manager of every computer",
    intro: "An Operating System is the most fundamental software running on a computer. It acts as an intermediary between hardware and user applications — managing resources, enforcing security, and providing a consistent interface so programs don't need to know hardware specifics.",
    sections: [
      {
        heading: "What Does an OS Actually Do?",
        type: "framework",
        items: [
          { icon: "ri-cpu-line",         label: "Process Management",   desc: "Creates, schedules, and terminates processes. Decides which process gets the CPU and for how long." },
          { icon: "ri-ram-line",          label: "Memory Management",    desc: "Allocates and deallocates RAM. Handles virtual memory, paging, and segmentation." },
          { icon: "ri-hard-drive-2-line", label: "File System",          desc: "Organises data on disk into files and directories. Manages read/write permissions and metadata." },
          { icon: "ri-device-line",       label: "Device Management",    desc: "Talks to hardware via device drivers. Provides a uniform API regardless of hardware model." },
          { icon: "ri-shield-keyhole-line", label: "Security & Protection", desc: "Isolates processes from each other. Enforces user permissions and prevents unauthorized access." },
          { icon: "ri-layout-grid-line",  label: "UI / Shell",           desc: "Provides CLI or GUI for users to interact with the system without understanding hardware." },
        ]
      },
      {
        heading: "Types of Operating Systems",
        type: "cards_grid",
        cards: [
          { icon: "ri-timer-line",        title: "Batch OS",         desc: "Jobs are batched and executed without user interaction. No multitasking. Example: early IBM mainframes." },
          { icon: "ri-time-line",         title: "Time-Sharing OS",  desc: "CPU time is shared among multiple users via rapid context switching. Example: UNIX." },
          { icon: "ri-broadcast-line",    title: "Real-Time OS",     desc: "Guarantees response within strict time bounds. Used in aircraft, medical devices, industrial control. Example: VxWorks." },
          { icon: "ri-global-line",       title: "Distributed OS",   desc: "Manages a group of independent computers as a single coherent system. Example: Amoeba." },
          { icon: "ri-stack-line",        title: "Embedded OS",      desc: "Minimal OS for dedicated hardware. Low memory footprint. Example: FreeRTOS, Android (mobile layer)." },
          { icon: "ri-apps-line",         title: "Mobile OS",        desc: "Optimised for touch, battery, and connectivity. Sandboxed apps. Example: Android, iOS." },
        ]
      },
      {
        heading: "Kernel: The Core of the OS",
        type: "compare",
        left: {
          label: "Monolithic Kernel",
          color: "#e07a5f",
          points: [
            "Entire OS runs in a single address space",
            "Device drivers, file systems all in kernel space",
            "Fast — no mode switching overhead",
            "One crash can bring down the whole system",
            "Examples: Linux, early Windows, MS-DOS",
          ]
        },
        right: {
          label: "Microkernel",
          color: "#81b29a",
          points: [
            "Only essential services in kernel (IPC, scheduling)",
            "Everything else runs as user-space processes",
            "More stable — driver crash doesn't crash kernel",
            "Slower due to message passing between services",
            "Examples: Minix, QNX, macOS (hybrid)",
          ]
        }
      },
      {
        heading: "System Calls: The OS–App Interface",
        type: "steps",
        steps: [
          { n: "01", title: "User Mode Request",     desc: "Application needs a privileged operation (e.g., open a file). It issues a system call — a controlled entry point into kernel mode." },
          { n: "02", title: "Mode Switch (Trap)",    desc: "CPU switches from User Mode to Kernel Mode via a software interrupt (trap). The current state is saved." },
          { n: "03", title: "Kernel Executes",       desc: "OS kernel performs the requested service — accessing hardware, allocating memory, or performing I/O." },
          { n: "04", title: "Return to User Mode",   desc: "Results are returned to the calling program. CPU switches back to User Mode. Execution resumes." },
        ]
      },
      {
        heading: "Scenario: Why Does an App Crash When RAM Is Full?",
        type: "scenario",
        scenario: "A student asks: 'If I have 8 GB RAM and open apps totalling 12 GB, why doesn't the system just crash instantly?'",
        options: [
          { text: "Modern computers actually have hidden RAM that activates under load", outcome: "❌ Incorrect. There is no hidden RAM. The OS handles this through a different mechanism entirely.", good: false },
          { text: "The OS uses virtual memory — it swaps less-used pages to disk (swap space), creating the illusion of more RAM", outcome: "✅ Correct. The OS extends available memory using disk space as a slow overflow. Performance degrades but the system doesn't crash immediately.", good: true },
          { text: "The CPU compresses data to fit more into RAM", outcome: "⚠️ Partially true on some systems (e.g., zRAM on Android/Linux), but the primary mechanism is virtual memory / swapping.", good: false },
          { text: "The OS kills the most recently opened app automatically", outcome: "⚠️ The OOM (Out-Of-Memory) killer on Linux does terminate processes when truly exhausted, but virtual memory is the first line of defence.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "Which OS type guarantees response within strict time deadlines?", opts: ["Batch OS", "Time-Sharing OS", "Real-Time OS", "Distributed OS"], ans: 2 },
      { q: "What is the primary role of an Operating System?", opts: ["Run user applications directly", "Act as intermediary between hardware and applications while managing resources", "Provide internet connectivity", "Compile source code"], ans: 1 },
      { q: "In a monolithic kernel:", opts: ["All services run in user space", "The entire OS runs in a single kernel address space", "Only scheduling runs in kernel space", "Drivers run as separate processes"], ans: 1 },
      { q: "A system call requires:", opts: ["Switching from kernel mode to user mode", "Restarting the OS", "Switching from user mode to kernel mode via a trap", "Direct hardware access by the application"], ans: 2 },
      { q: "Which is an advantage of a microkernel over a monolithic kernel?", opts: ["Faster execution speed", "Lower memory usage", "A driver crash doesn't crash the entire kernel", "Easier to write device drivers"], ans: 2 },
      { q: "Virtual memory allows a system to:", opts: ["Run faster by caching data in CPU registers", "Use disk space as an extension of RAM to run more programs than physical RAM allows", "Compress RAM data to double capacity", "Share memory between different computers"], ans: 1 },
      { q: "Which OS is an example of a Real-Time OS?", opts: ["Linux", "Windows 10", "VxWorks", "Android"], ans: 2 },
      { q: "Device drivers in an OS are responsible for:", opts: ["Compiling user programs", "Providing a uniform hardware API regardless of specific hardware model", "Managing user login sessions", "Scheduling CPU time"], ans: 1 },
      { q: "The OOM (Out-Of-Memory) killer in Linux:", opts: ["Prevents all memory allocation", "Terminates processes when memory is truly exhausted", "Adds more swap space automatically", "Compresses memory pages"], ans: 1 },
      { q: "Time-sharing OS achieves the illusion of simultaneous multi-user support via:", opts: ["Multiple CPUs", "Rapid context switching allocating CPU slices to each user", "Each user gets a dedicated core", "Memory partitioning"], ans: 1 },
    ]
  },
  {
    id: "processes",
    title: "Processes & Threads",
    icon: "ri-pulse-line",
    color: "#81b29a",
    tagline: "The living units of execution",
    intro: "A process is a program in execution — it's more than just code. It includes the code, current activity (program counter), stack, heap, and data segment. Understanding processes and threads is foundational to understanding concurrency, scheduling, and synchronisation.",
    sections: [
      {
        heading: "Process vs. Program vs. Thread",
        type: "cards_grid",
        cards: [
          { icon: "ri-file-code-line",  title: "Program",  desc: "A passive entity — instructions stored on disk. It has no execution state. The blueprint." },
          { icon: "ri-play-circle-line", title: "Process",  desc: "An active entity — a program being executed. Has its own memory space, file handles, and state. The building." },
          { icon: "ri-loop-left-line",   title: "Thread",   desc: "A lightweight unit within a process. Shares memory space with sibling threads. The workers inside the building." },
        ]
      },
      {
        heading: "The 5-State Process Model",
        type: "steps",
        steps: [
          { n: "New",      title: "New",      desc: "Process is being created. OS is allocating resources, creating PCB (Process Control Block)." },
          { n: "Ready",    title: "Ready",    desc: "Process has all resources needed except CPU. Waiting in the ready queue for the scheduler to pick it." },
          { n: "Running",  title: "Running",  desc: "Process is currently executing on the CPU. Only one process per CPU core at any instant." },
          { n: "Blocked",  title: "Blocked (Waiting)", desc: "Process is waiting for an event — I/O completion, signal, or resource. Not using CPU. Cannot proceed until event occurs." },
          { n: "Exit",     title: "Terminated", desc: "Process has finished execution or been killed. OS reclaims resources. PCB is eventually removed." },
        ]
      },
      {
        heading: "Process Control Block (PCB)",
        type: "toolkit",
        tools: [
          { name: "Process ID (PID)",     tip: "Unique identifier for every process. Used by the OS and other processes to reference this process." },
          { name: "Program Counter",       tip: "Address of the next instruction to execute. Saved on context switch so execution can resume exactly." },
          { name: "CPU Registers",         tip: "Current values of all CPU registers. Must be saved/restored during context switches." },
          { name: "Memory Limits",         tip: "Base and limit registers defining the process's memory space. Prevents processes from accessing each other's memory." },
          { name: "Process State",         tip: "Current state: New, Ready, Running, Blocked, or Terminated." },
          { name: "Open File Table",        tip: "List of files currently opened by this process, with offsets and permissions." },
        ]
      },
      {
        heading: "Threads: Why They Exist",
        type: "compare",
        left: {
          label: "Multi-Process Approach",
          color: "#e07a5f",
          points: [
            "Each unit gets its own full memory space",
            "Isolation: one crash doesn't affect others",
            "Context switching is expensive",
            "Communication requires IPC (pipes, sockets)",
            "High memory overhead",
          ]
        },
        right: {
          label: "Multi-Thread Approach",
          color: "#81b29a",
          points: [
            "Threads share the same process memory",
            "Lightweight — fast to create and switch",
            "Communication via shared memory",
            "One thread crash can kill the whole process",
            "Low memory overhead — shared code & data",
          ]
        }
      },
      {
        heading: "Context Switch Scenario",
        type: "scenario",
        scenario: "Process A is running on the CPU. A timer interrupt fires and the OS decides to give the CPU to Process B. What happens step-by-step?",
        options: [
          { text: "Process A is simply paused and Process B starts from scratch", outcome: "❌ Incorrect. Process B doesn't start from scratch — it resumes from where it previously stopped. The OS saves and restores state.", good: false },
          { text: "OS saves A's PCB (registers, PC, state), loads B's PCB, updates memory maps, and jumps to B's saved PC", outcome: "✅ Correct. The context switch saves A's entire execution context into its PCB, then restores B's context so B resumes transparently.", good: true },
          { text: "Both processes continue executing simultaneously on the same core", outcome: "❌ A single core can only execute one process at a time. Simultaneous execution requires multiple cores.", good: false },
          { text: "Process A's data is deleted to free memory for Process B", outcome: "❌ Context switching does not delete any process data. It only pauses execution and saves state.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "A Process Control Block (PCB) stores:", opts: ["Only the program code", "The process's execution state including registers, PC, and memory limits", "User-level data structures only", "Network socket information"], ans: 1 },
      { q: "A process in the 'Blocked' state is:", opts: ["Ready to run but waiting for CPU", "Executing on the CPU right now", "Waiting for an event like I/O completion and cannot proceed", "Being terminated by the OS"], ans: 2 },
      { q: "The key difference between a process and a thread is:", opts: ["Threads are slower than processes", "Threads share the same process memory space; processes have isolated memory", "Processes are part of threads", "Threads can only run on multi-core systems"], ans: 1 },
      { q: "During a context switch, the OS:", opts: ["Deletes the current process", "Saves the running process's PCB and loads the next process's PCB", "Creates a new process", "Allocates more memory to the current process"], ans: 1 },
      { q: "Which is TRUE about multi-threading compared to multi-processing?", opts: ["Threads have higher memory overhead", "Thread context switching is more expensive", "Threads share memory — lower overhead but one crash can kill the whole process", "Threads require IPC for communication"], ans: 2 },
      { q: "A program becomes a process when:", opts: ["It is compiled from source code", "It is loaded into memory and begins execution", "It is saved on disk", "It is linked with libraries"], ans: 1 },
      { q: "How many processes can execute on a single CPU core simultaneously?", opts: ["2", "4", "As many as RAM allows", "Exactly 1"], ans: 3 },
      { q: "The Program Counter in a PCB stores:", opts: ["Total execution time", "The address of the next instruction to execute", "The number of open files", "The process priority value"], ans: 1 },
      { q: "Inter-Process Communication (IPC) is needed when:", opts: ["Threads within the same process communicate", "Separate processes with isolated memory need to exchange data", "A process wants to access its own heap", "The CPU switches between threads"], ans: 1 },
      { q: "The 'Ready' state means:", opts: ["The process is waiting for I/O", "The process is on the CPU", "The process has all needed resources except CPU time", "The process just started and is being created"], ans: 2 },
    ]
  },
  {
    id: "scheduling",
    title: "CPU Scheduling",
    icon: "ri-calendar-schedule-line",
    color: "#a09bc9",
    tagline: "Who runs next — and for how long?",
    intro: "The CPU scheduler decides which process in the ready queue runs next. It's one of the most performance-critical components of any OS. A bad scheduling algorithm can make a fast computer feel sluggish — a good one can make modest hardware feel responsive.",
    sections: [
      {
        heading: "Scheduling Criteria",
        type: "framework",
        items: [
          { icon: "ri-cpu-line",         label: "CPU Utilisation",   desc: "Keep the CPU as busy as possible. Theoretical max is 100%; practical target is 40–90%." },
          { icon: "ri-speed-line",        label: "Throughput",        desc: "Number of processes completed per unit time. Higher is better for batch workloads." },
          { icon: "ri-timer-flash-line",  label: "Turnaround Time",   desc: "Total time from process submission to completion. Includes waiting + execution + I/O." },
          { icon: "ri-hourglass-line",    label: "Waiting Time",      desc: "Time spent in the ready queue waiting for CPU. What scheduling directly controls." },
          { icon: "ri-reply-line",        label: "Response Time",     desc: "Time from request to first response. Critical for interactive systems — the UI must feel snappy." },
        ]
      },
      {
        heading: "Scheduling Algorithms",
        type: "steps",
        steps: [
          { n: "FCFS", title: "First Come First Served",     desc: "Processes run in arrival order. Simple, fair, but suffers from the Convoy Effect — one long process blocks all short ones behind it. Non-preemptive." },
          { n: "SJF",  title: "Shortest Job First",          desc: "Run the process with the shortest burst time next. Optimal average waiting time. Problem: requires knowing burst time in advance (impractical for interactive systems). Non-preemptive." },
          { n: "SRTF", title: "Shortest Remaining Time First", desc: "Preemptive version of SJF. If a new process arrives with shorter remaining time than current, preempt. Optimal but impractical — still needs burst time." },
          { n: "RR",   title: "Round Robin",                  desc: "Each process gets a fixed time quantum (e.g., 10–100ms), then is preempted and moved to the back of the queue. Fair for interactive systems. Performance depends heavily on quantum size." },
          { n: "PS",   title: "Priority Scheduling",          desc: "Each process has a priority; highest runs first. Problem: Starvation — low-priority processes may never run. Solution: Aging (gradually increase priority over time)." },
          { n: "MLQ",  title: "Multilevel Queue",             desc: "Multiple queues with different priorities and algorithms. E.g., foreground (RR) and background (FCFS). Processes don't move between queues." },
        ]
      },
      {
        heading: "Round Robin: The Quantum Tradeoff",
        type: "compare",
        left: {
          label: "Small Quantum (e.g., 1ms)",
          color: "#e07a5f",
          points: [
            "Very responsive — great for interactive tasks",
            "High context switch overhead",
            "CPU wastes time saving/restoring PCBs",
            "Effective CPU time drops significantly",
            "Throughput decreases",
          ]
        },
        right: {
          label: "Large Quantum (e.g., 1000ms)",
          color: "#81b29a",
          points: [
            "Low context switch overhead",
            "High throughput for CPU-bound tasks",
            "Long waiting time — feels like FCFS",
            "Poor interactivity / response time",
            "Short jobs must wait behind long ones",
          ]
        }
      },
      {
        heading: "Gantt Chart: SJF Example",
        type: "insight_block",
        insight: "Processes: P1(burst=6), P2(burst=3), P3(burst=8), P4(burst=1). All arrive at t=0. SJF order: P4(0–1) → P2(1–4) → P1(4–10) → P3(10–18). Average waiting time = (0+1+4+10)/4 = 3.75ms. Compare to FCFS order P1→P2→P3→P4: avg wait = (0+6+9+17)/4 = 8ms. SJF cuts average wait by more than half.",
        takeaway: "SJF is provably optimal for minimising average waiting time among non-preemptive algorithms. But it requires knowing burst times — which in practice must be estimated using exponential averaging of past behaviour."
      },
      {
        heading: "Scheduling Scenario",
        type: "scenario",
        scenario: "A hospital OS manages two process types: real-time patient monitors (must respond in <10ms) and batch data processing jobs (can wait hours). Which scheduling approach fits?",
        options: [
          { text: "FCFS — first come first served is fairest", outcome: "❌ Completely wrong for this use case. A batch job arriving before a patient monitor would block it. Fairness ≠ correctness for real-time systems.", good: false },
          { text: "Round Robin with equal quantum for all processes", outcome: "⚠️ Better than FCFS, but equal time slices mean monitors might miss their 10ms deadline if batch jobs are in queue.", good: false },
          { text: "Preemptive Priority Scheduling — patient monitors get highest priority, batch jobs lowest", outcome: "✅ Correct. Real-time processes must preempt batch jobs immediately. This is exactly how medical real-time OS (RTOS) works.", good: true },
          { text: "Shortest Job First — patient alerts are short so they'll naturally run first", outcome: "⚠️ Partially correct reasoning, but SJF doesn't guarantee the deadline of 10ms and doesn't handle new arrivals preemptively without SRTF.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "Which scheduling algorithm suffers from the 'Convoy Effect'?", opts: ["Round Robin", "Priority Scheduling", "FCFS (First Come First Served)", "SJF"], ans: 2 },
      { q: "Starvation in Priority Scheduling is solved by:", opts: ["Increasing quantum size", "Using FCFS as a tiebreaker", "Aging — gradually increasing priority of waiting processes", "Reducing the number of priority levels"], ans: 2 },
      { q: "Round Robin scheduling is best suited for:", opts: ["Batch processing systems", "Interactive systems requiring good response time", "Real-time systems with hard deadlines", "Single-user desktop with one application"], ans: 1 },
      { q: "SRTF (Shortest Remaining Time First) is:", opts: ["Non-preemptive SJF", "Preemptive SJF — preempts if new process has shorter remaining time", "A priority-based algorithm", "Round Robin with dynamic quantum"], ans: 1 },
      { q: "What does 'Turnaround Time' measure?", opts: ["Time the process spends on CPU only", "Time from process submission to its final completion", "Number of context switches", "CPU utilisation percentage"], ans: 1 },
      { q: "A smaller time quantum in Round Robin results in:", opts: ["Lower context switch overhead", "Better throughput for CPU-bound tasks", "Higher responsiveness but higher context switch overhead", "Behaviour identical to FCFS"], ans: 2 },
      { q: "Which algorithm is theoretically optimal for minimising average waiting time?", opts: ["FCFS", "Round Robin", "SJF (Shortest Job First)", "FCFS with aging"], ans: 2 },
      { q: "For a hospital with hard real-time patient monitors, the correct scheduling is:", opts: ["FCFS for simplicity", "Round Robin with equal quanta", "Preemptive Priority Scheduling with monitors at highest priority", "SJF since alerts are short"], ans: 2 },
      { q: "CPU Utilisation as a scheduling criterion means:", opts: ["Minimise the time processes wait", "Maximise the percentage of time the CPU is actively executing processes", "Maximise the number of processes created per second", "Minimise memory usage"], ans: 1 },
      { q: "In Multilevel Queue Scheduling:", opts: ["Processes freely move between queues based on behaviour", "All processes share one priority level", "Multiple queues with different priorities/algorithms; processes don't move between queues", "Only foreground processes are scheduled"], ans: 2 },
    ]
  },
  {
    id: "memory",
    title: "Memory Management",
    icon: "ri-ram-line",
    color: "#5fb8c8",
    tagline: "Giving every process the illusion of infinite memory",
    intro: "Every running process needs memory. The OS must allocate RAM efficiently, protect processes from each other, and create the illusion that each process has exclusive access to a large contiguous address space — even when physical RAM is limited or fragmented.",
    sections: [
      {
        heading: "Memory Hierarchy",
        type: "steps",
        steps: [
          { n: "L1", title: "CPU Registers",   desc: "Fastest possible. A few hundred bytes. Access time: <1ns. Managed entirely by the compiler and CPU." },
          { n: "L2", title: "L1/L2/L3 Cache", desc: "SRAM on or near the CPU die. KBs to MBs. Access: 1–10ns. Holds recently used data for fast re-access." },
          { n: "L3", title: "Main Memory (RAM)", desc: "DRAM. GBs. Access: ~100ns. The primary working memory managed by the OS. Volatile — lost on power off." },
          { n: "L4", title: "Swap / Virtual Memory", desc: "Disk space used as RAM overflow. GBs to TBs. Access: ~10ms (HDD) or ~0.1ms (SSD). Orders of magnitude slower." },
          { n: "L5", title: "Disk / SSD Storage", desc: "Non-volatile persistent storage. TBs. Access: ms range. Where files and programs live permanently." },
        ]
      },
      {
        heading: "Logical vs. Physical Address",
        type: "compare",
        left: {
          label: "Logical (Virtual) Address",
          color: "#5fb8c8",
          points: [
            "Generated by the CPU during program execution",
            "Each process has its own address space starting at 0",
            "Programs are compiled with logical addresses",
            "Doesn't correspond directly to physical RAM location",
            "Provides isolation — process can't access another's space",
          ]
        },
        right: {
          label: "Physical Address",
          color: "#c9a96e",
          points: [
            "Actual address in physical RAM hardware",
            "Mapped from logical address by the MMU",
            "Shared physical RAM across all processes",
            "Managed and tracked by the OS page tables",
            "Transparent to the running process",
          ]
        }
      },
      {
        heading: "Paging: The Core Technique",
        type: "toolkit",
        tools: [
          { name: "Page",          tip: "Fixed-size block of a process's logical memory (typically 4KB). Programs are divided into pages." },
          { name: "Frame",         tip: "Fixed-size block of physical RAM. Same size as a page. Physical RAM is divided into frames." },
          { name: "Page Table",    tip: "OS data structure mapping each page to its physical frame. One per process. Looked up by the MMU on every memory access." },
          { name: "TLB",           tip: "Translation Lookaside Buffer — a fast cache for recent page-to-frame translations. Avoids slow page table lookup. Hit rate typically >99%." },
          { name: "Page Fault",    tip: "Occurs when a process accesses a page not currently in RAM. OS must load it from disk (swap). Expensive — causes hundreds of ms delay." },
        ]
      },
      {
        heading: "Page Replacement Algorithms",
        type: "framework",
        items: [
          { icon: "ri-time-line",        label: "FIFO",   desc: "Replace the page that has been in memory the longest. Simple but suffers Belady's Anomaly — more frames can cause more faults." },
          { icon: "ri-star-line",         label: "OPT",    desc: "Replace the page that won't be used for the longest future time. Theoretically optimal but requires future knowledge — used only as a benchmark." },
          { icon: "ri-history-line",      label: "LRU",    desc: "Replace the page least recently used. Close to optimal in practice. Expensive to implement precisely — approximations like Clock algorithm are used." },
          { icon: "ri-clock-line",        label: "Clock",  desc: "Approximation of LRU using a circular buffer and reference bits. When a page is used, bit set to 1. Clock hand skips pages with bit=1, clearing them." },
        ]
      },
      {
        heading: "Memory Scenario: Thrashing",
        type: "scenario",
        scenario: "A system with 4GB RAM is running 20 processes that together require 16GB. The CPU usage meter shows 100% — but the system feels completely frozen and nothing gets done.",
        options: [
          { text: "Add more CPU cores — the processor is overloaded", outcome: "❌ CPU usage is 100% but it's not doing useful work. It's the OS constantly handling page faults — not user processes executing.", good: false },
          { text: "This is thrashing — processes are spending more time swapping pages than executing. Reduce the number of running processes.", outcome: "✅ Exactly. Thrashing occurs when the working set exceeds RAM. The OS spends all its time on page I/O. Solution: swap processes out, add RAM, or use working set model.", good: true },
          { text: "Kill all background processes to free CPU time", outcome: "⚠️ Partially helpful — reducing processes is correct. But the root cause is memory pressure, not CPU pressure.", good: false },
          { text: "Increase the page size to reduce page faults", outcome: "⚠️ Larger pages might reduce some TLB misses but can increase internal fragmentation and doesn't fundamentally address the working set problem.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "A Page Fault occurs when:", opts: ["A process divides by zero", "A page the process needs is not currently in RAM and must be loaded from disk", "The page table is corrupted", "Two processes access the same physical frame"], ans: 1 },
      { q: "The TLB (Translation Lookaside Buffer) is:", opts: ["A type of page replacement algorithm", "A fast hardware cache for recent page-to-frame translations", "The OS data structure for all page mappings", "A disk cache for virtual memory"], ans: 1 },
      { q: "Which page replacement algorithm is theoretically optimal but impractical?", opts: ["LRU", "FIFO", "OPT (Optimal)", "Clock"], ans: 2 },
      { q: "In paging, a 'Frame' refers to:", opts: ["A block of a process's logical address space", "A fixed-size block of physical RAM", "An entry in the page table", "A segment of the process's stack"], ans: 1 },
      { q: "Thrashing occurs when:", opts: ["The CPU runs too hot", "Processes spend more time swapping pages than executing useful work", "The OS runs out of file descriptors", "The page size is too large"], ans: 1 },
      { q: "The key difference between logical and physical addresses is:", opts: ["Logical addresses are larger than physical", "Logical addresses are what programs use; physical are actual RAM locations mapped by MMU", "Physical addresses are used in compilation", "They are identical on modern systems"], ans: 1 },
      { q: "Belady's Anomaly states that:", opts: ["More RAM always reduces page faults", "FIFO can have more page faults with more frames in some cases", "LRU is always better than FIFO", "OPT causes the most page faults"], ans: 1 },
      { q: "LRU page replacement replaces:", opts: ["The page with the lowest page number", "The page that was loaded first", "The page that has not been used for the longest time", "The page most frequently accessed"], ans: 2 },
      { q: "The MMU (Memory Management Unit) is responsible for:", opts: ["Allocating heap memory to programs", "Translating logical addresses to physical addresses at runtime", "Managing disk I/O operations", "Compressing memory pages"], ans: 1 },
      { q: "The memory hierarchy is ordered by:", opts: ["Size (smallest to largest) with increasing speed", "Speed (fastest to slowest) with increasing size and cost per byte decreasing", "Volatility only", "Distance from CPU (nearest to farthest) with increasing size and decreasing speed"], ans: 3 },
    ]
  },
  {
    id: "sync",
    title: "Synchronisation & Deadlocks",
    icon: "ri-links-line",
    color: "#c9a96e",
    tagline: "When processes need to share, chaos lurks",
    intro: "When multiple processes or threads access shared resources concurrently, correctness is not guaranteed. Without synchronisation, race conditions corrupt data. With too much synchronisation, deadlocks freeze systems. This is one of the hardest problems in systems programming.",
    sections: [
      {
        heading: "The Critical Section Problem",
        type: "insight_block",
        insight: "A critical section is code that accesses shared data. If two processes enter their critical sections simultaneously — even for one instruction — data corruption occurs. Example: Two threads both read a counter (value=5), both add 1, both write back 6. The counter should be 7 but is 6. This is a race condition.",
        takeaway: "Any solution to the critical section problem must satisfy: (1) Mutual Exclusion — only one process in critical section at a time. (2) Progress — if no process is in the section and one wants to enter, it must be allowed. (3) Bounded Waiting — no process waits forever (no starvation)."
      },
      {
        heading: "Synchronisation Mechanisms",
        type: "framework",
        items: [
          { icon: "ri-lock-line",         label: "Mutex Lock",   desc: "Binary lock — acquire before critical section, release after. Only the acquiring thread can release it. Simple and widely used." },
          { icon: "ri-traffic-light-line",label: "Semaphore",    desc: "Integer variable with atomic wait() and signal() operations. Counting semaphore manages a pool of resources. Binary semaphore = mutex." },
          { icon: "ri-door-open-line",     label: "Monitor",     desc: "High-level construct — shared data + procedures + condition variables bundled together. Only one process can execute inside at a time. Easier to use correctly than semaphores." },
          { icon: "ri-timer-2-line",       label: "Spinlock",    desc: "Busy-wait loop checking if a lock is free. Wastes CPU but has near-zero overhead for very short critical sections on multi-core systems." },
          { icon: "ri-sort-desc",          label: "Condition Variable", desc: "Used inside monitors. Allows threads to wait for a condition to become true without busy-waiting. Signals wake waiting threads." },
        ]
      },
      {
        heading: "Classic Synchronisation Problems",
        type: "cards_grid",
        cards: [
          { icon: "ri-bowl-line",     title: "Producer-Consumer",  desc: "Producer adds to buffer; Consumer removes. Problem: consumer reading from empty buffer or producer writing to full buffer. Solution: semaphores for empty/full slots + mutex for buffer access." },
          { icon: "ri-book-open-line",title: "Readers-Writers",    desc: "Multiple readers can read simultaneously; writers need exclusive access. Risk: writer starvation if readers keep arriving. Solution: priority schemes." },
          { icon: "ri-fork-line",     title: "Dining Philosophers", desc: "5 philosophers, 5 forks, each needs 2 adjacent forks to eat. Risk: deadlock if all pick up their left fork simultaneously. Solution: ordering, arbitrator, or allow at most 4 philosophers to sit." },
        ]
      },
      {
        heading: "Deadlock: The Four Coffin Conditions",
        type: "steps",
        steps: [
          { n: "01", title: "Mutual Exclusion",    desc: "Resources cannot be shared — only one process can hold a resource at a time. E.g., only one process can write to a file." },
          { n: "02", title: "Hold and Wait",        desc: "A process holding a resource is waiting to acquire additional resources held by others." },
          { n: "03", title: "No Preemption",        desc: "Resources cannot be forcibly taken from a process. They must be voluntarily released." },
          { n: "04", title: "Circular Wait",        desc: "A circular chain of processes: P1 waits for P2's resource, P2 waits for P3's, ... Pn waits for P1's. The cycle is the deadlock." },
        ]
      },
      {
        heading: "Deadlock Scenario",
        type: "scenario",
        scenario: "Process A holds Resource 1 and requests Resource 2. Process B holds Resource 2 and requests Resource 1. Both are blocked. Your manager asks: 'How do we prevent this from happening in future?'",
        options: [
          { text: "Always kill the oldest process when a deadlock is detected", outcome: "⚠️ This is deadlock recovery, not prevention. Killing processes loses work and doesn't prevent the same deadlock from recurring.", good: false },
          { text: "Require all processes to request all resources at once (eliminate Hold-and-Wait)", outcome: "✅ Eliminating any one of the four conditions prevents deadlock. Hold-and-Wait elimination is clean: processes declare all needed resources upfront.", good: true },
          { text: "Use more RAM — deadlocks are caused by resource scarcity", outcome: "❌ More RAM helps resource contention but doesn't prevent deadlock. The circular wait can occur even with abundant resources.", good: false },
          { text: "Impose a total ordering on resources — all processes must request resources in the same fixed order", outcome: "✅ Also correct — eliminating Circular Wait by enforcing resource ordering is a practical and widely-used deadlock prevention strategy.", good: true },
        ]
      }
    ],
    quiz: [
      { q: "A race condition occurs when:", opts: ["The CPU runs too fast", "Two processes access shared data concurrently and the outcome depends on execution order", "A process enters an infinite loop", "Memory allocation fails"], ans: 1 },
      { q: "The three requirements for solving the Critical Section Problem are:", opts: ["Mutual exclusion, fairness, efficiency", "Mutual exclusion, progress, bounded waiting", "Atomicity, consistency, isolation", "Speed, correctness, simplicity"], ans: 1 },
      { q: "A counting semaphore is used to:", opts: ["Provide binary mutual exclusion only", "Manage a pool of multiple identical resources", "Detect deadlocks automatically", "Order resource acquisition"], ans: 1 },
      { q: "The Circular Wait condition in deadlock means:", opts: ["Processes run in a circular scheduling order", "A chain of processes each waiting for a resource held by the next in the chain", "Resources are allocated in a circular buffer", "Processes take turns holding resources"], ans: 1 },
      { q: "Monitors differ from semaphores because:", opts: ["Monitors are faster", "Monitors bundle data, procedures, and synchronisation together — harder to misuse", "Semaphores allow multiple simultaneous entries", "Monitors only work for binary resources"], ans: 1 },
      { q: "Eliminating the 'Hold and Wait' condition requires:", opts: ["Adding more resources to the system", "Using preemptive scheduling", "Requiring processes to request all needed resources at once before starting", "Detecting circular waits at runtime"], ans: 2 },
      { q: "In the Dining Philosophers problem, the deadlock occurs when:", opts: ["One philosopher eats too slowly", "All philosophers pick up their left fork simultaneously and wait for the right", "The table has fewer forks than philosophers", "Philosophers have different eating rates"], ans: 1 },
      { q: "A Spinlock differs from a Mutex in that:", opts: ["A spinlock can be used by multiple threads simultaneously", "A spinlock busy-waits (loops) rather than sleeping when the lock is unavailable", "A mutex is faster for short critical sections", "Spinlocks are only used in user space"], ans: 1 },
      { q: "Which condition, when eliminated, also prevents deadlock?", opts: ["Process creation", "Context switching", "Circular Wait", "Memory paging"], ans: 2 },
      { q: "The Producer-Consumer problem is solved using:", opts: ["A single mutex only", "Priority scheduling", "Semaphores for buffer state (empty/full) plus a mutex for buffer access", "FIFO scheduling"], ans: 2 },
    ]
  },
  {
    id: "filesystems",
    title: "File Systems & I/O",
    icon: "ri-hard-drive-2-line",
    color: "#b07fd4",
    tagline: "Persistence — keeping data alive beyond execution",
    intro: "When a process ends, its memory is gone. File systems provide persistence — a way to store data that survives reboots and power loss. The OS abstracts physical disk complexity into a simple, uniform file model. Understanding this abstraction is key to understanding storage performance.",
    sections: [
      {
        heading: "File System Abstractions",
        type: "toolkit",
        tools: [
          { name: "File",         tip: "Named collection of related data stored on disk. Has metadata: name, size, permissions, timestamps, and a data structure pointing to disk blocks." },
          { name: "Directory",    tip: "A special file containing a mapping of file names to their inodes (or equivalent). Forms a tree hierarchy in most Unix-like systems." },
          { name: "Inode",        tip: "Data structure storing a file's metadata and pointers to data blocks. Everything about a file except its name. In Unix, a file is fundamentally an inode." },
          { name: "File Descriptor", tip: "Integer handle returned by open(). The process uses it to read/write without knowing disk addresses. The OS maintains an open file table." },
          { name: "Mount Point",  tip: "Location in the directory tree where a separate file system is attached. E.g., mounting /dev/sdb at /mnt/usb makes the USB accessible at that path." },
        ]
      },
      {
        heading: "Disk Block Allocation Methods",
        type: "framework",
        items: [
          { icon: "ri-layout-row-line",  label: "Contiguous",  desc: "File occupies consecutive disk blocks. Excellent read speed. Problem: external fragmentation — hard to find space for growing files." },
          { icon: "ri-link-m",           label: "Linked",      desc: "Each block has a pointer to the next. No fragmentation. Problem: O(n) random access — must traverse from start." },
          { icon: "ri-grid-line",        label: "FAT (Linked Table)", desc: "File Allocation Table — linked list pointers stored in a separate table (not in each block). Better random access than pure linked. Used in USB drives, cameras." },
          { icon: "ri-index-finger-line",label: "Indexed",     desc: "Index block stores all pointers to data blocks. Direct random access O(1). Used in Unix (inode structure with direct + indirect blocks)." },
        ]
      },
      {
        heading: "UNIX Inode Structure",
        type: "steps",
        steps: [
          { n: "Dir",    title: "Direct Blocks (12)",      desc: "12 pointers directly to data blocks. For small files (≤48KB with 4KB blocks), no extra lookup needed." },
          { n: "1-Ind",  title: "Single Indirect Block",   desc: "One pointer to a block of pointers. With 4KB blocks and 4-byte pointers: 1024 additional blocks = 4MB extra." },
          { n: "2-Ind",  title: "Double Indirect Block",   desc: "Pointer → block of pointers → data blocks. 1024 × 1024 = 1M blocks = 4GB additional." },
          { n: "3-Ind",  title: "Triple Indirect Block",   desc: "Three levels of indirection. Supports files up to ~4TB. Rarely needed but the structure scales elegantly." },
        ]
      },
      {
        heading: "Disk Scheduling Algorithms",
        type: "compare",
        left: {
          label: "FCFS & SSTF",
          color: "#b07fd4",
          points: [
            "FCFS: serve requests in arrival order. Simple, poor seek performance.",
            "SSTF: serve nearest cylinder first. Low seek time but starvation of far requests.",
            "Both can cause excessive head movement or unfairness",
          ]
        },
        right: {
          label: "SCAN / C-SCAN (Elevator)",
          color: "#81b29a",
          points: [
            "SCAN: head sweeps across disk servicing requests, then reverses.",
            "C-SCAN: sweep one direction, jump back to start — uniform wait time.",
            "Best for high-load systems. Eliminates starvation. Used in most real systems.",
          ]
        }
      },
      {
        heading: "File System Scenario",
        type: "scenario",
        scenario: "A developer deletes a 10GB video file on a Unix system. `df` shows 10GB freed. But a log daemon that had the file open is still writing to it and the data is still there. How?",
        options: [
          { text: "The deletion was cached and not yet committed to disk", outcome: "⚠️ Journaling systems do buffer writes, but this is a deeper concept about how Unix deletion works — not about write buffering.", good: false },
          { text: "Unix deletion removes the directory entry but only frees inode/blocks when reference count reaches 0. The open file descriptor keeps the count at 1.", outcome: "✅ Correct. `unlink()` removes the name from the directory. The inode's reference count decrements. When the daemon closes the file, count reaches 0 and blocks are freed.", good: true },
          { text: "The OS made a copy of the file in /tmp before deleting it", outcome: "❌ The OS does not automatically copy files on deletion. That's not how Unix deletion works.", good: false },
          { text: "The 10GB is freed from the file but the inode is kept forever", outcome: "⚠️ Close but incorrect. The inode is freed when reference count hits 0, not kept permanently.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "An inode in Unix stores:", opts: ["The file's name", "The file's metadata and pointers to data blocks — everything except the name", "Only the file's creation time", "The directory listing"], ans: 1 },
      { q: "Contiguous disk allocation suffers from:", opts: ["Slow sequential read speed", "External fragmentation — difficulty finding space for growing files", "O(n) random access time", "High metadata overhead"], ans: 1 },
      { q: "FAT (File Allocation Table) improves on pure linked allocation by:", opts: ["Eliminating fragmentation entirely", "Storing link pointers in a separate table enabling better random access", "Using an indexed structure", "Storing data in sorted order"], ans: 1 },
      { q: "When a process calls `unlink()` on a file in Unix:", opts: ["The file's data blocks are immediately freed", "The directory entry is removed; data is freed only when reference count reaches 0", "The inode is deleted immediately", "The file is moved to trash"], ans: 1 },
      { q: "A File Descriptor is:", opts: ["The inode number on disk", "An integer handle used by a process to access an open file", "The physical disk address of the first block", "The file's permission bits"], ans: 1 },
      { q: "C-SCAN disk scheduling provides:", opts: ["Minimum seek time for each individual request", "Uniform wait time by sweeping one direction then jumping back to start", "Priority handling for system files", "Best performance for random small reads"], ans: 1 },
      { q: "The indexed allocation method (inode) enables:", opts: ["Sequential access only", "O(1) direct random access to any block", "Zero fragmentation", "Compressed storage"], ans: 1 },
      { q: "SSTF disk scheduling can cause:", opts: ["Belady's Anomaly", "Starvation of requests on far cylinders", "High seek time for all requests", "Circular Wait"], ans: 1 },
      { q: "A Mount Point allows:", opts: ["A file to span multiple disks", "A separate file system to be attached into the main directory tree", "Read-only access to a device", "Compressing files automatically"], ans: 1 },
      { q: "Triple Indirect blocks in the Unix inode structure exist to support:", opts: ["Small files that need fast access", "Files requiring more than double-indirect capacity — enabling file sizes up to ~4TB", "Directories with many subdirectories", "Network file systems"], ans: 1 },
    ]
  },
  {
    id: "virtualization",
    title: "Virtualisation & Security",
    icon: "ri-cloud-line",
    color: "#e07a5f",
    tagline: "Many machines on one. Zero trust on all.",
    intro: "Virtualisation lets one physical machine run multiple isolated OS instances simultaneously. It's the foundation of cloud computing, containers, and modern deployment. Security in OS is the mechanism by which the OS enforces that processes, users, and systems don't access what they shouldn't.",
    sections: [
      {
        heading: "Virtualisation Architecture",
        type: "steps",
        steps: [
          { n: "HW",  title: "Physical Hardware",   desc: "CPU, RAM, Disk, Network. The physical machine. All VMs ultimately share this." },
          { n: "HV",  title: "Hypervisor (VMM)",    desc: "Virtual Machine Monitor — software that creates and manages VMs. Type 1 (bare-metal): runs directly on hardware (VMware ESXi, Hyper-V). Type 2 (hosted): runs on a host OS (VirtualBox, VMware Workstation)." },
          { n: "VM",  title: "Virtual Machines",    desc: "Complete isolated OS environments. Each VM has virtual CPU, RAM, disk, and network. Think of it as a computer within a computer." },
          { n: "OS",  title: "Guest OS",            desc: "Full OS running inside the VM — unaware it's virtualised in Type 1. Has its own processes, file system, and security policies." },
          { n: "APP", title: "Applications",        desc: "User applications running inside the guest OS — completely isolated from other VMs on the same hardware." },
        ]
      },
      {
        heading: "VMs vs. Containers",
        type: "compare",
        left: {
          label: "Virtual Machines",
          color: "#e07a5f",
          points: [
            "Full OS + kernel per VM — strong isolation",
            "GB-sized images — slow to start (minutes)",
            "Strong security boundary (separate kernel)",
            "Full hardware virtualisation overhead",
            "Best for: different OS types, legacy apps, full isolation",
          ]
        },
        right: {
          label: "Containers (e.g., Docker)",
          color: "#81b29a",
          points: [
            "Share host OS kernel — lighter weight",
            "MB-sized images — start in seconds",
            "Process-level isolation (namespaces + cgroups)",
            "Near-native performance — minimal overhead",
            "Best for: microservices, CI/CD, cloud-native apps",
          ]
        }
      },
      {
        heading: "OS Security Model",
        type: "framework",
        items: [
          { icon: "ri-user-line",         label: "User Accounts",      desc: "Every process runs as a user. Permissions limit what files, devices, and system calls are accessible. Principle of least privilege." },
          { icon: "ri-file-lock-line",    label: "File Permissions",   desc: "Unix rwx for owner/group/others. Windows ACLs. Controls who can read, write, or execute each file." },
          { icon: "ri-lock-password-line",label: "Authentication",      desc: "Verifying identity — passwords, SSH keys, biometrics, MFA. The first line of access control." },
          { icon: "ri-shield-user-line",  label: "Privilege Escalation", desc: "The attack of gaining higher privileges (root/admin) than intended. The most targeted OS vulnerability class." },
          { icon: "ri-bug-line",          label: "Buffer Overflow",    desc: "Writing beyond allocated memory corrupts stack/heap. Classic exploit to overwrite return addresses and hijack execution. Mitigated by ASLR, stack canaries, NX bits." },
          { icon: "ri-eye-line",          label: "Audit Logging",      desc: "Recording system calls, file access, and login events. Critical for forensics and detecting intrusions." },
        ]
      },
      {
        heading: "Security Mitigations Built Into Modern OS",
        type: "toolkit",
        tools: [
          { name: "ASLR",         tip: "Address Space Layout Randomisation — randomises where processes, stack, heap are loaded in memory. Makes buffer overflow exploits unreliable." },
          { name: "Stack Canary", tip: "Sentinel value placed before the return address. If a buffer overflow overwrites it, the OS detects and terminates the process before the exploit runs." },
          { name: "NX / DEP",     tip: "No-Execute bit (Intel NX / AMD XD) — marks stack/heap as non-executable. Prevents injected shellcode from running." },
          { name: "SELinux / AppArmor", tip: "Mandatory Access Control — even root processes are constrained to only their declared permissions. Limits blast radius of a compromise." },
          { name: "Namespaces (Linux)", tip: "Isolate process views of PIDs, networks, filesystems, and users. The foundation of container security." },
        ]
      },
      {
        heading: "Virtualisation Scenario",
        type: "scenario",
        scenario: "A cloud provider runs 100 customers' VMs on shared physical hardware. Customer A's VM has a vulnerability exploited by a hacker. Can the hacker access Customer B's data?",
        options: [
          { text: "Yes — they share physical RAM so data bleeds across", outcome: "⚠️ In theory, side-channel attacks (like Spectre/Meltdown) can leak data across VM boundaries. This is why cloud providers invest heavily in hypervisor hardening and physical isolation for sensitive workloads.", good: false },
          { text: "No — the hypervisor provides complete isolation between VMs. Compromising one VM doesn't give access to another.", outcome: "✅ Under a correctly implemented hypervisor, VMs are fully isolated. The hypervisor mediates all hardware access and VM-to-VM communication is impossible without explicit networking.", good: true },
          { text: "Only if both VMs are on the same physical server", outcome: "⚠️ Being on the same physical server is expected — but proper hypervisor isolation prevents cross-VM access regardless.", good: false },
          { text: "Yes — because they share the same OS kernel", outcome: "❌ VMs do NOT share the kernel. Each VM has its own guest OS and kernel. Containers share the kernel, not VMs.", good: false },
        ]
      }
    ],
    quiz: [
      { q: "A Type 1 Hypervisor (bare-metal) runs:", opts: ["On top of a host operating system", "Directly on the physical hardware with no underlying OS", "Inside a container", "As a user-space application"], ans: 1 },
      { q: "Containers differ from VMs in that containers:", opts: ["Are slower to start", "Provide stronger security isolation", "Share the host OS kernel rather than having their own", "Require more RAM per instance"], ans: 2 },
      { q: "ASLR (Address Space Layout Randomisation) mitigates:", opts: ["Deadlocks in concurrent programs", "Buffer overflow exploits by randomising memory layout", "Page faults in virtual memory", "Race conditions in file I/O"], ans: 1 },
      { q: "The principle of least privilege in OS security means:", opts: ["All users have administrator access", "Every process/user has only the minimum permissions needed for its task", "Security policies are kept as simple as possible", "Only the OS kernel has full privileges"], ans: 1 },
      { q: "A Stack Canary is used to detect:", opts: ["Memory leaks", "Buffer overflow attacks that overwrite the return address", "Deadlocks in concurrent processes", "Unauthorised file access"], ans: 1 },
      { q: "NX (No-Execute) bit prevents:", opts: ["Stack memory from being read", "Heap fragmentation", "Injected shellcode on non-executable memory regions from running", "Privilege escalation through system calls"], ans: 2 },
      { q: "Linux Namespaces form the foundation of:", opts: ["Virtual memory management", "File permission enforcement", "Container isolation (Docker, Kubernetes)", "CPU scheduling policies"], ans: 2 },
      { q: "In the cloud VM isolation scenario, cross-VM data leakage via Spectre/Meltdown is an example of:", opts: ["Hypervisor failure", "Side-channel attacks exploiting CPU speculative execution", "Container escape vulnerability", "Buffer overflow in the guest OS"], ans: 1 },
      { q: "SELinux / AppArmor implements:", opts: ["Discretionary Access Control only", "Mandatory Access Control — constraining even root processes to declared permissions", "Network firewall rules at the OS level", "Disk encryption"], ans: 1 },
      { q: "The key advantage of containers over VMs for microservices is:", opts: ["Stronger security boundaries", "Full OS isolation per service", "MB-sized images that start in seconds with near-native performance", "No dependency on the host OS"], ans: 2 },
    ]
  },
];

/* ═══════════════════════════════════════════════════
   COMPONENT — identical interaction pattern to SoftSkills
═══════════════════════════════════════════════════ */
export default function OperatingSystem() {
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

  const checkedCount = chapter.quiz.filter((_, qi) => checked[`${activeChapter}_${qi}`]).length;
  const allChecked   = chapter.quiz.every((_, qi) => checked[`${activeChapter}_${qi}`]);

  return (
    <>
      <HomeNavbar />
      <div className="os-layout">

        {/* ── SIDEBAR ── */}
        <aside className="os-sidebar">
          <div className="os-sidebar-header">
            <i className="ri-computer-line" />
            <div>
              <h2>Operating Systems</h2>
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

        {/* ── MAIN ── */}
        <main className="os-main" ref={contentRef}>

          {/* Hero */}
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
            {!quizMode && (
              <button className="os-quiz-trigger" style={{ borderColor: chapter.color + "50", color: chapter.color }}
                onClick={() => setQuizMode(true)}>
                <i className="ri-question-line" /> Jump to Chapter Quiz
              </button>
            )}
          </div>

          {/* Sections */}
          {!quizMode && (
            <div className="os-sections">
              {chapter.sections.map((sec, si) => <Section key={si} sec={sec} color={chapter.color} />)}
              <div className="os-quiz-cta" style={{ borderColor: chapter.color + "30" }}>
                <div className="os-quiz-cta-left">
                  <i className="ri-quill-pen-line" style={{ color: chapter.color }} />
                  <div>
                    <div className="os-quiz-cta-title">Chapter Quiz</div>
                    <div className="os-quiz-cta-sub">10 questions · Test your understanding</div>
                  </div>
                </div>
                <button className="os-start-quiz-btn"
                  style={{ background: chapter.color, boxShadow: `0 4px 20px ${chapter.color}40` }}
                  onClick={() => { setQuizMode(true); if (contentRef.current) contentRef.current.scrollTop = 0; }}>
                  Start Quiz <i className="ri-arrow-right-line" />
                </button>
              </div>
            </div>
          )}

          {/* Quiz */}
          {quizMode && (
            <div className="os-quiz">
              <div className="os-quiz-header">
                <button className="os-back-btn" onClick={() => setQuizMode(false)}>
                  <i className="ri-arrow-left-line" /> Back to Chapter
                </button>
                <div className="os-quiz-score-badge" style={{ borderColor: chapter.color + "40" }}>
                  <span style={{ color: chapter.color }}>{quizScore()}</span> / {chapter.quiz.length}
                </div>
              </div>

              <div className="os-quiz-questions">
                {chapter.quiz.map((q, qi) => {
                  const key     = `${activeChapter}_${qi}`;
                  const userAns = quizAnswers[key];
                  const isChkd  = checked[key];
                  const isCorr  = userAns === q.ans;
                  const hasAns  = userAns !== undefined;

                  return (
                    <div key={qi} className={`os-q-card ${isChkd ? (isCorr ? "q-correct" : "q-wrong") : ""}`}
                      style={{ "--cc": chapter.color }}>
                      <div className="os-q-top">
                        <span className="os-q-num" style={{ color: chapter.color }}>Q{qi + 1}</span>
                        {isChkd && (
                          <span className={`os-q-verdict ${isCorr ? "verd-correct" : "verd-wrong"}`}>
                            {isCorr ? <><i className="ri-checkbox-circle-line" /> Correct</> : <><i className="ri-close-circle-line" /> Wrong</>}
                          </span>
                        )}
                      </div>
                      <p className="os-q-text">{q.q}</p>
                      <div className="os-opts">
                        {q.opts.map((opt, oi) => {
                          const isSel   = userAns === oi;
                          const isRight = isChkd && oi === q.ans;
                          const isWrong = isChkd && isSel && oi !== q.ans;
                          return (
                            <button key={oi}
                              className={`os-opt ${isSel && !isChkd ? "os-opt-sel" : ""} ${isRight ? "os-opt-right" : ""} ${isWrong ? "os-opt-wrong" : ""}`}
                              style={isSel && !isChkd ? { borderColor: chapter.color, color: chapter.color, background: chapter.color + "12" } : {}}
                              onClick={() => setQuizAns(key, oi)} disabled={isChkd}
                            >
                              <span className="os-opt-letter">{String.fromCharCode(65 + oi)}</span>
                              {opt}
                              {isRight && <i className="ri-check-line os-opt-icon" style={{ color: "#81b29a" }} />}
                              {isWrong && <i className="ri-close-line os-opt-icon" style={{ color: "#e07a5f" }} />}
                            </button>
                          );
                        })}
                      </div>
                      {!isChkd && (
                        <div className="os-check-row">
                          <button className="os-check-btn"
                            style={hasAns ? { borderColor: chapter.color + "60", color: chapter.color } : {}}
                            onClick={() => checkOne(key)} disabled={!hasAns}>
                            <i className="ri-shield-check-line" /> Check Answer
                          </button>
                          {!hasAns && <span className="os-check-hint">Select an option first</span>}
                        </div>
                      )}
                      {isChkd && !isCorr && (
                        <p className="os-correct-reveal">
                          <i className="ri-lightbulb-flash-line" style={{ color: "#c9a96e" }} />
                          Correct: <strong style={{ color: "#81b29a" }}>{q.opts[q.ans]}</strong>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {allChecked && !completedChapters.has(activeChapter) && (
                <div className="os-quiz-finish">
                  <div className="os-final-score" style={{ borderColor: chapter.color + "30" }}>
                    <div className="os-final-num" style={{ color: chapter.color }}>{quizScore()}<span>/10</span></div>
                    <div className="os-final-label">
                      {quizScore() >= 8 ? "🎉 Excellent!" : quizScore() >= 6 ? "👍 Good work" : "📚 Review recommended"}
                    </div>
                  </div>
                  <button className="os-finish-btn"
                    style={{ background: chapter.color, boxShadow: `0 4px 20px ${chapter.color}40` }}
                    onClick={() => setCompleted(p => new Set([...p, activeChapter]))}>
                    <i className="ri-checkbox-circle-line" /> Mark Chapter Complete
                    {activeChapter < CHAPTERS.length - 1 && " & Next →"}
                  </button>
                </div>
              )}

              {completedChapters.has(activeChapter) && (
                <div className="os-quiz-finish">
                  <div className="os-completed-banner">
                    <i className="ri-checkbox-circle-fill" style={{ color: "#81b29a", fontSize: "1.5rem" }} />
                    <span>Chapter completed! Score: <strong style={{ color: "#81b29a" }}>{quizScore()}/10</strong></span>
                  </div>
                  {activeChapter < CHAPTERS.length - 1 && (
                    <button className="os-finish-btn"
                      style={{ background: CHAPTERS[activeChapter + 1].color, boxShadow: `0 4px 20px ${CHAPTERS[activeChapter + 1].color}40` }}
                      onClick={() => switchChapter(activeChapter + 1)}>
                      Next: {CHAPTERS[activeChapter + 1].title} <i className="ri-arrow-right-line" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

/* ── SECTION RENDERER ── */
function Section({ sec, color }) {
  const [activeScenario, setActiveScenario] = useState(null);

  if (sec.type === "framework") return (
    <div className="sec-block">
      <h2 className="sec-heading">{sec.heading}</h2>
      <div className="framework-grid">
        {sec.items.map((item, i) => (
          <div key={i} className="fw-card" style={{ "--cc": color, animationDelay: `${i * 0.06}s` }}>
            <div className="fw-icon" style={{ color, background: color + "15" }}><i className={item.icon} /></div>
            <div className="fw-label" style={{ color }}>{item.label}</div>
            <div className="fw-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (sec.type === "cards_grid") return (
    <div className="sec-block">
      <h2 className="sec-heading">{sec.heading}</h2>
      <div className="cards-grid-sec">
        {sec.cards.map((card, i) => (
          <div key={i} className="sg-card" style={{ "--cc": color, animationDelay: `${i * 0.05}s` }}>
            <div className="sg-icon" style={{ color, background: color + "15" }}><i className={card.icon} /></div>
            <div className="sg-title">{card.title}</div>
            <div className="sg-desc">{card.desc}</div>
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
          {sec.left.points.map((p, i) => (
            <div key={i} className="compare-point" style={{ borderLeftColor: sec.left.color + "50" }}>
              <i className="ri-close-circle-line" style={{ color: sec.left.color }} />{p}
            </div>
          ))}
        </div>
        <div className="compare-divider" />
        <div className="compare-col">
          <div className="compare-label" style={{ color: sec.right.color }}>{sec.right.label}</div>
          {sec.right.points.map((p, i) => (
            <div key={i} className="compare-point" style={{ borderLeftColor: sec.right.color + "50" }}>
              <i className="ri-checkbox-circle-line" style={{ color: sec.right.color }} />{p}
            </div>
          ))}
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
            <div className="step-n" style={{ color, borderColor: color + "40", background: color + "10" }}>{step.n}</div>
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

  if (sec.type === "insight_block") return (
    <div className="sec-block">
      <h2 className="sec-heading">{sec.heading}</h2>
      <div className="insight-block" style={{ borderLeftColor: color, background: color + "08" }}>
        <i className="ri-double-quotes-l insight-quote-icon" style={{ color: color + "40" }} />
        <p className="insight-text">{sec.insight}</p>
        <div className="insight-takeaway" style={{ borderTopColor: color + "20" }}>
          <i className="ri-lightbulb-flash-line" style={{ color: "#c9a96e" }} />
          <span>{sec.takeaway}</span>
        </div>
      </div>
    </div>
  );

  if (sec.type === "scenario") return (
    <div className="sec-block">
      <h2 className="sec-heading">{sec.heading}</h2>
      <div className="scenario-block" style={{ borderColor: color + "30" }}>
        <div className="scenario-label" style={{ color }}>
          <i className="ri-focus-3-line" /> Scenario
        </div>
        <p className="scenario-text">{sec.scenario}</p>
        <div className="scenario-opts">
          {sec.options.map((opt, i) => (
            <div key={i}>
              <button
                className={`scenario-opt ${activeScenario === i ? "sc-active" : ""}`}
                style={activeScenario === i ? {
                  borderColor: opt.good ? "#81b29a60" : "#e07a5f60",
                  background: opt.good ? "rgba(129,178,154,0.06)" : "rgba(224,122,95,0.06)"
                } : {}}
                onClick={() => setActiveScenario(activeScenario === i ? null : i)}
              >
                <span className="sc-opt-letter" style={{ background: color + "20", color }}>{String.fromCharCode(65 + i)}</span>
                <span>{opt.text}</span>
                <i className={`ri-arrow-${activeScenario === i ? "up" : "down"}-s-line sc-arrow`} />
              </button>
              {activeScenario === i && (
                <div className={`scenario-outcome ${opt.good ? "outcome-good" : "outcome-bad"}`}>
                  {opt.outcome}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return null;
}
