import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const ShippingAddressForm = ({formState, setFormState}) => {
  const customer = useSelector((state) => state.CustomerReducer.customer);
  const [checkbox, setCheckbox] = useState(false);
  
  // console.log(customer);

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (checkbox) {
      const customerAddress = customer.customerAddress;
      // : "chand pe hai apun|banaras|777882|UP"
      setFormState({
        address: customerAddress.split("|")[0],
        city: customerAddress.split("|")[1],
        state: customerAddress.split("|")[3],
        zipcode: customerAddress.split("|")[2],
      });
    } else {
      setFormState({
        address: "",
        city: "",
        state: "",
        zipcode: "",
      });
    }
  }, [checkbox, customer.customerAddress, setFormState]);
  return (
    <div>
      <Form>
        <Form.Check
          type="checkbox"
          id="default"
          label="Check this box if your Shipping Address is same as your personal address"
          onChange={() => setCheckbox(!checkbox)}
          checked={checkbox}
        />
        <Row className="p-2">
          <Col className="my-1" xs={12}>
            <Form.Control
              onChange={handleInputChange}
              name="address"
              placeholder="Shipping Address"
              value={formState.address}
            />
          </Col>
          <Col className="my-1" md={6} lg={6} sm={12} xs={12}>
            <Form.Control
              onChange={handleInputChange}
              name="city"
              placeholder="City"
              value={formState.city}
            />
          </Col>
          <Col className="my-1" md={3} lg={3} sm={6} xs={6}>
            <Form.Control
              onChange={handleInputChange}
              name="state"
              placeholder="State"
              value={formState.state}
            />
          </Col>
          <Col className="my-1" md={3} lg={3} sm={6} xs={6}>
            <Form.Control
              onChange={handleInputChange}
              name="zipcode"
              placeholder="Zipcode"
              value={formState.zipcode}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
