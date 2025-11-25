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
  axios.put(`${apiUrl}/api/service-requests/${id}/amount`, payload, authHeader);

export const addCommentApi = (id, payload) =>
  axios.post(
    `${apiUrl}/api/service-requests/${id}/comment`,
    payload,
    authHeader
  );

export const uploadClientFilesApi = (requestId, files) => {
  const fd = new FormData();
  files.forEach((f) => fd.append("files", f));
  return axios.post(
    `${apiUrl}/api/service-requests/${requestId}/client-files`,
    fd,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const uploadWorkFilesApi = (requestId, files, note = "") => {
  const fd = new FormData();
  files.forEach((f) => fd.append("files", f));
  fd.append("note", note);
  return axios.post(
    `${apiUrl}/api/service-requests/${requestId}/work-files`,
    fd,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deleteWorkFileApi = (filePublicId) => {
  return axios.delete(
    `${apiUrl}/api/service-requests/work-files/${filePublicId}`,
    authHeader
  );
};
