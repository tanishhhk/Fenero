import "../../styles/landing/highlights.css"
import financeIllustration from "../../assets/finance-illustration.png";
import { useEffect, useRef } from "react";

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
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    // Observer for cards with stagger effect
    const cardsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardsRef.current.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('card-animate-in');
          }, index * 100); // Stagger delay: 100ms per card
        } else {
          // Reset card animation when out of view
          entry.target.classList.remove('card-animate-in');
        }
      });
    }, observerOptions);

    // Observe all cards
    cardsRef.current.forEach(card => {
      if (card) cardsObserver.observe(card);
    });

    return () => {
      cardsObserver.disconnect();
    };
  }, []);


  return (
    <section className="highlights-bg" ref={sectionRef}>
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
            <div 
              className="highlight-card" 
              key={i}
              ref={el => cardsRef.current[i] = el}
            >
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