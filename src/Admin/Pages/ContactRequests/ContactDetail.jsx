import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ContactDetail.css"
const ContactDetail = () => {
     const { id } = useParams();
  const [item, setItem] = useState(null);

  const loadItem = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/contact/${id}`);
    setItem(res.data);
  };

  useEffect(() => {
    loadItem();
  }, []);

  if (!item) return <p>Loading...</p>;
  return (
     <div className="detail-page">
      <h2>Contact Request Details</h2>

      <div className="detail-card">
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Email:</strong> {item.email}</p>
        <p><strong>Phone:</strong> {item.contact}</p>
        <p><strong>Subject:</strong> {item.subject}</p>
        <p><strong>Message:</strong> {item.message}</p>
        <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default ContactDetail