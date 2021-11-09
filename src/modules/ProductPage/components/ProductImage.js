import React, { useEffect, useState } from "react";
import { Image as ImageBootstrap } from "react-bootstrap";
import dummyImg from "../../../assets/images/d.png";
import { apiBaseUrl } from "../../../utils/constants";

const ProductImage = ({ productPic }) => {
  const [isMobile, setIsMobile] = useState();

  //TO SET MOBILE VIEW WIDTH BY CHECKING THROUGH WINDOW OBJECT
  const updateWidth = () => setIsMobile(window.innerWidth < 800);
  window.clearRulesSelection = false;

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isMobile]);

  return (
    <div
      style={{
        height: isMobile ? "" : "600px",
        width: isMobile ? "100%" : "600px",
      }}
      className="image_container"
    >
      <ImageBootstrap
        className="product_image"
        style={{ width: "100%" }}
        src={
          productPic
            ? `${apiBaseUrl}/product-images/${productPic}`
            : dummyImg
        }
        rounded
      />
    </div>
  );
};

export default ProductImage;
