import React from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomInvoiceId } from "../../../utils/CustomerUtils";
import CustomLoader from "../../Shared/CustomLoader/CustomLoader";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { apiBaseUrl } from "../../../utils/constants";
import {
  toastError,
  toastSuccess,
} from "../../Shared/ToastNotification/ToastNotification";
import { MAKE_CART_EMPTY } from "../../../store/actions/CartReducerActions";

const OrderConfirmationModal = ({
  show,
  handleClose,
  addressDetails,
  cartTotal,
}) => {
  const products = useSelector((state) => state.ProductsReducer.products);
  var cartProducts = useSelector((state) => state.CartReducer.cart);
  const invoiceId = generateRandomInvoiceId();
  const dispatch = useDispatch();
  cartProducts = cartProducts.filter((item) => item.cartPurchased === 0);
  const transcProductsArray = cartProducts.map((cp) => {
    var transcProduct = {};
    if (!cp.cartPurchased) {
      const productInfo = products.filter(
        (product) => product.product_id === cp.cartProductId
      )[0];
      transcProduct = {
        transcProductName: productInfo.product_name,
        transcProductId: cp.cartProductId,
        transcProductPrice: cp.cartProductPrice,
        transcProductCount: cp.cartProductCount,
        transcTotalPrice: cp.cartProductPrice * cp.cartProductCount,
        transcSellerId: productInfo.product_seller_id,
        transcCustomerId: cp.cartCustomerId,
        transcInvoiceNumber: invoiceId,
        transcShippingAddress: `${addressDetails.address}|${addressDetails.city}|${addressDetails.zipcode}|${addressDetails.state}`,
      };
    }
    return transcProduct;
  });
  console.log(transcProductsArray);

  const handlePlaceOrder = () => {
    if (transcProductsArray.length) {
      const data = {
        transactionProductsArray: transcProductsArray,
      };
      axios
        .post(`${apiBaseUrl}/api/transc/transc-add`, data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            toastSuccess("Your Order is placed successfully");
            dispatch(MAKE_CART_EMPTY());
            handleClose();
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
          toastError(error);
        });
    }
  };
  return (
    <div>
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Please Confirm your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {transcProductsArray.length ? (
            <Table striped responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Complete Price</th>
                </tr>
              </thead>
              <tbody>
                {transcProductsArray.map((tp, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{tp.transcProductName}</td>
                      <td>{tp.transcProductCount}</td>
                      <td>
                        <b>$ {tp.transcProductPrice}</b>
                      </td>
                      <td>
                        <b>$ {tp.transcTotalPrice}</b>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td></td>
                  <td></td>
                  <td colSpan={2}>
                    <b>Shipping Charge</b>
                  </td>
                  <td>
                    <b>$ 20</b>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td colSpan={2}>
                    <b>Total Price</b>
                  </td>
                  <td>
                    <b>$ {cartTotal + 20}</b>
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <CustomLoader />
          )}
          <hr />
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button
                onClick={handleClose}
                className="w-100 btn-lg bg-transparent border-dark rounded-0 text-dark"
              >
                <MdCancel className="m-2" />
                Cancel
              </Button>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button
                onClick={handlePlaceOrder}
                className="w-100 btn-lg border-dark bg-dark rounded-0 text-white"
              >
                <BsFillCheckSquareFill className="m-2" />
                Place Order
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderConfirmationModal;
