import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ShippingAddressForm from "./ShippingAddressForm";
import { IoBagCheckOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { toastError } from "../../Shared/ToastNotification/ToastNotification";

const OrderSummary = () => {
  var cartProducts = useSelector((state) => state.CartReducer.cart);
  cartProducts = cartProducts.filter((item) => item.cartPurchased === 0);
  const [formState, setFormState] = useState({
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  var cartTotal = 0;
  cartProducts.map((product) => {
    return (cartTotal += product.cartProductTotal);
  });
  const handleConfirmationModalClose = () => setConfirmationModalShow(false);
  const handleConfirmationModalShow = () => {
    if (
      formState.address !== "" &&
      formState.city !== "" &&
      formState.state !== "" &&
      formState.zipcode !== ""
    ) {
      setConfirmationModalShow(true);
    } else {
      toastError("Please Fill Shipping Address");
    }
  };
  return (
    <div>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="py-1 my-1 shopping_cart_heading"
      >
        <Col xs={12} sm={12} md={12} lg={12} style={{ textAlign: "left" }}>
          <h4>ORDER SUMMARY</h4>
        </Col>
      </Row>
      <hr />
      <div className="d-flex justify-content-between">
        <div style={{ textAlign: "left" }}>
          <p>
            <b>ITEMS {cartProducts.length}</b>
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p>
            <b>$ {cartTotal}</b>
          </p>
        </div>
      </div>
      <h5 className="text-center">Shipping Address</h5>
      <ShippingAddressForm formState={formState} setFormState={setFormState} />
      <p>
        <b>Note :-</b> Standard Shipping Charge of 20$ will be applicable on all
        products.
      </p>
      <hr />
      <div className="d-flex justify-content-between">
        <div style={{ textAlign: "left" }}>
          <p>
            <b>Total Cost :</b>
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p>
            <b>$ {cartTotal + 20}</b>
          </p>
        </div>
      </div>
      <button
        onClick={handleConfirmationModalShow}
        className="btn-lg w-100 text-white py-3 checkout_btn"
      >
        <IoBagCheckOutline style={{ marginRight: "10px" }} />
        <span className="mt-3">CHECKOUT</span>
      </button>
      <OrderConfirmationModal
        show={confirmationModalShow}
        handleClose={handleConfirmationModalClose}
        addressDetails={formState}
        cartTotal={cartTotal}
      />
    </div>
  );
};

export default OrderSummary;
