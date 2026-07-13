import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCourseApplication,
  markCourseApplicationRead,
} from "../../../Utils/APIs/courseApplicationApi";
import "./CourseApplicationDetail.css";

const CourseApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  const loadItem = async () => {
    const data = await getCourseApplication(id);
    setItem(data);
    if (!data.read) {
      await markCourseApplicationRead(id);
    }
  };

  useEffect(() => {
    loadItem();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="detail-page">
      <h2>Course Application Details</h2>

      <div className="detail-card">
        <p><strong>Type:</strong> {item.type === "apply" ? "Application" : "Brochure Request"}</p>
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Course:</strong> {item.course?.name || "-"}</p>
        <p><strong>Phone:</strong> {item.phone}</p>
        <p><strong>WhatsApp:</strong> {item.whatsapp}</p>
        <p><strong>Email:</strong> {item.email}</p>
        <p><strong>Comment:</strong> {item.comment || "-"}</p>
        <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
      </div>

      <button className="detail-back-btn" onClick={() => navigate("/admin/course-applications")}>
        Back to List
      </button>
    </div>
  );
};

export default CourseApplicationDetail;