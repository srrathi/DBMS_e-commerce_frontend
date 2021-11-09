import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import AddedProduct from "./AddedProduct";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AddedProductsWrapper = () => {
  var cartProducts = useSelector((state) => state.CartReducer.cart);
  cartProducts = cartProducts.filter((item) => item.cartPurchased === 0);
  return (
    <div>
      {cartProducts.length ? (
        <>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="py-1 my-1 shopping_cart_heading"
          >
            <Col xs={6} sm={6} md={6} lg={6} style={{ textAlign: "left" }}>
              <h4>Shopping Cart</h4>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} style={{ textAlign: "right" }}>
              <h4>{cartProducts.length} Items</h4>
            </Col>
          </Row>
          <hr />
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>PRODUCT&nbsp;DETAILS</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product, index) => {
                return <AddedProduct product={product} index={index} />;
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <h3>No Products Added to Cart</h3>
      )}
      <Link to="/" className="continue_shopping_btn px-3 py-2">
        <BsArrowLeft />
        <span className="mx-2">Continue Shopping</span>
      </Link>
    </div>
  );
};

export default AddedProductsWrapper;
