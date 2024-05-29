import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CategorySelect = ({ setSelectedCategory, setProducts }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7082/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory) {
      fetch(`https://localhost:7082/products/bycategory/${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      <select
        onChange={handleCategoryChange}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

CategorySelect.propTypes = {
  setSelectedCategory: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
};

export default CategorySelect;