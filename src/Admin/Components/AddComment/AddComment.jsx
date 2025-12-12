import React, { useState } from "react";
import {
  addCommentApi,
  deleteCommentApi,
} from "../../../Utils/APIs/serviceRequestApi";
import { toast } from "react-toastify";
import ConfirmModal from "../../../Component/ConfirmModal/ConfirmModal";
import "./AddComment.css";

const AddComment = ({ request, onUpdated }) => {
  const [text, setText] = useState("");
  const [visibleToClient, setVisibleToClient] = useState(false);
  const [loading, setLoading] = useState(false);

  // Delete modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const submitComment = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      await addCommentApi(request._id, { text, visibleToClient });
      setText("");
      onUpdated();
      toast.success("Comment add successfull");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteCommentApi(request._id, deleteId);
      toast.success("Comment deleted");
      onUpdated();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment");
    }

    setDeleteLoading(false);
    setShowConfirm(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  const sorted = [...request.comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const staffComments = sorted.filter((c) => !c.visibleToClient);
  const clientComments = sorted.filter((c) => c.visibleToClient);

  return (
    <div className="comment-box">
      <h3>Comments</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />

      <label>
        <input
          type="checkbox"
          checked={visibleToClient}
          onChange={() => setVisibleToClient(!visibleToClient)}
        />
        Visible to Client
      </label>

      <button className="main-comment-btn" onClick={submitComment} disabled={loading}>
        {loading ? "Posting..." : "Add Comment"}
      </button>

      <div className="comment-section-block">
        <h4>Staff Comments</h4>
        {staffComments.length === 0 && <p>No staff comments.</p>}

        {staffComments.map((c, i) => (
          <div key={i} className="comment-item comment-internal">
            <div className="comment-header">
              <strong>
                {c.commentedBy?.firstName} {c.commentedBy?.lastName}
              <small> ({c.role})</small>
              </strong>{" "}
              <button
                className="delete-comment-btn"
                onClick={() => openDeleteModal(c._id)}
              >
                ✕
              </button>
            </div>

            <p>{c.text}</p>
            <span className="comment-date">
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="comment-section-block">
        <h4>Client Visible Comments</h4>
        {clientComments.length === 0 && <p>No client-visible comments.</p>}

        {clientComments.map((c, i) => (
          <div key={i} className="comment-item comment-client">
            <div className="comment-header">
              <strong>
                {c.commentedBy?.firstName} {c.commentedBy?.lastName}
              <small> ({c.role})</small>
              </strong>{" "}
              <button
                className="delete-comment-btn"
                onClick={() => openDeleteModal(c._id)}
              >
                ✕
              </button>
            </div>
            <p>{c.text}</p>
            <span className="comment-date">
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      {showConfirm && (
        <ConfirmModal
          message={"Are you sure you want to delete this comment?"}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default AddComment;
