// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import ProductTable from './components/ProductTable';
import CategoryTable from './components/CategoryTable';
import ProductList from './components/ProductList';
import { useEffect } from 'react';
import { createBrowserHistory } from 'history';

function App() {
  const history = createBrowserHistory();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://localhost:7082/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <Router>
  <div className="font-sans text-gray-900 antialiased">
    <nav className="bg-blue-500 p-6">
      <ul className="flex space-x-4">
        <li>
          <Link to="/products" className="text-white hover:text-blue-200">Product List</Link>
        </li>
        <li>
          <Link to="/product-table" className="text-white hover:text-blue-200">Product Table</Link>
        </li>
        <li>
          <Link to="/category-table" className="text-white hover:text-blue-200">Category Table</Link>
        </li>
      </ul>
    </nav>

    <div className="p-6">
      <Routes history={history}>
        <Route path="/products" element={(
              <ProductList products={products} setSelectedCategory={setSelectedCategory} setProducts={setProducts}/>
            )}
          />
        <Route path="/product-table" element={(
              <ProductTable/>
            )}
          />
        <Route path="/category-table" element={(
              <CategoryTable/>
            )}
          />
      </Routes>
    </div>
  </div>
</Router>
  );
}

export default App;