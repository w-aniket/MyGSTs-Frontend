import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotificationsApi, markAsReadApi, markAllAsReadApi } from "../../../Utils/APIs/notificationApi";
import "./Notification.css";

const Notification = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);

  const loadNotifications = async () => {
    const data = await getNotificationsApi();
    setNotification(data);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    await markAllAsReadApi();
    setNotification((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleOpen = async (n) => {
    await markAsReadApi(n._id);
    setNotification((prev) =>
      prev.map((x) => (x._id === n._id ? { ...x, read: true } : x))
    );

    if (n.type === "contact") {
      navigate(`/admin/contact-request/${n.dataId}`);
    } else if (n.type === "service") {
      navigate(`/admin/service-request/${n.dataId}`);
    } else if (n.type === "application") {
      navigate(`/admin/applications/${n.dataId}`);
    } else if (n.type === "course-application") {
      navigate(`/admin/course-application/${n.dataId}`);
    }
  };

  const hasUnread = notification.some((n) => !n.read);

  return (
    <div className="notification-page">
      <div className="notification-page-header">
        <h2>Notification</h2>
        {hasUnread && (
          <button onClick={handleMarkAllRead}>Mark all as read</button>
        )}
      </div>

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