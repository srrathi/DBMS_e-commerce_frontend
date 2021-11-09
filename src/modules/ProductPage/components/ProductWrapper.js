import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ProductImage from "./ProductImage";
import "../../../assets/css/productPage.scss";
import ProductDetails from "./ProductDetails";
import Header from "./Header";

const ProductWrapper = ({ productCategory, productId }) => {
  const [productPic, setProductPic] = useState("");
  return (
    <Container>
      <Header productCategory={productCategory} productId={productId} />
      <Card className="product_card p-4">
        <Row style={{ justifyContent: "space-around" }}>
          <Col xs={12} sm={12} md={6} lg={6}>
            <ProductImage productPic={productPic} productId={productId} />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <ProductDetails setProductPic={setProductPic} productId={productId} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProductWrapper;
