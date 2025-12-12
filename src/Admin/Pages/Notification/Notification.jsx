import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.css"

const Notification = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const [notification, setNotification] = useState([]);


  const loadNotifications = async () => {
    const res = await axios.get(`${apiUrl}/api/notifications`, authHeader);
    setNotification(res.data?.notifications);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleOpen = async (n) => {
    await axios.patch(`${apiUrl}/api/notifications/read/${n._id}`,{} ,authHeader);

    if (n.type === "contact") {
      navigate(`/admin/contact-request/${n.dataId}`);
    } else if (n.type === "service") {
      navigate(`/admin/service-request/${n.dataId}`);
    } else if (n.type === "application") {
      navigate(`/admin/applications/${n.dataId}`);
    }
  };
  return (
    <div className="notification-page">
      <h2>Notification</h2>

      {notification.map((n) => (
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
