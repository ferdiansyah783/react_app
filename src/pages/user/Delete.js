import React, { useEffect, useState } from "react";
import ModalDanger from "../../components/modal/ModalDanger";
import server from "../../server";
import AlertSuccess from "../../components/alert/AlertSuccess";

const Delete = ({ show, close, user, setRefreshPage, setCurrentPage }) => {
  const [allertVisible, setAlletrVisible] = useState("hidden");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(user.id);
  }, [user]);

  const removeDatauser = () => {
    server
      .deleteUser(userId)
      .then(() => {
        close();
        setRefreshPage();
        setCurrentPage();
        setAlletrVisible("block");
        setTimeout(() => {
          setAlletrVisible("hidden");
        }, 4000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AlertSuccess
        allertVisible={allertVisible}
        color="success"
        value="user remove
          successfully"
      />

      <ModalDanger
        handleSuccess={removeDatauser}
        value="Are you sure you want to delete this user?"
        show={show}
        close={close}
      />
    </>
  );
};

export default Delete;
