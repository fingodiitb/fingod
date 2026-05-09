import { useState, useRef, useEffect } from "react";

const DARK_BLUE = "#0D2137";
const MID_BLUE = "#1A4A7A";
const GOLD = "#F39C12";
const LIGHT_BLUE = "#D6EAF8";

// ── DATA ──────────────────────────────────────────────────────────────────────
const REPORTS = [
  {
    id: "googl",
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    sector: "Technology",
    cmp: 397,
    baseTarget: 520,
    bullTarget: 740,
    bearTarget: 370,
    upside: 31,
    rating: "BUY",
    date: "May 2026",
    tags: ["Search", "Cloud", "YouTube", "AI", "Waymo"],
    summary: "Global monopoly in Search (90% share), fastest-growing hyperscaler (GCP +63%), and the cheapest Magnificent 7 stock on every valuation metric. FY2026 is maximum capex / maximum uncertainty — historically the best time to own it.",
    keyMetrics: { revenue: "$403B", margin: "32%", pe: "~29x", growth: "+22%", mcap: "$1.98T" },
    highlights: [
      "Cloud backlog $462B — years of pre-sold revenue",
      "Search queries at all-time high despite AI competition",
      "Waymo: 500K+ trips/week, valued at $126B",
      "TPU custom silicon — 4x cheaper AI inference vs Nvidia",
      "$127B net cash — virtually debt free"
    ]
  },
  {
    id: "amzn",
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    sector: "E-Commerce / Cloud",
    cmp: 205,
    baseTarget: 450,
    bullTarget: 580,
    bearTarget: 175,
    upside: 119,
    rating: "STRONG BUY",
    date: "May 2026",
    tags: ["AWS", "E-Commerce", "Advertising", "Prime", "Logistics"],
    summary: "Two businesses in one: a low-margin retail flywheel that attracts 300M+ customers, and a high-margin platform (AWS + Ads + Prime) that monetises them. FY2026 is peak capex — the worst optical moment, best time to own.",
    keyMetrics: { revenue: "$717B", margin: "13.1%", pe: "~35x", growth: "+17%", mcap: "$2.2T" },
    highlights: [
      "AWS backlog $364B — pre-sold cloud revenue",
      "AWS grew 28% in Q1 2026 — fastest in 15 quarters",
      "Operating margin 13.1% — all-time record",
      "#2 US grocer with $150B grocery GMV",
      "Trainium chips: $20B+ run rate, 30-50% cheaper than Nvidia"
    ]
  },
  {
    id: "msft",
    ticker: "MSFT",
    name: "Microsoft Corp.",
    sector: "Technology / Cloud",
    cmp: 420,
    baseTarget: 560,
    bullTarget: 680,
    bearTarget: 340,
    upside: 33,
    rating: "BUY",
    date: "Coming Soon",
    tags: ["Azure", "Office365", "Copilot", "OpenAI", "Gaming"],
    summary: "The enterprise software monopoly now turbocharged by OpenAI. Azure growing 40%+, Copilot monetisation just beginning, and Teams/Office365 still the undisputed enterprise productivity standard.",
    keyMetrics: { revenue: "~$280B", margin: "~45%", pe: "~33x", growth: "+16%", mcap: "$3.2T" },
    highlights: [
      "Azure + OpenAI: deepest AI integration in enterprise",
      "Copilot at $30/user/month — 1B+ Office seats addressable",
      "GitHub Copilot: 2M+ paid developers",
      "Xbox + Activision: #1 gaming platform",
      "Most durable enterprise moat in technology"
    ]
  },
  {
    id: "meta",
    ticker: "META",
    name: "Meta Platforms Inc.",
    sector: "Social Media / AI",
    cmp: 580,
    baseTarget: 750,
    bullTarget: 950,
    bearTarget: 420,
    upside: 29,
    rating: "BUY",
    date: "Coming Soon",
    tags: ["Facebook", "Instagram", "WhatsApp", "Llama", "AR/VR"],
    summary: "The social media advertising giant that nearly died in 2022 and came back stronger. Llama AI models, Reels dominance, and WhatsApp monetisation create a 3-5 year earnings compounding story.",
    keyMetrics: { revenue: "~$185B", margin: "~43%", pe: "~25x", growth: "+21%", mcap: "$1.5T" },
    highlights: [
      "3.3B daily active people across the family of apps",
      "Llama open-source AI — 1B+ downloads",
      "Reels now 50%+ of Instagram engagement",
      "WhatsApp Business monetisation in early innings",
      "Cheapest Mag-7 stock on forward P/E"
    ]
  },
  {
    id: "nvda",
    ticker: "NVDA",
    name: "Nvidia Corporation",
    sector: "Semiconductors / AI",
    cmp: 115,
    baseTarget: 175,
    bullTarget: 230,
    bearTarget: 80,
    upside: 52,
    rating: "BUY",
    date: "Coming Soon",
    tags: ["GPUs", "AI Training", "Data Centers", "CUDA", "Blackwell"],
    summary: "The company that accidentally became the infrastructure of the AI revolution. Every AI model — ChatGPT, Gemini, Claude — is trained on Nvidia GPUs. The Blackwell platform is sold out through 2026.",
    keyMetrics: { revenue: "~$130B", margin: "~55%", pe: "~35x", growth: "+114%", mcap: "$2.8T" },
    highlights: [
      "CUDA ecosystem: 5M+ developers locked in",
      "Blackwell GPUs sold out through 2026",
      "Data center revenue grew 409% in FY2024",
      "Gross margins ~75% — software-like on hardware",
      "NIM microservices: AWS-style recurring AI revenue"
    ]
  },
  {
    id: "aapl",
    ticker: "AAPL",
    name: "Apple Inc.",
    sector: "Consumer Tech / Services",
    cmp: 195,
    baseTarget: 240,
    bullTarget: 300,
    bearTarget: 155,
    upside: 23,
    rating: "HOLD/BUY",
    date: "Coming Soon",
    tags: ["iPhone", "Services", "Apple Intelligence", "Mac", "Wearables"],
    summary: "The world's most profitable consumer ecosystem. Services ($100B+ revenue) growing at 15%+ with software margins. Apple Intelligence AI could trigger the largest iPhone upgrade cycle in history.",
    keyMetrics: { revenue: "~$400B", margin: "~33%", pe: "~30x", growth: "+7%", mcap: "$3.3T" },
    highlights: [
      "Services revenue $100B+ at ~75% gross margin",
      "1.5B active iPhone users — strongest ecosystem lock-in",
      "Apple Intelligence: potential super-cycle catalyst",
      "$110B annual buyback program",
      "India manufacturing: China+1 de-risking underway"
    ]
  },
  {
    id: "tsla",
    ticker: "TSLA",
    name: "Tesla Inc.",
    sector: "EV / Autonomy / Energy",
    cmp: 285,
    baseTarget: 380,
    bullTarget: 600,
    bearTarget: 150,
    upside: 33,
    rating: "SPECULATIVE BUY",
    date: "Coming Soon",
    tags: ["EVs", "FSD", "Robotaxi", "Optimus", "Energy"],
    summary: "Either the most overvalued car company or the most undervalued AI/autonomy company — depending entirely on whether FSD and Robotaxi deliver. The energy storage and Optimus robot businesses are underappreciated.",
    keyMetrics: { revenue: "~$97B", margin: "~8%", pe: "~90x", growth: "-1%", mcap: "$900B" },
    highlights: [
      "FSD v13: 1B+ miles driven autonomously",
      "Robotaxi launch planned Austin June 2025",
      "Optimus robot: 1000 units/week target by end 2025",
      "Energy storage grew 67% — fastest Tesla segment",
      "Supercharger network: 65,000+ chargers globally"
    ]
  }
];

