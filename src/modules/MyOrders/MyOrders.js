import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SET_PREVIOUS_TRANSACTIONS } from "../../store/actions/TranscReducerActions";
import { apiBaseUrl } from "../../utils/constants";
import MyOrdersWrapper from "./components/MyOrdersWrapper";

const MyOrders = () => {
  const customerId = useSelector(
    (state) => state.CustomerReducer.customer.customerId
  );
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/api/transc/transc-all/${customerId}`)
      .then(function (response) {
        // console.log("RESPONSE", response);
        dispatch(SET_PREVIOUS_TRANSACTIONS(response.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [customerId, dispatch]);
  return (
    <div className="mt-5 pt-3">
      <MyOrdersWrapper />
    </div>
  );
};

export default MyOrders;
