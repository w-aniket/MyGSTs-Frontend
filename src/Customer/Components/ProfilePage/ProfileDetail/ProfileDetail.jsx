import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfileDetail.css";
import { toast } from "react-toastify";
import { use } from "react";
import ConfirmModal from "../../../../Component/ConfirmModal/ConfirmModal";
import ProfileView from "./ProfileView";
import { UserContext } from "../../../../UserContex/UserContext";

const ProfileDetail = ({ setImageUrl }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("jobId");
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const { user } = useContext(UserContext);

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
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user]);

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
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();

      // append simple fields

      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("contactNumber", formData.contactNumber);
      fd.append("dob", formData.dob);
      fd.append("gender", formData.gender);

      if (formData.passportPhoto instanceof File) {
        fd.append("passportPhoto", formData.passportPhoto);
      }

      // adsress

      fd.append("address", JSON.stringify(formData.address));

      // education

      fd.append(
        "education",
        JSON.stringify({
          tenth: {
            board: formData.education.tenth.board,
            year: formData.education.tenth.year,
            percentage: formData.education.tenth.percentage,
          },
          twelfth: {
            board: formData.education.twelfth.board,
            year: formData.education.twelfth.year,
            percentage: formData.education.twelfth.percentage,
          },
          graduation: {
            university: formData.education.graduation.university,
            year: formData.education.graduation.year,
            percentage: formData.education.graduation.percentage,
          },
        })
      );

      // education marksheets
      if (formData.education.tenth.marksheet instanceof File) {
        fd.append("tenthMarksheet", formData.education.tenth.marksheet);
      }
      if (formData.education.twelfth.marksheet instanceof File) {
        fd.append("twelfthMarksheet", formData.education.twelfth.marksheet);
      }
      if (formData.education.graduation.marksheet instanceof File) {
        fd.append(
          "graduationMarksheet",
          formData.education.graduation.marksheet
        );
      }

      // resume
      if (formData.resume instanceof File) {
        fd.append("resume", formData.resume);
      }


      if (!isProfileAvailable) {
        const res = await axios.post(`${apiUrl}/api/user/profile`, fd, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        if (!jobId) {
          toast.success("Profile created successfully!");
          navigate("/careers");
        }
      }

      if (jobId) {
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
    if (isProfileAvailable && profile?.passportPhoto) {
      setImageUrl(profile.passportPhoto.url);
    }
  }, [isProfileAvailable, profile, setImageUrl]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-detail-container">
      {isProfileAvailable ? (
        <ProfileView
          profile={profile}
          applyMode={applyMode}
          handleApply={handleApply}
        />
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
              readOnly
              style={{ backgroundColor: "#f3f3f3", cursor: "not-allowed" }}
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
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  passportPhoto: e.target.files[0],
                }))
              }
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
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  education: {
                    ...prev.education,
                    tenth: {
                      ...prev.education.tenth,
                      marksheet: e.target.files[0],
                    },
                  },
                }))
              }
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
                setFormData((prev) => ({
                  ...prev,
                  education: {
                    ...prev.education,
                    twelfth: {
                      ...prev.education.twelfth,
                      marksheet: e.target.files[0],
                    },
                  },
                }))
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
                setFormData((prev) => ({
                  ...prev,
                  education: {
                    ...prev.education,
                    graduation: {
                      ...prev.education.graduation,
                      marksheet: e.target.files[0],
                    },
                  },
                }))
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, resume: e.target.files[0] }))
              }
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
