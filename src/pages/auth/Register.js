import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../../server";
import AlertSuccess from "../../components/alert/AlertSuccess";
import { GoKey } from "react-icons/go";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { validate } from "../../lib/Validation";

const Register = () => {
  const [dataUser, setDataUser] = useState({
    name: "",
    title: "",
    email: "",
    password: "",
  });
  const [allertVisible, setAlletrVisible] = useState("hidden");
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    title: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigateLogin = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const rules = {
      name: ["isRequired", "isAlpha", "minChar"],
      title: ["isRequired", "isAlpha", "minChar"],
      email: ["isRequired", "isEmail"],
      password: ["isRequired", "isAlpha", "minChar"],
    };

    const validateFields = validate(dataUser, rules);

    if (Object.keys(validateFields).length) {
      return setErrorMessage(validateFields);
    }

    server
      .register(dataUser)
      .then((result) => {
        if (result.status === 201) {
          setAlletrVisible("block");
          setTimeout(() => {
            navigateLogin("/login");
            setAlletrVisible("hidden");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AlertSuccess
        allertVisible={allertVisible}
        color="success"
        value="user register success, please login"
      />
      <section className="w-full h-screen flex justify-center py-32 lg:items-center xl:py-0 xl:items-center">
        <div className="w-full lg:w-[60%] lg:h-[90%] xl:w-[60%] xl:h-[80%] grid xl:grid-cols-2 lg:drop-shadow-lg xl:drop-shadow-lg lg:rounded-xl xl:rounded-xl bg-white overflow-hidden">
          <div className="p-7 md:p-14 lg:p-20 xl:p-24">
            <p className="text-gray-600 mb-12">
              <span className="font-bold text-lg text-indigo-500">
                Register
              </span>{" "}
              to create your first account and start exploring the AI management
            </p>
            <form
              onSubmit={handleRegister}
              className="flex flex-col gap-4 my-3"
            >
              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </span>
                <input
                  name="name"
                  type={"text"}
                  placeholder="Enter your full name"
                  className="auth-input"
                  onChange={(e) =>
                    setDataUser({ ...dataUser, name: e.target.value })
                  }
                />
                <p className="text-sm pl-4 text-red-600">{errorMessage.name}</p>
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Title
                </span>
                <input
                  name="title"
                  type={"text"}
                  placeholder="Enter your title"
                  className="auth-input"
                  onChange={(e) =>
                    setDataUser({ ...dataUser, title: e.target.value })
                  }
                />
                <p className="text-sm pl-4 text-red-600">
                  {errorMessage.title}
                </p>
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </span>
                <input
                  name="email"
                  type={"text"}
                  placeholder="Enter your email"
                  className="auth-input"
                  onChange={(e) =>
                    setDataUser({ ...dataUser, email: e.target.value })
                  }
                />
                <p className="text-sm pl-4 text-red-600">
                  {errorMessage.email}
                </p>
              </label>
              <label className="block mb-5">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </span>
                <div className="flex items-center justify-between border rounded-full h-11 border-stone-200 pr-5">
                  <input
                    name="password"
                    type={`${passwordVisible === true ? "text" : "password"}`}
                    placeholder="Enter your password"
                    className="border-none pl-5 placeholder:text-sm text-sm text-stone-600 focus:ring-0 rounded-full placeholder-stone-400 focus:border-none"
                    onChange={(e) =>
                      setDataUser({ ...dataUser, password: e.target.value })
                    }
                  />
                  <AiFillEye
                    onClick={() => setPasswordVisible((value) => !value)}
                    className={`${
                      passwordVisible === true ? "hidden" : ""
                    } text-xl text-stone-500`}
                  />
                  <AiFillEyeInvisible
                    onClick={() => setPasswordVisible((value) => !value)}
                    className={`${
                      passwordVisible === true ? "" : "hidden"
                    } text-xl text-stone-500`}
                  />
                </div>
                <p className="text-sm pl-4 text-red-600">
                  {errorMessage.password}
                </p>
              </label>
              <button
                type="submit"
                className="bg-indigo-500 py-2 rounded-full text-white hover:bg-indigo-600"
              >
                Register
              </button>
            </form>
            <div className="text-center text-stone-400">
              <p className="text-stone-400">
                Already have account?{" "}
                <span
                  onClick={() => navigateLogin("/login")}
                  className="font-bold text-stone-700 cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          </div>
          <div className="hidden xl:block">
            <div className="bg-indigo-500 h-full rounded-r-xl p-10 relative">
              <span>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#FFFFFF"
                    d="M37,-49.7C48.5,-50.2,58.7,-40.8,65.1,-29.1C71.6,-17.3,74.3,-3.1,72.8,10.7C71.2,24.6,65.4,38.1,55,44.6C44.6,51.2,29.7,50.7,16.2,54.3C2.6,57.9,-9.4,65.6,-23.4,67.2C-37.3,68.8,-53.1,64.2,-58.3,53.3C-63.4,42.3,-57.9,24.9,-60.1,8.7C-62.3,-7.5,-72.3,-22.5,-71.2,-35.7C-70.2,-48.9,-58.1,-60.3,-44.4,-58.8C-30.7,-57.3,-15.3,-43,-1.3,-41C12.8,-38.9,25.5,-49.3,37,-49.7Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </span>
              <div className="bg-indigo-500 drop-shadow-md h-36 w-36 rounded-full flex justify-center items-center absolute top-64 left-52">
                <GoKey className="text-white text-6xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
