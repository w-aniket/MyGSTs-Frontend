import React, { useState } from "react";
import { addCommentApi } from "../../../Utils/APIs/serviceRequestApi";
import { toast } from "react-toastify";
import "./AddComment.css";

const AddComment = ({ request, onUpdated }) => {
  const [text, setText] = useState("");
  const [visibleToClient, setVisibleToClient] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitComment = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const res = await addCommentApi(request._id, { text, visibleToClient });
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

      <button onClick={submitComment} disabled={loading}>
        {loading ? "Posting..." : "Add Comment"}
      </button>

      <div className="comment-section-block">
        <h4>Staff Comments</h4>
        {staffComments.length === 0 && <p>No staff comments.</p>}

        {staffComments.map((c, i) => (
          <div key={i} className="comment-item comment-internal">
            <strong>
              {c.commentedBy?.firstName} {c.commentedBy?.lastName}
            </strong>{" "}
            <small>({c.role})</small>
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
            <strong>
              {c.commentedBy?.firstName} {c.commentedBy?.lastName}
            </strong>{" "}
            <small>({c.role})</small>
            <p>{c.text}</p>
            <span className="comment-date">
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddComment;
