import React, { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryTree from "./CategoryTree";
import CategorySearch from "./CategorySearch";
import {
  deleteCategoryById,
  getCategoriesFlat,
  getCategoriesTree,
} from "../../../Utils/APIs/categoryApi";
const CategoryManagement = () => {
  const [categoriesFlat, setCategoriesFlat] = useState([]);
  const [categoriesTree, setCategoriestree] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const flat = await getCategoriesFlat();
    const tree = await getCategoriesTree();

    setCategoriesFlat(Array.isArray(flat) ? flat : []);
    setCategoriestree(Array.isArray(tree) ? tree : []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category")) return;
    deleteCategoryById(id);
    fetchData();
  };

  const handleEdit = (item) => {
    setEditData(item);
  };

  return (
    <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* LEFT - FORM */}
      <div className="bg-white shadow rounded-2xl p-4 h-fit self-start">
        <CategoryForm
          categories={categoriesFlat}
          refresh={fetchData}
          editData={editData}
          setEditData={setEditData}
        />
      </div>

      {/* RIGHT - TREE */}
      <div className="bg-white shadow rounded-2xl p-4 flex flex-col max-h-[500px]">
        <h2 className="text-xl font-bold mb-4 sticky top-0 bg-white">
          Category Structure
        </h2>

        <CategoryTree
          data={categoriesTree}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <CategorySearch categories={categoriesFlat} onDelete={handleDelete} />
    </div>
  );
};

export default CategoryManagement;
