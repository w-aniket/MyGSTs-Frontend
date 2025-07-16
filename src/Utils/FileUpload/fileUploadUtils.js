// fileUploadUtils.js
import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  const uniqueId = `file_${Date.now()}`;
  data.append("file", new Blob([file], { type: file.type }), uniqueId);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
  data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD);
  data.append("public_id", uniqueId);

  const uploadUrl =
    file.type === "application/pdf"
      ? `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/raw/upload`
      : `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/auto/upload`;

  const res = await axios.post(uploadUrl, data);
  return res.data.secure_url;
};
