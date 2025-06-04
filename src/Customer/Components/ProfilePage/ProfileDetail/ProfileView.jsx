import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { downloadFile } from "../../../../Utils/Download";

const ProfileView = ({ profile, applyMode, handleApply }) => {
  const location = useLocation();

  profile = location.state?.profile || profile;
  console.log("ProfileView", profile);
  return (
    <div className="profile-view">
      <div className="profile-view-group">
        <p>
          <img src={profile.passportPhoto} alt="Profile Photo" width="200px" />
        </p>
      </div>
      <div className="profile-view-group">
        <h3>Personal Details</h3>

        <p>
          <strong>Full Name:</strong> {profile.fullName}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Contact:</strong> {profile.contactNumber}
        </p>
        <p>
          <strong>Date of Birth:</strong> {profile.dob.split("T")[0]}
        </p>
        <p>
          <strong>Gender:</strong> {profile.gender}
        </p>
      </div>

      <div className="profile-view-group">
        <h3>Address</h3>
        <p>
          <strong>Street:</strong> {profile.address?.street}
        </p>
        <p>
          <strong>City:</strong> {profile.address?.city}
        </p>
        <p>
          <strong>State:</strong> {profile.address?.state}
        </p>
        <p>
          <strong>Country:</strong> {profile.address?.country}
        </p>
        <p>
          <strong>Pincode:</strong> {profile.address?.pincode}
        </p>
      </div>

      <div className="profile-view-group">
        <h3>Education - 10th</h3>
        <p>
          <strong>Board:</strong> {profile.education?.tenth?.board}
        </p>
        <p>
          <strong>Year:</strong> {profile.education?.tenth?.year}
        </p>
        <p>
          <strong>Percentage:</strong> {profile.education?.tenth?.percentage}
        </p>
        <p>
          <strong>Marksheet:</strong>
          {profile.education?.tenth?.marksheet && (
            <a
              onClick={() =>
                downloadFile(
                  profile.education.tenth.marksheet,
                  `10th-marksheet.pdf`
                )
              }
            >
              Download
            </a>
          )}
        </p>
      </div>

      <div className="profile-view-group">
        <h3>Education - 12th</h3>
        <p>
          <strong>Board:</strong> {profile.education?.twelfth?.board}
        </p>
        <p>
          <strong>Year:</strong> {profile.education?.twelfth?.year}
        </p>
        <p>
          <strong>Percentage:</strong> {profile.education?.twelfth?.percentage}
        </p>
        <p>
          <strong>Marksheet:</strong>
          {profile.education?.twelfth?.marksheet && (
            <a
              onClick={() =>
                downloadFile(
                  profile.education.twelfth.marksheet,
                  "12th-marksheet.pdf"
                )
              }
              rel="noopener noreferrer"
            >
              Download
            </a>
          )}
        </p>
      </div>

      <div className="profile-view-group">
        <h3>Education - Graduation</h3>
        <p>
          <strong>University:</strong>{" "}
          {profile.education?.graduation?.university}
        </p>
        <p>
          <strong>Year:</strong> {profile.education?.graduation?.year}
        </p>
        <p>
          <strong>Percentage:</strong>{" "}
          {profile.education?.graduation?.percentage}
        </p>
        <p>
          <strong>Marksheet:</strong>
          {profile.education?.graduation?.marksheet && (
            <a
              onClick={() =>
                downloadFile(
                  profile.education.graduation.marksheet,
                  "graduation-marksheet.pdf"
                )
              }
              rel="noopener noreferrer"
            >
              Download
            </a>
          )}
        </p>
      </div>

      <div className="profile-view-group">
        <h3>Resume</h3>
        <p>
          {profile.resume && (
            <a
              onClick={() => downloadFile(profile.resume, "resume.pdf")}
              rel="noopener noreferrer"
            >
              Download resume
            </a>
          )}
        </p>
      {applyMode && (
        <button className="apply-button" onClick={handleApply}>
          Confirm & Apply
        </button>
      )}
      </div>

    </div>
  );
};

export default ProfileView;
