import "../styles/landing/consult.css"

function Consult() {
  // Function to handle instant brochure download
  const handleDownload = () => {
    // Direct download link - downloads instantly to browser's Downloads folder
    const link = document.createElement('a');
    link.href = '/Fenero%20Capital%20Advisory%20LLP.pdf'; // URL-encoded path with spaces
    link.download = 'Fenero-Capital-Advisory-LLP.pdf'; // Downloaded filename
    link.click(); // Triggers instant download
  };

  return (
    <div className="services-bottom-cta">
      <h3 className="services-cta-title">Ready to Transform Your Business?</h3>
      <p className="services-cta-subtitle">
        Let's discuss how our financial solutions can help you achieve your strategic goals.
      </p>
      <div className="services-cta-buttons">
        <button className="services-cta-primary">
          Schedule Consultation
        </button>
        <button 
          className="services-cta-secondary"
          onClick={handleDownload}
        >
          Download Brochure
        </button>
      </div>
    </div>
  );
}

export default Consult;