import "../styles/landing/consult.css"
import { useNavigate } from 'react-router-dom'; // Add this import

function Consult() {
  const navigate = useNavigate(); // Add this hook

  // Function to handle instant brochure download
  const handleDownload = () => {
    // Direct download link - downloads instantly to browser's Downloads folder
    const link = document.createElement('a');
    link.href = '/Fenero%20Capital%20Advisory%20LLP%28without%20founder%29.pdf';
    // URL-encoded path with spaces
    link.download = 'Fenero-Capital-Advisory-LLP.pdf'; // Downloaded filename
    link.click(); // Triggers instant download
  };

  // Handler for Schedule Consultation - opens auth page with signup mode
  const handleScheduleConsultation = () => {
    navigate('/auth', { state: { mode: 'signup', fromConsultation: true } });
  };

  return (
    <div className="services-bottom-cta">
      <h3 className="services-cta-title">Ready to Transform Your Business?</h3>
      <p className="services-cta-subtitle">
        Let's discuss how our financial solutions can help you achieve your strategic goals.
      </p>
      <div className="services-cta-buttons">
        <button 
          className="services-cta-primary"
          onClick={handleScheduleConsultation}
        >
          Start Your Journey
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