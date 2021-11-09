import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryListingPage = () => {
  const state = useSelector((state) => state);
  const products = state.ProductsReducer.products;
  const categories = [
    ...new Set(products.map((product) => product.product_category)),
  ];
  return (
    <Container className="mt-5 pt-5">
      <Row style={{justifyContent:"center"}}>
        {categories.map((category) => {
          return (
            <Col xs="12" sm="12" md="4" lg="3">
              <Link
                className="text-decoration-none"
                to={`/category/${category}`}
              >
                <Card
                  className="d-flex"
                  style={{
                    height: "300px",
                    alignItems: "center",
                    justifyContent: "center",
                    width:"100%",
                    background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)"
                  }}
                >
                  <h3 className="text-dark">
                    <b>{category}</b>
                  </h3>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CategoryListingPage;
