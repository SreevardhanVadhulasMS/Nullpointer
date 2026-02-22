import { useState, useEffect, useRef } from "react";

const NODES = [
  { id: "learn",    label: "Learn",    icon: "◈", description: "Master core concepts through structured paths", stat: "Industry Specific",  color: "#f7ba52", angle: -90  },
  { id: "practice", label: "Practice", icon: "⬡", description: "Solve real engineering challenges hands-on",    stat: "300+ Problems", color: "#ff8c42", angle: -18  },
  { id: "build",    label: "Build",    icon: "◇", description: "Ship production systems from scratch",          stat: "Precise Projects",  color: "#e8c547", angle: 54   },
  { id: "discuss",  label: "Discuss",  icon: "◎", description: "Exchange ideas with elite engineers",           stat: " Quality Members",   color: "#f7ba52", angle: 126  },
  { id: "master",   label: "Master",   icon: "⬟", description: "Achieve true depth in your craft",             stat: "∞ Growth",      color: "#ffd77a", angle: 198  },
];

const R = 195, CX = 300, CY = 300;
const toRad = (d) => (d * Math.PI) / 180;
const nodePos = (angle) => ({ x: CX + R * Math.cos(toRad(angle)), y: CY + R * Math.sin(toRad(angle)) });

function EdgePath({ from, to, active, index }) {
  const ref = useRef(null);
  const [len, setLen] = useState(600);
  useEffect(() => { if (ref.current) setLen(ref.current.getTotalLength()); }, []);
  const d = `M ${from.x} ${from.y} Q ${CX} ${CY} ${to.x} ${to.y}`;
  return (
    <>
      <path d={d} fill="none" stroke="#f7ba52" strokeWidth="1" opacity="0.07" strokeLinecap="round" />
      <path
        ref={ref} d={d} fill="none" stroke="url(#edgeGrad)"
        strokeWidth={active ? "2.5" : "1.5"}
        opacity={active ? "0.9" : "0.25"}
        strokeLinecap="round"
        strokeDasharray={len}
        style={{ animation: `dashFlow ${2.4 + index * 0.28}s ease-in-out ${index * 0.15}s infinite alternate`, transition: "opacity 0.35s, stroke-width 0.3s" }}
      />
    </>
  );
}

