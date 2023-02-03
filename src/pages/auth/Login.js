import React from "react";

const Login = () => {
  return (
    <>
      <section className="w-full h-full flex justify-center items-center">
        <div className="w-[60%] h-[80%] grid grid-cols-2 drop-shadow-lg rounded-xl bg-white">
          <div className="p-28 font-poppins">
            <h1 className="text-3xl font-bold mb-3">Login</h1>
            <p className="text-gray-600 text-sm">Please login using your email and password</p>
            <form className="flex flex-col gap-4 my-12 mb-36">
              <label class="block">
                <span class="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </span>
                <input type={"email"} placeholder="Enter your email" className="auth-input" />
              </label>
              <label class="block mb-5">
                <span class="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </span>
                <input type={"password"} placeholder="Enter your password" className="auth-input" />
              </label>
              <button
                type="submit"
                className="bg-indigo-500 py-2 rounded-full text-white"
              >
                Login
              </button>
            </form>
            <div className="text-center text-xs text-stone-400">
                <p>@2023 React App User Management</p>
            </div>
          </div>
          <div className="bg-indigo-500 rounded-r-xl p-10 flex justify-center items-center">
            <div className="w-40 h-40 drop-shadow-lg shadow-sm shadow-slate-50 bg-indigo-500 rounded-full flex items-center justify-center">
                <p className="text-white text-5xl font-bold">AI</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
