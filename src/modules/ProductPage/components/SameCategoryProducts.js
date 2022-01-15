import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductCard from "../../Home/components/ProductCard";

const SameCategoryProducts = ({ productCategory, productId }) => {
  const state = useSelector((state) => state.ProductsReducer);
  // console.log(state);
  const products = state.products.filter(
    (product) =>
      product.product_category === productCategory &&
      product.product_id != productId
  );
  return (
    <Container fluid className="mt-5">
      {products.length > 0 ? (
        <>
          <div className="mt-5 text-center">
            <h3 className="mt-5">Similar Products which you may like</h3>
          </div>
          <Row style={{ justifyContent: "center", alignItems: "space-around" }}>
            {products.map((product) => {
              return (
                <Col
                  key={product.id}
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
            })}
          </Row>
        </>
      ) : (
        <div className="mt-5 text-center">
          <h3 className="mt-5">No Products found for same Category</h3>
        </div>
      )}
    </Container>
  );
};

export default SameCategoryProducts;
