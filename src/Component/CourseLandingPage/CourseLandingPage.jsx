// Component/CourseLandingPage/CourseLandingPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseLandingBySlug } from "../../Utils/APIs/courseApi";
import CourseApplyModal from "../CourseApplyModal/CourseApplyModal";
import "./CourseLandingPage.css";

const CourseLandingPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [modalType, setModalType] = useState(null); // "apply" | "brochure" | null

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCourseLandingBySlug(slug);
        setData(res);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const handleSubmitted = (type) => {
  setModalType(null);
  const params = new URLSearchParams({
    type,
    course: data.category.name,
  });
  if (type === "brochure" && landing.brochureUrl) {
    params.set("brochureUrl", landing.brochureUrl);
  }
  navigate(`/application-received?${params.toString()}`);
};

  if (loading) return <div className="clp-status">Loading...</div>;
  if (notFound || !data) {
    return (
      <div className="clp-status">
        <h2>Course page not available yet</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const { category, landing } = data;

  return (
    <div className="clp-page">
      {/* HERO */}
      <section
        className="clp-hero"
        style={landing.heroImage ? { backgroundImage: `url(${landing.heroImage})` } : {}}
      >
        <div className="clp-hero-overlay">
          <h1>{landing.heroTitle}</h1>
          {landing.heroSubtitle && <p>{landing.heroSubtitle}</p>}

          <div className="clp-cta-group">
            <button className="clp-btn clp-btn-primary" onClick={() => setModalType("apply")}>
              Apply Now
            </button>
            {landing.brochureUrl && (
              <button className="clp-btn clp-btn-secondary" onClick={() => setModalType("brochure")}>
                Download Brochure
              </button>
            )}
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      {landing.description && (
        <section className="clp-section">
          <h2>About This Course</h2>
          <p>{landing.description}</p>
        </section>
      )}

      {/* HIGHLIGHTS */}
      {landing.highlights?.length > 0 && (
        <section className="clp-section">
          <h2>Why Choose This Course</h2>
          <ul className="clp-highlights">
            {landing.highlights.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {/* BOTTOM CTA (reinforces trust for a long page) */}
      <section className="clp-section clp-bottom-cta">
        <h2>Ready to get started?</h2>
        <div className="clp-cta-group">
          <button className="clp-btn clp-btn-primary" onClick={() => setModalType("apply")}>
            Apply Now
          </button>
          {landing.brochureUrl && (
            <button className="clp-btn clp-btn-secondary" onClick={() => setModalType("brochure")}>
              Download Brochure
            </button>
          )}
        </div>
      </section>

      {modalType && (
        <CourseApplyModal
          type={modalType}
          courseId={category._id}
          courseName={category.name}
          courseSlug={category.slug}
          brochureUrl={landing.brochureUrl}
          onClose={() => setModalType(null)}
          onSubmitted={handleSubmitted}
        />
      )}
    </div>
  );
};

export default CourseLandingPage;