import React from "react";
import { useNavigate } from "react-router-dom";

const Education = () => {

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      e.target.value = "";
      return;
    }

    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      alert("File size must be 1MB or less.");
      e.target.value = "";
      return;
    }

    console.log("Valid resume file:", file.name);
  };

  const handleResultChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed for result.");
      e.target.value = "";
      return;
    }

    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Result file must be 1MB or less.");
      e.target.value = "";
      return;
    }

    console.log("Result uploaded:", file.name);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    navigate('/careers/appliedjob')
    setTimeout(() => {
      alert('Application submitted successfully!')
    }, 100);

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>12th Details</h2>
      <div className="education-section">
        <div className="profile-form-group">
          <label>Name of College *</label>
          <input
            type="text"
            name="12-college-name"
            placeholder="College Name"
          />
        </div>

        <div className="profile-form-group">
          <label>University *</label>
          <input type="text" name="12-university" placeholder="University" />
        </div>

        <div className="profile-form-group">
          <label>Year of Passing</label>
          <input
            type="date"
            name="12-yearOfPassing"
            onKeyDown={(e) => e.preventDefault()}
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
          />
        </div>

        <div className="profile-form-group">
          <label>Percentage</label>
          <input type="text" name="12-percentage" placeholder="Percentage" />
        </div>

        <div className="profile-form-group">
          <label htmlFor="result">Upload Result</label>
          <input
            type="file"
            name="12-result"
            id="result"
            accept=".pdf"
            onChange={handleResultChange}
          />
          <p>
            Allowed: <strong>.pdf</strong> | Max size: <strong>1Mb</strong>
          </p>
        </div>
      </div>
      <h2>Diploma (If Applicable) </h2>
      <div className="education-section">
        <div className="profile-form-group">
          <label>Diploma Name</label>
          <input
            type="text"
            name="diploma-name"
            placeholder="Degree"
            
          />
        </div>

        <div className="profile-form-group">
          <label>University</label>
          <input
            type="text"
            name="diploma-university"
            placeholder="University"
            
          />
        </div>

        <div className="profile-form-group">
          <label>Year of Passing</label>
          <input
            type="date"
            name="diploma-yearOfPassing"
            
            onKeyDown={(e) => e.preventDefault()}
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
          />
        </div>

        <div className="profile-form-group">
          <label>Percentage</label>
          <input
            type="text"
            name="diploma-percentage"
            placeholder="Percentage"
            
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="result">Upload Result *</label>
          <input
            type="file"
            name="diploma-result"
            id="result"
            accept=".pdf"
            onChange={handleResultChange}
            
          />
          <p>
            Allowed: <strong>.pdf</strong> | Max size: <strong>1Mb</strong>
          </p>
        </div>
      </div>
      <h2>Graduation / Degree</h2>
      <div className="education-section">
        <div className="profile-form-group">
          <label>Course Name</label>
          <input type="text" name="degree-name" placeholder="Degree" required />
        </div>
        <div className="profile-form-group">
          <label>University</label>
          <input
            type="text"
            name="degree-university"
            placeholder="University"
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Year of Passing</label>
          <input
            type="date"
            name="degree-yearOfPassing"
            required
            onKeyDown={(e) => e.preventDefault()}
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
          />
        </div>
        <div className="profile-form-group">
          <label>Percentage</label>
          <input
            type="text"
            name="degree-percentage"
            placeholder="Percentage"
            required
          />
        </div>
        <div className="profile-form-group">
          <label>Specialization (If any)</label>
          <input
            type="text"
            name="degree-specialization"
            placeholder="Specialization"
            required
          />
        </div>
        <div className="profile-form-group">
          <label htmlFor="result">Upload Result *</label>
          <input
            type="file"
            name="degree-result"
            id="result"
            accept=".pdf"
            onChange={handleResultChange}
            required
          />
          <p>
            Allowed: <strong>.pdf</strong> | Max size: <strong>1Mb</strong>
          </p>
        </div>
      </div>

      <h2>Resume</h2>
      <div className="profile-form-group">
        <label htmlFor="resume">Upload Resume*</label>
        <input
          type="file"
          name="resume"
          id="resume"
          accept=".pdf"
          onChange={handleFileChange}
          required
        />
        <p>
          Allowed: <strong>.pdf</strong> | Max size: <strong>1MB</strong>
        </p>
      </div>
      <div className="button-wrapper">
        <button type="submit" className="save-and-next">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Education;
