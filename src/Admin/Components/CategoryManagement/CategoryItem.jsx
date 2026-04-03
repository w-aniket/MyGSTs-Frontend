import React from 'react'
import { motion } from "framer-motion";
import * as Icons from "react-icons/fa";
import CategoryTree from "./CategoryTree";

const CategoryItem = ({ item, onDelete}) => {
    const Icon = Icons[item.icon] || null
  return (
     <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="border p-2 rounded"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {Icon && <Icon />}
          <span>{item.name}</span>
        </div>

        <button
          className="text-red-500"
          onClick={() => onDelete(item._id)}
        >
          Delete
        </button>
      </div>

      {item.children?.length > 0 && (
        <div className="ml-4 mt-2">
          <CategoryTree data={item.children} onDelete={onDelete} />
        </div>
      )}
    </motion.li>
  )
}

export default CategoryItem