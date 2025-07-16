import React from "react";

const AssignMembersForm = ({
  requestId,
  members,
  currentIds,
  originalIds,
  onChange,
  onSave,
  isSaving,
}) => {
  const hasChanges =
    JSON.stringify(currentIds) !== JSON.stringify(originalIds);

  return (
    <>
      <label className="emp-dashboard_label">Assign Member</label>
      <div className="emp-dashboard_checkbox-group">
        {members.map((member) => {
          const isChecked = currentIds.includes(member._id);
          return (
            <label key={member._id} className="emp-dashboard_checkbox-label">
              <input
                type="checkbox"
                checked={isChecked}
                className="emp-dashboard_checkbox"
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...currentIds, member._id]
                    : currentIds.filter((id) => id !== member._id);
                  onChange(requestId, updated);
                }}
              />
              {member.firstName} {member.lastName}
            </label>
          );
        })}
      </div>

      {hasChanges && (
        <button
          className="emp-dashboard_save-btn"
          onClick={() => onSave(requestId, currentIds)}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      )}
    </>
  );
};

export default AssignMembersForm;
