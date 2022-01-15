import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CustomLoader from "../../Shared/CustomLoader/CustomLoader";
import ProductCard from "./ProductCard";

const ProductsContainer = () => {
  const state = useSelector((state) => state);
  // console.log(state);
  const products = state.ProductsReducer.products;

  return (
    <Container fluid>
      <Card className="py-5">
        <div className="p-3 text-centre">
          <h3>Find the best deals here</h3>
          <p>
            Grab your favourite items fast before seller change the discounted
            price
          </p>
        </div>
        <Row style={{ justifyContent: "space-around", alignItems: "center" }}>
          {products.length ? (
            products.map((product) => {
              return (
                <Col
                  key={product.product_id}
                  className="mt-4 mx-2"
                  xs={12}
                  md={6}
                  lg={4}
                  sm={12}
                  style={{ maxWidth: "30rem" }}
                >
                  <ProductCard product={product} />
                </Col>
              );
            })
          ) : (
            <CustomLoader />
          )}
        </Row>
      </Card>
    </Container>
  );
};

export default ProductsContainer;
