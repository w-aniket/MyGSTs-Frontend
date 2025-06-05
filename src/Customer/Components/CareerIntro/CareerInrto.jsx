import React from "react";
import "./CareerInrto.css";
import { useNavigate } from "react-router-dom";

const CareerInrto = ({showButton, reverseLayout     }) => {
    const navigate = useNavigate();
    
  return (
    <div className={`career-section ${reverseLayout ? "reverse" : ""}`}>
      <div className="career-content">
        <h1>Career Opportunities</h1>
        <p>Join us and build your future with an amazing team.</p>
        {showButton && (
          <a onClick={() => navigate('/careers')} className="btn">
            Apply Now
          </a>
        )}
      </div>
      <div className="career-image">
        <img
          src="https://img.freepik.com/free-photo/rag-doll-blue-word-career_1156-192.jpg?t=st=1743340199~exp=1743343799~hmac=9f90e69ebbb595f4dfe101c4f67a43ce4cbf2a79c32e1e438f07046537d404c4&w=996"
          alt="Career"
        />
      </div>
    </div>
  );
};

export default CareerInrto;
