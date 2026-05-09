import { useState, useRef, useEffect } from "react";

const DARK_BLUE = "#0D2137";
const MID_BLUE = "#1A4A7A";
const GOLD = "#F39C12";
const LIGHT_BLUE = "#D6EAF8";
const ACCENT = "#2E86C1";
const GREEN = "#1E8449";
const RED = "#C0392B";

const REPORTS = [
  {
    id:"googl", ticker:"GOOGL", name:"Alphabet Inc.", sector:"Technology",
    cmp:397, baseTarget:520, bullTarget:740, bearTarget:370, upside:31,
    rating:"BUY", date:"May 2026",
    tags:["Search","Cloud","YouTube","AI","Waymo"],
    summary:"Global monopoly in Search (90% share), fastest-growing hyperscaler (GCP +63%), and the cheapest Magnificent 7 stock on every valuation metric. $462B Cloud backlog means years of pre-sold revenue. FY2026 is maximum capex / maximum uncertainty — historically the best time to own it.",
    keyMetrics:{Revenue:"$403B","Op. Margin":"32%","TTM P/E":"~29x","Rev Growth":"+22%","Mkt Cap":"$1.98T"},
    highlights:[
      "Cloud backlog $462B — years of pre-sold revenue",
      "Search queries at all-time high despite AI competition narrative",
      "Waymo: 500K+ trips/week, independently valued at $126B",
      "TPU custom silicon — 4x cheaper AI inference vs Nvidia GPUs",
      "$127B net cash — virtually zero meaningful debt",
      "350M paid subscriptions across Google One, YouTube Premium, Workspace"
    ]
  },
  {
    id:"amzn", ticker:"AMZN", name:"Amazon.com Inc.", sector:"E-Commerce / Cloud",
    cmp:205, baseTarget:450, bullTarget:580, bearTarget:175, upside:119,
    rating:"STRONG BUY", date:"May 2026",
    tags:["AWS","E-Commerce","Advertising","Prime","Logistics"],
    summary:"Two businesses in one: a low-margin retail flywheel attracting 300M+ customers, and a high-margin platform (AWS + Ads + Prime) that monetises them. AWS grew 28% in Q1 2026 — fastest in 15 quarters. Operating margin hit 13.1% — an all-time record. FY2026 is peak capex — the worst optical moment, the best time to own.",
    keyMetrics:{Revenue:"$717B","Op. Margin":"13.1%","FY25 EPS":"$7.21","Rev Growth":"+17%","Mkt Cap":"$2.2T"},
    highlights:[
      "AWS backlog $364B — pre-sold cloud revenue at 38%+ margin",
      "AWS grew 28% in Q1 2026 — fastest growth in 15 quarters",
      "Operating margin 13.1% in Q1 2026 — all-time record",
      "#2 US grocer with $150B grocery GMV — behind only Walmart",
      "Trainium chips: $20B+ run rate, 30-50% cheaper than Nvidia",
      "260M Prime members globally; 1B+ same-day deliveries per quarter"
    ]
  },
  {
    id:"msft", ticker:"MSFT", name:"Microsoft Corp.", sector:"Technology / Cloud",
    cmp:420, baseTarget:560, bullTarget:680, bearTarget:340, upside:33,
    rating:"BUY", date:"Coming Soon",
    tags:["Azure","Office365","Copilot","OpenAI","Gaming"],
    summary:"The enterprise software monopoly turbocharged by OpenAI. Azure growing 40%+, Copilot monetisation just beginning with 1B+ Office seats addressable. Teams, Windows, and Xbox create the most durable enterprise moat in technology.",
    keyMetrics:{Revenue:"~$280B","Op. Margin":"~45%","TTM P/E":"~33x","Rev Growth":"+16%","Mkt Cap":"$3.2T"},
    highlights:[
      "Azure + OpenAI: deepest AI integration in enterprise cloud",
      "Copilot at $30/user/month — 1B+ Office 365 seats addressable",
      "GitHub Copilot: 2M+ paid developers; fastest growing product ever",
      "Xbox + Activision: #1 gaming platform by revenue",
      "Most durable enterprise moat in all of technology"
    ]
  },
  {
    id:"meta", ticker:"META", name:"Meta Platforms Inc.", sector:"Social Media / AI",
    cmp:580, baseTarget:750, bullTarget:950, bearTarget:420, upside:29,
    rating:"BUY", date:"Coming Soon",
    tags:["Facebook","Instagram","WhatsApp","Llama AI","AR/VR"],
    summary:"The social media giant that nearly died in 2022 and came back stronger. 3.3B daily active people. Reels dominance over TikTok. Llama open-source AI models. WhatsApp Business monetisation in early innings. Cheapest Mag-7 stock on forward P/E.",
    keyMetrics:{Revenue:"~$185B","Op. Margin":"~43%","TTM P/E":"~25x","Rev Growth":"+21%","Mkt Cap":"$1.5T"},
    highlights:[
      "3.3B daily active people across Facebook, Instagram, WhatsApp",
      "Llama open-source AI — 1B+ downloads, enterprise adoption growing",
      "Reels now 50%+ of Instagram engagement time",
      "WhatsApp Business monetisation — billions of users, barely started",
      "Cheapest Magnificent 7 stock on forward earnings"
    ]
  },
  {
    id:"nvda", ticker:"NVDA", name:"Nvidia Corporation", sector:"Semiconductors / AI",
    cmp:115, baseTarget:175, bullTarget:230, bearTarget:80, upside:52,
    rating:"BUY", date:"Coming Soon",
    tags:["GPUs","AI Training","Data Centers","CUDA","Blackwell"],
    summary:"The company that accidentally became the infrastructure of the AI revolution. Every major AI model — ChatGPT, Gemini, Claude — is trained on Nvidia GPUs. The Blackwell platform is sold out through 2026. CUDA ecosystem creates a near-unbreakable developer moat.",
    keyMetrics:{Revenue:"~$130B","Gross Margin":"~75%","TTM P/E":"~35x","Rev Growth":"+114%","Mkt Cap":"$2.8T"},
    highlights:[
      "CUDA ecosystem: 5M+ developers — switching cost is near-infinite",
      "Blackwell GPU platform sold out through 2026",
      "Data center revenue grew 409% in FY2024 alone",
      "Gross margins ~75% — software-like economics on hardware",
      "NIM microservices: building AWS-style recurring AI revenue"
    ]
  },
  {
    id:"aapl", ticker:"AAPL", name:"Apple Inc.", sector:"Consumer Tech / Services",
    cmp:195, baseTarget:240, bullTarget:300, bearTarget:155, upside:23,
    rating:"HOLD/BUY", date:"Coming Soon",
    tags:["iPhone","Services","Apple Intelligence","Mac","Wearables"],
    summary:"The world's most profitable consumer ecosystem. Services revenue $100B+ growing 15%+ at software margins. Apple Intelligence AI could trigger the largest iPhone upgrade cycle in a decade. $110B annual buyback program.",
    keyMetrics:{Revenue:"~$400B","Gross Margin":"~46%","TTM P/E":"~30x","Rev Growth":"+7%","Mkt Cap":"$3.3T"},
    highlights:[
      "Services revenue $100B+ at ~75% gross margin — fastest growing",
      "1.5B active iPhone users — strongest consumer ecosystem lock-in",
      "Apple Intelligence: potential super-cycle upgrade catalyst",
      "$110B annual buyback program — relentless EPS accretion",
      "India manufacturing: China+1 de-risking well underway"
    ]
  },
  {
    id:"tsla", ticker:"TSLA", name:"Tesla Inc.", sector:"EV / Autonomy / Energy",
    cmp:285, baseTarget:380, bullTarget:600, bearTarget:150, upside:33,
    rating:"SPECULATIVE BUY", date:"Coming Soon",
    tags:["EVs","FSD","Robotaxi","Optimus Robot","Energy Storage"],
    summary:"Either the most overvalued car company or the most undervalued AI/autonomy platform — depending entirely on FSD and Robotaxi delivery. Energy storage grew 67%. Optimus robot production scaling. High conviction requires belief in autonomous driving timeline.",
    keyMetrics:{Revenue:"~$97B","Op. Margin":"~8%","TTM P/E":"~90x","Rev Growth":"-1%","Mkt Cap":"~$900B"},
    highlights:[
      "FSD v13: 1B+ miles driven; improving exponentially",
      "Robotaxi commercial launch planned for Austin 2025",
      "Optimus robot: targeting 1000 units/week by end of 2025",
      "Energy storage grew 67% — fastest segment by far",
      "Supercharger: 65,000+ global chargers — industry standard"
    ]
  }
];

