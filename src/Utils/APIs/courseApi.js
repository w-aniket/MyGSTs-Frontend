// Utils/APIs/courseApi.js
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getCourseLandingBySlug = async (slug) => {
  const res = await axios.get(`${apiUrl}/api/course-landing/${slug}`);
  return res.data; // { category, landing }
};

export const submitCourseApplication = async (payload) => {
  const res = await axios.post(`${apiUrl}/api/course-applications`, payload);
  return res.data;
};

export const getCourseLandingByCategory = async (categoryId) => {
  const res = await axios.get(`${apiUrl}/api/course-landing/by-category/${categoryId}`, authHeader());
  return res.data;
};

export const upsertCourseLanding = async (payload) => {
  const res = await axios.post(`${apiUrl}/api/course-landing`, payload, authHeader());
  return res.data;
};

export const uploadCourseBrochure = async (categoryId, file) => {
  const formData = new FormData();
  formData.append("brochure", file);
  const res = await axios.post(
    `${apiUrl}/api/course-landing/${categoryId}/brochure`,
    formData,
    { headers: { ...authHeader().headers, "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};