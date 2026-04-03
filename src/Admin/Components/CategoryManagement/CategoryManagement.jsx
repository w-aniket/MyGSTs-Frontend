import React, { useEffect, useState } from 'react'
import CategoryForm from './CategoryForm';
import CategoryTree from './CategoryTree';
import CategorySearch from './CategorySearch';
import { deleteCategoryById, getCategoriesFlat, getCategoriesTree } from '../../../Utils/APIs/categoryApi';
const CategoryManagement = () => {
    const [categoriesFlat, setCategoriesFlat] = useState([]);
    const [categoriesTree, setCategoriestree] = useState([]);

    const fetchData = async () => {
        const flat = await getCategoriesFlat();
        const tree = await getCategoriesTree();


        setCategoriesFlat(Array.isArray(flat) ? flat : [])
        setCategoriestree(Array.isArray(tree) ? tree : [])
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this category")) return;
        deleteCategoryById(id);
        fetchData();
    };

  return (
    <div className='p-6 grid grid-cols-2 gap-6'>
        <CategoryForm categories={categoriesFlat} refresh={fetchData}/>
        
        <div className="bg-white shadow rounded-2xl p-4">
            <h2 className="text-xl font-bold mb-4">Category Structure</h2>
            <CategoryTree data={categoriesTree} onDelete={handleDelete} />
        </div>

        <CategorySearch categories={categoriesFlat} onDelete={handleDelete}/>
    </div>
  )
}

export default CategoryManagement