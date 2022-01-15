import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_SELLER_PRODUCTS } from "../../../store/actions/SellerReducerActions";
import { apiBaseUrl } from "../../../utils/constants";
import ProductRegisterContainer from "../ProductRegister/components/ProductRegisterContainer";

const MyProductsPage = () => {
  const seller = useSelector((state) => state.SellerReducer.seller);
  const products = useSelector((state) => state.SellerReducer.products);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/api/seller/seller-products/${seller.sellerId}`)
      .then((response) => {
        // console.log(response);
        if (response.data.success) {
          dispatch(GET_SELLER_PRODUCTS(response.data.data));
        }
      })
      .catch((error) => console.log(error));
      // eslint-disable-next-line 
  }, []);
  return (
    <div className="my-4 py-3">
      {products.length ? (
        products.map((product) => {
          return (
            <ProductRegisterContainer
              key={product.product_id}
              productDetails={product}
            />
          );
        })
      ) : (
        <h3 className="text-center">You have not added any product yet</h3>
      )}
    </div>
  );
};

export default MyProductsPage;
