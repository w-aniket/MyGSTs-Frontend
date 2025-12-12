import React from "react";
import ReactDOM from "react-dom";
import "./ConfirmModal.css";

const ConfirmModal = ({ message, loading, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <button className="confirm-btn" onClick={onConfirm} disabled={loading}>
            {loading ? <span className="loader"></span> : "Yes"}
          </button>
          <button className="cancel-btn" onClick={onCancel} disabled={loading}>
            No
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
