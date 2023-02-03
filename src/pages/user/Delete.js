import { Alert, Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { deleteUser } from "../../server";

const Delete = (props) => {
  const [allertVisible, setAlletrVisible] = useState("hidden");
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId(props.user.id)
  }, [props])

  const removeDatauser = () => {
    deleteUser(userId)
      .then(() => {
        props.close()
        props.setRefreshPage()
        props.setCurrentPage()
        setAlletrVisible("block");
        setTimeout(() => {
          setAlletrVisible("hidden");
        }, 4000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* alert */}
      <Alert
        className={`${allertVisible} absolute top-0 right-0 left-0 w-full xl:w-2/4 mx-auto`}
        color="success"
      >
        <span>
          <span className="font-medium">Info alert!</span> user remove
          successfully
        </span>
      </Alert>

      <React.Fragment>
        <Modal show={props.show} size="md" popup={true}>
          <Modal.Header onClick={props.close} />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={removeDatauser}
                >
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={props.close}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );
};

export default Delete;
