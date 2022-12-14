import { Label, Radio, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getUsers } from "../../server";
import Pagination from "../layout/Pagination";
import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [activeRole, setActiveRole] = useState("all-users");
  // const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [totalPosts, setTotalPosts] = useState(0)
  const [callUser, setCallUser] = useState(false);
  const [query, setQuery] = useState("");
  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    getUsers(`_page=${currentPage}&_limit=${postsPerPage}&q=${query}&role=${activeRole}`)
      .then((result) => {
        setTotalPosts(result?.headers['x-total-count'])
        setUsers(result?.data?.data);
        // setFilters(result?.data?.data);
      })
      .catch((err) => console.log(err));
  }, [callUser, query, currentPage, postsPerPage, activeRole]);

  const searchDataUser = (query) => {
    if (query !== null) {
      setQuery(query);
      getUsers(`q=${query}`)
        .then((result) => {
          const filter = result?.data?.data.filter((user) =>
            activeRole === "all-users" ? user : user.role === activeRole
          );
          setUsers(filter);
          setCurrentPage(1);
        })
        .catch((err) => console.log(err));
    } else {
      getUsers();
      setCallUser((user) => !user);
    }
  };

  const sortDataUser = (query) => {
    getUsers(`_sort=${query}`)
      .then((result) => setUsers(result?.data?.data))
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   const filter = users.filter((user) =>
  //     activeRole === "all-Users" ? user : user.role === activeRole
  //   );
  //   setFilters(filter);
  // }, [activeRole, setFilters, users, setActiveRole]);

  const roles = [
    {
      id: 1,
      name: "all-users",
    },
    {
      id: 2,
      name: "member",
    },
    {
      id: 3,
      name: "admin",
    },
    {
      id: 4,
      name: "team",
    },
  ];

  // const lastPostIndex = currentPage * postsPerPage;
  // const firstPostIndex = lastPostIndex - postsPerPage;
  // const currentPost = filters.slice(firstPostIndex, lastPostIndex);

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
                <option>title</option>
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
                  <th className="w-[25%] py-2">Title</th>
                  <th className="w-[25%] py-2">Email</th>
                  <th className="w-[10%] py-2">Role</th>
                  <th className="w-[10%] py-2 text-center">Option</th>
                </tr>
              </thead>
              <tbody>
                {users.length < 1 ? (
                  <tr className="text-2xl font-normal">
                    <td className="p-5">Data Empty</td>
                  </tr>
                ) : (
                  users.map((value, index) => (
                    <tr key={index} className="border-b-2">
                      <td className="w-[30%] pl-2 py-2">{value?.name}</td>
                      <td className="w-[25%] py-2">{value?.title}</td>
                      <td className="w-[25%] py-2">{value?.email}</td>
                      <td className="w-[10%] py-2">{value?.role}</td>
                      <td className="py-2 text-center">
                        <button
                          onClick={() => {
                            setModalUpdateVisible((visible) => !visible);
                            setDataUser({
                              id: value?.id,
                              name: value?.name,
                              title: value?.title,
                              email: value?.email,
                              role: value?.role,
                            });
                          }}
                          className="mr-7 text-indigo-500"
                        >
                          <FaEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => {
                            setModalDeleteVisible((visible) => !visible);
                            setDataUser({ ...dataUser, id: value?.id });
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
            <div className="flex justify-between items-center">
              <p className="font-light">showing 1 to 10 of <span className="font-semibold">{totalPosts}</span> results</p>
              <div>
                <button className={`border-2 p-1 px-3 ${currentPage === 1 ? 'bg-slate-500' : ''}`} disabled={currentPage === 1 ? true : false} onClick={() => setCurrentPage((page) => page -1)}>prev</button>
                <Pagination
                  totalPosts={totalPosts}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
                <button className="border-2 p-1 px-3" onClick={() => setCurrentPage((page) => page +1)}>next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
