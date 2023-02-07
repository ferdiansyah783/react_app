import React from "react";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";

const ModalInput = ({
  show,
  handleModalHeader,
  inputData,
  dataUser,
  handleSelect,
  rolesData,
  handleSubmit,
  value
}) => {
  return (
    <>
      <React.Fragment>
        <Modal show={show} size="lg" popup={true}>
          <Modal.Header onClick={handleModalHeader} />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {value}
              </h3>
              <form id="form-input">
                {inputData.map((value, index) => (
                  <div className="pb-5" key={index}>
                    <div className="mb-2 block">
                      <Label htmlFor={value.name} value={value.label} />
                    </div>
                    <TextInput
                      id={value.name}
                      name={value.name}
                      placeholder={value.placeholder}
                      value={value.value}
                      onChange={(e) => value.onChange(e)}
                    />
                    <label className="text-red-600 text-sm">
                      {value.errorMessage}
                    </label>
                  </div>
                ))}

                <div id="select" className="pb-5">
                  <div className="mb-2 block">
                    <Label htmlFor="roles" value="Select your role" />
                  </div>
                  <Select
                    value={dataUser.role}
                    onChange={handleSelect}
                    id="roles"
                  >
                    {rolesData.map((role, index) => (
                      <option key={index}>{role}</option>
                    ))}
                  </Select>
                </div>

                <div className="w-full">
                  <Button onClick={handleSubmit}>Save</Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );
};

export default ModalInput;
