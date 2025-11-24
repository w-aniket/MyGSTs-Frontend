import React, { useState } from "react";
import { addCommentApi } from "../../../Utils/APIs/serviceRequestApi";
import { toast } from "react-toastify";
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
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-box">
      <h3>Add Comment</h3>

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

      {request.comments?.length > 0 ? (
        request.comments.map((c, index) => (
          <div key={index} className="comment-box">
            <p>
              <strong>{c.user}</strong>
            </p>
            <p>{c.text}</p>
            <span className="comment-date">
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default AddComment;
