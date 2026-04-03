import React from 'react'
import CategoryItem from './CategoryItem'

const CategoryTree = ({ data, onDelete }) => {
  return (
    <ul className='space-y-2'>
        {data.map((item) => (
            <CategoryItem key={item._id} item={item} onDelete={onDelete} />
        ))}
    </ul>
  )
}

export default CategoryTree