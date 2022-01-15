import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { GoDiffAdded } from "react-icons/go";
import { CgArrowRightR } from "react-icons/cg";
import { useSelector } from "react-redux";
import { apiBaseUrl } from "../../../../utils/constants";
import {
  toastError,
  toastSuccess,
} from "../../../Shared/ToastNotification/ToastNotification";
import { useHistory } from "react-router";
import dummyImg from "../../../../assets/images/d.png";

const ProductRegisterContainer = ({ productDetails }) => {
  const seller = useSelector((state) => state.SellerReducer.seller);
  const [cartCount, setCartCount] = useState();
  const [transcCount, setTranscCount] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [imageLoading, setImageLoading] = useState();
  const history = useHistory();
  const [formState, setFormState] = useState({
    productName: "",
    productCategory: "",
    productCountStock: "",
    productPrice: "",
    productMaxPrice: "",
    productAbout: "",
  });

  useEffect(() => {
    if (productDetails && productDetails.product_id) {
      setFormState({
        productName: productDetails.product_name,
        productCategory: productDetails.product_category,
        productCountStock: productDetails.product_count_stock,
        productPrice: productDetails.product_price,
        productMaxPrice: productDetails.product_max_price,
        productAbout: productDetails.product_about,
        productId: productDetails.product_id,
        productPic: productDetails.product_pic,
      });

      axios
        .get(
          `${apiBaseUrl}/api/product/product-count-cart/${productDetails.product_id}`
        )
        .then((response) => {
          // console.log(response.data.data[0]["COUNT(*)"]);
          setCartCount(response.data.data[0]["COUNT(*)"]);
        })
        .catch((error) => console.log(error));

      axios
        .get(
          `${apiBaseUrl}/api/product/product-count-transc/${productDetails.product_id}`
        )
        .then((response) => {
          // console.log(response.data.data[0]["COUNT(*)"]);
          setTranscCount(response.data.data[0]["COUNT(*)"]);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleProductUpdate = () => {
    if (
      formState.productName !== "" &&
      formState.productCategory !== "" &&
      formState.productPrice !== "" &&
      formState.productMaxPrice !== "" &&
      formState.productCountStock !== "" &&
      formState.productPrice &&
      formState.productMaxPrice &&
      formState.productCountStock &&
      formState.productId
    ) {
      const data = {
        productName: formState.productName,
        productCategory: formState.productCategory,
        productPrice: formState.productPrice,
        productMaxPrice: formState.productMaxPrice,
        productSellerId: seller.sellerId,
        productCountStock: formState.productCountStock,
        productAbout: formState.productAbout,
        productSellerId: seller.sellerId,
        productPic: formState.productPic || "",
        productId: formState.productId,
      };
      axios
        .patch(`${apiBaseUrl}/api/product/product-update`, data)
        .then((response) => {
          if (response.status === 200) {
            toastSuccess("Product Updated Successfully");
          }
        })
        .catch((error) => {
          console.log(error);
          toastError("Some Error Occured");
        });
    }
  };

  const handleAddProduct = () => {
    // console.log(formState);
    if (
      formState.productName !== "" &&
      formState.productCategory !== "" &&
      formState.productPrice !== "" &&
      formState.productMaxPrice !== "" &&
      formState.productCountStock !== ""
    ) {
      const data = {
        productName: formState.productName,
        productCategory: formState.productCategory,
        productPrice: formState.productPrice,
        productMaxPrice: formState.productMaxPrice,
        productSellerId: seller.sellerId,
        productCountStock: formState.productCountStock,
        productAbout: formState.productAbout,
        productSellerId: seller.sellerId,
        productPic: formState.productPic || "",
      };

      axios
        .post(`${apiBaseUrl}/api/product/product-register`, data)
        .then((response) => {
          // console.log(response);
          if (response.data.success) {
            toastSuccess("Product Added Successfully");
            history.push("/my-products");
          }
        })
        .catch((error) => console.log(error));
    } else {
      toastError("Mandatory Fields are empty or have Invalid Details");
    }
  };

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      setImageLoading("loading");
      const formData = new FormData();

      // Update the formData object
      formData.append("productPic", selectedImage);

      // Details of the uploaded file
      // console.log(selectedImage);

      // Request made to the backend api
      // Send formData object
      axios
        .post(`${apiBaseUrl}/api/product/product-image`, formData)
        .then((response) => {
          if (response.status === 200) {
            setFormState({ ...formState, productPic: response.data.fileName });
            toastSuccess("Image uploaded successfully!");
            setImageLoading("uploaded");
          }
        });
    } else {
      toastError("Please select an image first");
    }
  };

  const handleProductDelete = () => {
    // console.log(formState.productId, seller.sellerId);
    axios
      .delete(
        `${apiBaseUrl}/api/product/product-delete/${seller.sellerId}/${formState.productId}`
      )
      .then(() => toastSuccess("Product Deleted Successfully"))
      .catch((err) => toastError(err.message));
  };
  return (
    <Card className="my-5 p-2 py-5">
      <Container>
        <Row>
          <Col lg={8} md={8} sm={12} xs={12}>
            {formState.productId ? (
              <h3>View/Edit Product</h3>
            ) : (
              <h3>Add Product</h3>
            )}
            <hr />
          </Col>

          <Col
            className="d-flex justify-content-center"
            lg={4}
            md={4}
            sm={12}
            xs={12}
          >
            <img
              src={
                formState.productPic
                  ? `${apiBaseUrl}/product-images/${formState.productPic}`
                  : dummyImg
              }
              alt={formState.productName}
              style={{ height: "100px", width: "100px" }}
              className="my-3"
            />
          </Col>
        </Row>

        <Row>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Product Name <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="productName"
              value={formState.productName}
              placeholder="Enter Product Name"
              onChange={handleInputChange}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Product Category <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              name="productCategory"
              as="select"
              placeholder="Select Category"
              onChange={handleInputChange}
              value={formState.productCategory}
              defaultValue="Electronics"
            >
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Food and Beverages</option>
            </Form.Control>
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Product Stock Count <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="productCountStock"
              placeholder="Enter Total Stock Count"
              onChange={handleInputChange}
              type="number"
              value={formState.productCountStock}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Product Price <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              type="number"
              name="productPrice"
              placeholder="Enter Product Price"
              onChange={handleInputChange}
              value={formState.productPrice}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Product Max Price <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              type="number"
              name="productMaxPrice"
              placeholder="Enter Maximum Price"
              onChange={handleInputChange}
              value={formState.productMaxPrice}
            />
          </Col>
          {formState.productId ? (
            <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
              <p>
                Number of Customers with this product in their cart ={" "}
                {cartCount}
              </p>
              <p>
                Number of Customers who purchased this product = {transcCount}
              </p>
            </Col>
          ) : null}
          <Col className="mb-3" xs={12} sm={12} md={2} lg={2}>
            <Form.Group controlId="formFile">
              <Form.Label>Upload Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </Form.Group>
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={2} lg={2}>
            <Button
              variant={imageLoading === "uploaded" ? "success" : "dark"}
              className="border-0 rounded-0"
              disabled={imageLoading === "loading"}
              onClick={handleImageUpload}
            >
              {imageLoading === "uploaded" ? "Image Uploaded" : "Upload Image"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3" xs={12} sm={12} md={6} lg={6}>
            <Form.Label>About Product</Form.Label>
            <FormControl
              value={formState.productAbout}
              name="productAbout"
              placeholder="Enter Product Info"
              onChange={handleInputChange}
            />
          </Col>
          <Col className="mb-3 mt-5" sx={12} sm={12} md={3} lg={3}>
            {formState.productId ? (
              <button
                onClick={handleProductUpdate}
                className="border-0 rounded-0 w-100 bg-dark text-white btn-lg"
              >
                <span className="m-2">UPDATE PRODUCT</span>
                <CgArrowRightR />
              </button>
            ) : (
              <button
                onClick={handleAddProduct}
                className="border-0 rounded-0 w-100 bg-dark text-white btn-lg"
              >
                <span className="m-2">ADD PRODUCT</span>
                <GoDiffAdded />
              </button>
            )}
          </Col>
          <Col className="mb-3 mt-5" sx={12} sm={12} md={3} lg={3}>
            {formState.productId ? (
              <button
                onClick={handleProductDelete}
                className="border-0 rounded-0 w-100 bg-danger text-white btn-lg"
              >
                DELETE PRODUCT
              </button>
            ) : null}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default ProductRegisterContainer;
