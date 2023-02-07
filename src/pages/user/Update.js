import React, { useEffect, useState } from "react";
import AlertSuccess from "../../components/alert/AlertSuccess";
import ModalInput from "../../components/modal/ModalInput";
import { validate } from "../../lib/Validation";
import server from "../../server";

const Update = ({show, close, user, setRefreshPage}) => {
  const [dataUser, setDataUser] = useState({});
  const [allertVisible, setAlletrVisible] = useState("hidden");
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    title: "",
    email: "",
  });

  // data role
  const rolesData = ["member", "admin", "team"];

  // data input
  const inputData = [
    {
      id: "name",
      name: "name",
      placeholder: "input your name",
      label: "your name",
      value: dataUser.name,
      errorMessage: errorMessage.name,
      onChange: (e) => setDataUser({ ...dataUser, name: e.target.value }),
    },
    {
      id: "title",
      name: "title",
      placeholder: "input your title",
      label: "your title",
      value: dataUser.title,
      errorMessage: errorMessage.title,
      onChange: (e) => setDataUser({ ...dataUser, title: e.target.value }),
    },
    {
      id: "email",
      name: "email",
      placeholder: "name@company.com",
      label: "your email",
      value: dataUser.email,
      errorMessage: errorMessage.email,
      onChange: (e) => setDataUser({ ...dataUser, email: e.target.value }),
    },
  ];

  // useEffect
  useEffect(() => {
    setDataUser({
      id: user.id,
      name: user.name,
      title: user.title,
      email: user.email,
      role: user.role,
    });
  }, [user]);

  // update user
  const updateDataUser = () => {
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
      .updateUser(dataUser)
      .then((result) => {
        if (result.status === 204) {
          close();
          setAlletrVisible("block");
          setRefreshPage();
          setTimeout(() => {
            setAlletrVisible("hidden");
          }, 4000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AlertSuccess
        allertVisible={allertVisible}
        color="success"
        value="user update
          successfully"
      />

      <ModalInput
        show={show}
        handleModalHeader={close}
        value="Update User"
        inputData={inputData}
        dataUser={dataUser}
        handleSelect={(e) => setDataUser({ ...dataUser, role: e.target.value })}
        rolesData={rolesData}
        handleSubmit={updateDataUser}
      />
    </>
  );
};

export default Update;
