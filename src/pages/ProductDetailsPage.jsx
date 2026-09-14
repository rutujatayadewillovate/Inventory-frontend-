import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetails from '../components/products/ProductDetails';
import { getProductById } from '../api/productsApi';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      getProductById(id)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error loading product details:', err);
          setError(err.message || 'Failed to load product details.');
          setLoading(false);
        });
    }
  }, [id]);

  const handleEdit = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleBack = () => {
    navigate('/products');
  };

  if (error) {
    return (
      <div className="page-container">
        <div className="alert alert-danger flex-between">
          <span>{error}</span>
          <button type="button" className="btn-secondary btn-sm" onClick={handleBack}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <ProductDetails
        product={product}
        loading={loading}
        onEdit={handleEdit}
        onBack={handleBack}
      />
    </div>
  );
};

export default ProductDetailsPage;
