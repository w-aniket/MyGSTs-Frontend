import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfileDetail.css";
import { toast } from "react-toastify";
import { use } from "react";
import ConfirmModal from "../../../../Component/ConfirmModal/ConfirmModal";
import { downloadFile } from "../../../../Utils/Download";

const ProfileDetail = ( {setImageUrl} ) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("jobId");
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [apply, setApply] = useState(false);
  const [applyMode, setApplyMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isProfileAvailable, setIsProfileAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    dob: "",
    gender: "",
    passportPhoto: "",

    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },

    education: {
      tenth: {
        board: "",
        year: "",
        percentage: "",
        marksheet: "",
      },
      twelfth: {
        board: "",
        year: "",
        percentage: "",
        marksheet: "",
      },
      graduation: {
        university: "",
        year: "",
        percentage: "",
        marksheet: "",
      },
    },

    resume: "",
  });

  useEffect(() => {
    if (queryParams.get("apply") === "true" && jobId) {
      setApplyMode(true);
    }
  }, [applyMode, jobId]);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.profile) {
          setProfile(res.data.profile);
          setIsProfileAvailable(true);
        }
      } catch (err) {
        setIsProfileAvailable(false);
        console.error(
          err.response?.data?.message || "Error fetching profile:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [section, field, subField] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          ...(subField
            ? {
                [field]: {
                  ...prev[section][field],
                  [subField]: value,
                },
              }
            : {
                [field]: value,
              }),
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    console.log("Form Data:", formData);
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD);

    const uniqueId = `file_${Date.now()}`; // without .pdf
    data.append("public_id", uniqueId);

    // Clone the file without extension using Blob
    const blob = new Blob([file], { type: file.type });
    data.append("file", blob, uniqueId);

    let uploadUrl = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD
    }/auto/upload`;

    if (file.type === "application/pdf") {
      uploadUrl = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD
      }/raw/upload`;
    }

    const res = await axios.post(uploadUrl, data);
    return res.data.secure_url;
  };

  const handleFileChange = async (e, name) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingFiles(true);
    try {
      const url = await uploadToCloudinary(file);

      if (name.includes(".")) {
        const [section, field, subField] = name.split(".");
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: {
              ...prev[section][field],
              [subField]: url,
            },
          },
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: url }));
      }
    } catch (err) {
      console.error("Cloudinary upload failed", err);
      toast.error("File upload failed");
    } finally {
      setUploadingFiles(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      if (!isProfileAvailable) {
        const res = await axios.post(`${apiUrl}/api/user/profile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!jobId) {
          toast.success("Profile created successfully!");
          navigate("/careers");
        }
        
      }

      if( jobId ) {
      await axios.post(
        `${apiUrl}/api/jobs/apply`,
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Applied successfully!");
      navigate("/careers/appliedjob");
    }

    setApply(false);

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error applying for job");
    }
  };

  useEffect(() => {
    if(isProfileAvailable && profile?.passportPhoto) {
          setImageUrl(profile.passportPhoto);

    }
  },[isProfileAvailable, profile, setImageUrl])

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-detail-container">
      {isProfileAvailable ? (
        <div className="profile-view">
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

          <h3>Education - 12th</h3>
          <p>
            <strong>Board:</strong> {profile.education?.twelfth?.board}
          </p>
          <p>
            <strong>Year:</strong> {profile.education?.twelfth?.year}
          </p>
          <p>
            <strong>Percentage:</strong>{" "}
            {profile.education?.twelfth?.percentage}
          </p>
          <p>
            <strong>Marksheet:</strong>
            {profile.education?.twelfth?.marksheet && (
              <a
                onClick={() => downloadFile(profile.education.twelfth.marksheet,"12th-marksheet.pdf")} 
                rel="noopener noreferrer"
              >
                Download
              </a>
            )}
          </p>

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
                onClick={() =>downloadFile(profile.education.graduation.marksheet,"graduation-marksheet.pdf")}
                rel="noopener noreferrer"
              >
                Download
              </a>
            )}
          </p>

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
      ) : (
        <form className="profile-form">
          <h3>Personal Details</h3>

          <div className="form-group">
            <label>Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Passport Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "passportPhoto")}
              required
            />
          </div>

          <h3>Address</h3>

          <div className="form-group">
            <label>Street</label>
            <input
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <h3>Education - 10th</h3>

          <div className="form-group">
            <label>Board</label>
            <input
              name="education.tenth.board"
              value={formData.education.tenth.board}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              name="education.tenth.year"
              value={formData.education.tenth.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Percentage</label>
            <input
              name="education.tenth.percentage"
              value={formData.education.tenth.percentage}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Marksheet</label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleFileChange(e, "education.tenth.marksheet")}
              required
            />
          </div>

          <h3>Education - 12th</h3>

          <div className="form-group">
            <label>Board</label>
            <input
              name="education.twelfth.board"
              value={formData.education.twelfth.board}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              name="education.twelfth.year"
              value={formData.education.twelfth.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Percentage</label>
            <input
              name="education.twelfth.percentage"
              value={formData.education.twelfth.percentage}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Marksheet</label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) =>
                handleFileChange(e, "education.twelfth.marksheet")
              }
              required
            />
          </div>

          <h3>Graduation</h3>

          <div className="form-group">
            <label>University</label>
            <input
              name="education.graduation.university"
              value={formData.education.graduation.university}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              name="education.graduation.year"
              value={formData.education.graduation.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Percentage</label>
            <input
              name="education.graduation.percentage"
              value={formData.education.graduation.percentage}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Marksheet</label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) =>
                handleFileChange(e, "education.graduation.marksheet")
              }
              required
            />
          </div>

          <h3>Resume</h3>

          <div className="form-group">
            <label>Upload Resume</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "resume")}
              required
            />
          </div>

          <div className="form-actions">
            {applyMode ? (
              <button
                type="button"
                onClick={() => setApply(true)}
                disabled={uploadingFiles}
              >
                {uploadingFiles ? (
                  <>
                    <span className="loading"></span> Uploading Files...
                  </>
                ) : (
                  "Save and Apply"
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setApply(true)}
                disabled={uploadingFiles}
              >
                {uploadingFiles ? (
                  <>
                    <span className="loading"></span> Uploading Files...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            )}
          </div>
        </form>
      )}
      {apply && (
        <ConfirmModal
          message="Once you Save and apply, you will not be able to edit your profile. Are you sure filled Information is correct?"
          onConfirm={handleApply}
          onCancel={() => setApply(false)}
        />
      )}
    </div>
  );
};

export default ProfileDetail;
