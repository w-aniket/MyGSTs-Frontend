import axios from "axios";
import React, { useEffect, useState } from "react";
import ServiceTable from "../../Components/SeviceTable/ServiceTable";
import ServiceForm from "../../Components/ServiceForm/ServiceForm";
import "./Services.css";
import { toast } from "react-toastify";
const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/services`);
      setServices(response.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service) => {
    setEditData(service);
    setShowFormModal(true);
  };

  const handleDelete = async (id) => {
      try {
        await axios.delete(`${apiUrl}/api/services/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchServices();
        toast.success("Service deleted successfully.")
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error(error.message)
      }
    
  };

  const handleAdd = () => {
    setEditData(null);
    setShowFormModal(true);
  };
  return (
    <div className="main-services-wrapper">
      <div className="main-services-header">
        <h2>Services</h2>
        <button onClick={handleAdd} className="add-btn">
          + Add Service
        </button>
      </div>

      <ServiceTable
        services={services}
        loading={loading}
        setLoading={setLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setShowFormModal(false)}
              className="modal-close"
            >
              &times;
            </button>
            <ServiceForm
              fetchServices={fetchServices}
              editData={editData}
              setEditData={setEditData}
              closeModal={() => setShowFormModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
