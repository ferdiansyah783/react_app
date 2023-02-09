import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../../server";
import AlertSuccess from "../../components/alert/AlertSuccess";

const Register = () => {
  const [dataUser, setDataUser] = useState({
    name: "",
    title: "",
    email: "",
    password: "",
  });
  const [allertVisible, setAlletrVisible] = useState("hidden");

  const navigateLogin = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    server
      .register(dataUser)
      .then((result) => {
        if (result.status === 201) {
          setAlletrVisible("block")
          setTimeout(() => {
            setAlletrVisible("hidden");
          }, 4000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <AlertSuccess allertVisible={allertVisible} color="success" value="user register success, please login"  />
      <section className="w-full h-screen flex justify-center py-32 lg:items-center xl:py-0 xl:items-center">
        <div className="w-full lg:w-[60%] lg:h-[90%] xl:w-[60%] xl:h-[80%] grid xl:grid-cols-2 lg:drop-shadow-lg xl:drop-shadow-lg lg:rounded-xl xl:rounded-xl bg-white">
          <div className="p-7 md:p-14 lg:p-20 xl:p-24">
            <p className="text-gray-600 mb-12">
              <span className="font-bold text-lg text-indigo-500">
                Register
              </span>{" "}
              to create your first account and start exploring the AI management
            </p>
            <form onSubmit={handleRegister} className="flex flex-col gap-4 my-3">
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
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </span>
                <input
                  name="email"
                  type={"email"}
                  placeholder="Enter your email"
                  className="auth-input"
                  onChange={(e) =>
                    setDataUser({ ...dataUser, email: e.target.value })
                  }
                />
              </label>
              <label className="block mb-5">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </span>
                <input
                  name="password"
                  type={"password"}
                  placeholder="Enter your password"
                  className="auth-input"
                  onChange={(e) =>
                    setDataUser({ ...dataUser, password: e.target.value })
                  }
                />
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
          <div className="hidden xl:block ">
            <div className="bg-indigo-500 h-full rounded-r-xl p-10 flex justify-center"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
