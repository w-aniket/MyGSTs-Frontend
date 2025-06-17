import axios from "axios";
import { Bell } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import "./NotificationBell.css"

const NotificationBell = () => {
  const [unseen, setUnseen] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const dropdownref = useRef();

  const fetchUnseen = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/service-requests/unseen`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      setUnseen(res.data?.unseenRequests || []);
    } catch (error) {
      console.error("Failed to fetch unseen notification", error);
    }
  };

  const markAsSeen = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/service-requests/mark-seen`,{},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUnseen([]);
    } catch (error) {
      console.error("Failed to mark notification as seen", error);
    }
  };

  useEffect(() => {
    fetchUnseen();
  }, []);

// close dropdown on outsideclick
useEffect(() => {
  const handleClickOutside = (e) => {
    if(dropdownref.current && !dropdownref.current.contains(e.target)) {
      if (isOpen) {
        setIsOpen(false);
        if (unseen.length > 0) {
          markAsSeen();
        }
      }
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [isOpen, unseen]);

const toggleDropdown = () => {
  setIsOpen((prev) => {
    const willBeOpen = !prev;
    if (prev && unseen.length > 0) {
      markAsSeen() 
    };
    return willBeOpen;
  });
};

  return (
    <div className="notification-wrapper" ref={dropdownref}>
      <div className="bell-icon" onClick={toggleDropdown}>
      <Bell className="notification-icon" />
      {unseen.length > 0 && <span className="notification-badge">{unseen.length}</span>}
      </div>
      {isOpen && (
        <div className="notification-dropdown">
          <h4>New Service requests</h4>
          {unseen.length === 0 ? (
            <p className="empty-text">No new requests</p>
          ) : (
            unseen.map((req) => (
              <div key={req._id} className="notification-item">
                •  <strong>Title:</strong> {req.service?.title || "Untitled service"} <br/>
                &nbsp;&nbsp;&nbsp;<strong>Name:</strong> {req.user?.firstName || ""}{" "} {req.user?.lastName || "Guest"}
              </div>
            ))
          )}
        </div>
      )

      }
    </div>
  );
};

export default NotificationBell;
