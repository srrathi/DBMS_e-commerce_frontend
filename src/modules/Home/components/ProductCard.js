import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import dummyImg from "../../../assets/images/d.png";
import { BsFillStarFill, BsFillCartPlusFill } from "react-icons/bs";
import "../../../assets/css/productCard.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCT_CART,
  REFRESH_CART_PRODUCTS,
} from "../../../store/actions/CartReducerActions";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../Shared/ToastNotification/ToastNotification";
import CustomLoader from "../../Shared/CustomLoader/CustomLoader";
import { apiBaseUrl } from "../../../utils/constants";

const ProductCard = ({ product }) => {
  const cartProducts = useSelector((state) => state.CartReducer.cart);
  const customerId = useSelector(
    (state) => state.CustomerReducer.customer.customerId
  );
  const dispatch = useDispatch();
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [resizeWidth, setResizeWidth] = useState();

  // TO CALCULATE THE INTIAL DIMENSIONS OF AN IMAGE
  const imageDimensionsCalculator = (src) => {
    updateWidth();
    const img = new Image();
    img.src = product.product_pic
      ? `${apiBaseUrl}/product-images/${product.product_pic}`
      : dummyImg;
    img.onload = function () {
      // console.log(this);
      console.log(this.width + "x" + this.height);
      imageHeightWidthSetter(this.height, this.width);
    };
  };

  // TO SET THE HEIGHT AND WIDTH SUCH THAT IMAGE CAN APPEAR IN MAXIMUM SIZE WITHOUT DISTURBING ITS ASPECT RATION
  const imageHeightWidthSetter = (height, width) => {
    const widthRatio = resizeWidth / width;
    const heightRatio = 280 / height;
    if (widthRatio < heightRatio) {
      setImageHeight(height * widthRatio);
      setImageWidth(width * widthRatio);
    } else if (widthRatio > heightRatio) {
      setImageHeight(height * heightRatio);
      setImageWidth(width * heightRatio);
    } else {
    }
  };

  //TO SET MOBILE VIEW WIDTH BY CHECKING THROUGH WINDOW OBJECT
  const updateWidth = () => {
    const requiredDiv = document.getElementById("product_card");
    if (requiredDiv) {
      console.log(requiredDiv.clientWidth);
      setResizeWidth(requiredDiv.clientWidth);
    }
  };

  useEffect(() => {
    if (product.product_pic) {
      imageDimensionsCalculator(product.product_pic);
    } else {
      imageDimensionsCalculator(dummyImg);
    }
  }, [product.product_pic, resizeWidth]);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [resizeWidth]);

  const discountCalculator = (price, maxPrice) => {
    const discount = 100 - (price / maxPrice) * 100;
    return Math.round(discount);
  };

  const addProductToCart = () => {
    if (customerId) {
      const productIndex = cartProducts.findIndex(
        (item) => item.cartProductId == product.product_id
      );
      console.log(productIndex);
      if (productIndex >= 0) {
        toastWarning("Product already added in cart");
        console.log("Product already added in cart");
        return;
      }
      const cartProductData = {
        cartProductId: product.product_id,
        cartProductPrice: product.product_price,
        cartModified: new Date(),
        cartProductCount: 1,
        cartPurchased: false,
        cartProductTotal: product.product_price,
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
    } else {
      return toastError("Please Sign In First");
    }
  };

  return (
    <>
      <Card className="my-4" id="product_card">
        {product ? (
          <>
            <Link
              className="text-decoration-none text-dark"
              to={`/category/${product.product_category}/${product.product_id}`}
            >
              <div
                style={{
                  width: `${resizeWidth}px`,
                }}
                className="product_image_container"
              >
                <img
                  alt="product name"
                  style={{ height: imageHeight, width: imageWidth }}
                  src={
                    product.product_pic
                      ? `${apiBaseUrl}/product-images/${product.product_pic}`
                      : dummyImg
                  }
                />
              </div>
              <Card.Body>
                <Card.Title className="product_title">
                  <h3>{product.product_name.toUpperCase()}</h3>
                </Card.Title>
                <Row className="product_details_row">
                  <Col lg={8} md={6} sm={6} xs={6}>
                    <p style={{ color: "#565656" }}>
                      Seller : {product.seller_firm_name} by{" "}
                      {product.seller_name}
                    </p>
                  </Col>
                  <Col lg={4} md={6} sm={6} xs={6}>
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
                    <p style={{ lineHeight: "18px", color: "#565656" }}>
                      Rating 5 by 5 customers
                    </p>
                  </Col>
                </Row>
                <Row className="product_details_row">
                  <Col lg={8} md={6} sm={6} xs={6}>
                    <h1>
                      <b>$ {product.product_price}</b>
                    </h1>
                  </Col>
                  <Col lg={4} md={6} sm={6} xs={6}>
                    <p className="max_price">
                      <b>$ {product.product_max_price}</b>
                    </p>
                    <p style={{ lineHeight: "18px", color: "#565656" }}>
                      <b>
                        {discountCalculator(
                          product.product_price,
                          product.product_max_price
                        )}
                        % OFF
                      </b>
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Link>
            <Button
              style={{ height: "4rem", fontSize: "20px" }}
              className="w-100 add_cart_btn"
              onClick={addProductToCart}
            >
              <BsFillCartPlusFill style={{ marginRight: "10px" }} />
              <span>ADD TO CART</span>
            </Button>
          </>
        ) : (
          <CustomLoader />
        )}
      </Card>
    </>
  );
};

export default ProductCard;
