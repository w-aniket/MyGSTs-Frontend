import axios from "axios";
import "../../Pages/Services/Services.css";
import { useState } from "react";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";

const ServiceTable = ({ services, onEdit, onDelete, loading, setLoading }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  return (
    <>
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
        { loading ? ( 
          
            <tr>
              <td colSpan="4" className="loading-message">
                Loading...
              </td>
            </tr>
          ) : services.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data-message">
                No services available.
              </td>
            </tr>
          )
         
        
        : services.map((service) => (
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
              <button onClick={() => {
                setSelectedServiceId(service._id)
                setConfirmOpen(true)
                }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {
      confirmOpen && (
        <ConfirmModal
          message="Are you sure you want to delete this service?"
          onConfirm={() => {
            onDelete(selectedServiceId)
            setConfirmOpen(false)
            setSelectedServiceId(null)
          }}

          onCancel={() => {
            setConfirmOpen(false);
            setSelectedServiceId(null)
          }}
        />
      )
    }
    </>
  );
};

export default ServiceTable;
