import axios from "axios";
import "../../Pages/Services/Services.css";
import { useState } from "react";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";
import SearchFilter from "../SearchFilter/SearchFilter";
import Pagination from "../Pagination/Pagination";

const ServiceTable = ({ services = [], pagination = {page: 1, totalPages: 1}, onPageChange,onSearch, onEdit, onDelete, loading }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  return (
    <>
      <div className="serach-field">
        <SearchFilter
          onSearch={(value) => {
            onSearch(value)
          }}
        />
      </div>

      <div className="table-responsive">
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="loading-message">
                  Loading...
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-data-message">
                  No services available.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service._id}>
                  <td data-label="Title">{service.title}</td>
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
        currentPage={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={onPageChange}
      />

      {confirmOpen && (
        <ConfirmModal
          message="Are you sure you want to delete this service?"
          onConfirm={() => {
            onDelete(selectedServiceId);
            setConfirmOpen(false);
          }}
          onCancel={() => {
            setConfirmOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ServiceTable;
