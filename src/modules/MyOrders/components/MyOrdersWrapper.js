import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TransactionCard from "./TransactionCard";

const MyOrdersWrapper = () => {
  const previousTransactions = useSelector(
    (state) => state.TranscReducer.previousTransactions
  );
  console.log(previousTransactions);

  return (
    <Card className="py-4 px-2">
      <h3 className="text-center my-4">My Orders</h3>
      {previousTransactions.length ? (
        previousTransactions.map((item) => {
          return (
            <div className="my-3">
              <TransactionCard
                invoiceNumber={item.invoiceNumber}
                invoiceTranscations={item.invoiceTranscations}
              />
            </div>
          );
        })
      ) : (
        <div>
          <h5 className="text-center">You have placed No order Please go to <Link to="/cart">Cart</Link> to place you order</h5>
        </div>
      )}
    </Card>
  );
};

export default MyOrdersWrapper;
