import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCourseLandingByCategory,
  upsertCourseLanding,
  uploadCourseBrochure,
} from "../../../Utils/APIs/courseApi";
import "./CourseLandingModal.css"

const CourseLandingModal = ({ category, onClose, onSaved }) => {
  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    description: "",
    highlights: [],
    isActive: true,
  });
  const [highlightInput, setHighlightInput] = useState("");
  const [existingBrochureUrl, setExistingBrochureUrl] = useState("");
  const [brochureFile, setBrochureFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const landing = await getCourseLandingByCategory(category._id);
        if (landing) {
          setForm({
            heroTitle: landing.heroTitle || "",
            heroSubtitle: landing.heroSubtitle || "",
            description: landing.description || "",
            highlights: landing.highlights || [],
            isActive: landing.isActive,
          });
          setExistingBrochureUrl(landing.brochureUrl || "");
        }
      } catch (err) {
        console.error("Failed to load landing", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category._id]);

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setForm((prev) => ({ ...prev, highlights: [...prev.highlights, highlightInput.trim()] }));
    setHighlightInput("");
  };

  const removeHighlight = (index) => {
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.heroTitle.trim()) {
      toast.error("Hero title is required");
      return;
    }

    setSaving(true);
    try {
      await upsertCourseLanding({ categoryId: category._id, ...form });

      if (brochureFile) {
        await uploadCourseBrochure(category._id, brochureFile);
      }

      toast.success("Course landing page saved");
      onSaved();
      onClose();
    } catch (err) {
      console.error("Save failed", err);
      toast.error(err?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="clm-overlay" onClick={onClose}>
      <div className="clm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="clm-close" onClick={onClose}>×</button>
        <h2>Landing Page — {category.name}</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="clm-form">
            <div className="clm-field">
              <label>Hero Title *</label>
              <input
                value={form.heroTitle}
                onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                required
              />
            </div>

            <div className="clm-field">
              <label>Hero Subtitle</label>
              <input
                value={form.heroSubtitle}
                onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
              />
            </div>

            <div className="clm-field">
              <label>Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="clm-field">
              <label>Highlights</label>
              <div className="clm-highlight-input">
                <input
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  placeholder="e.g. Placement assistance"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addHighlight();
                    }
                  }}
                />
                <button type="button" onClick={addHighlight}>Add</button>
              </div>
              <ul className="clm-highlight-list">
                {form.highlights.map((h, i) => (
                  <li key={i}>
                    {h}
                    <button type="button" onClick={() => removeHighlight(i)}>×</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="clm-field">
              <label>Brochure PDF</label>
              {existingBrochureUrl && !brochureFile && (
                <p className="clm-current-file">
                  Current: <a href={existingBrochureUrl} target="_blank" rel="noreferrer">View current brochure</a>
                </p>
              )}
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setBrochureFile(e.target.files[0] || null)}
              />
            </div>

            <label className="clm-checkbox">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              />
              <span>Active (visible to customers)</span>
            </label>

            <button type="submit" className="clm-submit" disabled={saving}>
              {saving ? "Saving..." : "Save Landing Page"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CourseLandingModal;