const SYSTEM_PROMPT = `You are FINGOD AI — an expert, friendly investment research analyst for the FINGOD platform. FINGOD creates institutional-grade equity research for serious retail investors, especially Indians entering US markets for the first time.

COVERED STOCKS (FINGOD Research):
- GOOGL (Alphabet): Search 90% market share, GCP cloud +63%, $462B backlog, Waymo $126B, TPUs, CMP ~$397, Base target $520, Bull $740
- AMZN (Amazon): AWS #1 cloud +28% Q1'26, $364B backlog 38% margin, Ads $68.5B +24%, Prime 260M members, Trainium chips, CMP ~$205, Base $450, Bull $580
- MSFT (Microsoft): Azure +40%, OpenAI/Copilot, Office365 1B seats, CMP ~$420 [Report Coming Soon]
- META (Meta): 3.3B DAP, Reels dominance, Llama AI, WhatsApp monetisation, CMP ~$580 [Coming Soon]
- NVDA (Nvidia): GPU monopoly, Blackwell sold out, CUDA moat, data center +409%, CMP ~$115 [Coming Soon]
- AAPL (Apple): 1.5B iPhones, Services $100B+, Apple Intelligence, CMP ~$195 [Coming Soon]
- TSLA (Tesla): FSD, Robotaxi, Optimus robot, Energy +67%, CMP ~$285 [Coming Soon]

YOUR STYLE:
- Explain everything in plain English — user is learning US markets
- Be specific and data-driven, not vague
- Distinguish reported (~) vs estimated (E) figures clearly
- Compare companies fairly when asked
- Always end responses with a brief disclaimer that this is for research/education, not investment advice
- Be concise but thorough — no fluff
- Use bullet points for comparisons, prose for explanations`;

