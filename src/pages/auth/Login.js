import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../../server";

const Login = () => {
  const [fieldsLogin, setFieldsLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) return navigate("/");
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    server
      .login(fieldsLogin)
      .then((result) => {
        if (result.status === 200) {
          const { access_token } = result.data;
          localStorage.setItem("token", access_token);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <section className="w-full h-screen flex justify-center py-32 lg:items-center xl:py-0 xl:items-center">
        <div className="w-full lg:w-[60%] lg:h-[90%] xl:w-[60%] xl:h-[80%] grid xl:grid-cols-2 lg:drop-shadow-lg xl:drop-shadow-lg lg:rounded-xl xl:rounded-xl bg-white">
          <div className="p-7 md:p-14 lg:p-20 xl:p-24  relative">
            <h1 className="text-3xl font-bold mb-3">Login</h1>
            <p className="text-gray-600 text-sm">
              Please login using your email and password
            </p>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 my-12">
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
                    setFieldsLogin({ ...fieldsLogin, email: e.target.value })
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
                    setFieldsLogin({ ...fieldsLogin, password: e.target.value })
                  }
                />
              </label>
              <button
                type="submit"
                className="bg-indigo-500 py-2 rounded-full text-white hover:bg-indigo-600"
              >
                Login
              </button>
              <button
                className="bg-white border border-indigo-500 py-2 rounded-full text-indigo-500"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </form>
            <div className="text-center text-xs text-stone-400 absolute -bottom-20 lg:bottom-10 xl:bottom-14 inset-x-0">
              <p>@2023 React App User Management</p>
            </div>
          </div>
          <div className="hidden xl:block ">
            <div className="bg-indigo-500 h-full rounded-r-xl p-10 flex justify-center items-center">
              <div className="w-40 h-40 drop-shadow-lg shadow-sm shadow-slate-50 bg-indigo-500 rounded-full flex items-center justify-center">
                <h1 className="text-white text-5xl font-bold">AI</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
