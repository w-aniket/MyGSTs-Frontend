import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getAllCourseApplications = async () => {
  const res = await axios.get(`${apiUrl}/api/course-applications`, authHeader());
  return res.data;
};

export const getCourseApplication = async (id) => {
  const res = await axios.get(`${apiUrl}/api/course-applications/${id}`, authHeader());
  return res.data;
};

export const markCourseApplicationRead = async (id) => {
  const res = await axios.patch(`${apiUrl}/api/course-applications/${id}/read`, {}, authHeader());
  return res.data;
};

export const exportCourseApplications = async () => {
  const res = await axios.get(`${apiUrl}/api/course-applications/export`, {
    ...authHeader(),
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "course-applications.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};