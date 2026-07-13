import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "react-icons/fa";
import { FaEdit, FaTrash, FaRegFileAlt, FaFileAlt } from "react-icons/fa";
import CategoryTree from "./CategoryTree";
import CourseLandingModal from "./CourseLandingModal";

const CategoryItem = ({ item, onDelete, onEdit, refresh }) => {
  const Icon = Icons[item.icon] || null;
  const isLeaf = !item.children || item.children.length === 0;
  const [showLandingModal, setShowLandingModal] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="border p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="text-gray-600" />}
          <span className="font-medium text-gray-800">{item.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {isLeaf && (
            <button
              onClick={() => setShowLandingModal(true)}
              className={
                item.hasLandingPage
                  ? "p-2 text-green-600 bg-green-100 rounded hover:bg-green-200"
                  : "p-2 text-gray-500 bg-gray-100 rounded hover:bg-gray-200"
              }
              title={item.hasLandingPage ? "Edit landing page" : "Add landing page"}
            >
              {item.hasLandingPage ? <FaFileAlt /> : <FaRegFileAlt />}
            </button>
          )}

          <button
            onClick={() => onEdit(item)}
            className="p-2 text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(item._id)}
            className="p-2 text-red-600 bg-red-100 rounded hover:bg-red-200"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {item.children?.length > 0 && (
        <div className="ml-5 mt-2 border-l pl-3">
          <CategoryTree
            data={item.children}
            onDelete={onDelete}
            onEdit={onEdit}
            refresh={refresh}
            isChild={true}
          />
        </div>
      )}

      {showLandingModal && (
        <CourseLandingModal
          category={item}
          onClose={() => setShowLandingModal(false)}
          onSaved={refresh}
        />
      )}
    </motion.li>
  );
};

export default CategoryItem;