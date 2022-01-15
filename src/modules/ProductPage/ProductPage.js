import React from "react";
import ProductWrapper from "./components/ProductWrapper";
import SameCategoryProducts from "./components/SameCategoryProducts";

const ProductPage = ({ match }) => {
  const {
    params: { productCategory, productId },
  } = match;

  // console.log({ productCategory, productId });


  return (
    <div className="mt-5 pt-3">
      <ProductWrapper productCategory={productCategory} productId={productId} />
      <SameCategoryProducts
        productId={productId}
        productCategory={productCategory}
      />
    </div>
  );
};

export default ProductPage;
