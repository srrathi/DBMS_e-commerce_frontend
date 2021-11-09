import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddedProductsWrapper from "./AddedProductsWrapper";
import OrderSummary from "./OrderSummary";
import { BsArrowLeft } from "react-icons/bs";

const CartContainer = () => {
  const cartProducts = useSelector((state) => state.CartReducer.cart);

  return (
    <Card className="mt-5">
      {cartProducts.length ? (
        <Container fluid>
          <Row>
            <Col className="p-4" sm={12} xs={12} md={8} lg={8}>
              <AddedProductsWrapper />
            </Col>
            <Col
              className="p-4 order_summary_cal"
              sm={12}
              xs={12}
              md={4}
              lg={4}
            >
              <OrderSummary />
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="my-3 text-center">
          <h3>No products added in Cart</h3>
          <div className="my-3">
            <Link to="/" className="continue_shopping_btn px-3 py-2">
              <BsArrowLeft />
              <span className="mx-2">Continue Shopping</span>
            </Link>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CartContainer;
