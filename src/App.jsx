import { useState, useEffect, useRef } from "react";
import { Zap, Mic, Code, RefreshCw, MessageSquare, Crosshair, Wrench, TrendingUp, Phone } from "lucide-react";

// ═══════════════════════════════════════════
// GRAND RIVER LABS — Max Legibility Amber Cyber
// ═══════════════════════════════════════════

const COLORS = {
  bg: "#0c0a08", bg2: "#110e0b", surface: "#1c1814", surface2: "#26211c", surface3: "#322c24",
  t1: "#fefcf8", t2: "#e8dcc4", t3: "#b8a888", t4: "#7a6e58",
  accent: "#e89a3a", accent2: "#cc4422", accent3: "#3a9e8a", accent4: "#5aaa4a",
  border: "rgba(254,252,248,0.08)", border2: "rgba(254,252,248,0.13)", border3: "rgba(254,252,248,0.20)",
};

// ═══════════ ANIMATED GRID BACKGROUND ═══════════
function CyberGrid() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth * 1; canvas.height = canvas.offsetHeight * 1; };
    resize();
    window.addEventListener("resize", resize);

    const spacing = 60;
    let time = 0;

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;
      const mx = mouse.current.x, my = mouse.current.y;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing, y = j * spacing;
          const dx = x - mx, dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 200);
          const wave = Math.sin(time + i * 0.3 + j * 0.2) * 0.3 + 0.3;
          const alpha = 0.03 + proximity * 0.12 + wave * 0.02;

          ctx.beginPath();
          ctx.arc(x, y, 1 + proximity * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = proximity > 0.1
            ? `rgba(232,154,58,${alpha})`
            : `rgba(184,168,136,${alpha})`;
          ctx.fill();

          if (proximity > 0.3) {
            ctx.beginPath();
            ctx.arc(x, y, 6 + proximity * 8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232,154,58,${proximity * 0.04})`;
            ctx.fill();
          }
        }
      }
      // Horizontal scan lines
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = `rgba(232,154,58,0.02)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      animRef.current = requestAnimationFrame(draw);
    };

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    canvas.addEventListener("mousemove", handleMouse);
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }} />;
}

// ═══════════ TYPING TERMINAL ═══════════
function Terminal() {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const script = [
    { prefix: "λ", text: "initializing grand_river_labs...", color: COLORS.t3 },
    { prefix: "✓", text: "ai_engine: online", color: COLORS.accent4 },
    { prefix: "✓", text: "voice_lab: tts-pipeline — online", color: COLORS.accent4 },
    { prefix: "✓", text: "channels: web, whatsapp, telegram, sms, phone", color: COLORS.accent3 },
    { prefix: "✓", text: "prompt_security: enabled", color: COLORS.accent },
    { prefix: "⚡", text: "ready. accepting connections.", color: COLORS.accent },
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (lineIndex >= script.length) return;
    const line = script[lineIndex];
    if (charIndex <= line.text.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(line.text.slice(0, charIndex));
        setCharIndex(c => c + 1);
      }, 18 + Math.random() * 22);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, { ...line, text: line.text }]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex(i => i + 1);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex]);

  const containerStyle = {
    background: "rgba(12,10,8,0.85)", border: `1px solid ${COLORS.border2}`,
    borderRadius: 3, padding: "14px 16px", fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.72rem", lineHeight: 1.7, minHeight: 160, backdropFilter: "blur(12px)",
  };
  const headerStyle = {
    display: "flex", gap: 5, marginBottom: 10, paddingBottom: 8,
    borderBottom: `1px solid ${COLORS.border}`,
  };
  const dotStyle = (c) => ({
    width: 7, height: 7, borderRadius: 1, background: c, opacity: 0.6,
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={dotStyle(COLORS.accent2)} /><div style={dotStyle(COLORS.accent)} /><div style={dotStyle(COLORS.accent4)} />
        <span style={{ marginLeft: "auto", fontSize: "0.58rem", color: COLORS.t4, letterSpacing: "0.06em" }}>SYSTEM BOOT</span>
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.color, opacity: 0.9 }}>
          <span style={{ color: COLORS.accent, marginRight: 8 }}>{l.prefix}</span>{l.text}
        </div>
      ))}
      {lineIndex < script.length && (
        <div style={{ color: script[lineIndex]?.color || COLORS.t3 }}>
          <span style={{ color: COLORS.accent, marginRight: 8 }}>{script[lineIndex]?.prefix}</span>
          {currentLine}
          <span style={{ opacity: showCursor ? 1 : 0, color: COLORS.accent, marginLeft: 1 }}>▊</span>
        </div>
      )}
      {lineIndex >= script.length && (
        <div style={{ color: COLORS.t4, marginTop: 4 }}>
          <span style={{ opacity: showCursor ? 1 : 0, color: COLORS.accent }}>▊</span>
        </div>
      )}
    </div>
  );
}

