import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { HIDE_LOGIN_POPUP } from "../../../store/actions/CustomerReducerActions";
import LoginModalIndex from "./LoginModalIndex";

const LoginModalButton = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(true);
  const handleModalClose = () => {
    setModalShow(false);
    dispatch(HIDE_LOGIN_POPUP());
  };
  return (
    <div>
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button> */}

      <LoginModalIndex show={modalShow} onHide={handleModalClose} />
    </div>
  );
};

export default LoginModalButton;
