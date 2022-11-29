import { Dropdown, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllUsers } from "../../server";
import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
  const [userId, setUserId] = useState()

  useEffect(() => {
    getAllUsers()
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const GetAllUsers = () => {
    return users.map((value, index) => (
      <tr key={index} className="border-b-2">
        <td className="w-[30%] pl-2 py-2">{value?.name}</td>
        <td className="w-[25%] py-2">{value?.username}</td>
        <td className="w-[25%] py-2">{value?.email}</td>
        <td className="w-[10%] py-2">{value?.role}</td>
        <td className="py-2 text-center">
          <button onClick={() => {
            handleModalUpdate()
            setUserId(value?.id)
          }} className="mr-7 text-indigo-500">
            <FaEdit style={{ fontSize: "20px" }} />
          </button>
          <button onClick={() => {
            handleModalDelete()
            setUserId(value?.id)
          }} className="text-red-600">
            <RiDeleteBin6Line style={{ fontSize: "20px" }} />
          </button>
        </td>
      </tr>
    ));
  };

  const GetRoleUser = () => {

  }

  const handleModalCreate = () => {
    modalCreateVisible === false ? setModalCreateVisible(true) : setModalCreateVisible(false);
  }

  const handleModalUpdate = () => {
    modalUpdateVisible === false ? setModalUpdateVisible(true) : setModalUpdateVisible(false);
  }

  const handleModalDelete = () => {
    modalDeleteVisible === false ? setModalDeleteVisible(true) : setModalDeleteVisible(false);
  }

  return (
    <>
      <Create show={modalCreateVisible} close={handleModalCreate} />
      <Update show={modalUpdateVisible} close={handleModalUpdate} id={userId} />
      <Delete show={modalDeleteVisible} close={handleModalDelete} id={userId} />
      <div className="w-4/5 h-full p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-2xl">Manage User</div>
          <div className="">
            <button onClick={handleModalCreate} className="bg-indigo-600 text-white p-2 rounded-md px-3">
              Add User
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center p-2 border-2 rounded-md w-1/3">
            <BiSearchAlt style={{ fontSize: "20px" }} />
            <input placeholder="search" className="outline-none ml-2 w-1/2" />
          </div>
          <div className="flex items-center">
            <div>
              <Select required={true} style={{ width: "55px" }}>
                <option>2</option>
                <option>5</option>
                <option>10</option>
              </Select>
            </div>
            <div className="ml-5">
              <Dropdown label="Dropdown" inline={true}>
                <Dropdown.Item>Name</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <table
            className="table-auto min-w-full  "
            style={{ borderRadius: "100px" }}
          >
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="w-[30%] pl-2 py-2">Name</th>
                <th className="w-[25%] py-2">Username</th>
                <th className="w-[25%] py-2">Email</th>
                <th className="w-[10%] py-2">Role</th>
                <th className="w-[10%] py-2 text-center">Option</th>
              </tr>
            </thead>
            <tbody>
              <GetAllUsers/>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Index;
