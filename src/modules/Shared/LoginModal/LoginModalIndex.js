import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  HIDE_LOGIN_POPUP,
  SET_CUSTOMER_DETAILS,
} from "../../../store/actions/CustomerReducerActions";
import { SET_SELLER_DETAILS } from "../../../store/actions/SellerReducerActions";
import { apiBaseUrl } from "../../../utils/constants";
import {
  toastError,
  toastSuccess,
} from "../ToastNotification/ToastNotification";

const LoginModalIndex = (props) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [sellerCustomerModalSwitch, setSellerCustomerModalSwitch] =
    useState("customer");

  const handleInputChange = (event) => {
    event.persist();
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleCustomerSignIn = () => {
    if (formState.email === "" || formState.password === "") {
      return toastError("Mandatory Fields are empty");
      // return console.log("Mandatory Fields are empty");
    } else {
      const loginData = {
        customerEmail: formState.email,
        customerPassword: formState.password,
      };
      axios
        .post(`${apiBaseUrl}/api/customer/customer-login`, loginData)
        .then((loginResponse) => {
          // console.log(loginResponse.data);
          if (loginResponse.status === 200) {
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
            window.localStorage.setItem("customerData", JSON.stringify(data));
            dispatch(SET_CUSTOMER_DETAILS(data));
            dispatch(HIDE_LOGIN_POPUP());
            toastSuccess("Customer Successfully Signed In");
            props.onHide();
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  const handleSellerSignIn = () => {
    if (formState.email === "" || formState.password === "") {
      toastError("Mandatory Fields are empty");
      // console.log("Mandatory Fields are empty");
      return;
    } else {
      const loginData = {
        sellerEmail: formState.email,
        sellerPassword: formState.password,
      };
      axios
        .post(`${apiBaseUrl}/api/seller/seller-login`, loginData)
        .then((loginResponse) => {
          if (loginResponse.status === 200) {
            const sellerData = loginResponse.data.data.sellerData;

            const data = {
              sellerName: sellerData.seller_name,
              sellerEmail: sellerData.seller_email,
              sellerMobileNumber: sellerData.seller_mob_no,
              sellerBankName: sellerData.seller_bank_name,
              sellerAccountNumber: sellerData.seller_account_number,
              sellerAddress: sellerData.seller_address,
              sellerId: sellerData.seller_id,
              sellerRegDate: sellerData.seller_reg_date,
              sellerEditDate: sellerData.seller_edit_date,
              sellerFirmName: sellerData.seller_firm_name,
              sellerFirmAddress: sellerData.seller_firm_address,
              sellerFirmInfo: sellerData.seller_firm_info,
              sellerProfilePic: sellerData.seller_profile_pic,
            };
            window.localStorage.setItem(
              "Authorization",
              loginResponse.data.data.accessToken
            );
            window.localStorage.setItem("sellerData", JSON.stringify(data));
            dispatch(SET_SELLER_DETAILS(data));
            dispatch(HIDE_LOGIN_POPUP());
            toastSuccess("Seller Successfully Signed In");
            props.onHide();
            window.location.reload();
          }
        })
        .catch((error) => {
          toastError("Invalid Email or Password");
          console.error("There was an error!", error);
        });
    }
  };

  if (sellerCustomerModalSwitch === "customer") {
    return (
      <div>
        <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="md"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Customer Sign In
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleInputChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <div>
                <p className="text-secondary">
                  Don't have a Customer Account?{" "}
                  <span className="text-dark">
                    <b>
                      <Link
                        onClick={props.onHide}
                        style={{ color: "#555" }}
                        to="/customer-register"
                      >
                        Register here
                      </Link>
                    </b>
                  </span>
                </p>
              </div>
              <Button
                onClick={handleCustomerSignIn}
                variant="dark"
                className="rounded-0 w-100 btn-lg my-2"
              >
                Sign In
              </Button>
            </Form>
            <Button
              variant="light"
              className="rounded-0 w-100 btn-lg my-2 border"
              onClick={() => setSellerCustomerModalSwitch("seller")}
            >
              Sign In as Seller
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  } else if (sellerCustomerModalSwitch === "seller") {
    return (
      <div>
        <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="md"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Seller Sign In
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleInputChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <div>
                <p className="text-secondary">
                  Don't have a Seller Account?{" "}
                  <span className="text-dark">
                    <b>
                      <Link
                        onClick={props.onHide}
                        style={{ color: "#555" }}
                        to="/seller-register"
                      >
                        Register here
                      </Link>
                    </b>
                  </span>
                </p>
              </div>
              <Button
                onClick={handleSellerSignIn}
                variant="dark"
                className="rounded-0 w-100 btn-lg my-2"
              >
                Sign In
              </Button>
            </Form>
            <Button
              variant="light"
              className="rounded-0 w-100 btn-lg my-2 border"
              onClick={() => setSellerCustomerModalSwitch("customer")}
            >
              Sign In as Customer
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default LoginModalIndex;
