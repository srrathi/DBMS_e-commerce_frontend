import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";

const TransactionCard = ({ invoiceTranscations, invoiceNumber }) => {
  const [orderTotal, setOrderTotal] = useState(0);
  const dateFormatter = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };
  useEffect(() => {
    var total = 0;
    invoiceTranscations.map(
      (item) => (total += item.transcProductPrice * item.transcProductCount)
    );
    setOrderTotal(total);
  }, []);

  return (
    <Card className="p-3">
      <Row className="my-2 d-flex justify-content-around">
        <Col lg={6} md={6} xs={12} sm={12}>
          <h5>
            TRANSACTION NUMBER :- <b>#{invoiceNumber}</b>
          </h5>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <p>
            Order Date :- {dateFormatter(invoiceTranscations[0].transcDate)}
          </p>
          <p>Order Total :- $ {orderTotal + 20}</p>
        </Col>
      </Row>
      <Table borderless striped responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Count</th>
            <th>Product Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceTranscations.map((item, index) => {
            // setOrderTotal(orderTotal + (item.transcProductPrice * item.transcProductCount));

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.transcProductName}</td>
                <td>{item.transcProductPrice}</td>
                <td>{item.transcProductCount}</td>
                <td>${item.transcProductPrice * item.transcProductCount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="my-3">
        <p>
          <b>Shipping Address :- </b>chand pe hai apun|banaras|777882|UP
        </p>
      </div>
    </Card>
  );
};

export default TransactionCard;