const SYSTEM_PROMPT = `You are FINGOD AI, an expert investment research assistant for the FINGOD platform — an institutional-grade equity research service focused on US and Indian markets.

You have deep knowledge of these 7 US companies covered by FINGOD research:
- Alphabet/Google (GOOGL): Search monopoly, GCP cloud +63%, Waymo, $462B cloud backlog, CMP ~$397, base target $520
- Amazon (AMZN): AWS #1 cloud 28% growth, $364B backlog, Advertising $68.5B, Prime 260M members, CMP ~$205, base target $450
- Microsoft (MSFT): Azure +40%, OpenAI partnership, Copilot monetisation, enterprise dominance, CMP ~$420
- Meta (META): 3.3B DAP, Reels dominance, Llama AI, WhatsApp monetisation, CMP ~$580
- Nvidia (NVDA): GPU monopoly for AI training, Blackwell sold out, CUDA ecosystem, CMP ~$115
- Apple (AAPL): 1.5B iPhone users, Services $100B+, Apple Intelligence, CMP ~$195
- Tesla (TSLA): FSD autonomy, Robotaxi, Optimus robot, energy storage, CMP ~$285

FINGOD Research Philosophy:
- Cross-verify all data across minimum 2 sources
- Explain complex jargon in plain language (user is learning US markets)
- Never give generic advice — always be specific and data-driven
- Always distinguish between reported figures and estimates (use ~ for estimates)
- Valuation uses P/E + SOTP + EV/EBITDA approaches

Answer questions clearly and helpfully. If asked about companies not yet covered, say the report is coming soon. Always add a disclaimer that this is for research/educational purposes, not investment advice.`;

