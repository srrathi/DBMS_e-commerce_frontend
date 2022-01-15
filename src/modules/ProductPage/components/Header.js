import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ productId, productCategory }) => {
  const products = useSelector((state) => state.ProductsReducer.products);
  const requiredProduct = products.filter((product, index) => {
    // console.log(product);
    // eslint-disable-next-line 
    return product.product_id == productId;
  });

  const linksData = [
    { name: "Products", next: true, link: "/" },
    { name: productCategory, next: true, link: `/category/${productCategory}` },
    {
      name: requiredProduct[0].product_name,
      next: false,
      link: `/category/${productCategory}/${productId}`,
    },
  ];
  return (
    <div className="mt-5 p-3 d-flex">
      {linksData.map((linkItem) => {
        return (
          <div>
            <Link
              style={{
                textDecoration: "none",
                color: "#565656",
                fontWeight: !linkItem.next ? "bold" : "",
              }}
              className="p-2"
              to={linkItem.link}
            >
              {linkItem.name}
            </Link>
            {linkItem.next ? "/" : ""}
          </div>
        );
      })}
    </div>
  );
};

export default Header;
