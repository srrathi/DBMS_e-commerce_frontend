import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductCard from "../../Home/components/ProductCard";

const ProductsCategoryWrapper = ({ productCategory }) => {
  const state = useSelector((state) => state);
  console.log(state);
  const products = state.ProductsReducer.products;
  const categoryProducts = products.filter(
    (product) => product.product_category === productCategory
  );
  console.log(state);
  return (
    <Container className="my-5" fluid>
      <Card className="p-3">
        <Row style={{ justifyContent: "space-around", alignItems: "center" }}>
          {categoryProducts.map((product) => {
            return (
              <Col
                key={product.product_id}
                className="my-4 mx-2"
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
      </Card>
    </Container>
  );
};

export default ProductsCategoryWrapper;
