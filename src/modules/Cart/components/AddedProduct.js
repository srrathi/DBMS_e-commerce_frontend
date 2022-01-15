import axios from "axios";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import dummyImg from "../../../assets/images/d.png";
import {
  DELETE_PRODUCT_CART,
  REFRESH_CART_PRODUCTS,
  UPDATE_PRODUCT_CART,
} from "../../../store/actions/CartReducerActions";
import { apiBaseUrl } from "../../../utils/constants";
import {
  toastError,
  toastSuccess,
} from "../../Shared/ToastNotification/ToastNotification";

const AddedProduct = ({ product, index }) => {
  const products = useSelector((state) => state.ProductsReducer.products);
  const customerId = useSelector(
    (state) => state.CustomerReducer.customer.customerId
  );
  const [productCount, setProductCount] = useState(product.cartProductCount);
  const selectedProduct = products.filter(
    (item) => item.product_id === product.cartProductId
  )[0];
  const dispatch = useDispatch();

  const removeProductFromCart = () => {
    axios
      .delete(
        `${apiBaseUrl}/api/cart/cart-remove/${product.cartCustomerId}/${product.cartProductId}`
      )
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          dispatch(DELETE_PRODUCT_CART(product.cartProductId));
          toastSuccess("Product successfully removed from your Cart");
          dispatch(REFRESH_CART_PRODUCTS());
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toastError(error);
      });
  };

  const handleProductCountChange = (operation) => {
    if (operation === "I") {
      setProductCount(productCount + 1);
      const cartProductData = {
        cartProductId: product.cartProductId,
        cartProductPrice: selectedProduct.product_price,
        cartModified: "2021-10-14 14:44:34",
        cartProductCount: productCount + 1,
        cartPurchased: false,
        cartProductTotal: (productCount + 1) * selectedProduct.product_price,
        cartCustomerId: customerId,
      };
      axios
        .patch(`${apiBaseUrl}/api/cart/cart-update`, cartProductData)
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            dispatch(UPDATE_PRODUCT_CART(cartProductData));
            dispatch(REFRESH_CART_PRODUCTS());
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else if (operation === "D" && productCount > 1) {
      setProductCount(productCount - 1);
      const cartProductData = {
        cartProductId: product.cartProductId,
        cartProductPrice: selectedProduct.product_price,
        cartModified: "2021-10-14 14:44:34",
        cartProductCount: productCount - 1,
        cartPurchased: false,
        cartProductTotal: (productCount - 1) * selectedProduct.product_price,
        cartCustomerId: customerId,
      };
      axios
        .patch(`${apiBaseUrl}/api/cart/cart-update`, cartProductData)
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            dispatch(UPDATE_PRODUCT_CART(cartProductData));
            dispatch(REFRESH_CART_PRODUCTS());
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Row style={{ justifyContent: "center" }}>
          <Col xs={12} sm={12} md={6} lg={6}>
            <img
              style={{ height: "150px", width: "150px" }}
              src={
                selectedProduct.product_pic
                  ? `${apiBaseUrl}/product-images/${selectedProduct.product_pic}`
                  : dummyImg
              }
              alt={selectedProduct.product_name}
            />
          </Col>
          <Col className="mt-2" xs={12} sm={12} md={6} lg={6}>
            <h4>{selectedProduct.product_name.toUpperCase()}</h4>
            <p
              style={{ color: "rgb(2, 174, 180)" }}
            >{`${selectedProduct.seller_firm_name} by ${selectedProduct.seller_name}`}</p>
            <button
              onClick={removeProductFromCart}
              className="py-2 px-3 remove_btn"
            >
              Remove
            </button>
          </Col>
        </Row>
      </td>
      <td>
        <div className="d-flex">
          <button
            className="p-2"
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "20px",
            }}
            // onBlur={() => console.log("Now call the API")}
            onClick={() => handleProductCountChange("D")}
          >
            <b>-</b>
          </button>
          <input
            disabled
            value={productCount}
            className="p-0 text-center"
            style={{ width: "50px" }}
          />
          <button
            className="p-2"
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "20px",
            }}
            // onBlur={() =>
            //   console.log("Now call the API", product.cartProductId)
            // }
            onClick={() => handleProductCountChange("I")}
          >
            <b>+</b>
          </button>
        </div>
      </td>
      <td>
        <p className="mt-2">
          <b>$ {product.cartProductPrice}</b>
        </p>
      </td>
      <td>
        <p className="mt-2">
          <b>$ {product.cartProductCount * product.cartProductPrice}</b>
        </p>
      </td>
    </tr>
  );
};

export default AddedProduct;
