import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../components/products/ProductForm';
import { getProductById, createProduct, updateProduct } from '../api/productsApi';

const AddEditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      getProductById(id)
        .then((data) => {
          setInitialData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load product for editing:', err);
          setApiError(err.message || 'Failed to load product details');
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setApiError(null);

    try {
      if (isEdit) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/products');
    } catch (err) {
      console.error('Failed to save product:', err);
      setApiError(err.message || 'Failed to save product. Please check form input values.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="table-skeleton">
          <div className="skeleton-row" style={{ height: '300px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <button type="button" className="btn-back" onClick={handleCancel}>
            &larr; Back to Products
          </button>
          <h1 className="page-title">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="page-subtitle">
            {isEdit
              ? `Update details and inventory rules for product SKU: ${initialData?.sku || ''}`
              : 'Enter new electronics product specifications, prices, and initial stock.'}
          </p>
        </div>
      </div>

      {/* FORM WRAPPER */}
      <ProductForm
        initialData={initialData}
        isEdit={isEdit}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitting={submitting}
        apiError={apiError}
      />
    </div>
  );
};

export default AddEditProductPage;
