import { useState } from "react";
import ProductDetailsModal from "../components/products/ProductDetails";
import ProductFormModal from "../components/products/ProductForm";
import ProductList from "../components/products/ProductTable";

export default function ProductsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsProductId, setDetailsProductId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleViewDetails = (id) => {
    setDetailsProductId(id);
  };

  return (
    <div className="space-y-6">
      <ProductList
        key={refreshTrigger}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
      />

      <ProductFormModal
        isOpen={isFormOpen}
        product={selectedProduct}
        onClose={() => setIsFormOpen(false)}
        onSuccess={() => setRefreshTrigger((prev) => prev + 1)}
      />

      <ProductDetailsModal
        isOpen={!!detailsProductId}
        productId={detailsProductId}
        onClose={() => setDetailsProductId(null)}
      />
    </div>
  );
}
