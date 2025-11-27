import financeIllustration from "../assets/finance-illustration.png";

const HIGHLIGHTS = [
  {
    title: "ADVISORY EXPERTISE",
    desc: "Institutional-grade advisory based on proven capital engagement experience"
  },
  {
    title: "STRATEGIC FINANCIAL PLANNING",
    desc: "Strategic financial planning tailored to business lifecycle and goals"
  },
  {
    title: "EXECUTION EXCELLENCE",
    desc: "Transparent, data-driven, and execution-focused consulting approach"
  },
  {
    title: "LENDER NETWORK ADVANTAGE",
    desc: "Deep lender-network expertise for optimized financial access"
  },
  {
    title: "END-TO-END SUPPORT",
    desc: "Supporting businesses from funding to value realization"
  }
];

function HighlightsSection() {
  return (
    <section className="highlights-bg">
      <div className="highlights-wrapper">

        {/* Top split layout */}
        <div className="highlights-grid">
          <div className="highlights-left">
            <h2>
              Why Choose <span className="fenero-white">Fenero</span>?
            </h2>

            <p className="highlights-sub">
              Expert-led financial advisory designed for growing enterprises.
              Combining strategic insight with execution excellence.
            </p>
          </div>

          <div className="highlights-right">
            <div className="highlights-img-box">
              <img
                src={financeIllustration}
                alt="Financial advisory and capital planning"
                className="highlights-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        

        {/* Highlight cards */}
        <div className="highlights-container">
          {HIGHLIGHTS.map((item, i) => (
            <div className="highlight-card" key={i}>
              <h4 className="highlight-title">{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>



      </div>
    </section>

    
  );
}

export default HighlightsSection;
