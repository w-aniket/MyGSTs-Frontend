import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createCategory, updateCategory } from "../../../Utils/APIs/categoryApi";
import IconPicker from "./IconPicker";

const CategoryForm = ({ categories, refresh, editData, setEditData }) => {
  const [form, setForm] = useState({
    name: "",
    parentId: null,
    icon: "",
    order: 0,
  });

  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        parentId: editData.parentId || null,
        icon: editData.icon || "",
        order: editData.order || 0,
      })
    }
  }, [editData])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if(editData) {
      await updateCategory(form, editData._id)
    } else {
      await createCategory(form);
    }

    setForm({ name: "", parentId: null, icon: "", order: 0 });
    setEditData(null)
    refresh();
  };

  return (
    <div className="bg-white shadow rounded-2xl p-4">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Category Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          value={form.parentId || null}
          onChange={(e) =>
            setForm({
              ...form,
              parentId: e.target.value === "" ? null : e.target.value,
            })
          }
        >
          <option value="">No Parent</option>
          {categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <IconPicker
          selectedIcon={form.icon}
          onSelect={(iconName) => setForm({ ...form, icon: iconName })}
        />

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Order"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
        />

        <button className="bg-blue-500 text-white px-4 rounded">
          {editData?"Update Category":"Add Category"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
