import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const authHeader = { headers: { Authorization: `Bearer ${token}` } };


export const getNotificationsApi = async () => {
  const res = await axios.get(`${apiUrl}/api/notifications`, authHeader);
  return res.data.notifications;
};

export const getUnreadCountApi = async () => {
  const res = await axios.get(`${apiUrl}/api/notifications/unread-count`, authHeader);
  return res.data.count;
};

export const markAsReadApi = async (id) => {
  return axios.patch(`${apiUrl}/api/notifications/read/${id}`, authHeader);
};

export const markAllAsReadApi = async () => {
  return axios.patch(`${apiUrl}/api/notifications/read-all`, authHeader);
};
