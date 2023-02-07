import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../../server";

const Register = () => {
  const [dataUser, setDataUser] = useState({
    name: "",
    title: "",
    email: "",
    password: "",
  });

  const navigateLogin = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    server.register(dataUser)
      .then((result) => {
        if (result.status === 201) {
          console.log(result);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <section className="w-full h-screen flex items-center">
        <div className="w-[40%] h-[90%] bg-white drop-shadow-lg mx-auto rounded-2xl">
          <div className="flex flex-col items-center gap-6 py-7">
            <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold">AI</h1>
            </div>
            <h2 className="font-semibold text-2xl text-stone-700">
              Welcome to AI Management
            </h2>
            <div className="text-center text-stone-400 tracking-wide">
              <p>Register to create your first account and start exploring</p>
              <p>the AI management</p>
            </div>
            <form onSubmit={handleRegister} className="flex flex-col gap-4 w-[55%] mb-5">
              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </span>
                <input
                  type={"text"}
                  placeholder="Enter your full name"
                  className="auth-input bg-slate-50"
                  value={dataUser.name}
                  name="name"
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
                  type={"text"}
                  placeholder="Enter your title"
                  className="auth-input bg-slate-50"
                  value={dataUser.title}
                  name="title"
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
                  type={"email"}
                  placeholder="Enter your email"
                  className="auth-input bg-slate-50"
                  value={dataUser.email}
                  name="email"
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
                  type={"password"}
                  placeholder="Enter your password"
                  className="auth-input bg-slate-50"
                  value={dataUser.password}
                  name="password"
                  onChange={(e) =>
                    setDataUser({ ...dataUser, password: e.target.value })
                  }
                />
              </label>
              <button
                type="submit"
                className="bg-indigo-500 py-3 rounded-full text-white hover:bg-indigo-600"
              >
                Register
              </button>
            </form>
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
      </section>
    </>
  );
};

export default Register;
