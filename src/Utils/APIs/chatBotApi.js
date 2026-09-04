import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const sendChatMessageApi = async (message, history) => {
  const res = await axios.post(`${apiUrl}/api/chat`, { message, history });
  return res.data;
};