// ═══════════ STATUS INDICATOR ═══════════
function StatusIndicator({ icon, label, color }) {
  return (
    <div style={{
      background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 3,
      padding: "16px 18px", display: "flex", flexDirection: "column", gap: 6, position: "relative",
      overflow: "hidden", transition: "all 0.3s",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.4 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color }}>{icon}</span>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: COLORS.t1, letterSpacing: "0.02em", textTransform: "uppercase" }}>
          {label}
        </span>
      </div>
    </div>
  );
}

// ═══════════ PULSE STATUS RING ═══════════
function StatusRing({ label, status, color, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-10px)", transition: "all 0.5s ease",
    }}>
      <div style={{ position: "relative", width: 28, height: 28 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: 2,
          border: `2px solid ${color}`, opacity: 0.3,
        }} />
        <div style={{
          position: "absolute", inset: 4, borderRadius: 1, background: color,
          boxShadow: `0 0 10px ${color}40`, animation: "pulse-glow 2s ease-in-out infinite",
        }} />
      </div>
      <div>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.68rem", fontWeight: 600, color: COLORS.t1, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{status}</div>
      </div>
    </div>
  );
}

// ═══════════ NETWORK PULSE VISUALIZER ═══════════
function NetworkPulse() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const W = 340, H = 140;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = "100%"; canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    // Node types: hub (large, bright), relay (medium), edge (small, dim)
    const nodeData = [
      { x: 170, y: 70, type: "hub", label: "CORE" },
      { x: 60,  y: 35, type: "relay" }, { x: 100, y: 105, type: "relay" },
      { x: 250, y: 40, type: "relay" }, { x: 270, y: 110, type: "relay" },
      { x: 25,  y: 85, type: "edge" },  { x: 135, y: 18,  type: "edge" },
      { x: 210, y: 125, type: "edge" }, { x: 310, y: 72,  type: "edge" },
      { x: 55,  y: 125, type: "edge" }, { x: 220, y: 18,  type: "edge" },
    ];

    const nodes = nodeData.map((n, i) => ({
      ...n, i, phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      baseX: n.x, baseY: n.y,
    }));

    // Pre-compute connections with max distance per type pair
    const connections = [];
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (j <= i) return;
        const maxDist = (a.type === "hub" || b.type === "hub") ? 180 : 110;
        const dx = a.baseX - b.baseX, dy = a.baseY - b.baseY;
        if (Math.sqrt(dx * dx + dy * dy) < maxDist) {
          connections.push({ a: i, b: j, packets: [], lastSpawn: 0,
            spawnRate: (a.type === "hub" || b.type === "hub") ? 1.8 : 3.5 + Math.random() * 2,
          });
        }
      });
    });

    let time = 0;
    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, W, H);

      // Gentle node drift
      nodes.forEach(n => {
        n.x = n.baseX + Math.sin(time * 0.4 + n.phase) * 4;
        n.y = n.baseY + Math.cos(time * 0.3 + n.phase * 1.3) * 3;
      });

      // Draw connections
      connections.forEach(conn => {
        const a = nodes[conn.a], b = nodes[conn.b];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pulse = (Math.sin(time * 1.5 + conn.a + conn.b) + 1) / 2;
        const isHub = a.type === "hub" || b.type === "hub";
        const baseAlpha = isHub ? 0.1 : 0.04;

        // Connection line
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(232,154,58,${baseAlpha + pulse * 0.06})`);
        grad.addColorStop(0.5, `rgba(232,154,58,${baseAlpha + pulse * 0.1})`);
        grad.addColorStop(1, `rgba(232,154,58,${baseAlpha + pulse * 0.06})`);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = grad; ctx.lineWidth = isHub ? 1 : 0.6; ctx.stroke();

        // Spawn data packets
        if (time - conn.lastSpawn > conn.spawnRate) {
          conn.lastSpawn = time;
          const forward = Math.random() > 0.3;
          conn.packets.push({ t: 0, speed: 0.3 + Math.random() * 0.4, forward, trail: [] });
        }

        // Update & draw packets
        conn.packets = conn.packets.filter(p => {
          p.t += p.speed * 0.016;
          if (p.t > 1) return false;
          const progress = p.forward ? p.t : 1 - p.t;
          const px = a.x + dx * progress, py = a.y + dy * progress;

          // Trail
          p.trail.push({ x: px, y: py, age: 0 });
          p.trail = p.trail.filter(pt => { pt.age += 0.016; return pt.age < 0.25; });

          // Draw trail
          p.trail.forEach(pt => {
            const ta = 1 - pt.age / 0.25;
            ctx.beginPath(); ctx.arc(pt.x, pt.y, 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232,154,58,${ta * 0.2})`;
            ctx.fill();
          });

          // Draw packet head
          const glow = ctx.createRadialGradient(px, py, 0, px, py, 6);
          glow.addColorStop(0, "rgba(232,154,58,0.7)");
          glow.addColorStop(0.4, "rgba(232,154,58,0.15)");
          glow.addColorStop(1, "rgba(232,154,58,0)");
          ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fillStyle = glow; ctx.fill();

          ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(254,252,248,0.9)";
          ctx.fill();

          return true;
        });
      });

      // Draw nodes
      nodes.forEach(n => {
        const p = (Math.sin(time * 1.2 + n.phase) + 1) / 2;
        const isHub = n.type === "hub";
        const isRelay = n.type === "relay";
        const radius = isHub ? 5 : isRelay ? 3 : 2;

        // Outer pulse ring (hub + relay only)
        if (isHub || isRelay) {
          const ringRadius = radius + 6 + p * 6;
          ctx.beginPath(); ctx.arc(n.x, n.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(232,154,58,${(isHub ? 0.08 : 0.04) * p})`;
          ctx.lineWidth = 0.8; ctx.stroke();
        }

        // Glow
        if (isHub) {
          const hGlow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 20);
          hGlow.addColorStop(0, `rgba(232,154,58,${0.12 + p * 0.08})`);
          hGlow.addColorStop(1, "rgba(232,154,58,0)");
          ctx.beginPath(); ctx.arc(n.x, n.y, 20, 0, Math.PI * 2);
          ctx.fillStyle = hGlow; ctx.fill();
        }

        // Node body
        ctx.beginPath(); ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        if (isHub) {
          ctx.fillStyle = `rgba(232,154,58,${0.8 + p * 0.2})`;
        } else if (isRelay) {
          ctx.fillStyle = `rgba(232,154,58,${0.4 + p * 0.3})`;
        } else {
          ctx.fillStyle = `rgba(184,168,136,${0.25 + p * 0.2})`;
        }
        ctx.fill();

        // Bright center dot
        if (isHub || isRelay) {
          ctx.beginPath(); ctx.arc(n.x, n.y, isHub ? 2 : 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(254,252,248,${0.6 + p * 0.4})`;
          ctx.fill();
        }

        // Hub label
        if (isHub && n.label) {
          ctx.font = "7px 'Share Tech Mono', monospace";
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(232,154,58,${0.4 + p * 0.2})`;
          ctx.fillText(n.label, n.x, n.y - 12);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 3, padding: "12px 14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: COLORS.t4, letterSpacing: "0.08em", textTransform: "uppercase" }}>Network Activity</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.accent4, boxShadow: `0 0 6px ${COLORS.accent4}` }} />
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.48rem", color: COLORS.accent4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Live</span>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}

// ═══════════ SCROLL REVEAL WRAPPER ═══════════
function Reveal({ children, delay = 0, style = {} }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`, ...style,
    }}>{children}</div>
  );
}

