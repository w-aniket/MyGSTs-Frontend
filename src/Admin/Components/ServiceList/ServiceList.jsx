import axios from "axios";
import React, { useEffect, useState } from "react";
import ServiceTable from "../SeviceTable/ServiceTable";
import ServiceForm from "../ServiceForm/ServiceForm";
import "./ServiceList.css";
import { toast } from "react-toastify";
const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({page: 1, totalPages: 1});

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/services`,  {
        params: {
          page,
          limit: 6,
          search,
        },
      });
      setServices(response.data.services);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page, search]);

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
      toast.success("Service deleted successfully.");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error(error.message);
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
      <div className="table-responsive">
        <ServiceTable
          services={services}
          loading={loading}
          pagination={pagination}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={(newPage) => setPage(newPage)}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      </div>
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

export default ServiceList;
