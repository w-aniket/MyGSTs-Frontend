import React from "react";
import { downloadFile } from "../../../Utils/Download"; // Optional if you want styles here too

const AttachmentViewer = ({ files = [], requestId }) => {
  if (!files || files.length === 0) return null;

  return (
    <div className="attachment">
      <strong>Attachment{files.length > 1 ? "s" : ""}:</strong>
      <ul>
        {files.map((file, idx) => {
          const url = file.url;
          const isPdf =
            /\.pdf(\?|$)/i.test(url) || /\/raw\/upload\//i.test(url);

          const label = isPdf
            ? `Download PDF ${idx + 1}`
            : `View image ${idx + 1}`;

          const onClick = () =>
            isPdf
              ? downloadFile(url, `request-${requestId}-${idx + 1}.pdf`)
              : window.open(url, "_blank", "noopener");

          return (
            <li key={idx}>
              <button type="button" className="download-btn" onClick={onClick}>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AttachmentViewer;
