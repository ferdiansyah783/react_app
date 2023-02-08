import { Label, Radio, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import server from "../../server";
import Pagination from "../../components/layout/Pagination";
import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";
import { useNavigate } from "react-router-dom";
import Logout from "../auth/Logout";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [refreshPage, setRefreshPage] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    create: false,
    update: false,
    delete: false,
    logout: false,
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

  // useNavigate
  const navigate = useNavigate();

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
  const rolesData = ["all-users", "admin", "seller", "buyer"];

  const handleFilter = (role) => {
    role === "all-users"
      ? setData({ ...data, role: "", _page: 1 })
      : setData({ ...data, role: role, _page: 1 });
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

  // handle logout
  const handleModalLogout = () => {
    setModalVisible({ ...modalVisible, logout: true });
  };

  // useeffect
  useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");

    server.setHeader();
    server
      .getUsers(queryBuilder)
      .then((result) => {
        setTotalPosts(result?.headers["x-total-count"]);
        setUsers(result?.data?.data);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert("access denied")
        }
      });
  }, [navigate, refreshPage, queryBuilder]);

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

      <Logout
        show={modalVisible.logout}
        close={() => setModalVisible({ ...modalVisible, logout: false })}
      />

      <div className="min-w-full p-5 h-screen lg:p-5 xl:py-5 xl:px-10">
        <div className="xl:flex xl:items-center xl:justify-between lg:flex lg:items-center lg:justify-between mb-5">
          <div className="xl:ml-6 lg:ml-1">
            <h1 className="font-semibold text-xl lg:text-2xl xl:text-2xl mb-2">
              Manage User
            </h1>
            <p className="text-sm">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-3">
            <button
              onClick={handleModalLogout}
              className="bg-red-600 text-white py-2 rounded-md px-4 text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="xl:flex xl:justify-between lg:flex lg:justify-between items-center">
          <div className="flex items-center p-2 border-2 rounded-md min-w-full lg:min-w-0 xl:min-w-0 lg:w-2/4 lg:ml-1/5 xl:w-1/4 xl:ml-[20%] border-indigo-300 mb-3 lg:mb-0 xl:mb-0">
            <BiSearchAlt className="text-xl" />
            <input
              placeholder="search"
              className="outline-none ml-2 w-full"
              onChange={(e) => handleSearch(e)}
            />
          </div>

          <div className="flex items-center justify-end">
            <div>
              <button
                onClick={() =>
                  setModalVisible({ ...modalVisible, create: true })
                }
                className="bg-indigo-600 text-white py-2 rounded-md px-4 text-sm font-semibold"
              >
                Add User
              </button>
            </div>

            <div className="ml-3">
              <Select
                required={true}
                className="w-24"
                style={{
                  backgroundColor: "transparent",
                  outline: "none",
                }}
                onChange={(e) => handleSort(e)}
              >
                <option value={""} className="border-none">
                  sorting
                </option>
                {sortData.map((data, index) => (
                  <option key={index} value={data} className="border-none">
                    {data}
                  </option>
                ))}
              </Select>
            </div>

            <div className="ml-3">
              <Select
                required={true}
                className="w-20"
                onChange={(e) => handleLimit(e)}
                style={{ backgroundColor: "transparent", outline: "none" }}
              >
                {limitsData.map((data, index) => (
                  <option key={index}>{data}</option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-7 min-w-full xl:flex">
          <div className="w-full xl:w-1/5 xl:px-8 mb-7 xl:mb-0">
            <fieldset className="flex xl:flex-col gap-4" id="radio">
              <legend className="pb-3 xl:pb-4 font-semibold">
                Choose your role
              </legend>
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
                    defaultChecked={
                      (data.role === role || role === "all-users") && true
                    }
                  />
                  <Label htmlFor={role}>{role}</Label>
                </div>
              ))}
            </fieldset>
          </div>

          <div className="min-w-full xl:min-w-0 xl:w-4/5 pb-10 xl:pb-5">
            <table className="table-auto min-w-full shadow-sm mb-3 xl:mb-2">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="w-3/4 lg:w-1/4 text-sm font-semibold xl:w-[30%] px-3 py-3">
                    Name
                  </th>
                  <th className="hidden text-sm font-semibold lg:inline-block lg:w-2/4 xl:inline-block xl:w-[50%] py-3">
                    Title
                  </th>
                  <th className="hidden text-sm font-semibold lg:inline-block lg:w-[30%] xl:inline-block xl:w-1/4 py-3">
                    Email
                  </th>
                  <th className="w-2/5 text-sm font-semibold lg:w-[10%] xl:w-[10%] py-3">
                    Role
                  </th>
                  <th className="w-[10%] text-sm font-semibold py-3 px-2 text-center">
                    Option
                  </th>
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
                      <td className="w-2/4 lg:w-1/4 xl:w-[30%] px-3 text-sm py-3">
                        {value?.name}
                      </td>
                      <td className="hidden lg:inline-block lg:w-2/4 xl:inline-block text-sm xl:w-[50%] py-3">
                        {value?.title}
                      </td>
                      <td className="hidden xl:inline-block lg:inline-block lg:w-[30%] text-sm xl:w-[25%] py-3">
                        {value?.email}
                      </td>
                      <td className="w-2/5 lg:w-[10%] xl:w-[10%] text-sm py-3">
                        {value?.role?.name}
                      </td>
                      <td className="w-[10%] py-3 text-center">
                        <button
                          onClick={() => handleUpdate(value)}
                          className="mr-2 xl:mr-5 text-indigo-500"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(value)}
                          className="text-red-600"
                        >
                          <RiDeleteBin6Line className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {users.length < 1 ? (
              <></>
            ) : (
              <Pagination
                totalPosts={totalPosts}
                postsPerPage={data._limit}
                setCurrentPage={handlePage}
                currentPage={data._page}
                handlePrev={handlePrev}
                handleNext={handleNext}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
