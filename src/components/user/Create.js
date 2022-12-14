import { Alert, Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { validate } from "../../lib/Validation";
import { createUser } from "../../server";

const Create = (props) => {
  const [allertVisible, setAlletrVisible] = useState("hidden");
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [dataUser, setDataUser] = useState({
    name: "",
    username: "",
    email: "",
    role: "Member",
  });

  const addNewUser = () => {
    const validateData = validate(dataUser);

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
            username: "",
            email: "",
            role: "Member",
          });
          setErrorMessage({
            name: "",
            username: "",
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
                username: "",
                email: "",
                role: "Member",
              });
              setErrorMessage({
                name: "",
                username: "",
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
                    <Label htmlFor="username" value="Your username" />
                  </div>
                  <TextInput
                    id="username"
                    name="username"
                    placeholder="input your username"
                    required={true}
                    value={dataUser.username}
                    onChange={(e) =>
                      setDataUser({ ...dataUser, username: e.target.value })
                    }
                  />
                  <label className="text-red-600 text-sm">
                    {errorMessage.username}
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
                    <option>Member</option>
                    <option>Admin</option>
                    <option>Team</option>
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
