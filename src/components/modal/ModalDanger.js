import React from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const ModalDanger = ({ show, close, value, handleSuccess }) => {
  return (
    <>
      <React.Fragment>
        <Modal show={show} size="md" popup={true}>
          <Modal.Header onClick={close} />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {value}
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleSuccess}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={close}>
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

export default ModalDanger;
