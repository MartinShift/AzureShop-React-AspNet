// src/components/CategoryTable.js
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    fetch('https://localhost:7082/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  useEffect(fetchCategories, []);

  const editCategory = (id) => {
    Swal.fire({
      title: 'Enter new category name',
      input: 'text',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7082/categories/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: result.value }),
        }).then(fetchCategories);
      }
    });
  };

  const deleteCategory = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7082/categories/${id}`, {
          method: 'DELETE',
        }).then(fetchCategories);
      }
    });
  };

  const addCategory = () => {
    Swal.fire({
      title: 'Enter category name',
      input: 'text',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('https://localhost:7082/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: result.value }),
        }).then(fetchCategories);
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

return (
    <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addCategory}>Add</button>
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td className="border px-4 py-2">{category.id}</td>
                        <td className="border px-4 py-2">{category.name}</td>
                        <td className="border px-4 py-2">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => editCategory(category.id)}>Edit</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteCategory(category.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default CategoryTable;