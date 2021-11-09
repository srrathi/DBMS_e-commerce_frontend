import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Cart from "./modules/Cart/Cart";
import CustomerRegisterPage from "./modules/Customer/CustomerRegisterPage";
import Home from "./modules/Home/Home";
import MyOrders from "./modules/MyOrders/MyOrders";
import NavbarComponent from "./modules/Navbar";
import ProductPage from "./modules/ProductPage/ProductPage";
import CategoryListingPage from "./modules/ProductsCategory/CategoryListingPage";
import ProductsCategoryPage from "./modules/ProductsCategory/ProductsCategoryPage";
import ProductRegisterPage from "./modules/Seller/ProductRegister/ProductRegisterPage";
import SellerRegisterPage from "./modules/Seller/SellerRegister/SellerRegisterPage";
import ProfilePage from "./modules/Shared/ProfilePage/ProfilePage";
import LoginModalButton from "./modules/Shared/LoginModal/LoginModalButton";
import { SET_ALL_CART_PRODUCTS } from "./store/actions/CartReducerActions";
import { SET_CUSTOMER_DETAILS } from "./store/actions/CustomerReducerActions";
import { ADD_PRODUCTS_STORE } from "./store/actions/ProductReducerActions";
import { SET_PREVIOUS_TRANSACTIONS } from "./store/actions/TranscReducerActions";
import { apiBaseUrl } from "./utils/constants";
import { userLoggedInUtil } from "./utils/CustomerUtils";
import {
  GET_SELLER_PRODUCTS,
  SET_SELLER_DETAILS,
} from "./store/actions/SellerReducerActions";
import MyProductsPage from "./modules/Seller/MyRegisteredProducts/MyProductsPage";
import FooterComponent from "./modules/Footer/FooterComponent";

function App() {
  const customer = useSelector((state) => state.CustomerReducer.customer);
  const showLoginPopup = useSelector(
    (state) => state.CustomerReducer.showLoginPopup
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLoggedInUtil()) {
      // console.log(userLoggedInUtil())
      var customerData = window.localStorage.getItem("customerData");
      customerData = JSON.parse(customerData);

      var sellerData = window.localStorage.getItem("sellerData");
      sellerData = JSON.parse(sellerData);
      if (customerData) {
        dispatch(SET_CUSTOMER_DETAILS(customerData));
        if (customerData.customerId) {
          // console.log(customerData)

          axios
            .get(
              `${apiBaseUrl}/api/cart/cart-products/${customerData.customerId}`
            )
            .then(function (response) {
              // console.log("RESPONSE", response)
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
            .catch((err) => console.log(err));

          axios
            .get(
              `${apiBaseUrl}/api/transc/transc-all/${customerData.customerId}`
            )
            .then(function (response) {
              console.log("RESPONSE", response);
              dispatch(SET_PREVIOUS_TRANSACTIONS(response.data.data));
            })
            .catch((err) => console.log(err));
        }
      } else if (sellerData) {
        dispatch(SET_SELLER_DETAILS(sellerData));
        axios
          .get(
            `${apiBaseUrl}/api/seller/seller-products/${sellerData.sellerId}`
          )
          .then((response) => {
            console.log(response);
            if (response.data.success) {
              dispatch(GET_SELLER_PRODUCTS(response.data.data));
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (customer.customerID) {
      axios
        .get(`${apiBaseUrl}/api/cart/cart-products/${customer.customerId}`)
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
          console.log(updatedCartArray);
        })
        .catch((err) => console.log(err));
    }
  }, [customer, dispatch]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/api/customer/products-list`)
      .then(function (response) {
        dispatch(ADD_PRODUCTS_STORE(response.data.data));
        console.log(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <>
      <NavbarComponent />
      <Route path="/" exact component={Home} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/best-rated" exact component={Cart} />
      <Route path="/seller-register" exact component={SellerRegisterPage} />
      <Route path="/customer-register" exact component={CustomerRegisterPage} />
      <Route path="/product-register" exact component={ProductRegisterPage} />
      <Route path="/my-products" exact component={MyProductsPage} />
      <Route path="/my-orders" exact component={MyOrders} />
      <Route path="/profile" exact component={ProfilePage} />
      <Route path="/category" exact component={CategoryListingPage} />
      <Route
        path="/category/:productCategory"
        exact
        component={ProductsCategoryPage}
      />
      <Route
        path="/category/:productCategory/:productId"
        exact
        component={ProductPage}
      />
      {showLoginPopup && !userLoggedInUtil() ? <LoginModalButton /> : null}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <FooterComponent />
    </>
  );
}

export default App;
