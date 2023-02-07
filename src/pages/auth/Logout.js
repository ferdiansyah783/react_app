import React from "react";
import { useNavigate } from "react-router-dom";
import ModalDanger from "../../components/modal/ModalDanger";
import server from "../../server";

const Logout = ({ show, close }) => {
  const navigate = useNavigate();

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    server
      .logout()
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      <ModalDanger handleSuccess={handleLogout} value="Are you sure you want to logout from this page?" show={show} close={close} />
    </>
  );
};

export default Logout;
