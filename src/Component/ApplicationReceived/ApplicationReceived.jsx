import { useSearchParams, useNavigate } from "react-router-dom";
import "./ApplicationReceived.css";
import { downloadFile } from "../../Utils/downloadFile";

const ApplicationReceived = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const type = searchParams.get("type");
  const course = searchParams.get("course");
  const brochureUrl = searchParams.get("brochureUrl");

  const handleRedownload = () => {
    downloadFile(brochureUrl, `${course || "brochure"}.pdf`);
  };

  return (
    <div className="ar-page">
      <div className="ar-card">
        <div className="ar-icon">✓</div>
        <h1>Application Received</h1>
        <p className="ar-message">
          Thank you for your interest{course ? ` in ${course}` : ""}. Our team
          will reach out to you shortly.
        </p>

        {type === "brochure" && (
          <p className="ar-note">
            Your brochure download should have started automatically.{" "}
            {brochureUrl && (
              <button className="ar-redownload-link" onClick={handleRedownload}>
                Click here to download it again
              </button>
            )}
          </p>
        )}

        <button className="ar-home-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ApplicationReceived;
