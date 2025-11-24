import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const authHeader = { headers: { Authorization: `Bearer ${token}` } };

export const assignTeamApi = (id, payload) =>
  axios.post(
    `${apiUrl}/api/service-requests/${id}/assign-team`,
    payload,
    authHeader
  );

export const updateStatusApi = (id, status) =>
  axios.put(`${apiUrl}/api/service-requests/${id}/status`, status, authHeader);

export const updateAmountApi = (id, payload) =>
  axios.put(`${apiUrl}/api/service-requests/${id}/amount`, payload ,authHeader);

export const addCommentApi = (id, payload) =>
  axios.post(`${apiUrl}/api/service-requests/${id}/comment`, payload ,authHeader);
