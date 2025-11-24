import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../UserContex/UserContext";
import axios from "axios";
import ServiceRequestInfo from "../../../Component/ServiceRequestInfo/ServiceRequestInfo";
import AssignTeam from "../../Components/AssignTeam/AssignTeam";
import StatusUpdate from "../../Components/StatusUpdate/StatusUpdate";
import AmountUpdate from "../../Components/AmountUpdate/AmountUpdate";
import AddComment from "../../Components/AddComment/AddComment";

const ServiceRequestDetail = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { requestId } = useParams();
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext); // info about current user including role

  const loadRequest = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${apiUrl}/api/service-requests/${requestId}`,
        authHeader
      );
      setRequest(res.data.request);
    } catch (error) {
      console.error("Failed to load request", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requestId) loadRequest();
  }, [requestId]);

  if (loading) return <div>Loading...</div>;
  if (!request) return <div>Not found</div>;

  const role = user?.role;

  return (
    <div className="service-request-detail">
      <h1>Service Request</h1>

      <ServiceRequestInfo request={request} role={role} />

      {/* Role-based conditional rendering */}
      {role === "admin" && (
        <AssignTeam request={request} onUpdated={loadRequest} />
      )}

      {role === "admin" && (
        <AmountUpdate request={request} onUpdated={loadRequest} />
      )}
      {(role === "admin" || role === "leader") && (
        <StatusUpdate request={request} onUpdated={loadRequest} />
      )}

      {(role === "admin" || role === "leader" || role === "employee") && (
        <AddComment request={request} onUpdated={loadRequest} />
      )}
      

      {/* Files and comments available to staff; client may also see public comments */}
      {/* <FilesAndComments request={request} role={role} onUpdated={loadRequest} /> */}
      {/* <ActivityLogs requestId={request._id} role={role} /> */}
    </div>
  );
};

export default ServiceRequestDetail;
