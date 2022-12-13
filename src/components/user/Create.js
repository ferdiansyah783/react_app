import { Alert, Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { createUser } from "../../server";

const Create = (props) => {
  const [allertVisible, setAlletrVisible] = useState("hidden");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dataUser, setDataUser] = useState({
    name: "",
    username: "",
    email: "",
    role: "Member",
  });

  const addNewUser = () => {
    if (
      dataUser.name.length < 1 ||
      dataUser.username.length < 1 ||
      dataUser.email.length < 1
    ) {
      setError(true);
      setErrorMessage("Required")
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(dataUser.email)) {
      setError(true);
      setErrorMessage("must be a email")
      return false
    }

    createUser(dataUser)
      .then((result) => {
        if (result.status === 201) {
          props.close();
          setAlletrVisible("block");
          props.setCallUser((data) => !data);
          setDataUser({
            name: "",
            username: "",
            email: "",
            role: "Member",
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
              setError(false);
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
                    placeholder="input your name"
                    required={true}
                    name="name"
                    value={dataUser.name}
                    onChange={(e) =>
                      setDataUser({ ...dataUser, name: e.target.value })
                    }
                  />
                  {error && dataUser.name.length < 1 && (
                    <label className="text-red-600 text-sm">
                      Name {errorMessage}
                    </label>
                  )}
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
                  {error && dataUser.username.length < 1 && (
                    <label className="text-red-600 text-sm">
                      Username {errorMessage}
                    </label>
                  )}
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
                  {error && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(dataUser.email) && (
                    <label className="text-red-600 text-sm">
                      Email {errorMessage}
                    </label>
                  )}
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
