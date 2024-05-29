import PropTypes from 'prop-types';
import CategorySelect from './CategorySelect';

const ProductList = ({ products, setProducts, setSelectedCategory }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <CategorySelect setSelectedCategory={setSelectedCategory} setProducts={setProducts} />
    {products.map((product) => (
      <div key={product.id} className="border p-4 rounded">
        <h2 className="text-xl">{product.name}</h2>
        <p>{product.categoryId}</p>
      </div>
    ))}
  </div>
);

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      categoryId: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
    setProducts: PropTypes.func.isRequired,
};

export default ProductList;