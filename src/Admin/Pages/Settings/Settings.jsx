import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const Settings = () => {
  const [gstEnabled, setGstEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/api/settings`).then((res) => {
      setGstEnabled(res.data.settings.gstEnabled);
      setLoading(false);
    });
  }, []);

  const toggleGst = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${apiUrl}/api/settings/gst`,
        { gstEnabled: !gstEnabled },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGstEnabled(res.data.settings.gstEnabled);
      toast.success(`GST billing ${res.data.settings.gstEnabled ? "enabled" : "disabled"}`);
    } catch (err) {
      toast.error("Failed to update GST setting");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: 24 }}>Loading settings…</div>;

  return (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <h2>Billing Settings</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #e5e5e5",
          borderRadius: 10,
          padding: "16px 20px",
          marginTop: 16,
        }}
      >
        <div>
          <div style={{ fontWeight: 600 }}>GST Billing</div>
          <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
            {gstEnabled
              ? "Customers are charged base price + 18% GST."
              : "Customers are charged the base price only. Enable once GSTIN is registered."}
          </div>
        </div>
        <button
          onClick={toggleGst}
          disabled={saving}
          style={{
            width: 52,
            height: 28,
            borderRadius: 999,
            border: "none",
            background: gstEnabled ? "#0d6efd" : "#ccc",
            position: "relative",
            cursor: saving ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 3,
              left: gstEnabled ? 27 : 3,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "#fff",
              transition: "left 0.2s",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Settings;