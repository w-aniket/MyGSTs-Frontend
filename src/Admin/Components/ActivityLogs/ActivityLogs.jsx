import React from 'react'
import './ActivityLogs.css'

const ActivityLogs = ({logs, role}) => {
    if (!logs || logs.length === 0) {
    return <p className="al-empty">No activity logs found.</p>;
  }

    const restrictedActions = ["amount_update"];

    const filteredLogs =
    role === "employee"
      ? logs.filter((log) => !restrictedActions.includes(log.action))
      : logs;

  return (
    <div className='al-container'>
        <h3 className='al-title'>Activity Logs</h3>

        <div className="al-list">
            {filteredLogs.map((log) => (
          <div key={log._id} className="al-item">
            <div className="al-header">
              <strong>{log.action.replace("_", " ").toUpperCase()}</strong>
              <span>{new Date(log.createdAt).toLocaleString()}</span>
            </div>

            <p className="al-detail">{log.detail}</p>

            <div className="al-meta">
              {log.actor ? (
                <span>
                  By: <strong>{log.actor?.firstName} {log.actor?.lastName}</strong> ({log.actorRole})
                </span>
              ) : (
                <span>System Action</span>
              )}
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default ActivityLogs