export default function ConceptFlow() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const focused = hovered || active;

  return (
    <div style={s.wrap}>
      <style>{css}</style>

      <svg viewBox="0 0 600 600" width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
        <defs>
          <radialGradient id="ambientGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f7ba52" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#f7ba52" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7ba52" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff8c42" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f7ba52" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Ambient orb */}
        <circle cx={CX} cy={CY} r="185" fill="url(#ambientGrad)" style={{ animation: "orbPulse 4s ease-in-out infinite" }} />

        {/* Orbit ring */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f7ba52" strokeWidth="0.5" strokeDasharray="3 9" opacity="0.12" />

        {/* Edges */}
        {NODES.map((node, i) => {
          const next = NODES[(i + 1) % NODES.length];
          const isActive = focused === node.id || focused === next.id;
          return <EdgePath key={node.id} from={nodePos(node.angle)} to={nodePos(next.angle)} active={isActive} index={i} />;
        })}

        {/* Spokes */}
        {NODES.map((node) => {
          const pos = nodePos(node.angle);
          const on = focused === node.id;
          return (
            <line key={`sp-${node.id}`} x1={CX} y1={CY} x2={pos.x} y2={pos.y}
              stroke={node.color} strokeWidth={on ? "1.5" : "0.5"}
              opacity={on ? "0.5" : "0.08"} strokeDasharray="3 7"
              style={{ transition: "all 0.3s ease" }} />
          );
        })}

        {/* Center dot */}
        <circle cx={CX} cy={CY} r="3" fill="#f7ba52" opacity="0.7" filter="url(#glow)" />

        {/* Nodes */}
        {NODES.map((node, i) => {
          const pos = nodePos(node.angle);
          const on = focused === node.id;
          const delay = `${i * 0.1}s`;

          return (
            <g key={node.id} transform={`translate(${pos.x},${pos.y})`}
              style={{ cursor: "pointer", opacity: mounted ? 1 : 0, transition: `opacity 0.6s ease ${delay}` }}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActive(active === node.id ? null : node.id)}>

              {/* Pulse ring */}
              {on && <circle r="52" fill="none" stroke={node.color} strokeWidth="1" opacity="0.3" className="pulse-ring" />}

              {/* Card bg */}
              <rect x="-54" y="-25" width="108" height="50" rx="13"
                fill={on ? "rgba(247,186,82,0.1)" : "rgba(8,14,30,0.72)"}
                stroke={node.color} strokeWidth={on ? "2" : "1.5"}
                filter={on ? "url(#glowStrong)" : "url(#glow)"}
                style={{ transition: "all 0.3s ease" }} />

              {/* Corner dots */}
              {[[-54,-25],[54,-25],[-54,25],[54,25]].map(([cx,cy],di) => (
                <circle key={di} cx={cx} cy={cy} r="2.5" fill={node.color} opacity={on ? "1" : "0.45"} style={{ transition: "opacity 0.3s" }} />
              ))}

              {/* Icon above card */}
              <text y="-37" textAnchor="middle" fill={node.color} fontSize="13"
                opacity={on ? "1" : "0.35"} style={{ transition: "opacity 0.3s", userSelect: "none" }}>
                {node.icon}
              </text>

              {/* Label */}
              <text textAnchor="middle" dominantBaseline="middle"
                fill={node.color} fontSize={on ? "17" : "15"} fontWeight="700"
                fontFamily="'DM Mono', monospace" letterSpacing="1.5"
                style={{ transition: "font-size 0.3s", userSelect: "none" }}>
                {node.label}
              </text>

              {/* ── Inline tooltip directly below the card ── */}
              {on && (
                <g style={{ animation: "tooltipIn 0.22s ease forwards" }}>
                  {/* tooltip background */}
                  <rect
                    x="-80" y="34"
                    width="160" height="52"
                    rx="10"
                    fill="rgba(8,14,30,0.95)"
                    stroke={node.color}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                  {/* connector tick */}
                  <polygon
                    points="0,26 -7,34 7,34"
                    fill="rgba(8,14,30,0.95)"
                    stroke={node.color}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                  {/* description text */}
                  <text
                    x="0" y="52"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.55)"
                    fontSize="9.5"
                    fontFamily="'DM Mono', monospace"
                    style={{ userSelect: "none" }}>
                    {node.description}
                  </text>
                  {/* stat text */}
                  <text
                    x="0" y="70"
                    textAnchor="middle"
                    fill={node.color}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="'DM Mono', monospace"
                    style={{ userSelect: "none" }}>
                    {node.stat}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const s = {
  wrap: {
    position: "relative",
    width: "min(860px, 90vw)",
    height: "min(860px, 90vw)",
    background: "transparent",
    borderRadius: "20px",
    overflow: "visible",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');

  @keyframes orbPulse {
    0%,100% { transform: scale(1); opacity:1; }
    50%      { transform: scale(1.07); opacity:0.65; }
  }
  @keyframes dashFlow {
    0%   { stroke-dashoffset: 600; opacity:0.15; }
    50%  { opacity:0.85; }
    100% { stroke-dashoffset: 0;   opacity:0.15; }
  }
  @keyframes pulseRing {
    0%   { r:52; opacity:0.4; }
    100% { r:68; opacity:0; }
  }
  @keyframes tooltipIn {
    from { opacity:0; transform: translateY(-4px); }
    to   { opacity:1; transform: translateY(0); }
  }
  .pulse-ring { animation: pulseRing 1.6s ease-out infinite; }
`;
