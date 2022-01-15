import React, { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import "../../assets/css/shoppingCart.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SET_ALL_CART_PRODUCTS } from "../../store/actions/CartReducerActions";
import { apiBaseUrl } from "../../utils/constants";

const Cart = () => {
  const cartStore = useSelector((state) => state.CartReducer);
  const customerId = useSelector(
    (state) => state.CustomerReducer.customer.customerId
  );
  // console.log("cartStore", cartStore);
  const dispatch = useDispatch();
  useEffect(() => {
    if (customerId) {
      axios
        .get(`${apiBaseUrl}/api/cart/cart-products/${customerId}`)
        .then(function (response) {
          const cartData = response.data.data;
          const updatedCartArray = cartData.map((item) => {
            const obj = {
              cartCustomerId: item.cart_customer_id,
              cartModified: item.cart_modified,
              cartProductCount: item.cart_product_count,
              cartProductId: item.cart_product_id,
              cartProductPrice: item.cart_product_price,
              cartProductTotal: item.cart_product_total,
              cartPurchased: item.cart_purchased,
            };
            return obj;
          });
          dispatch(SET_ALL_CART_PRODUCTS(updatedCartArray));
          // console.log(updatedCartArray);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cartStore.refreshCart, customerId, dispatch]);

  return (
    <div className="mt-5 pt-3">
      <CartContainer />
    </div>
  );
};

export default Cart;
