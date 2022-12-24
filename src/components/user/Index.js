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
  const [totalPosts, setTotalPosts] = useState(0);
  const [refreshPage, setRefreshPage] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    create: false,
    update: false,
    delete: false,
  });
  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    title: "",
    email: "",
    role: "",
  });
  const [data, setData] = useState({
    _page: 1,
    _limit: 2,
    role: "",
    _sort: "",
    q: "",
  });

  // queryBuilder
  const availableQuery = [];

  Object.keys(data).map((key) => {
    if (data[key] !== "") {
      availableQuery.push(key + "=" + data[key]);
    }

    return availableQuery;
  });

  const queryBuilder = availableQuery.join("&");

  // filter
  const rolesData = ["", "member", "admin", "team"];

  const handleFilter = (role) => {
    setData({ ...data, role: role, _page: 1 });
  };

  // limit
  const limitsData = [2, 5, 10];

  const handleLimit = (e) => {
    setData({ ...data, _limit: e.target.value, _page: 1 });
  };

  // sort
  const sortData = ["name", "title", "email", "role"];

  const handleSort = (e) => {
    setData({ ...data, _sort: e.target.value, _page: 1 });
  };

  // search
  const handleSearch = (e) => {
    setData({ ...data, q: e.target.value, _page: 1 });
  };

  /**
   * pagination
   * prev
   * next
   * reset page
   * refresh page
   */
  const handlePage = (e) => {
    setData({ ...data, _page: e });
  };

  const handlePrev = () => {
    setData({ ...data, _page: data._page - 1 });
  };

  const handleNext = () => {
    setData({ ...data, _page: data._page + 1 });
  };

  const handleResetPage = () => {
    setData({ ...data, _page: 1 });
  };

  const handleRefreshpage = () => {
    setRefreshPage((refreshPage) => !refreshPage);
  };

  // handle update
  const handleUpdate = (value) => {
    setModalVisible({ ...modalVisible, update: true });
    setDataUser({
      id: value?.id,
      name: value?.name,
      title: value?.title,
      email: value?.email,
      role: value?.role,
    });
  };

  // handle delete
  const handleDelete = (value) => {
    setModalVisible({ ...modalVisible, delete: true });
    setDataUser({ ...dataUser, id: value?.id });
  };

  // useeffect
  useEffect(() => {
    console.log(queryBuilder);
    getUsers(queryBuilder)
      .then((result) => {
        setTotalPosts(result?.headers["x-total-count"]);
        setUsers(result?.data?.data);
      })
      .catch((err) => console.log(err));
  }, [refreshPage, queryBuilder]);

  console.log(modalVisible);

  return (
    <>
      <Create
        show={modalVisible.create}
        close={() => setModalVisible({ ...modalVisible, create: false })}
        setRefreshPage={handleRefreshpage}
      />

      <Update
        show={modalVisible.update}
        close={() => setModalVisible({ ...modalVisible, update: false })}
        user={dataUser}
        setRefreshPage={handleRefreshpage}
      />

      <Delete
        show={modalVisible.delete}
        close={() => setModalVisible({ ...modalVisible, delete: false })}
        user={dataUser}
        setRefreshPage={handleRefreshpage}
        setCurrentPage={handleResetPage}
      />

      <div className="min-w-full h-full p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-2xl ml-6">Manage User</div>
          <div className="">
            <button
              onClick={() => setModalVisible({ ...modalVisible, create: true })}
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
              onChange={(e) => handleSearch(e)}
            />
          </div>

          <div className="flex items-center">
            <div>
              <Select
                required={true}
                className="w-[55px]"
                onChange={(e) => handleLimit(e)}
              >
                {limitsData.map((data, index) => (
                  <option key={index}>{data}</option>
                ))}
              </Select>
            </div>

            <div className="ml-3">
              <Select
                required={true}
                className="w-[85px] outline-none"
                style={{ backgroundColor: "transparent" }}
                onChange={(e) => handleSort(e)}
              >
                <option value={""}>sorting</option>
                {sortData.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-7 min-w-full flex">
          <div className="w-1/5 px-8">
            <fieldset className="flex flex-col gap-4" id="radio">
              <legend className="pb-6 font-semibold">Choose your role</legend>
              {rolesData.map((role, index) => (
                <div
                  onClick={() => handleFilter(role)}
                  key={index}
                  className="flex items-center gap-2"
                >
                  <Radio
                    id={role}
                    name="roles"
                    value={role}
                    defaultChecked={data.role === role && true}
                  />
                  <Label htmlFor={role}>
                    {role === "" ? "all-users" : role}
                  </Label>
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
                          onClick={() => handleUpdate(value)}
                          className="mr-7 text-indigo-500"
                        >
                          <FaEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(value)}
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
              <p className="font-light">
                showing 1 to 10 of{" "}
                <span className="font-semibold">{totalPosts}</span> results
              </p>
              <div>
                <button
                  className={`border-2 p-1 px-3 ${
                    data._page === 1 ? "bg-slate-500" : ""
                  }`}
                  disabled={data._page === 1 ? true : false}
                  onClick={handlePrev}
                >
                  prev
                </button>
                <Pagination
                  totalPosts={totalPosts}
                  postsPerPage={data._limit}
                  setCurrentPage={handlePage}
                  currentPage={data._page}
                />
                <button className="border-2 p-1 px-3" onClick={handleNext}>
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
