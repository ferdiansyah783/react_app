import { Alert, Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { validate } from "../../lib/Validation";
import { createUser } from "../../server";

const Create = (props) => {
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

  const addNewUser = () => {
    const rules = {
      name: ['isRequired', 'isAlpha'],
      title: ['isRequired', 'isAlpha'],
      email: ['isRequired', 'isEmail']
    }
    const validateData = validate(dataUser, rules);

    if (Object.keys(validateData).length) {
      return setErrorMessage(validateData);
    }

    createUser(dataUser)
      .then((result) => {
        if (result.status === 201) {
          props.close();
          props.setCallUser((data) => !data);
          setAlletrVisible("block");
          setDataUser({
            name: "",
            title: "",
            email: "",
            role: "member",
          });
          setErrorMessage({
            name: "",
            title: "",
            email: "",
          });
          setTimeout(() => {
            setAlletrVisible("hidden");
          }, 4000);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* alert */}
      <Alert
        className={`${allertVisible} absolute top-0 right-0 left-0 w-2/4 mx-auto`}
        color="success"
      >
        <span>
          <span className="font-medium">Info alert!</span> user added
          successfully
        </span>
      </Alert>

      {/* modal */}
      <React.Fragment>
        <Modal show={props.show} size="lg" popup={true}>
          <Modal.Header
            onClick={() => {
              props.close();
              setDataUser({
                name: "",
                title: "",
                email: "",
                role: "member",
              });
              setErrorMessage({
                name: "",
                title: "",
                email: "",
              });
            }}
          />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add new user
              </h3>
              <form id="form-input">
                <div className="pb-5">
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Your name" />
                  </div>
                  <TextInput
                    id="name"
                    name="name"
                    placeholder="input your name"
                    required={true}
                    value={dataUser.name}
                    onChange={(e) =>
                      setDataUser({ ...dataUser, name: e.target.value })
                    }
                  />
                  <label className="text-red-600 text-sm">
                    {errorMessage.name}
                  </label>
                </div>
                <div className="pb-5">
                  <div className="mb-2 block">
                    <Label htmlFor="title" value="Your title" />
                  </div>
                  <TextInput
                    id="title"
                    name="title"
                    placeholder="input your title"
                    required={true}
                    value={dataUser.title}
                    onChange={(e) =>
                      setDataUser({ ...dataUser, title: e.target.value })
                    }
                  />
                  <label className="text-red-600 text-sm">
                    {errorMessage.title}
                  </label>
                </div>
                <div className="pb-5">
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email" />
                  </div>
                  <TextInput
                    id="email"
                    placeholder="name@company.com"
                    required={true}
                    value={dataUser.email}
                    onChange={(e) =>
                      setDataUser({ ...dataUser, email: e.target.value })
                    }
                  />
                  <label className="text-red-600 text-sm">
                    {errorMessage.email}
                  </label>
                </div>
                <div id="select" className="pb-5">
                  <div className="mb-2 block">
                    <Label htmlFor="roles" value="Select your role" />
                  </div>
                  <Select
                    value={dataUser.role}
                    onChange={(e) =>
                      setDataUser({ ...dataUser, role: e.target.value })
                    }
                    id="roles"
                    required={true}
                  >
                    <option>member</option>
                    <option>admin</option>
                    <option>team</option>
                  </Select>
                </div>
                <div className="w-full">
                  <Button onClick={addNewUser}>Save</Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );
};

export default Create;