// ── COMPONENTS ────────────────────────────────────────────────────────────────
const BullLogo = ({ size = 32, white = false }) => (
  <svg width={size} height={size * 0.85} viewBox="0 0 100 85" fill="none">
    <path d="M20 5 C10 5 2 15 5 28 L15 42 L30 38 L35 48 L50 52 L65 48 L70 38 L85 42 L95 28 C98 15 90 5 80 5 C72 5 65 12 60 18 L50 22 L40 18 C35 12 28 5 20 5Z"
      fill={white ? "white" : DARK_BLUE} />
    <path d="M35 48 L38 58 L45 62 L50 60 L55 62 L62 58 L65 48 L50 52Z"
      fill={white ? "white" : DARK_BLUE} />
    <rect x="42" y="60" width="16" height="5" rx="2" fill={white ? "white" : DARK_BLUE} />
    <text x="50" y="44" textAnchor="middle" fontSize="14" fontWeight="bold"
      fontFamily="Arial" fill={white ? DARK_BLUE : "white"}>F</text>
  </svg>
);

const RatingBadge = ({ rating }) => {
  const colors = {
    "STRONG BUY": { bg: "#D5F5E3", text: "#1E8449", border: "#1E8449" },
    "BUY": { bg: "#D6EAF8", text: "#1A4A7A", border: "#1A4A7A" },
    "HOLD/BUY": { bg: "#FEF9E7", text: "#F39C12", border: "#F39C12" },
    "SPECULATIVE BUY": { bg: "#FDECEA", text: "#C0392B", border: "#C0392B" },
  };
  const c = colors[rating] || colors["BUY"];
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>
      {rating}
    </span>
  );
};

const MetricCard = ({ label, value }) => (
  <div style={{ background: "#F8F9FA", borderRadius: 8, padding: "8px 12px", textAlign: "center", flex: 1 }}>
    <div style={{ fontSize: 16, fontWeight: 700, color: DARK_BLUE }}>{value}</div>
    <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{label}</div>
  </div>
);

