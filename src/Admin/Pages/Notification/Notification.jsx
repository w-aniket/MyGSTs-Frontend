import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.css"

const Notification = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const loadData = async () => {
    const res = await axios.get(`${apiUrl}/api/notifications`);
    setList(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpen = async (n) => {
    await axios.patch(`${apiUrl}/api/notifications/read/${n._id}`);

    if (n.type === "contact") {
      navigate(`/admin/contact-requests/${n.dataId}`);
    } else if (n.type === "service") {
      navigate(`/admin/service-requests/${n.dataId}`);
    } else if (n.type === "application") {
      navigate(`/admin/applications/${n.dataId}`);
    }
  };
  return (
    <div className="notification-page">
      <h2>Notification</h2>

      {list.map((n) => (
        <div
            key={n._id}
            className={`notification-card ${!n.read ? "unread" : ""}`}
            onClick={() => handleOpen(n)}
        >
            <h3>{n.title}</h3>
            <p>{n.message}</p>
            <small>{new Date(n.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Notification;
