import React from "react";
import { useSelector } from "react-redux";
import CustomerFormContainer from "../../Customer/components/CustomerFormContainer";
import SellerFormContainer from "../../Seller/SellerRegister/components/SellerFormContainer";

const ProfilePage = () => {
  const Seller = useSelector((state) => state.SellerReducer.seller);
  return (
    <div className="mt-5 p-2">
      {Seller.sellerId ? <SellerFormContainer /> : <CustomerFormContainer />}
    </div>
  );
};

export default ProfilePage;
