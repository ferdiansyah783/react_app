import { Alert, Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { getUser, updateUser } from "../../server";

const Update = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [allertVisible, setAlletrVisible] = useState("hidden");

  useEffect(() => {
    getUser(props.id)
      .then((result) => {
        setName(result.data?.name);
        setUsername(result.data?.username);
        setEmail(result.data?.email);
        setRole(result.data?.role);
      })
      .catch((err) => console.log(err));
  }, [props]);

  const user = {
    name: name,
    username: username,
    email: email,
    role: role,
    id: props.id,
  };

  const updateDataUser = (data) => {
    updateUser(data)
      .then((result) => {
        if (result.status === 200) {
          props.close();
          setAlletrVisible("block");
          setTimeout(() => {
            setAlletrVisible("hidden");
          }, 4000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* alert */}
      <Alert
        className={`${allertVisible} absolute top-0 right-0 left-0 w-2/4 mx-auto`}
        color="success"
      >
        <span>
          <span className="font-medium">Info alert!</span> user update
          successfully
        </span>
      </Alert>

      {/* modal */}
      <React.Fragment>
        <Modal show={props.show} size="lg" popup={true}>
          <Modal.Header onClick={props.close} />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Update user
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="input your name"
                  required={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Your username" />
                </div>
                <TextInput
                  id="username"
                  placeholder="input your username"
                  required={true}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div id="select">
                <div className="mb-2 block">
                  <Label htmlFor="countries" value="Select your role" />
                </div>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  id="countries"
                  required={true}
                >
                  <option>User</option>
                  <option>Admin</option>
                  <option>Team</option>
                </Select>
              </div>
              <div className="w-full">
                <Button onClick={() => updateDataUser(user)}>Save</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );
};

export default Update;