// ═══════════ SECTION COMPONENTS ═══════════
function ServiceCard({ icon, tag, title, desc, features, color, accent, span }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.surface, border: `1px solid ${hovered ? COLORS.border3 : COLORS.border}`,
        borderRadius: 3, padding: span ? "2.2rem" : "1.8rem", position: "relative", overflow: "hidden",
        transition: "all 0.35s", transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 40px ${accent}10` : "none",
        gridColumn: span ? "1 / -1" : undefined,
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
      }} />
      <div style={{
        position: "absolute", top: 6, right: 6, width: 12, height: 12,
        borderTop: `1.5px solid ${COLORS.border3}`, borderRight: `1.5px solid ${COLORS.border3}`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 2, display: "grid", placeItems: "center",
          background: `${accent}12`, border: `1px solid ${accent}20`, color: accent,
        }}>{icon}</div>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", textTransform: "uppercase",
          letterSpacing: "0.1em", padding: "4px 10px", borderRadius: 2,
          background: COLORS.surface2, color: COLORS.t3, border: `1px solid ${COLORS.border}`,
        }}>{tag}</span>
      </div>
      <h3 style={{
        fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "1rem",
        letterSpacing: "0.03em", marginBottom: 8, textTransform: "uppercase",
      }}>{title}</h3>
      <p style={{
        color: COLORS.t2, fontSize: "0.92rem", lineHeight: 1.8, marginBottom: 16, fontWeight: 500,
      }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {features.map((f, i) => (
          <span key={i} style={{
            fontSize: "0.72rem", fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.02em",
            padding: "4px 10px", borderRadius: 2, background: "rgba(232,154,58,0.04)",
            color: hovered ? COLORS.t2 : COLORS.t3, border: `1px solid ${hovered ? COLORS.border3 : COLORS.border}`,
            transition: "all 0.3s",
          }}>{f}</span>
        ))}
      </div>
    </div>
  );
}

function LabCard({ num, title, desc, status, statusColor, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          background: COLORS.surface, border: `1px solid ${hov ? COLORS.border3 : COLORS.border}`,
          borderRadius: 3, padding: "1.5rem", position: "relative", overflow: "hidden",
          transition: "all 0.35s", transform: hov ? "translateY(-2px)" : "none",
        }}
      >
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: COLORS.accent, letterSpacing: "0.08em", marginBottom: 12, opacity: 0.6 }}>{num}</div>
        <h4 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.03em", marginBottom: 6, textTransform: "uppercase" }}>{title}</h4>
        <p style={{ fontSize: "0.82rem", color: COLORS.t3, lineHeight: 1.6, fontWeight: 500 }}>{desc}</p>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12,
          fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", textTransform: "uppercase",
          letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 2,
          background: `${statusColor}15`, color: statusColor, border: `1px solid ${statusColor}20`,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: 1, background: statusColor, boxShadow: `0 0 6px ${statusColor}` }} />
          {status}
        </div>
      </div>
    </Reveal>
  );
}

// ═══════════ MAIN APP ═══════════
export default function GrandRiverLabs() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionStyle = { padding: "6rem 0", borderTop: `1px solid ${COLORS.border}` };
  const wrapStyle = { maxWidth: 1180, margin: "0 auto", padding: "0 clamp(1.2rem, 4vw, 2.5rem)" };

  return (
    <div style={{ fontFamily: "'Rajdhani', sans-serif", background: COLORS.bg, color: COLORS.t1, fontWeight: 500, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
        @keyframes pulse-glow { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        a { color: inherit; text-decoration: none; }
        body { overflow-x: hidden; }
        .hero-grid { display: grid; grid-template-columns: 1fr 380px; gap: 3rem; align-items: center; }
        .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .nav-links { display: none !important; }
        }
        @media (max-width: 600px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ═══════════ NAV ═══════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(1.2rem, 4vw, 2.5rem)",
        background: "rgba(12,10,8,0.92)", backdropFilter: "blur(24px) saturate(1.4)",
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 2, background: COLORS.accent,
            display: "grid", placeItems: "center", fontFamily: "'Orbitron', sans-serif",
            fontWeight: 800, fontSize: "0.65rem", color: COLORS.bg, letterSpacing: "0.02em",
            boxShadow: `0 0 16px ${COLORS.accent}50`,
          }}>GR</div>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Grand River <span style={{ color: COLORS.accent }}>Labs</span>
          </span>
        </div>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {["Services", "Projects", "About"].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`} style={{
              padding: "6px 12px", fontSize: "0.75rem", fontWeight: 500, color: COLORS.t3,
              borderRadius: 2, letterSpacing: "0.03em", textTransform: "uppercase", transition: "all 0.2s",
            }}>{s}</a>
          ))}
          <a href="#contact" style={{
            padding: "6px 14px", fontSize: "0.75rem", fontWeight: 600, color: COLORS.bg,
            background: COLORS.accent, borderRadius: 2, marginLeft: 6, letterSpacing: "0.03em",
            textTransform: "uppercase", boxShadow: `0 0 20px ${COLORS.accent}35`,
          }}>Get in Touch</a>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "5rem 0 3rem", position: "relative", overflow: "hidden" }}>
        {/* Background layers */}
        <div style={{ position: "absolute", inset: 0 }}>
          <CyberGrid />
          <div style={{ position: "absolute", width: 550, height: 550, top: "-18%", left: "-12%", background: COLORS.accent, borderRadius: "50%", filter: "blur(120px)", opacity: 0.12 }} />
          <div style={{ position: "absolute", width: 400, height: 400, bottom: "-5%", right: "2%", background: COLORS.accent2, borderRadius: "50%", filter: "blur(120px)", opacity: 0.06 }} />
          <div style={{ position: "absolute", width: 300, height: 300, top: "25%", right: "25%", background: COLORS.accent3, borderRadius: "50%", filter: "blur(120px)", opacity: 0.04 }} />
        </div>
        {/* Vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(12,10,8,0.75))", pointerEvents: "none", zIndex: 2 }} />

        <div style={{ ...wrapStyle, position: "relative", zIndex: 5, width: "100%" }}>
          <div className="hero-grid">

            {/* Left — Title content */}
            <div>
              <Reveal>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "'Share Tech Mono', monospace", fontSize: "0.74rem",
                  color: COLORS.t3, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: 1, background: COLORS.accent, boxShadow: `0 0 8px ${COLORS.accent}`, animation: "pulse-glow 2.5s ease-in-out infinite" }} />
                  Technology Lab · Paris, Ontario
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 style={{
                  fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
                  fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", lineHeight: 1.08,
                  letterSpacing: "0.02em", maxWidth: 680, marginBottom: 20, textTransform: "uppercase",
                }}>
                  We build <span style={{ color: COLORS.accent, textShadow: `0 0 40px ${COLORS.accent}50` }}>smart things</span>{" "}
                  <span style={{ color: COLORS.t3 }}>for</span> real businesses<span style={{ color: COLORS.t3 }}>.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p style={{
                  fontSize: "1.05rem", color: COLORS.t2, maxWidth: 520,
                  lineHeight: 1.8, marginBottom: 32, fontWeight: 500,
                }}>
                  Grand River Labs is a technology studio specializing in AI agents, voice systems, web applications, and workflow automation. Based in Paris, Ontario — serving businesses across Southwestern Ontario.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
                  <a href="#contact" style={{
                    display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 24px",
                    borderRadius: 2, fontSize: "0.85rem", fontWeight: 600, fontFamily: "'Rajdhani', sans-serif",
                    background: COLORS.accent, color: COLORS.bg, letterSpacing: "0.04em", textTransform: "uppercase",
                    boxShadow: `0 0 20px ${COLORS.accent}35`, border: "none", cursor: "pointer",
                  }}>Start a Project →</a>
                  <a href="#services" style={{
                    display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 24px",
                    borderRadius: 2, fontSize: "0.85rem", fontWeight: 600, fontFamily: "'Rajdhani', sans-serif",
                    background: "rgba(232,154,58,0.06)", color: COLORS.t1,
                    border: `1px solid rgba(232,154,58,0.12)`, letterSpacing: "0.04em", textTransform: "uppercase",
                    cursor: "pointer",
                  }}>Explore Services</a>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <StatusRing label="AI Engine" status="Online" color={COLORS.accent} delay={800} />
                  <StatusRing label="Voice Lab" status="Online" color={COLORS.accent2} delay={1100} />
                  <StatusRing label="Web Dev" status="Active" color={COLORS.accent3} delay={1400} />
                  <StatusRing label="Automation" status="Running" color={COLORS.accent4} delay={1700} />
                </div>
              </Reveal>
            </div>

            {/* Right — Widget stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Reveal delay={0.3}><Terminal /></Reveal>
              <Reveal delay={0.5}><NetworkPulse /></Reveal>
              <Reveal delay={0.7}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <StatusIndicator icon={<MessageSquare size={18} />} label="Multi-Channel" color={COLORS.accent} />
                  <StatusIndicator icon={<Zap size={18} />} label="Always On" color={COLORS.accent4} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" style={sectionStyle}>
        <div style={wrapStyle}>
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 8 }}>What we build</div>
              <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)", letterSpacing: "0.03em", textTransform: "uppercase", lineHeight: 1.1 }}>Four labs. One studio.</h2>
              <p style={{ color: COLORS.t2, fontSize: "0.95rem", marginTop: 8, maxWidth: 460, fontWeight: 500, lineHeight: 1.8 }}>Here's what we do — and what we're good at.</p>
            </div>
          </Reveal>
          <div className="services-grid">
            <Reveal delay={0.05}><ServiceCard icon={<Zap size={22} />} tag="Flagship" title="AI Services" color={COLORS.accent} accent={COLORS.accent} span desc="Chatbots and voice agents that actually know your business. Your hours, your services, your pricing — not generic answers. Deployed on web, WhatsApp, Telegram, SMS, and phone." features={["Website Chat","WhatsApp","Telegram","Phone / Voice","SMS","Lead Capture","24/7 Coverage","Prompt Security"]} /></Reveal>
            <Reveal delay={0.1}><ServiceCard icon={<Mic size={22} />} tag="Voice" title="Voice Lab" color={COLORS.accent2} accent={COLORS.accent2} desc="Clone your voice for phone agents and ads. Sounds like you, not a robot. Voiceovers for IVR systems, marketing, and training content." features={["Voice Cloning","Custom TTS","Phone Systems","Ad Voiceovers"]} /></Reveal>
            <Reveal delay={0.15}><ServiceCard icon={<Code size={22} />} tag="Full-Stack" title="Web & App Dev" color={COLORS.accent3} accent={COLORS.accent3} desc="Websites, apps, and dashboards — built from scratch for how your business actually works. From landing pages to full SaaS products." features={["Websites","Web Apps","Dashboards","APIs"]} /></Reveal>
            <Reveal delay={0.2}><ServiceCard icon={<RefreshCw size={22} />} tag="Operations" title="Workflow Automation" color={COLORS.accent4} accent={COLORS.accent4} span desc="Your business runs on 5 apps that don't talk to each other. We fix that. Automated follow-ups, appointment reminders, invoice workflows, data sync, and custom integrations." features={["Lead Follow-ups","Appointment Reminders","Invoice Automation","CRM Sync","Data Pipelines","Email Sequences","API Connectors","Custom Workflows"]} /></Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ LAB ═══════════ */}
      <section id="projects" style={sectionStyle}>
        <div style={wrapStyle}>
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 8 }}>The Lab</div>
              <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)", letterSpacing: "0.03em", textTransform: "uppercase", lineHeight: 1.1 }}>Projects & experiments</h2>
              <p style={{ color: COLORS.t2, fontSize: "0.95rem", marginTop: 8, maxWidth: 460, fontWeight: 500 }}>Things we're building, testing, and shipping.</p>
            </div>
          </Reveal>
          <div className="projects-grid">
            <LabCard num="001" title="Multi-Channel AI Platform" desc="Production chatbot engine with Telegram, WhatsApp, web, and voice channels. Built-in prompt security." status="Live" statusColor={COLORS.accent4} delay={0.05} />
            <LabCard num="002" title="Voice Cloning Pipeline" desc="Quick voice sample, custom AI voice model. Used for phone agents and voiceovers." status="Live" statusColor={COLORS.accent4} delay={0.1} />
            <LabCard num="003" title="AI Phone Receptionist" desc="Answers phones after hours, captures leads, sounds natural. Twilio-powered with live call handoff." status="Live" statusColor={COLORS.accent4} delay={0.15} />
            <LabCard num="004" title="Baby Tracker AI" desc="Smart baby tracking app with AI-powered sleep insights and developmental milestones." status="In Progress" statusColor={COLORS.accent} delay={0.2} />
            <LabCard num="005" title="Network Sentinel" desc="macOS network monitor and firewall. See every connection your Mac makes." status="In Progress" statusColor={COLORS.accent} delay={0.25} />
            <LabCard num="006" title="Wellness & Focus App" desc="Guided wellness platform with focus tools and personalized routines." status="In Progress" statusColor={COLORS.accent} delay={0.3} />
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" style={sectionStyle}>
        <div style={wrapStyle}>
          <div className="about-grid">
            <Reveal>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 8 }}>About the Lab</div>
                <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.8vw, 1.9rem)", letterSpacing: "0.03em", textTransform: "uppercase", lineHeight: 1.12, marginBottom: 16 }}>Small studio.<br/>Big capabilities.</h2>
                <p style={{ color: COLORS.t2, fontSize: "0.92rem", lineHeight: 1.8, marginBottom: 14, fontWeight: 500 }}>Grand River Labs is a technology studio in <span style={{ color: COLORS.accent, fontWeight: 600 }}>Paris, Ontario</span>. We build software, AI systems, and automation tools for businesses across Southwestern Ontario.</p>
                <p style={{ color: COLORS.t2, fontSize: "0.92rem", lineHeight: 1.8, marginBottom: 14, fontWeight: 500 }}>Everything we build is <span style={{ color: COLORS.accent, fontWeight: 600 }}>custom — tailored to your business</span>. We maintain it like it's our own product.</p>
                <p style={{ color: COLORS.t2, fontSize: "0.92rem", lineHeight: 1.8, fontWeight: 500 }}>Our clients are plumbers, restaurants, clinics, real estate agents, and service firms who need tech that works without a full-time IT team.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: <Crosshair size={18} />, title: "Built for you, not everyone", desc: "No templates, no generic solutions. Every system is built around your specific business." },
                  { icon: <Wrench size={18} />, title: "We maintain what we build", desc: "Monthly optimization, updates, and support. We treat your system like our own product." },
                  { icon: <TrendingUp size={18} />, title: "It should pay for itself", desc: "If a project won't save you time or money, we'll say so." },
                ].map((v, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 14, padding: 16,
                    background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 2,
                  }}>
                    <div style={{ width: 36, height: 36, borderRadius: 2, display: "grid", placeItems: "center", flexShrink: 0, background: "rgba(232,154,58,0.07)", color: COLORS.accent }}>{v.icon}</div>
                    <div>
                      <h4 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 3 }}>{v.title}</h4>
                      <p style={{ fontSize: "0.8rem", color: COLORS.t3, lineHeight: 1.55 }}>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section id="contact" style={sectionStyle}>
        <div style={wrapStyle}>
          <Reveal>
            <div style={{
              textAlign: "center", maxWidth: 580, margin: "0 auto", padding: "3rem 2.5rem",
              background: COLORS.surface, border: `1px solid ${COLORS.border2}`, borderRadius: 4,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", bottom: "-60%", left: "-20%", right: "-20%", height: "80%", background: "radial-gradient(ellipse, rgba(232,154,58,0.07), transparent 60%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 8 }}>Start here</div>
                <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 800, fontSize: "clamp(1.3rem, 2.8vw, 1.7rem)", letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 8 }}>Let's build something.</h2>
                <p style={{ color: COLORS.t2, fontSize: "0.92rem", marginBottom: 28, fontWeight: 500, lineHeight: 1.8 }}>15-minute call. We'll talk about your business and see if we can help.</p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="mailto:info@grandriverlabs.ca" style={{
                    padding: "12px 24px", borderRadius: 2, fontSize: "0.85rem", fontWeight: 600,
                    background: COLORS.accent, color: COLORS.bg, letterSpacing: "0.04em", textTransform: "uppercase",
                    boxShadow: `0 0 20px ${COLORS.accent}35`,
                  }}>info@grandriverlabs.ca</a>
                  <a href="tel:+13655247715" style={{
                    padding: "12px 24px", borderRadius: 2, fontSize: "0.85rem", fontWeight: 600,
                    background: "rgba(232,154,58,0.06)", color: COLORS.t1,
                    border: `1px solid rgba(232,154,58,0.12)`, letterSpacing: "0.04em", textTransform: "uppercase",
                    display: "inline-flex", alignItems: "center", gap: 8,
                  }}><Phone size={16} /> Call the Lab</a>
                </div>
                <div style={{ marginTop: 14, fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: COLORS.t4, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Paris, Ontario · Serving Brantford, KW, Hamilton & the Golden Horseshoe
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{ padding: "2.5rem 0", borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ ...wrapStyle, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Grand River <span style={{ color: COLORS.accent }}>Labs</span>
          </span>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {[
              { label: "Services", href: "#services" },
              { label: "Projects", href: "#projects" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: "0.68rem", color: COLORS.t4, textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "'Share Tech Mono', monospace" }}>{l.label}</a>
            ))}
          </div>
          <span style={{ fontSize: "0.6rem", color: COLORS.t4, fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.03em" }}>© 2026 Grand River Labs · Paris, ON</span>
        </div>
      </footer>
    </div>
  );
}