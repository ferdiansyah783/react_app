import { Alert, Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { updateUser } from "../../server";

const Update = (props) => {
  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    title: "",
    email: "",
    role: "",
  });
  const [allertVisible, setAlletrVisible] = useState("hidden");

  useEffect(() => {
    setDataUser({
      id: props.user.id,
      name: props.user.name,
      title: props.user.title,
      email: props.user.email,
      role: props.user.role,
    });
  }, [props]);

  const updateDataUser = () => {
    updateUser(dataUser)
      .then((result) => {
        if (result.status === 200) {
          props.close();
          setAlletrVisible("block");
          props.setCallUser((user) => !user);
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
                  value={dataUser.name}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, name: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Your title" />
                </div>
                <TextInput
                  id="title"
                  placeholder="input your title"
                  required={true}
                  value={dataUser.title}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, title: e.target.value })
                  }
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
                  value={dataUser.email}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, email: e.target.value })
                  }
                />
              </div>
              <div id="select">
                <div className="mb-2 block">
                  <Label htmlFor="countries" value="Select your role" />
                </div>
                <Select
                  value={dataUser.role}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, role: e.target.value })
                  }
                  id="countries"
                  required={true}
                >
                  <option>member</option>
                  <option>admin</option>
                  <option>team</option>
                </Select>
              </div>
              <div className="w-full">
                <Button onClick={updateDataUser}>Save</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );
};

export default Update;
