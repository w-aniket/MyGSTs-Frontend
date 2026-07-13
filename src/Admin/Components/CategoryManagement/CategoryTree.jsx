import React from "react";
import CategoryItem from "./CategoryItem";

const CategoryTree = ({ data, onDelete, onEdit, refresh, isChild = false }) => {
  return (
    <div className={isChild ? "" : "overflow-y-auto flex-1"}>
      <ul className="space-y-2">
        {data.map((item) => (
          <CategoryItem
            key={item._id}
            item={item}
            onDelete={onDelete}
            onEdit={onEdit}
            refresh={refresh}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoryTree;
