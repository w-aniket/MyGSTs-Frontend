import axios from "axios";
import "../../Pages/Services/Services.css";
import { useState } from "react";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";
import SearchFilter from "../SearchFilter/SearchFilter";
import Pagination from "../Pagination/Pagination";

const ServiceTable = ({ services, onEdit, onDelete, loading, setLoading }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const searchFields = ["title", "features"];
  const filteredServices = services.filter((service) =>
    searchFields.some((field) => {
      const value = service[field];
      if (Array.isArray(value)) {
        return value
          .join(", ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );

  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;
  const totalpages = Math.ceil(filteredServices.length / servicesPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  return (
    <>
      <div className="serach-field">
        <SearchFilter
          searchTerm={searchTerm}
          onSearch={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="table-responsive">
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              {/* <th>Icon</th>
                <th>Icon Background</th>
                <th>Category</th> */}
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="loading-message">
                  Loading...
                </td>
              </tr>
            ) : filteredServices.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data-message">
                  No services available.
                </td>
              </tr>
            ) : (
              paginatedServices.map((service) => (
                <tr key={service._id}>
                  <td data-label="Title">{service.title}</td>
                  {/* <td data-label="Icon" >{service.icon}</td>
                        <td data-label="Icon Background" >{service.iconbg}</td>
                        <td data-label="Category" >{service.category}</td> */}
                  <td data-label="Features" className="features-scroll">
                    <div>{service.features.join(", ")}</div>
                  </td>
                  <td className="services-table-actions" data-label="Actions">
                    <button onClick={() => onEdit(service)}>Edit</button>
                    <button
                      onClick={() => {
                        setSelectedServiceId(service._id);
                        setConfirmOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalpages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {confirmOpen && (
        <ConfirmModal
          message="Are you sure you want to delete this service?"
          onConfirm={() => {
            onDelete(selectedServiceId);
            setConfirmOpen(false);
            setSelectedServiceId(null);
          }}
          onCancel={() => {
            setConfirmOpen(false);
            setSelectedServiceId(null);
          }}
        />
      )}
    </>
  );
};

export default ServiceTable;