const BullLogo = ({ size = 32, color = DARK_BLUE }) => (
  <div style={{ width: size, height: size, display: "flex", alignItems: "center",
    justifyContent: "center", fontWeight: 900, color: color, fontSize: size * 0.4,
    lineHeight: 1, userSelect: "none" }}>
    🐂
  </div>
);

const RatingBadge = ({ rating }) => {
  const map = {
    "STRONG BUY": { bg:"#D5F5E3", text:"#1E8449" },
    "BUY":        { bg:"#D6EAF8", text:"#1A4A7A" },
    "HOLD/BUY":   { bg:"#FEF9E7", text:"#B7770D" },
    "SPECULATIVE BUY": { bg:"#FDECEA", text:"#C0392B" },
  };
  const c = map[rating] || map["BUY"];
  return <span style={{ background:c.bg, color:c.text, borderRadius:4,
    padding:"2px 8px", fontSize:11, fontWeight:700, border:`1px solid ${c.text}30` }}>{rating}</span>;
};

export default function FINGODApp() {
  const [tab, setTab] = useState("home");
  const [selectedReport, setSelectedReport] = useState(null);
  const [messages, setMessages] = useState([{
    role:"assistant",
    content:"👋 Welcome to FINGOD AI — your personal research analyst.\n\nI'm trained on FINGOD's institutional research covering the Magnificent 7. Ask me anything:\n\n• \"What is Amazon's biggest growth driver?\"\n• \"Compare Google vs Microsoft as investments\"\n• \"Explain what AWS backlog means\"\n• \"Which stock has the most 3-year upside?\"\n• \"What are the risks in buying Nvidia right now?\""
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("All");
  const chatEnd = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim(); setInput("");
    setMessages(p => [...p, { role:"user", content:q }]);
    setLoading(true);
    try {
      const hist = messages.slice(-10).map(m => ({ role:m.role, content:m.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system: SYSTEM_PROMPT,
          messages:[...hist, { role:"user", content:q }]
        })
      });
      const d = await res.json();
      const reply = d.content?.[0]?.text || "Sorry, couldn't process that.";
      setMessages(p => [...p, { role:"assistant", content:reply }]);
    } catch {
      setMessages(p => [...p, { role:"assistant", content:"⚠️ Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  const live = REPORTS.filter(r => r.date !== "Coming Soon");
  const avgUpside = Math.round(live.reduce((a,b) => a + b.upside, 0) / live.length);

  const Nav = ({ id, icon, label }) => (
    <button onClick={() => { setTab(id); setSelectedReport(null); }}
      style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"11px 16px",
        background: tab===id ? GOLD : "transparent",
        color: tab===id ? DARK_BLUE : "rgba(255,255,255,0.75)",
        border:"none", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:14, textAlign:"left" }}>
      <span style={{ fontSize:18 }}>{icon}</span>{label}
    </button>
  );

  // ── SIDEBAR ──
  const Sidebar = () => (
    <div style={{ width:220, background:DARK_BLUE, minHeight:"100vh", padding:"0 12px 24px",
      display:"flex", flexDirection:"column", flexShrink:0 }}>
      <div style={{ padding:"20px 6px 20px", borderBottom:"1px solid rgba(255,255,255,0.1)", marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ fontSize:28 }}>🐂</div>
          <div>
            <div style={{ color:GOLD, fontWeight:900, fontSize:21, letterSpacing:1 }}>FINGOD</div>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:10, marginTop:-2 }}>Catch The Momentum</div>
          </div>
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
        <Nav id="home"      icon="📊" label="Dashboard" />
        <Nav id="reports"   icon="📄" label="Research" />
        <Nav id="chat"      icon="🤖" label="Ask FINGOD AI" />
        <Nav id="watchlist" icon="👁️" label="Watchlist" />
      </div>
      <div style={{ marginTop:"auto", paddingTop:24 }}>
        <div style={{ background:"rgba(243,156,18,0.12)", border:"1px solid rgba(243,156,18,0.3)",
          borderRadius:10, padding:"14px 12px" }}>
          <div style={{ color:GOLD, fontWeight:700, fontSize:12, marginBottom:6 }}>🔔 Premium — Coming Soon</div>
          <div style={{ color:"rgba(255,255,255,0.55)", fontSize:11, lineHeight:1.6 }}>
            Real-time alerts, portfolio tracker, full AI access & more.
          </div>
        </div>
        <div style={{ marginTop:16, textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:10 }}>
          FINGOD © 2026 • For Research Only
        </div>
      </div>
    </div>
  );

  // ── HOME ──
  const Home = () => (
    <div style={{ padding:"28px 32px", maxWidth:1050 }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:26, fontWeight:800, color:DARK_BLUE, margin:"0 0 6px" }}>
          Welcome to FINGOD 🐂
        </h1>
        <p style={{ color:"#666", margin:0, fontSize:14 }}>
          Institutional-grade US equity research in plain language. Your edge starts here.
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:32 }}>
        {[
          { icon:"📄", val:"2", label:"Reports Published", sub:"GOOGL + AMZN" },
          { icon:"🔄", val:"5", label:"In Progress", sub:"MSFT, META, NVDA, AAPL, TSLA" },
          { icon:"📈", val:`+${avgUpside}%`, label:"Avg Base Upside", sub:"From current prices" },
          { icon:"🌐", val:"7", label:"Stocks Covered", sub:"The Magnificent 7" },
        ].map(s => (
          <div key={s.label} style={{ background:"white", borderRadius:12, padding:"18px 20px",
            boxShadow:"0 2px 10px rgba(0,0,0,0.06)", border:"1px solid #eee" }}>
            <div style={{ fontSize:26, marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontSize:24, fontWeight:800, color:DARK_BLUE }}>{s.val}</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#333", marginTop:2 }}>{s.label}</div>
            <div style={{ fontSize:11, color:"#999", marginTop:3 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <h2 style={{ fontSize:17, fontWeight:700, color:DARK_BLUE, margin:0 }}>Latest Research</h2>
        <button onClick={() => setTab("reports")} style={{ background:"none",
          border:`1px solid ${MID_BLUE}`, color:MID_BLUE, padding:"5px 14px", borderRadius:6,
          cursor:"pointer", fontSize:12, fontWeight:600 }}>View All →</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:32 }}>
        {live.map(r => <Card key={r.id} r={r} />)}
      </div>

      <div style={{ background:`linear-gradient(135deg, ${DARK_BLUE} 0%, ${MID_BLUE} 100%)`,
        borderRadius:16, padding:"26px 30px", display:"flex", alignItems:"center",
        justifyContent:"space-between", gap:20 }}>
        <div>
          <div style={{ color:GOLD, fontWeight:800, fontSize:19, marginBottom:8 }}>
            🤖 Ask FINGOD AI Anything
          </div>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13, lineHeight:1.8 }}>
            "What is Amazon's moat?" &nbsp;•&nbsp; "Compare GOOGL vs AMZN"<br/>
            "Explain TPU vs GPU for investors" &nbsp;•&nbsp; "Which stock has most upside?"
          </div>
        </div>
        <button onClick={() => setTab("chat")} style={{ background:GOLD, color:DARK_BLUE,
          border:"none", padding:"13px 26px", borderRadius:10, fontWeight:800,
          fontSize:14, cursor:"pointer", flexShrink:0 }}>Chat Now →</button>
      </div>
    </div>
  );

  // ── CARD ──
  const Card = ({ r }) => {
    const live = r.date !== "Coming Soon";
    return (
      <div onClick={() => live && (setSelectedReport(r), setTab("reports"))}
        style={{ background:"white", borderRadius:12, padding:"18px 20px",
          boxShadow:"0 2px 10px rgba(0,0,0,0.06)", border:"1px solid #eee",
          cursor: live ? "pointer" : "default", opacity: live ? 1 : 0.72 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4 }}>
              <span style={{ background:DARK_BLUE, color:"white", borderRadius:5,
                padding:"2px 9px", fontSize:12, fontWeight:800 }}>{r.ticker}</span>
              {live ? <RatingBadge rating={r.rating} /> :
                <span style={{ background:"#f0f0f0", color:"#aaa", borderRadius:4,
                  padding:"2px 8px", fontSize:11, fontWeight:600 }}>Coming Soon</span>}
            </div>
            <div style={{ fontWeight:700, fontSize:14, color:DARK_BLUE }}>{r.name}</div>
            <div style={{ fontSize:11, color:"#999", marginTop:2 }}>{r.sector}</div>
          </div>
          {live && <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:10, color:"#999" }}>Base Upside</div>
            <div style={{ fontSize:22, fontWeight:800, color:GREEN }}>+{r.upside}%</div>
          </div>}
        </div>
        <p style={{ fontSize:12, color:"#555", lineHeight:1.6, margin:"0 0 10px" }}>
          {r.summary.slice(0,110)}...
        </p>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom: live ? 10 : 0 }}>
          {r.tags.slice(0,4).map(t => (
            <span key={t} style={{ background:LIGHT_BLUE, color:MID_BLUE, borderRadius:4,
              padding:"1px 7px", fontSize:10, fontWeight:600 }}>{t}</span>
          ))}
        </div>
        {live && (
          <div style={{ display:"flex", gap:6 }}>
            {[["CMP",`$${r.cmp}`,"#333"],["Bear",`$${r.bearTarget}`,RED],
              ["Base",`$${r.baseTarget}`,ACCENT],["Bull",`$${r.bullTarget}`,GREEN]
            ].map(([l,v,c]) => (
              <div key={l} style={{ flex:1, textAlign:"center", background:"#f8f8f8", borderRadius:6, padding:"5px 2px" }}>
                <div style={{ fontSize:11, fontWeight:700, color:c }}>{v}</div>
                <div style={{ fontSize:9, color:"#aaa", marginTop:1 }}>{l}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── REPORT DETAIL ──
  const Detail = ({ r }) => (
    <div style={{ padding:"28px 32px", maxWidth:880 }}>
      <button onClick={() => setSelectedReport(null)} style={{ background:"none",
        border:"none", color:MID_BLUE, cursor:"pointer", fontSize:14, fontWeight:600,
        marginBottom:20, padding:0 }}>← Back to Reports</button>

      <div style={{ background:`linear-gradient(135deg, ${DARK_BLUE}, ${MID_BLUE})`,
        borderRadius:16, padding:"26px 30px", marginBottom:22, color:"white" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
              <span style={{ background:GOLD, color:DARK_BLUE, borderRadius:7,
                padding:"3px 12px", fontSize:15, fontWeight:800 }}>{r.ticker}</span>
              <RatingBadge rating={r.rating} />
            </div>
            <h1 style={{ margin:"0 0 5px", fontSize:24, fontWeight:800 }}>{r.name}</h1>
            <div style={{ color:"rgba(255,255,255,0.6)", fontSize:12 }}>{r.sector} • {r.date}</div>
          </div>
          <div style={{ textAlign:"right", flexShrink:0 }}>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:10, marginBottom:2 }}>3-Year Base Target</div>
            <div style={{ fontSize:30, fontWeight:800, color:GOLD }}>${r.baseTarget}</div>
            <div style={{ color:GREEN, fontWeight:700, fontSize:13 }}>+{r.upside}% upside</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display:"flex", gap:10, marginBottom:20 }}>
        {Object.entries(r.keyMetrics).map(([k,v]) => (
          <div key={k} style={{ flex:1, background:"white", borderRadius:8, padding:"10px 8px",
            textAlign:"center", boxShadow:"0 1px 6px rgba(0,0,0,0.06)", border:"1px solid #eee" }}>
            <div style={{ fontSize:16, fontWeight:800, color:DARK_BLUE }}>{v}</div>
            <div style={{ fontSize:9, color:"#999", marginTop:2 }}>{k}</div>
          </div>
        ))}
      </div>

      {/* Price targets */}
      <div style={{ background:"white", borderRadius:12, padding:"20px 24px",
        boxShadow:"0 2px 10px rgba(0,0,0,0.06)", marginBottom:18, border:"1px solid #eee" }}>
        <div style={{ fontWeight:700, fontSize:14, color:DARK_BLUE, marginBottom:14 }}>
          3-Year Price Target Range
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {[["Bear Case",`$${r.bearTarget}`,RED,`${Math.round((r.bearTarget/r.cmp-1)*100)}%`],
            ["Base Case",`$${r.baseTarget}`,ACCENT,`+${Math.round((r.baseTarget/r.cmp-1)*100)}%`],
            ["Bull Case",`$${r.bullTarget}`,GREEN,`+${Math.round((r.bullTarget/r.cmp-1)*100)}%`]
          ].map(([l,v,c,u]) => (
            <div key={l} style={{ flex:1, textAlign:"center", background:"#f8f9fa",
              borderRadius:10, padding:"14px 10px" }}>
              <div style={{ color:"#888", fontSize:11, marginBottom:4 }}>{l}</div>
              <div style={{ fontSize:22, fontWeight:800, color:c }}>{v}</div>
              <div style={{ fontSize:12, fontWeight:700, color:c }}>{u}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:14, background:"#f0f7ff", borderRadius:8,
          padding:"10px 14px", fontSize:12, color:MID_BLUE }}>
          <b>CMP ~${r.cmp}</b> as of May 2026. Targets are 3-year forward estimates.
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:18 }}>
        <div style={{ background:"white", borderRadius:12, padding:"18px 20px",
          boxShadow:"0 2px 10px rgba(0,0,0,0.06)", border:"1px solid #eee" }}>
          <div style={{ fontWeight:700, fontSize:14, color:DARK_BLUE, marginBottom:10 }}>Investment Summary</div>
          <p style={{ fontSize:12.5, color:"#444", lineHeight:1.7, margin:0 }}>{r.summary}</p>
        </div>
        <div style={{ background:"white", borderRadius:12, padding:"18px 20px",
          boxShadow:"0 2px 10px rgba(0,0,0,0.06)", border:"1px solid #eee" }}>
          <div style={{ fontWeight:700, fontSize:14, color:DARK_BLUE, marginBottom:10 }}>Key Highlights</div>
          {r.highlights.map((h,i) => (
            <div key={i} style={{ display:"flex", gap:7, marginBottom:7, fontSize:12, color:"#444" }}>
              <span style={{ color:GOLD, flexShrink:0 }}>●</span>{h}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:"#FEF9E7", border:`1px solid ${GOLD}`, borderRadius:8,
        padding:"10px 14px", fontSize:11.5, color:"#7D6608" }}>
        ⚠️ <b>Disclaimer:</b> For educational and research purposes only. Not investment advice.
        Please consult a registered investment advisor before making decisions.
      </div>
    </div>
  );

  // ── REPORTS PAGE ──
  const Reports = () => {
    if (selectedReport) return <Detail r={selectedReport} />;
    const filtered = REPORTS.filter(r => ratingFilter === "All" || r.rating === ratingFilter);
    return (
      <div style={{ padding:"28px 32px", maxWidth:1050 }}>
        <h1 style={{ fontSize:22, fontWeight:800, color:DARK_BLUE, margin:"0 0 5px" }}>Research Reports</h1>
        <p style={{ color:"#666", margin:"0 0 20px", fontSize:13 }}>
          Institutional-grade equity research — Magnificent 7
        </p>
        <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
          {["All","STRONG BUY","BUY","HOLD/BUY","SPECULATIVE BUY"].map(f => (
            <button key={f} onClick={() => setRatingFilter(f)}
              style={{ padding:"5px 14px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer",
                background: ratingFilter===f ? DARK_BLUE : "white",
                color: ratingFilter===f ? "white" : "#555",
                border:`1px solid ${ratingFilter===f ? DARK_BLUE : "#ddd"}` }}>{f}</button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
          {filtered.map(r => <Card key={r.id} r={r} />)}
        </div>
      </div>
    );
  };

  // ── CHAT ──
  const Chat = () => (
    <div style={{ padding:"28px 32px", maxWidth:780, display:"flex",
      flexDirection:"column", height:"calc(100vh - 40px)" }}>
      <div style={{ marginBottom:16 }}>
        <h1 style={{ fontSize:22, fontWeight:800, color:DARK_BLUE, margin:"0 0 4px" }}>
          🤖 Ask FINGOD AI
        </h1>
        <p style={{ color:"#666", margin:0, fontSize:13 }}>
          Powered by Claude. Trained on FINGOD research. Ask anything about the Magnificent 7.
        </p>
      </div>

      <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:14 }}>
        {["What is Amazon's moat?","Compare GOOGL vs AMZN","Explain AWS backlog",
          "GPU vs TPU for investors","Which stock has most upside?"].map(q => (
          <button key={q} onClick={() => setInput(q)}
            style={{ padding:"5px 11px", borderRadius:14, border:`1px solid ${LIGHT_BLUE}`,
              background:LIGHT_BLUE, color:MID_BLUE, cursor:"pointer", fontSize:11.5, fontWeight:600 }}>
            {q}
          </button>
        ))}
      </div>

      <div style={{ flex:1, overflowY:"auto", background:"#f8f9fa", borderRadius:12,
        padding:"14px", marginBottom:14, border:"1px solid #eee", minHeight:0 }}>
        {messages.map((m,i) => (
          <div key={i} style={{ display:"flex", justifyContent: m.role==="user" ? "flex-end" : "flex-start",
            marginBottom:14 }}>
            {m.role==="assistant" && (
              <div style={{ width:30, height:30, borderRadius:"50%", background:DARK_BLUE,
                display:"flex", alignItems:"center", justifyContent:"center",
                marginRight:8, flexShrink:0, fontSize:16 }}>🐂</div>
            )}
            <div style={{ maxWidth:"76%", padding:"11px 15px",
              borderRadius: m.role==="user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.role==="user" ? DARK_BLUE : "white",
              color: m.role==="user" ? "white" : DARK_BLUE,
              fontSize:13, lineHeight:1.7, boxShadow:"0 1px 5px rgba(0,0,0,0.07)",
              whiteSpace:"pre-wrap" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:30, height:30, borderRadius:"50%", background:DARK_BLUE,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🐂</div>
            <div style={{ padding:"11px 15px", background:"white", borderRadius:"18px 18px 18px 4px",
              boxShadow:"0 1px 5px rgba(0,0,0,0.07)", fontSize:18, letterSpacing:3 }}>···</div>
          </div>
        )}
        <div ref={chatEnd} />
      </div>

      <div style={{ display:"flex", gap:10 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==="Enter" && send()}
          placeholder="Ask about any Magnificent 7 stock..."
          style={{ flex:1, padding:"13px 16px", borderRadius:10, border:"1px solid #ddd",
            fontSize:13.5, outline:"none", background:"white" }} />
        <button onClick={send} disabled={loading || !input.trim()}
          style={{ padding:"13px 22px", background: loading||!input.trim() ? "#ccc" : DARK_BLUE,
            color:"white", border:"none", borderRadius:10, cursor: loading ? "not-allowed" : "pointer",
            fontWeight:700, fontSize:13 }}>
          {loading ? "···" : "Send →"}
        </button>
      </div>
    </div>
  );

  // ── WATCHLIST ──
  const Watchlist = () => (
    <div style={{ padding:"28px 32px", maxWidth:950 }}>
      <h1 style={{ fontSize:22, fontWeight:800, color:DARK_BLUE, margin:"0 0 5px" }}>Watchlist</h1>
      <p style={{ color:"#666", margin:"0 0 20px", fontSize:13 }}>FINGOD Coverage Universe — All 7 stocks</p>
      <div style={{ background:"white", borderRadius:12, overflow:"hidden",
        boxShadow:"0 2px 10px rgba(0,0,0,0.06)", border:"1px solid #eee" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:DARK_BLUE }}>
              {["Ticker","Company","CMP","Bear","Base","Bull","Upside","Rating","Status"].map(h => (
                <th key={h} style={{ padding:"11px 14px", color:"white", fontSize:12,
                  fontWeight:700, textAlign:"left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REPORTS.map((r,i) => {
              const isLive = r.date !== "Coming Soon";
              return (
                <tr key={r.id} style={{ background: i%2===0 ? "#f9f9f9" : "white",
                  cursor: isLive ? "pointer" : "default" }}
                  onClick={() => isLive && (setSelectedReport(r), setTab("reports"))}>
                  <td style={{ padding:"11px 14px", fontWeight:800, color:DARK_BLUE, fontSize:13 }}>{r.ticker}</td>
                  <td style={{ padding:"11px 14px", fontSize:12, color:"#333" }}>{r.name}</td>
                  <td style={{ padding:"11px 14px", fontWeight:700, fontSize:12 }}>${r.cmp}</td>
                  <td style={{ padding:"11px 14px", color:RED, fontWeight:600, fontSize:12 }}>${r.bearTarget}</td>
                  <td style={{ padding:"11px 14px", color:ACCENT, fontWeight:700, fontSize:12 }}>${r.baseTarget}</td>
                  <td style={{ padding:"11px 14px", color:GREEN, fontWeight:700, fontSize:12 }}>${r.bullTarget}</td>
                  <td style={{ padding:"11px 14px", color:GREEN, fontWeight:800, fontSize:12 }}>
                    {isLive ? `+${r.upside}%` : "—"}
                  </td>
                  <td style={{ padding:"11px 14px" }}>
                    {isLive ? <RatingBadge rating={r.rating} /> : <span style={{ color:"#bbb", fontSize:12 }}>—</span>}
                  </td>
                  <td style={{ padding:"11px 14px" }}>
                    <span style={{ background: isLive?"#D5F5E3":"#f0f0f0",
                      color: isLive?"#1E8449":"#aaa", borderRadius:4,
                      padding:"2px 8px", fontSize:11, fontWeight:600 }}>
                      {isLive ? "✓ Live" : "Coming Soon"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop:14, background:"#FEF9E7", border:`1px solid ${GOLD}`,
        borderRadius:8, padding:"10px 14px", fontSize:12, color:"#7D6608" }}>
        ⚠️ For research purposes only. Not investment advice. CMP values approx. May 2026.
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex", fontFamily:"-apple-system, 'Inter', 'Helvetica Neue', sans-serif",
      background:"#F4F6F9", minHeight:"100vh" }}>
      <Sidebar />
      <div style={{ flex:1, overflowY:"auto", minHeight:"100vh" }}>
        {tab==="home"      && <Home />}
        {tab==="reports"   && <Reports />}
        {tab==="chat"      && <Chat />}
        {tab==="watchlist" && <Watchlist />}
      </div>
    </div>
  );
}
