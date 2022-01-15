import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { CgArrowRightR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CLEAR_COUSTOMER_DATA } from "../../../../store/actions/CustomerReducerActions";
import {
  SET_SELLER_DETAILS,
  UPDATE_SELLER_DETAILS,
} from "../../../../store/actions/SellerReducerActions";
import { apiBaseUrl } from "../../../../utils/constants";
import {
  toastError,
  toastSuccess,
} from "../../../Shared/ToastNotification/ToastNotification";
import dummyImg from "../../../../assets/images/d.png";

const SellerFormContainer = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [imageLoading, setImageLoading] = useState();
  const seller = useSelector((state) => state.SellerReducer.seller);
  const dispatch = useDispatch();
  const history = useHistory();
  const [formState, setFormState] = useState({
    sellerName: "",
    sellerEmail: "",
    sellerMobileNumber: "",
    sellerBankName: "",
    sellerAccountNumber: "",
    sellerAddress: "",
    sellerFirmName: "",
    sellerFirmInfo: "",
    sellerPassword: "",
    confirmPassword: "",
    checkboxChecked: false,
  });
  const [addressFormatter, setAddressFormatter] = useState({
    address: "",
    state: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    setFormState({
      ...formState,
      sellerAddress: `${addressFormatter.address}|${addressFormatter.city}|${addressFormatter.pincode}|${addressFormatter.state}`,
    });
    // console.log(formState);
    // eslint-disable-next-line 
  }, [
    addressFormatter.state,
    addressFormatter.city,
    addressFormatter.pincode,
    addressFormatter.address,
  ]);

  useEffect(() => {
    // console.log("IN USEEFEECT");
    if (seller.sellerId) {
      // console.log("seller", seller);
      const addressArray = seller.sellerAddress.split("|");
      setFormState(seller);
      setAddressFormatter({
        address: addressArray[0],
        city: addressArray[1],
        pincode: addressArray[2],
        state: addressArray[3],
      });
    } else {
      setFormState({
        sellerName: "",
        sellerEmail: "",
        sellerMobileNumber: "",
        sellerBankName: "",
        sellerAccountNumber: "",
        sellerAddress: "",
        sellerFirmName: "",
        sellerFirmInfo: "",
        sellerPassword: "",
        confirmPassword: "",
        checkboxChecked: false,
      });
    }
    // eslint-disable-next-line 
  }, []);

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    setAddressFormatter({
      ...addressFormatter,
      [e.target.name]: e.target.value,
    });
  };

  const handleSellerUpdate = () => {
    if (
      formState.sellerName !== "" &&
      formState.sellerFirmName !== "" &&
      formState.sellerEmail !== "" &&
      formState.sellerBankName !== "" &&
      formState.sellerAccountNumber !== "" &&
      formState.sellerMobileNumber !== "" &&
      formState.sellerAddress !== "" &&
      addressFormatter.address !== undefined &&
      addressFormatter.state !== undefined &&
      addressFormatter.city !== undefined &&
      addressFormatter.pincode !== undefined &&
      formState.sellerPassword !== "" &&
      formState.sellerPassword
    ) {
      const data = {
        sellerId: formState.sellerId,
        sellerName: formState.sellerName,
        sellerPassword: formState.sellerPassword,
        sellerEmail: formState.sellerEmail,
        sellerMobileNumber: formState.sellerMobileNumber || "",
        sellerBankName: formState.sellerBankName || "",
        sellerAccountNumber: formState.sellerAccountNumber || 0,
        sellerFirmName: formState.sellerFirmName,
        sellerFirmInfo: formState.sellerFirmInfo,
        sellerAddress: formState.sellerAddress,
        sellerFirmAddress: formState.sellerAddress,
        sellerProfilePic: formState.sellerProfilePic,
      };
      axios
        .patch(`${apiBaseUrl}/api/seller/seller-update`, data)
        .then((response) => {
          // console.log(response);
          if (response.data.success) {
            delete data.sellerPassword;
            toastSuccess("Seller Successfully Updated");
            window.localStorage.setItem("sellerData", JSON.stringify(data));
            dispatch(UPDATE_SELLER_DETAILS(data));
          } else if (!response.data.status || response.status === 400) {
            // console.log(response);
            toastError(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toastError(`${err.message}, Please Check your Password`);
        });
    } else {
      toastError("Mandatory Fields are empty");
    }
  };

  const handleSellerRegister = () => {
    // console.log(formState);
    if (
      formState.sellerName !== "" &&
      formState.sellerFirmName !== "" &&
      formState.sellerEmail !== "" &&
      formState.sellerBankName !== "" &&
      formState.sellerAccountNumber !== "" &&
      formState.sellerMobileNumber !== "" &&
      formState.sellerAddress !== "" &&
      addressFormatter.address !== "" &&
      addressFormatter.state !== "" &&
      addressFormatter.city !== "" &&
      addressFormatter.pincode !== "" &&
      formState.sellerPassword !== "" &&
      formState.confirmPassword !== "" &&
      formState.confirmPassword === formState.sellerPassword &&
      formState.sellerPassword &&
      formState.confirmPassword &&
      formState.checkboxChecked
    ) {
      const data = {
        sellerName: formState.sellerName,
        sellerPassword: formState.sellerPassword,
        sellerEmail: formState.sellerEmail,
        sellerMobileNumber: formState.sellerMobileNumber || "",
        sellerBankName: formState.sellerBankName || "",
        sellerAccountNumber: formState.sellerAccountNumber || 0,
        sellerFirmName: formState.sellerFirmName,
        sellerFirmInfo: formState.sellerFirmInfo,
        sellerAddress: formState.sellerAddress,
        sellerFirmAddress: formState.sellerAddress,
        sellerProfilePic: formState.sellerProfilePic,
      };

      axios
        .post(`${apiBaseUrl}/api/seller/seller-register`, data)
        .then((response) => {
          // console.log(response);
          if (response.data.success) {
            const loginData = {
              sellerEmail: formState.sellerEmail,
              sellerPassword: formState.sellerPassword,
            };
            axios
              .post(`${apiBaseUrl}/api/seller/seller-login`, loginData)
              .then((loginResponse) => {
                if (
                  loginResponse.status === 200 &&
                  loginResponse.data.data.sellerData
                ) {
                  toastSuccess("Seller Successfully Registered");
                  const sellerData = loginResponse.data.data.sellerData;
                  const data = {
                    sellerName: sellerData.seller_name,
                    sellerEmail: sellerData.seller_email,
                    sellerMobileNumber: sellerData.seller_mob_no,
                    sellerBankName: sellerData.seller_bank_name,
                    sellerAccountNumber: sellerData.seller_account_number,
                    sellerAddress: sellerData.seller_address,
                    sellerId: sellerData.seller_id,
                    sellerFirmInfo: sellerData.seller_firm_info,
                    sellerFirmAddress: sellerData.seller_firm_address,
                    sellerFirmName: sellerData.seller_firm_name,
                    sellerRegDate: sellerData.seller_reg_date,
                    sellerEditDate: sellerData.seller_edit_date,
                    sellerProfilePic: sellerData.seller_profile_pic,
                  };
                  window.localStorage.setItem(
                    "Authorization",
                    loginResponse.data.data.accessToken
                  );
                  window.localStorage.setItem(
                    "sellerData",
                    JSON.stringify(data)
                  );
                  dispatch(SET_SELLER_DETAILS(data));
                  dispatch(CLEAR_COUSTOMER_DATA());
                  history.push("/");
                }
              })
              .catch((error) => {
                console.error("There was an error!", error);
              });
          }
        });
    } else if (formState.confirmPassword !== formState.sellerPassword) {
      toastError("Password Doesnt Match");
      // console.log("Password Doesnt Match");
    } else {
      toastError("Mandatory fields are Empty");
      // console.log("Mandatory fields are Empty");
    }
  };

  const handleImageUpload = () => {
    setImageLoading("loading");
    const formData = new FormData();

    // Update the formData object
    formData.append("sellerPic", selectedImage);

    // Details of the uploaded file
    // console.log(selectedImage);

    // Request made to the backend api
    // Send formData object
    axios
      .post(`${apiBaseUrl}/api/seller/seller-image`, formData)
      .then((response) => {
        if (response.status === 200) {
          setFormState({
            ...formState,
            sellerProfilePic: response.data.fileName,
          });
          toastSuccess("Image uploaded successfully!");
          setImageLoading("uploaded");
        }
      });
  };

  return (
    <Card className="my-5 p-2 py-5">
      <Container>
        <Row>
          <Col lg={8} md={8} sm={12} xs={12}>
            <h3>Seller & Company Information</h3>
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
                formState.sellerProfilePic
                  ? `${apiBaseUrl}/seller-images/${formState.sellerProfilePic}`
                  : dummyImg
              }
              alt={formState.sellerFirmName}
              style={{ height: "100px", width: "100px" }}
              className="my-3"
            />
          </Col>
        </Row>

        <Row>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Seller Name <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="sellerName"
              value={formState.sellerName}
              placeholder="Enter Seller Name"
              onChange={handleInputChange}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Company Name <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="sellerFirmName"
              value={formState.sellerFirmName}
              placeholder="Enter Company Name"
              onChange={handleInputChange}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Seller Email or Company Email{" "}
              <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="sellerEmail"
              value={formState.sellerEmail}
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Seller Bank Name <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="sellerBankName"
              value={formState.sellerBankName}
              placeholder="Enter Bank Name"
              onChange={handleInputChange}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Seller Account Number <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="sellerAccountNumber"
              value={formState.sellerAccountNumber}
              placeholder="Enter Account Number"
              onChange={handleInputChange}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Seller Mob No or Company Mob No{" "}
              <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="sellerMobileNumber"
              value={formState.sellerMobileNumber}
              placeholder="Enter Mobile Number"
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Company Address <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="address"
              value={addressFormatter.address}
              placeholder="Enter Company Address"
              onChange={handleAddressChange}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              State <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="state"
              value={addressFormatter.state}
              placeholder="Enter State Name"
              onChange={handleAddressChange}
            />
          </Col>
          <Col className="mb-3" xs={6} sm={6} md={2} lg={2}>
            <Form.Label>
              City <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="city"
              value={addressFormatter.city}
              placeholder="Enter City Name"
              onChange={handleAddressChange}
            />
          </Col>
          <Col className="mb-3" xs={6} sm={6} md={2} lg={2}>
            <Form.Label>
              Pincode <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="pincode"
              value={addressFormatter.pincode}
              placeholder="Enter Pincode"
              onChange={handleAddressChange}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>Company Info</Form.Label>
            <FormControl
              name="sellerFirmInfo"
              value={formState.sellerFirmInfo}
              placeholder="Enter Company Info"
              onChange={handleInputChange}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Password <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="sellerPassword"
              value={formState.sellerPassword}
              placeholder="Enter Password"
              onChange={handleInputChange}
              type="password"
            />
          </Col>
          {!seller.sellerId ? (
            <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
              <Form.Label>
                Confirm Password <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <FormControl
                name="confirmPassword"
                value={formState.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleInputChange}
                type="password"
              />
            </Col>
          ) : null}
        </Row>
        <Row>
          <Col className="mb-3" sx={12} sm={12} md={2} lg={2}>
            <Form.Group controlId="formFile">
              <Form.Label>Upload Company Logo</Form.Label>
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

          {!seller.sellerId ? (
            <Col className="mb-3" sx={12} sm={12} md={8} lg={8}>
              <Form.Check
                name="checkboxChecked"
                type="checkbox"
                label="I understand all the rules, regulations and declare that I'll work under them."
                onClick={() =>
                  setFormState({
                    ...formState,
                    checkboxChecked: !formState.checkboxChecked,
                  })
                }
                checked={formState.checkboxChecked}
              />
            </Col>
          ) : null}
        </Row>
        <Row className="justify-content-end">
          <Col className="mb-3 mt-3" sx={12} sm={12} md={4} lg={4}>
            {!seller.sellerId ? (
              <button
                onClick={handleSellerRegister}
                className="border-0 rounded-0 w-100 bg-dark text-white btn-lg"
              >
                <span className="m-2">REGISTER</span>
                <MdOutlineLibraryAddCheck />
              </button>
            ) : (
              <button
                onClick={handleSellerUpdate}
                className="border-0 rounded-0 w-100 bg-dark text-white btn-lg"
              >
                <span className="m-2">UPDATE</span>
                <CgArrowRightR />
              </button>
            )}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default SellerFormContainer;
