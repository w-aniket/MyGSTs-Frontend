import React from 'react'
import AttachmentViewer from '../../Admin/Components/AttachmentViewer/AttachmentViewer'

const ServiceRequestInfo = ({ request, role }) => {
  return (
    <div className='request-info card'>
        <h2>Request Information</h2>

        <div><strong>Client:</strong> {request.name || "N/A"}</div>
        {/*show email and phone if backend return admin leader owner */}
        {request.email && <div><strong>Email:</strong> {request.email}</div>}
      {request.phone && <div><strong>Phone:</strong> {request.phone}</div>}
      <div><strong>Service:</strong> {request.service?.title || "N/A"}</div>
      <div><strong>Category:</strong> {request.service?.category || "N/A"}</div>
      <div><strong>Company:</strong> {request.companyName || "N/A"}</div>
      <div><strong>Status:</strong> {request.status}</div>
      <div><strong>Description:</strong>
      <p>{request.description || "-"}</p>
      </div>
      <div><strong>Created:</strong> {new Date(request.createdAt).toLocaleString()}</div>
      <div>
        {request.files?.length ? (
          <AttachmentViewer files={request.files || []} requestId={request._id} />
        ) : <div>No attachments</div>}
      </div>
    </div>
  )
}

export default ServiceRequestInfo