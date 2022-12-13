import { Label, Radio, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllUsers, searchUser, sortUser } from "../../server";
import Pagination from "../layout/Pagination";
import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [activeRole, setActiveRole] = useState("All-Users");
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [callUser, setCallUser] = useState(false);
  const [query, setQuery] = useState("");
  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    role: "",
  })

  useEffect(() => {
    getAllUsers(query)
      .then((result) => {
        setUsers(result.data);
        setFilters(result.data);
      })
      .catch((err) => console.log(err));
  }, [callUser, query]);

  const searchDataUser = (query) => {
    if (query !== null) {
      setQuery(query);
      searchUser(query)
        .then((result) => {
          const filter = result?.data.filter((user) =>
            activeRole === "All-Users" ? user : user.role === activeRole
          );
          setFilters(filter);
          setCurrentPage(1);
        })
        .catch((err) => console.log(err));
    } else {
      getAllUsers();
      setCallUser((user) => !user);
    }
  };

  const sortDataUser = (query) => {
    sortUser(query)
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const filter = users.filter((user) =>
      activeRole === "All-Users" ? user : user.role === activeRole
    );
    setFilters(filter);
  }, [activeRole, setFilters, users, setActiveRole]);

  const roles = [
    {
      id: 1,
      name: "All-Users",
    },
    {
      id: 2,
      name: "Member",
    },
    {
      id: 3,
      name: "Admin",
    },
    {
      id: 4,
      name: "Team",
    },
  ];

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = filters.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Create
        show={modalCreateVisible}
        close={() => setModalCreateVisible((visible) => !visible)}
        setCallUser={setCallUser}
      />
      <Update
        show={modalUpdateVisible}
        close={() => setModalUpdateVisible((visible) => !visible)}
        user={dataUser}
        setCallUser={setCallUser}
      />
      <Delete
        show={modalDeleteVisible}
        close={() => setModalDeleteVisible((visible) => !visible)}
        user={dataUser}
        setCallUser={setCallUser}
        setCurrentPage={setCurrentPage}
      />
      <div className="min-w-full h-full p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-2xl ml-6">Manage User</div>
          <div className="">
            <button
              onClick={() => setModalCreateVisible((visible) => !visible)}
              className="bg-indigo-600 text-white p-2 rounded-md px-3"
            >
              Add User
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center p-2 border-2 rounded-md w-1/4 ml-[20%]">
            <BiSearchAlt className="text-xl" />
            <input
              placeholder="search"
              className="outline-none ml-2 w-full"
              onChange={(e) => searchDataUser(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <div>
              <Select
                required={true}
                className="w-[55px]"
                onChange={(e) => {
                  setPostsPerPage(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>2</option>
                <option>5</option>
                <option>10</option>
              </Select>
            </div>
            <div className="ml-3">
              <Select
                required={true}
                className="w-[85px] outline-none"
                style={{ backgroundColor: "transparent" }}
                onChange={(e) => sortDataUser(e.target.value)}
              >
                <option value={""}>Sorting</option>
                <option>name</option>
                <option>username</option>
                <option>email</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-7 min-w-full flex">
          <div className="w-1/5 px-8">
            <fieldset className="flex flex-col gap-4" id="radio">
              <legend className="pb-6 font-semibold">Choose your role</legend>
              {roles.map((role) => (
                <div
                  onClick={() => {
                    setActiveRole(role.name);
                    setCurrentPage(1);
                  }}
                  key={role.id}
                  className="flex items-center gap-2"
                >
                  <Radio
                    id={role.name}
                    name="roles"
                    value={role.name}
                    defaultChecked={activeRole === role.name && true}
                  />
                  <Label htmlFor={role.name}>{role.name}</Label>
                </div>
              ))}
            </fieldset>
          </div>

          <div className="w-4/5">
            <table className="table-auto min-w-full shadow-sm mb-2">
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
                {currentPost.length < 1 ? (
                  <tr className="text-2xl font-normal">
                    <td className="p-5">Data Empty</td>
                  </tr>
                ) : (
                  currentPost.map((value, index) => (
                    <tr key={index} className="border-b-2">
                      <td className="w-[30%] pl-2 py-2">{value?.name}</td>
                      <td className="w-[25%] py-2">{value?.username}</td>
                      <td className="w-[25%] py-2">{value?.email}</td>
                      <td className="w-[10%] py-2">{value?.role}</td>
                      <td className="py-2 text-center">
                        <button
                          onClick={() => {
                            setModalUpdateVisible((visible) => !visible);
                            setDataUser({
                              id: value?.id,
                              name: value?.name,
                              username: value?.username,
                              email: value?.email,
                              role: value?.role,
                            })
                          }}
                          className="mr-7 text-indigo-500"
                        >
                          <FaEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => {
                            setModalDeleteVisible((visible) => !visible);
                            setDataUser({...dataUser, id: value?.id})
                          }}
                          className="text-red-600"
                        >
                          <RiDeleteBin6Line className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              totalPosts={filters.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
