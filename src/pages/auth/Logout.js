import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDanger from "../../components/modal/ModalDanger";
import server from "../../server";
import AlertSuccess from "../../components/alert/AlertSuccess";

const Logout = ({ show, close }) => {
  const [allertVisible, setAllertVisible] = useState("hidden");

  const navigate = useNavigate();

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    server
      .logout()
      .then((result) => {
        if (result.status === 200) {
          setAllertVisible("block");
          setTimeout(() => {
            setAllertVisible("hidden");
            navigate("/login");
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AlertSuccess
        color="success"
        value="Logout Successfully"
        allertVisible={allertVisible}
      />

      <ModalDanger
        handleSuccess={handleLogout}
        value="Are you sure you want to logout from this page?"
        show={show}
        close={close}
      />
    </>
  );
};

export default Logout;
