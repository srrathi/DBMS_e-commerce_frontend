import React from "react";
import ProductsCategoryWrapper from "./components/ProductsCategoryWrapper";

const ProductsCategoryPage = ({ match }) => {
  const {
    params: { productCategory },
  } = match;
  return (
    <div className="mt-5 pt-3">
      <ProductsCategoryWrapper productCategory={productCategory} />
    </div>
  );
};

export default ProductsCategoryPage;
