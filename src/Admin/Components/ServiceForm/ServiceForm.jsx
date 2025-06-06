import axios from "axios";
import React, { useEffect, useState } from "react";
import { use } from "react";
import "../../Pages/Services/Services.css";

const ServiceForm = ({ fetchServices, editData, setEditData, closeModal }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    iconbg: "",
    category: "",
    features: "",
    description: "",
    pricing: "",
    benefits: "",
  });

  const availableColors = [
    "#e57373",
    "#f06292",
    "#ba68c8",
    "#9575cd",
    "#7986cb",
    "#64b5f6",
    "#4fc3f7",
    "#4dd0e1",
    "#4db6ac",
    "#81c784",
    "#aed581",
    "#dce775",
    "#fff176",
    "#ffd54f",
    "#ffb74d",
    "#ffab91",
    "#bcaaa4",
    "#FF6F61",
    "#6B5B95",
    "#88B04B",
    "#F7CAC9",
    "#92A8D1",
    "#B565A7",
    "#009B77",
    "#DD4124",
    "#45B8AC",
    "#EFC050",
    "#5B5EA6",
    "#9B2335",
    "#55B4B0",
    "#E15D44",
    "#7FCDCD",
    "#BC243C",
    "#C3447A",
    "#ffb300",
  ];

  const availableIcons = [
    { name: "Accounting", class: "fas fa-calculator" },
    { name: "GST", class: "fas fa-file-invoice-dollar" },
    { name: "Money", class: "fas fa-coins" },
    { name: "ITR", class: "fas fa-file-contract" },
    { name: "Banking", class: "fas fa-university" },
    { name: "Investment", class: "fas fa-piggy-bank" },
    { name: "Tax", class: "fas fa-receipt" },
    { name: "Loan", class: "fas fa-hand-holding-usd" },
    { name: "Income", class: "fas fa-dollar-sign" },
    { name: "Document", class: "fas fa-file-alt" },
    { name: "ID Card", class: "fas fa-id-card" },
    { name: "Bill", class: "fas fa-file-invoice" },
    { name: "Payment", class: "fas fa-money-check-alt" },
    { name: "Report", class: "fas fa-chart-line" },
    { name: "Ledger", class: "fas fa-book" },
    { name: "Business", class: "fas fa-briefcase" },
    { name: "Compliance", class: "fas fa-balance-scale" },
    { name: "Secure File", class: "fas fa-lock" },
    { name: "Analytics", class: "fas fa-chart-pie" },
    { name: "Team", class: "fas fa-users" },
    { name: "Email", class: "fas fa-envelope" },
    { name: "User Account", class: "fas fa-user-circle" },
  ];

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        features: editData.features.join(", "),
        benefits: editData.benefits?.join(", ") || "",
        description: editData.description || "",
        pricing: editData.pricing || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features.split(",").map((feature) => feature.trim()),
      benefits: formData.benefits.split(", ").map((benefit) => benefit.trim())
    };

    if (editData) {
      try {
        await axios.put(`${apiUrl}/api/services/${editData._id}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {
        console.error("Error updating service:", error);
        alert("Failed to update service");
      }
    } else {
      try {
        await axios.post(`${apiUrl}/api/services`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (error) {
        console.error("Error creating service:", error);
        alert("Failed to create service");
      }
    }

    setFormData({
      title: "",
      icon: "",
      iconbg: "",
      category: "",
      features: "",
      description: "",
      benefits: "",
      pricing: "",
    });
    setEditData(null);
    fetchServices();
    if (closeModal) closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <div style={{ margin: "10px 0" }}>
        <label>Select an Icon:</label>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "8px",
          }}
        >
          {availableIcons.map((icon) => (
            <div
              key={icon.class}
              onClick={() => setFormData({ ...formData, icon: icon.class })}
              style={{
                fontSize: "24px",
                padding: "10px",
                borderRadius: "8px",
                border:
                  formData.icon === icon.class
                    ? "3px solid black"
                    : "1px solid #ccc",
                cursor: "pointer",
                background: "#f0f0f0",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title={icon.name}
            >
              <i className={icon.class}></i>
            </div>
          ))}
        </div>
        {formData.icon && (
          <p style={{ marginTop: "6px" }}>
            Selected Icon: <i className={formData.icon}></i> ({formData.icon})
          </p>
        )}
      </div>

      <div style={{ margin: "10px 0" }}>
        <label>Icon Background Color:</label>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "6px",
          }}
        >
          {availableColors.map((color) => (
            <div
              key={color}
              onClick={() => setFormData({ ...formData, iconbg: color })}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "6px",
                backgroundColor: color,
                cursor: "pointer",
                border:
                  formData.iconbg === color
                    ? "3px solid black"
                    : "1px solid #ccc",
              }}
            />
          ))}
        </div>
        <p style={{ marginTop: "6px" }}>
          Selected:{" "}
          <span style={{ color: formData.iconbg }}>{formData.iconbg}</span>
        </p>
      </div>

      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <textarea
        name="features"
        value={formData.features}
        onChange={handleChange}
        placeholder="Features (comma separated)"
        required
      />

      <textarea name="description" 
        value={formData.description}
        onChange={handleChange}
        placeholder="Full Description"
        required
      />

      <input name="pricing"
        value={formData.pricing}
        onChange={handleChange}
        placeholder="Pricing (e.g., ₹500 or Free)"
      />

      
      <textarea name="benefits" value={formData.benefits}
        onChange={handleChange}
        placeholder="Benefits (comma seperated)"
      ></textarea>

      <button type="submit">
        {editData ? "Update Service" : "Add Service"}
      </button>
    </form>
  );
};

export default ServiceForm;
