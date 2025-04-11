import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PersonelDetail = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState(null);
  const [error, setError] = React.useState("");
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG, PNG, or WEBP images are allowed.");
      setImageUrl(null);
      return;
    }

    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Image must be less than 2MB.");
      setImageUrl(null);
      return;
    }

    setError("");
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!/^\d{10}$/.test(data.contact)) {
      alert("Contact number should be 10 digits.");
      return;
    }

    console.log(data);
    navigate("/careers/profile/2");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Personal Detail</h2>
      <div className="personal-detail-section">
        <div className="profile-form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            placeholder="Surname first"
            required
          />
        </div>

        <div className="profile-form-group">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dob"
            required
            onKeyDown={(e) => e.preventDefault()}
            onFocus={(e) => e.target.showPicker && e.target.showPicker()} // open date picker
          />
        </div>

        <div className="profile-form-group">
          <label>Gender *</label>
          <select name="gender" required>
            <option value="">select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="profile-form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            required
          />
        </div>

        <div className="profile-form-group">
          <label>Contact *</label>
          <input type="tel" name="contact" placeholder="Contact No" required />
        </div>

        <div className="profile-form-group">
          <label>Profile Photo *</label>
          <input
            type="file"
            name="profile-photo"
            placeholder="Profile Photo"
            accept=".jpg, .jpeg, .png, .webp"
            onChange={handleImageUpload}
            required
          />
          <p>
            Max Size: <strong>1Mb</strong>, Type:{" "}
            <strong>.jpg, .jpeg, .png, .webp</strong>
          </p>
        </div>
      </div>
      <div className="button-wrapper">
        <button type="submit" className="save-and-next">
          Save and Next
        </button>
      </div>
    </form>
  );
};

export default PersonelDetail;