const PriceBar = ({ cmp, bear, base, bull }) => {
  const min = bear * 0.9, max = bull * 1.05;
  const pct = v => Math.round(((v - min) / (max - min)) * 100);
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ position: "relative", height: 8, background: "#eee", borderRadius: 4 }}>
        <div style={{ position: "absolute", left: `${pct(bear)}%`, width: `${pct(bull) - pct(bear)}%`,
          height: "100%", background: `linear-gradient(90deg, #FDECEA, #D6EAF8, #D5F5E3)`, borderRadius: 4 }} />
        {[{ v: cmp, color: DARK_BLUE, label: "CMP" }, { v: bear, color: "#C0392B", label: "Bear" },
          { v: base, color: "#2E86C1", label: "Base" }, { v: bull, color: "#1E8449", label: "Bull" }
        ].map(({ v, color, label }) => (
          <div key={label} style={{ position: "absolute", left: `${pct(v)}%`, transform: "translateX(-50%)" }}>
            <div style={{ width: label === "CMP" ? 12 : 8, height: label === "CMP" ? 12 : 8,
              borderRadius: "50%", background: color, border: "2px solid white",
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)", marginTop: label === "CMP" ? -2 : 0 }} />
            <div style={{ fontSize: 9, color, fontWeight: 600, textAlign: "center",
              marginTop: 4, whiteSpace: "nowrap", transform: "translateX(-50%)", marginLeft: "50%" }}>
              ${v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function FINGODPlatform() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedReport, setSelectedReport] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "👋 Welcome to FINGOD AI! I'm your personal research analyst powered by institutional-grade equity research.\n\nAsk me anything — \"What's Amazon's growth story?\", \"Compare Google vs Microsoft for investment?\", \"Explain what AWS margin means?\", or \"Which stock has the most upside?\"" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [filterSector, setFilterSector] = useState("All");
  const [filterRating, setFilterRating] = useState("All");
  const chatEndRef = useRef(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const sendMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setChatLoading(true);
    try {
      const history = chatMessages.slice(-8).map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [...history, { role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I couldn't process that. Please try again.";
      setChatMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", content: "⚠️ Connection error. Please try again." }]);
    }
    setChatLoading(false);
  };

  const filteredReports = REPORTS.filter(r =>
    (filterSector === "All" || r.sector.includes(filterSector)) &&
    (filterRating === "All" || r.rating === filterRating)
  );

  const covered = REPORTS.filter(r => r.date !== "Coming Soon");
  const avgUpside = Math.round(covered.reduce((a, b) => a + b.upside, 0) / covered.length);

  // ── NAV ──
  const NavLink = ({ id, label, icon }) => (
    <button onClick={() => { setActiveTab(id); setMobileMenu(false); }}
      style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px",
        background: activeTab === id ? GOLD : "transparent",
        color: activeTab === id ? DARK_BLUE : "rgba(255,255,255,0.8)",
        border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600,
        fontSize: 14, width: "100%", textAlign: "left" }}>
      <span style={{ fontSize: 18 }}>{icon}</span> {label}
    </button>
  );

  const Sidebar = () => (
    <div style={{ background: DARK_BLUE, width: 220, minHeight: "100vh", padding: "0 12px 20px",
      display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "20px 8px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BullLogo size={36} white />
          <div>
            <div style={{ color: GOLD, fontWeight: 800, fontSize: 20, letterSpacing: 1 }}>FINGOD</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>Catch The Momentum</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20, flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <NavLink id="home" label="Dashboard" icon="📊" />
        <NavLink id="reports" label="Research Reports" icon="📄" />
        <NavLink id="chat" label="Ask FINGOD AI" icon="🤖" />
        <NavLink id="watchlist" label="Watchlist" icon="👁️" />
        <div style={{ marginTop: "auto", padding: "12px 8px" }}>
          <div style={{ background: "rgba(243,156,18,0.15)", border: "1px solid rgba(243,156,18,0.3)",
            borderRadius: 8, padding: "12px" }}>
            <div style={{ color: GOLD, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>🔔 Premium Coming Soon</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, lineHeight: 1.5 }}>
              Full AI chat, real-time alerts, portfolio tracker & more.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── HOME ──
  const HomePage = () => (
    <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: DARK_BLUE, margin: 0 }}>
          Good day, Investor 👋
        </h1>
        <p style={{ color: "#666", marginTop: 6, fontSize: 15 }}>
          Institutional-grade research. Plain language. Your edge in US markets.
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Reports Published", value: "2", sub: "GOOGL + AMZN", icon: "📄" },
          { label: "Reports In Progress", value: "5", sub: "MSFT, META, NVDA, AAPL, TSLA", icon: "🔄" },
          { label: "Avg. Base Upside", value: `+${avgUpside}%`, sub: "From current CMPs", icon: "📈" },
          { label: "Research Universe", value: "7", sub: "Magnificent 7 covered", icon: "🌐" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", borderRadius: 12, padding: "20px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #eee" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: DARK_BLUE }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#333", marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 3 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Featured Reports */}
      <div style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: DARK_BLUE, margin: 0 }}>Latest Research</h2>
        <button onClick={() => setActiveTab("reports")}
          style={{ background: "none", border: `1px solid ${MID_BLUE}`, color: MID_BLUE,
            padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          View All →
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
        {REPORTS.filter(r => r.date !== "Coming Soon").map(r => (
          <ReportCard key={r.id} report={r} onSelect={() => { setSelectedReport(r); setActiveTab("reports"); }} />
        ))}
      </div>

      {/* AI Promo */}
      <div style={{ background: `linear-gradient(135deg, ${DARK_BLUE}, ${MID_BLUE})`,
        borderRadius: 16, padding: "28px 32px", display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 24 }}>
        <div>
          <div style={{ color: GOLD, fontWeight: 800, fontSize: 20, marginBottom: 8 }}>
            🤖 Ask FINGOD AI Anything
          </div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.7, maxWidth: 480 }}>
            "What is Amazon's moat?" • "Compare GOOGL vs MSFT for 3 years" •
            "Explain what AWS margin expansion means" • "Which Mag-7 stock has most upside?"
          </div>
        </div>
        <button onClick={() => setActiveTab("chat")}
          style={{ background: GOLD, color: DARK_BLUE, border: "none", padding: "14px 28px",
            borderRadius: 10, fontWeight: 800, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap",
            flexShrink: 0 }}>
          Chat Now →
        </button>
      </div>
    </div>
  );

  // ── REPORT CARD ──
  const ReportCard = ({ report: r, onSelect }) => {
    const isLive = r.date !== "Coming Soon";
    return (
      <div onClick={isLive ? onSelect : undefined}
        style={{ background: "white", borderRadius: 12, padding: "20px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #eee",
          cursor: isLive ? "pointer" : "default", opacity: isLive ? 1 : 0.75,
          transition: "transform 0.15s, box-shadow 0.15s",
          ":hover": isLive ? { transform: "translateY(-2px)" } : {} }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ background: DARK_BLUE, color: "white", borderRadius: 6,
                padding: "3px 10px", fontSize: 13, fontWeight: 800 }}>{r.ticker}</span>
              {isLive ? <RatingBadge rating={r.rating} /> :
                <span style={{ background: "#f5f5f5", color: "#999", borderRadius: 4,
                  padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>Coming Soon</span>}
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, color: DARK_BLUE }}>{r.name}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{r.sector} • {r.date}</div>
          </div>
          {isLive && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#888" }}>Base Upside</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#1E8449" }}>+{r.upside}%</div>
            </div>
          )}
        </div>

        <p style={{ fontSize: 12.5, color: "#555", lineHeight: 1.6, margin: "0 0 12px" }}>
          {r.summary.slice(0, 120)}...
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {r.tags.slice(0, 4).map(tag => (
            <span key={tag} style={{ background: LIGHT_BLUE, color: MID_BLUE, borderRadius: 4,
              padding: "2px 8px", fontSize: 10, fontWeight: 600 }}>{tag}</span>
          ))}
        </div>

        {isLive && (
          <div style={{ display: "flex", gap: 8 }}>
            {[["CMP", `$${r.cmp}`, "#333"], ["Bear", `$${r.bearTarget}`, "#C0392B"],
              ["Base", `$${r.baseTarget}`, "#2E86C1"], ["Bull", `$${r.bullTarget}`, "#1E8449"]
            ].map(([l, v, c]) => (
              <div key={l} style={{ flex: 1, textAlign: "center", background: "#f9f9f9",
                borderRadius: 6, padding: "6px 4px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: c }}>{v}</div>
                <div style={{ fontSize: 9, color: "#888", marginTop: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── REPORT DETAIL ──
  const ReportDetail = ({ report: r, onBack }) => (
    <div style={{ padding: "28px 32px", maxWidth: 900 }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: MID_BLUE,
        cursor: "pointer", fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0 }}>
        ← Back to Reports
      </button>
      <div style={{ background: `linear-gradient(135deg, ${DARK_BLUE}, ${MID_BLUE})`,
        borderRadius: 16, padding: "28px 32px", marginBottom: 24, color: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ background: GOLD, color: DARK_BLUE, borderRadius: 8,
                padding: "4px 14px", fontSize: 16, fontWeight: 800 }}>{r.ticker}</span>
              <RatingBadge rating={r.rating} />
            </div>
            <h1 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 800 }}>{r.name}</h1>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{r.sector} • Report Date: {r.date}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>3-Year Base Target</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: GOLD }}>${r.baseTarget}</div>
            <div style={{ color: "#1E8449", fontWeight: 700, fontSize: 14 }}>+{r.upside}% upside</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {Object.entries(r.keyMetrics).map(([k, v]) => (
          <MetricCard key={k} label={k.replace(/([A-Z])/g, ' $1').toUpperCase()} value={v} />
        ))}
      </div>

      {/* Price Bar */}
      <div style={{ background: "white", borderRadius: 12, padding: "20px 24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 20, border: "1px solid #eee" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: DARK_BLUE }}>
          Price Target Range (3-Year)
        </h3>
        <PriceBar cmp={r.cmp} bear={r.bearTarget} base={r.baseTarget} bull={r.bullTarget} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, fontSize: 12 }}>
          {[["Bear Case", `$${r.bearTarget}`, "#C0392B", `${Math.round((r.bearTarget/r.cmp - 1)*100)}%`],
            ["Base Case", `$${r.baseTarget}`, "#2E86C1", `+${Math.round((r.baseTarget/r.cmp - 1)*100)}%`],
            ["Bull Case", `$${r.bullTarget}`, "#1E8449", `+${Math.round((r.bullTarget/r.cmp - 1)*100)}%`]
          ].map(([l, v, c, u]) => (
            <div key={l} style={{ textAlign: "center", background: "#f9f9f9", borderRadius: 8,
              padding: "12px 20px", flex: 1, margin: "0 4px" }}>
              <div style={{ color: "#888", fontSize: 11, marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: c }}>{v}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: c }}>{u}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary + Highlights */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ background: "white", borderRadius: 12, padding: "20px 24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #eee" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: DARK_BLUE }}>Investment Summary</h3>
          <p style={{ fontSize: 13, color: "#444", lineHeight: 1.7, margin: 0 }}>{r.summary}</p>
        </div>
        <div style={{ background: "white", borderRadius: 12, padding: "20px 24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #eee" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: DARK_BLUE }}>Key Highlights</h3>
          {r.highlights.map((h, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 12.5, color: "#444" }}>
              <span style={{ color: GOLD, flexShrink: 0, marginTop: 1 }}>●</span> {h}
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {r.tags.map(tag => (
          <span key={tag} style={{ background: LIGHT_BLUE, color: MID_BLUE, borderRadius: 6,
            padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{tag}</span>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{ background: "#FEF9E7", border: "1px solid #F39C12", borderRadius: 8,
        padding: "12px 16px", fontSize: 11.5, color: "#7D6608" }}>
        ⚠️ <b>Disclaimer:</b> This report is for educational and research purposes only. It does not constitute investment advice. Past performance is not indicative of future results. Please consult a SEBI-registered investment advisor before making investment decisions.
      </div>
    </div>
  );

  // ── REPORTS PAGE ──
  const ReportsPage = () => {
    if (selectedReport) return <ReportDetail report={selectedReport} onBack={() => setSelectedReport(null)} />;
    const sectors = ["All", "Technology", "E-Commerce / Cloud", "Semiconductors / AI", "Social Media / AI", "Consumer Tech / Services", "EV / Autonomy / Energy"];
    return (
      <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: DARK_BLUE, margin: "0 0 6px" }}>Research Reports</h1>
          <p style={{ color: "#666", margin: 0, fontSize: 14 }}>Institutional-grade equity research on the Magnificent 7</p>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          {["All", "STRONG BUY", "BUY", "HOLD/BUY", "SPECULATIVE BUY"].map(r => (
            <button key={r} onClick={() => setFilterRating(r)}
              style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${filterRating === r ? DARK_BLUE : "#ddd"}`,
                background: filterRating === r ? DARK_BLUE : "white", color: filterRating === r ? "white" : "#555",
                cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{r}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {filteredReports.map(r => (
            <ReportCard key={r.id} report={r} onSelect={() => setSelectedReport(r)} />
          ))}
        </div>
      </div>
    );
  };

  // ── CHAT PAGE ──
  const ChatPage = () => (
    <div style={{ padding: "28px 32px", maxWidth: 800, display: "flex", flexDirection: "column", height: "calc(100vh - 56px)" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: DARK_BLUE, margin: "0 0 4px" }}>
          🤖 Ask FINGOD AI
        </h1>
        <p style={{ color: "#666", margin: 0, fontSize: 14 }}>
          Powered by Claude. Trained on FINGOD research. Ask anything about the Magnificent 7.
        </p>
      </div>

      {/* Suggested Questions */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {["What is Amazon's AWS moat?", "Compare GOOGL vs AMZN for 3 years", "Explain what GPU vs TPU means for investors",
          "Which stock has the most upside?", "What is cloud backlog and why does it matter?"
        ].map(q => (
          <button key={q} onClick={() => { setChatInput(q); }}
            style={{ padding: "6px 12px", borderRadius: 16, border: `1px solid ${LIGHT_BLUE}`,
              background: LIGHT_BLUE, color: MID_BLUE, cursor: "pointer", fontSize: 11.5, fontWeight: 600 }}>
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", background: "#f8f9fa", borderRadius: 12,
        padding: "16px", marginBottom: 16, border: "1px solid #eee" }}>
        {chatMessages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            marginBottom: 16 }}>
            {msg.role === "assistant" && (
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: DARK_BLUE,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginRight: 8, flexShrink: 0 }}>
                <BullLogo size={20} white />
              </div>
            )}
            <div style={{ maxWidth: "78%", padding: "12px 16px", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: msg.role === "user" ? DARK_BLUE : "white",
              color: msg.role === "user" ? "white" : DARK_BLUE,
              fontSize: 13.5, lineHeight: 1.7,
              boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              whiteSpace: "pre-wrap" }}>
              {msg.content}
            </div>
          </div>
        ))}
        {chatLoading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: DARK_BLUE,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BullLogo size={20} white />
            </div>
            <div style={{ padding: "12px 16px", background: "white", borderRadius: "18px 18px 18px 4px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.08)", fontSize: 20, letterSpacing: 4 }}>
              ···
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 10 }}>
        <input value={chatInput} onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask about any Magnificent 7 stock..."
          style={{ flex: 1, padding: "14px 18px", borderRadius: 12, border: "1px solid #ddd",
            fontSize: 14, outline: "none", background: "white" }} />
        <button onClick={sendMessage} disabled={chatLoading || !chatInput.trim()}
          style={{ padding: "14px 24px", background: chatLoading || !chatInput.trim() ? "#ddd" : DARK_BLUE,
            color: "white", border: "none", borderRadius: 12, cursor: chatLoading ? "not-allowed" : "pointer",
            fontWeight: 700, fontSize: 14 }}>
          {chatLoading ? "..." : "Send →"}
        </button>
      </div>
    </div>
  );

  // ── WATCHLIST ──
  const WatchlistPage = () => (
    <div style={{ padding: "28px 32px", maxWidth: 900 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: DARK_BLUE, margin: "0 0 6px" }}>Watchlist</h1>
      <p style={{ color: "#666", margin: "0 0 24px", fontSize: 14 }}>FINGOD Coverage Universe — Magnificent 7</p>
      <div style={{ background: "white", borderRadius: 12, overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #eee" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: DARK_BLUE, color: "white" }}>
              {["Ticker", "Company", "CMP", "Bear Target", "Base Target", "Bull Target", "Upside", "Rating", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REPORTS.map((r, i) => {
              const isLive = r.date !== "Coming Soon";
              return (
                <tr key={r.id} style={{ background: i % 2 === 0 ? "#f9f9f9" : "white",
                  cursor: isLive ? "pointer" : "default" }}
                  onClick={() => isLive && (setSelectedReport(r), setActiveTab("reports"))}>
                  <td style={{ padding: "12px 16px", fontWeight: 800, color: DARK_BLUE, fontSize: 14 }}>{r.ticker}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#333" }}>{r.name}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, fontSize: 13 }}>${r.cmp}</td>
                  <td style={{ padding: "12px 16px", color: "#C0392B", fontWeight: 600, fontSize: 13 }}>${r.bearTarget}</td>
                  <td style={{ padding: "12px 16px", color: "#2E86C1", fontWeight: 700, fontSize: 13 }}>${r.baseTarget}</td>
                  <td style={{ padding: "12px 16px", color: "#1E8449", fontWeight: 700, fontSize: 13 }}>${r.bullTarget}</td>
                  <td style={{ padding: "12px 16px", color: "#1E8449", fontWeight: 800, fontSize: 13 }}>
                    {isLive ? `+${r.upside}%` : "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>{isLive ? <RatingBadge rating={r.rating} /> : "—"}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: isLive ? "#D5F5E3" : "#f5f5f5",
                      color: isLive ? "#1E8449" : "#999", borderRadius: 4,
                      padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>
                      {isLive ? "✓ Published" : "Coming Soon"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16, background: "#FEF9E7", border: "1px solid #F39C12",
        borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "#7D6608" }}>
        ⚠️ Price targets are for research purposes only. CMP values are approximate as of May 2026. Not investment advice.
      </div>
    </div>
  );

  // ── LAYOUT ──
  return (
    <div style={{ display: "flex", fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      background: "#F4F6F9", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, overflowY: "auto", minHeight: "100vh" }}>
        {activeTab === "home" && <HomePage />}
        {activeTab === "reports" && <ReportsPage />}
        {activeTab === "chat" && <ChatPage />}
        {activeTab === "watchlist" && <WatchlistPage />}
      </div>
    </div>
  );
}

