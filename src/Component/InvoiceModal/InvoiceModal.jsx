import React from "react";
import "./InvoiceModal.css";

const InvoiceModal = ({ amount, onChange, onSubmit, onCancel }) => {
  return (
    <div className="invoice-modal modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">Enter Invoice Amount</h3>
        <input
          type="number"
          className="modal-input"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="modal-actions">
          <button className="modal-btn" onClick={onSubmit}>
            Submit
          </button>
          <button className="modal-btn cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
