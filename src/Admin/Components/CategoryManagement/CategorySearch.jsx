import React, { useState } from 'react'

const CategorySearch = ({ categories, onDelete }) => {
      const [search, setSearch] = useState("");

        const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
      <div className="col-span-2 bg-white shadow rounded-2xl p-4">
      <h2 className="text-xl font-bold mb-4">Search Categories</h2>

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filtered.map((cat) => (
          <li key={cat._id} className="flex justify-between p-2 border-b">
            <span>{cat.name}</span>
            <button
              className="text-red-500"
              onClick={() => onDelete(cat._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategorySearch