import axios from "axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  BsFillStarFill,
  BsCheckCircleFill,
  BsFillCartPlusFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCT_CART,
  REFRESH_CART_PRODUCTS,
} from "../../../store/actions/CartReducerActions";
import { apiBaseUrl } from "../../../utils/constants";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../Shared/ToastNotification/ToastNotification";

const ProductDetails = ({ productId, setProductPic }) => {
  const products = useSelector((state) => state.ProductsReducer.products);
  const cartProducts = useSelector((state) => state.CartReducer.cart);
  const customerId = useSelector(
    (state) => state.CustomerReducer.customer.customerId
  );
  const dispatch = useDispatch();
  const requiredProduct = products.filter(
    (product) => product.product_id == productId
  );
  console.log(requiredProduct);
  const discountCalculator = (price, maxPrice) => {
    const discount = 100 - (price / maxPrice) * 100;
    return Math.round(discount);
  };

  const addProductToCart = () => {
    if (customerId) {
      const productIndex = cartProducts.findIndex(
        (item) => item.cartProductId == requiredProduct[0].product_id
      );
      console.log(productIndex);
      if (productIndex >= 0) {
        toastWarning("Product already added in cart");
        console.log();
        return;
      }
      const cartProductData = {
        cartProductId: requiredProduct[0].product_id,
        cartProductPrice: requiredProduct[0].product_price,
        cartModified: new Date(),
        cartProductCount: 1,
        cartPurchased: false,
        cartProductTotal: requiredProduct[0].product_price,
        cartCustomerId: customerId,
      };
      axios
        .post(`${apiBaseUrl}/api/cart/cart-add`, cartProductData)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            dispatch(ADD_PRODUCT_CART(cartProductData));
            toastSuccess("Product successfully added into Cart");
            dispatch(REFRESH_CART_PRODUCTS());
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }else {
      return toastError("Please Sign In First");
    }
  };

  useEffect(()=>{
    setProductPic(requiredProduct[0].product_pic)
  },[productId])

  return (
    <div>
      <h1 className="mt-4">{requiredProduct[0].product_name.toUpperCase()}</h1>
      <p style={{ color: "rgb(2, 174, 180)", fontWeight: "bold" }}>
        {`${requiredProduct[0].seller_firm_name} by ${requiredProduct[0].seller_name}`}
      </p>
      <div>
        <span style={{ paddingRight: "5px" }}>
          <BsFillStarFill style={{ color: "#FFD700" }} />
        </span>
        <span style={{ paddingRight: "5px" }}>
          <BsFillStarFill style={{ color: "#FFD700" }} />
        </span>
        <span style={{ paddingRight: "5px" }}>
          <BsFillStarFill style={{ color: "#FFD700" }} />
        </span>
        <span style={{ paddingRight: "5px" }}>
          <BsFillStarFill style={{ color: "#FFD700" }} />
        </span>
        <span style={{ paddingRight: "5px" }}>
          <BsFillStarFill style={{ color: "#FFD700" }} />
        </span>
        <span
          className="mt-5"
          style={{ lineHeight: "18px", color: "#565656", marginLeft: "5px" }}
        >
          Rating 5 by 5 customers
        </span>
      </div>
      <Row className="product_details_row">
        <Col lg={8} md={6} sm={6} xs={6}>
          <h1>
            <b>$ {requiredProduct[0].product_price}</b>
          </h1>
        </Col>
        <Col lg={4} md={6} sm={6} xs={6}>
          <p className="max_price">
            <b>$ {requiredProduct[0].product_max_price}</b>
          </p>
          <p style={{ lineHeight: "18px", color: "#565656" }}>
            <b>
              {discountCalculator(
                requiredProduct[0].product_price,
                requiredProduct[0].product_max_price
              )}
              % OFF
            </b>
          </p>
        </Col>
      </Row>
      <p>{requiredProduct[0].product_about}</p>
      <div>
        <div className="d-flex">
          <div style={{ paddingRight: "10px" }}>
            <BsCheckCircleFill style={{ color: "#7fff00" }} />
          </div>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </p>
          </div>
        </div>
        <div className="d-flex">
          <div style={{ paddingRight: "10px" }}>
            <BsCheckCircleFill style={{ color: "#7fff00" }} />
          </div>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </p>
          </div>
        </div>
        <div className="d-flex">
          <div style={{ paddingRight: "10px" }}>
            <BsCheckCircleFill style={{ color: "#7fff00" }} />
          </div>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </p>
          </div>
        </div>
      </div>
      <button
        onClick={addProductToCart}
        className="btn-lg w-100 text-white cart_btn"
      >
        <BsFillCartPlusFill style={{ marginRight: "10px" }} />
        <span>ADD TO CART</span>
      </button>
      <p className="text-center my-3">
        <BsCheckCircleFill style={{ color: "#7fff00", marginRight: "10px" }} />{" "}
        <span>Free Shipping & Free Returns</span>
      </p>
    </div>
  );
};

export default ProductDetails;
