import React, { useState } from "react";
import AlertSuccess from "../../components/alert/AlertSuccess";
import ModalInput from "../../components/modal/ModalInput";
import { validate } from "../../lib/Validation";
import server from "../../server";

const Create = ({ show, close, setRefreshPage }) => {
  const [allertVisible, setAlletrVisible] = useState("hidden");
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    title: "",
    email: "",
  });
  const [dataUser, setDataUser] = useState({
    name: "",
    title: "",
    email: "",
    role: "member",
  });

  // data role
  const rolesData = ["member", "admin", "team"];

  // data input
  const inputData = [
    {
      name: "name",
      placeholder: "input your name",
      label: "your name",
      value: dataUser.name,
      errorMessage: errorMessage.name,
      onChange: (e) => setDataUser({ ...dataUser, name: e.target.value }),
    },
    {
      name: "title",
      placeholder: "input your title",
      label: "your title",
      value: dataUser.title,
      errorMessage: errorMessage.title,
      onChange: (e) => setDataUser({ ...dataUser, title: e.target.value }),
    },
    {
      name: "email",
      placeholder: "name@company.com",
      label: "your email",
      value: dataUser.email,
      errorMessage: errorMessage.email,
      onChange: (e) => setDataUser({ ...dataUser, email: e.target.value }),
    },
  ];

  // handle modal header
  const handleModalHeader = () => {
    close();
    setDataUser({
      name: "",
      title: "",
      email: "",
      role: "member",
    });
    setErrorMessage({});
  };

  // add user
  const addNewUser = () => {
    const rules = {
      name: ["isRequired", "isAlpha", "minChar"],
      title: ["isRequired", "isAlpha", "minChar"],
      email: ["isRequired", "isEmail"],
    };
    const validateData = validate(dataUser, rules);

    if (Object.keys(validateData).length) {
      return setErrorMessage(validateData);
    }

    server
      .createUser(dataUser)
      .then((result) => {
        if (result.status === 201) {
          close();
          setRefreshPage();
          setAlletrVisible("block");
          setDataUser({
            name: "",
            title: "",
            email: "",
            role: "member",
          });
          setErrorMessage({});
          setTimeout(() => {
            setAlletrVisible("hidden");
          }, 4000);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <AlertSuccess
        allertVisible={allertVisible}
        color="success"
        value="user added
          successfully"
      />

      <ModalInput
        show={show}
        handleModalHeader={handleModalHeader}
        value="Add new user"
        inputData={inputData}
        dataUser={dataUser}
        handleSelect={(e) => setDataUser({ ...dataUser, role: e.target.value })}
        rolesData={rolesData}
        handleSubmit={addNewUser}
      />
    </>
  );
};

export default Create;
