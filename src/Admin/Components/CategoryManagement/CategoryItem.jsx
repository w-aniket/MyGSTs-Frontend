import React from "react";
import { motion } from "framer-motion";
import * as Icons from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import CategoryTree from "./CategoryTree";

const CategoryItem = ({ item, onDelete, onEdit }) => {
  const Icon = Icons[item.icon] || null;
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
            isChild={true}
          />
        </div>
      )}
    </motion.li>
  );
};

export default CategoryItem;
