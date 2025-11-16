import axios from "axios";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationBell.css"

const NotificationBell = () => {
  const [unread, setUnread] = useState(0);
  const navigate = useNavigate();
  

  const fetchUnseen = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notifications/unread-count`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      setUnread(res.data?.count || 0);
    } catch (error) {
      console.error("Failed to fetch unread count", error);
    }
  };

  useEffect(() => {
    fetchUnseen();
  }, []);

  return (
    <div 
      className="notification-wrapper"
      onClick={() => navigate("/admin/notifications")}
    >
      <Bell className="notification-icon" />
      {unread > 0 && <span className="notification-badge">{unread}</span>}
    </div>
  )
};

export default NotificationBell;
