// src/components/ProductTable.js
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    fetch('https://localhost:7082/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  useEffect(fetchProducts, []);

  const editProduct = (id) => {
    Swal.fire({
      title: 'Enter new product name and category ID',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Category ID">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7082/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: result.value[0], categoryId: result.value[1] }),
        }).then(fetchProducts);
      }
    });
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7082/products/${id}`, {
          method: 'DELETE',
        }).then(fetchProducts);
      }
    });
  };

  const addProduct = () => {
    Swal.fire({
      title: 'Enter product name and category ID',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Category ID">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('https://localhost:7082/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: result.value[0], categoryId: result.value[1] }),
        }).then(fetchProducts);
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addProduct}>Add</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category ID</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.categoryId}</td>
              <td className="border px-4 py-2">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => editProduct(product.id)}>Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;