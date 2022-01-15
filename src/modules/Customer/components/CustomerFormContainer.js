import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Form, FormControl } from "react-bootstrap";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { CgArrowRightR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  SET_CUSTOMER_DETAILS,
  UPDATE_CUSTOMER_DETAILS,
} from "../../../store/actions/CustomerReducerActions";
import { apiBaseUrl } from "../../../utils/constants";
import {
  toastError,
  toastSuccess,
} from "../../Shared/ToastNotification/ToastNotification";

const CustomerFormContainer = () => {
  const customer = useSelector((state) => state.CustomerReducer.customer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [formState, setFormState] = useState({
    customerName: "",
    customerEmail: "",
    customerMobileNumber: "",
    customerBankName: "",
    customerAccountNumber: "",
    customerAddress: "",
    customerPassword: "",
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
      customerAddress: `${addressFormatter.address}|${addressFormatter.city}|${addressFormatter.pincode}|${addressFormatter.state}`,
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
    if (customer.customerId) {
      // console.log("customer", customer);
      const addressArray = customer.customerAddress.split("|");
      setFormState(customer);
      setAddressFormatter({
        address: addressArray[0],
        city: addressArray[1],
        pincode: addressArray[2],
        state: addressArray[3],
      });
    } else {
      setFormState({
        customerName: "",
        customerEmail: "",
        customerMobileNumber: "",
        customerBankName: "",
        customerAccountNumber: "",
        customerAddress: "",
        customerPassword: "",
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

  const handleCustomerUpdate = () => {
    if (
      formState.customerName !== "" &&
      formState.customerEmail !== "" &&
      formState.customerPassword !== "" &&
      formState.customerPassword
    ) {
      const data = {
        customerId: formState.customerId,
        customerName: formState.customerName,
        customerEmail: formState.customerEmail,
        customerMobileNumber: formState.customerMobileNumber || "",
        customerBankName: formState.customerBankName || "",
        customerAccountNumber: formState.customerAccountNumber || 0,
        customerAddress: formState.customerAddress,
        customerPassword: formState.customerPassword,
      };
      axios
        .patch(`${apiBaseUrl}/api/customer/customer-update`, data)
        .then((response) => {
          // console.log(response);
          if (response.data.success) {
            delete data.customerPassword;
            toastSuccess("User Successfully Updated");
            window.localStorage.setItem("customerData", JSON.stringify(data));
            dispatch(UPDATE_CUSTOMER_DETAILS(data));
          }
        })
        .catch((err) => console.error(err));
    } else {
      toastError("Mandatory fields are empty");
    }
  };

  const handleCustomerRegister = () => {
    if (
      formState.customerName !== "" &&
      formState.customerEmail !== "" &&
      formState.customerPassword !== "" &&
      formState.confirmPassword !== "" &&
      formState.confirmPassword === formState.customerPassword &&
      formState.customerPassword &&
      formState.confirmPassword &&
      formState.checkboxChecked
    ) {
      const data = {
        customerName: formState.customerName,
        customerEmail: formState.customerEmail,
        customerMobileNumber: formState.customerMobileNumber || "",
        customerBankName: formState.customerBankName || "",
        customerAccountNumber: formState.customerAccountNumber || 0,
        customerAddress: formState.customerAddress,
        customerPassword: formState.customerPassword,
      };
      axios
        .post(`${apiBaseUrl}/api/customer/customer-register`, data)
        .then((response) => {
          // console.log(response);
          if (response.data.success) {
            const loginData = {
              customerEmail: formState.customerEmail,
              customerPassword: formState.customerPassword,
            };
            axios
              .post(`${apiBaseUrl}/api/customer/customer-login`, loginData)
              .then((loginResponse) => {
                if (
                  loginResponse.status === 200 &&
                  loginResponse.data.data.customerData
                ) {
                  toastSuccess("User successfully Registered");
                  const customerData = loginResponse.data.data.customerData;
                  const data = {
                    customerName: customerData.customer_name,
                    customerEmail: customerData.customer_email,
                    customerMobileNumber: customerData.customer_mob_no,
                    customerBankName: customerData.customer_bank_name,
                    customerAccountNumber: customerData.customer_account_number,
                    customerAddress: customerData.customer_address,
                    customerId: customerData.customer_id,
                  };
                  window.localStorage.setItem(
                    "Authorization",
                    loginResponse.data.data.accessToken
                  );
                  window.localStorage.setItem(
                    "customerData",
                    JSON.stringify(data)
                  );
                  dispatch(SET_CUSTOMER_DETAILS(data));
                  history.push("/");
                }
              })
              .catch((error) => {
                console.error("There was an error!", error);
              });
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else if (formState.confirmPassword !== formState.customerPassword) {
      toastError("Password Doesnt Match")
      // console.log("Password Doesnt Match");
    } else {
      toastError("Mandatory fields are Empty")
      // console.log("Mandatory fields are Empty");
    }
  };

  return (
    <Card className="my-5 p-2 py-5">
      <Container>
        <h3>Customer Registration</h3>
        <hr />
        <Row>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Customer Name <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="customerName"
              placeholder="Enter Customer Name"
              onChange={handleInputChange}
              value={formState.customerName}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Customer Email <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="customerEmail"
              placeholder="Enter Customer Email"
              onChange={handleInputChange}
              value={formState.customerEmail}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>Customer Mob No.</Form.Label>
            <FormControl
              name="customerMobileNumber"
              placeholder="Enter Mobile Number"
              onChange={handleInputChange}
              value={formState.customerMobileNumber}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>Customer Bank Name</Form.Label>
            <FormControl
              name="customerBankName"
              placeholder="Enter Bank Name"
              onChange={handleInputChange}
              value={formState.customerBankName}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>Customer Account Number</Form.Label>
            <FormControl
              name="customerAccountNumber"
              placeholder="Enter Account Number"
              onChange={handleInputChange}
              value={formState.customerAccountNumber}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>Customer Address</Form.Label>
            <FormControl
              name="address"
              placeholder="Enter Company Address"
              onChange={handleAddressChange}
              value={addressFormatter.address}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>State</Form.Label>
            <FormControl
              onChange={handleAddressChange}
              name="state"
              placeholder="Enter State Name"
              value={addressFormatter.state}
            />
          </Col>
          <Col className="mb-3" xs={6} sm={6} md={2} lg={2}>
            <Form.Label>City</Form.Label>
            <FormControl
              onChange={handleAddressChange}
              name="city"
              placeholder="Enter City Name"
              value={addressFormatter.city}
            />
          </Col>
          <Col className="mb-3" xs={6} sm={6} md={2} lg={2}>
            <Form.Label>Pincode</Form.Label>
            <FormControl
              onChange={handleAddressChange}
              name="pincode"
              placeholder="Enter Pincode"
              value={addressFormatter.pincode}
            />
          </Col>
          <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
            <Form.Label>
              Password <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <FormControl
              name="customerPassword"
              placeholder="Enter Password"
              type="password"
              onChange={handleInputChange}
              value={formState.customerPassword}
            />
          </Col>
        </Row>
        {!customer.customerId ? (
          <>
            <Row>
              <Col className="mb-3" xs={12} sm={12} md={4} lg={4}>
                <Form.Label>
                  Confirm Password <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <FormControl
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={handleInputChange}
                  value={formState.confirmPassword}
                />
              </Col>
              <Col className="my-3" sx={12} sm={12} md={8} lg={8}>
                <Form.Check
                  name="checkboxChecked"
                  type="checkbox"
                  label="I understand all the rules, regulations and declare that I'll follow them."
                  onClick={() =>
                    setFormState({
                      ...formState,
                      checkboxChecked: !formState.checkboxChecked,
                    })
                  }
                  checked={formState.checkboxChecked}
                />
              </Col>
            </Row>
            <Row className="justify-content-end">
              <Col className="mb-3 mt-3" sx={12} sm={12} md={4} lg={4}>
                <button
                  onClick={handleCustomerRegister}
                  className="border-0 rounded-0 w-100 bg-dark text-white btn-lg"
                >
                  <span className="m-2">REGISTER</span>
                  <MdOutlineLibraryAddCheck />
                </button>
              </Col>
            </Row>
          </>
        ) : (
          <Row className="justify-content-end">
            <Col className="mb-3 mt-3" sx={12} sm={12} md={4} lg={4}>
              <button
                onClick={handleCustomerUpdate}
                className="border-0 rounded-0 w-100 bg-dark text-white btn-lg"
              >
                <span className="m-2">UPDATE</span>
                <CgArrowRightR />
              </button>
            </Col>
          </Row>
        )}
      </Container>
    </Card>
  );
};

export default CustomerFormContainer;
