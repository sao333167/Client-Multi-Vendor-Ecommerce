import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import {
  customer_login,
  messageClear,
} from "../store/Reducers/authReducerSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Login() {
  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const login = (e) => {
    e.preventDefault();
    dispatch(customer_login(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage, dispatch,navigate,userInfo]);

  return (
    <div>
      {loader && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white/50"></div>
        </div>
      )}
      <Header />
      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md">
            <div className="px-8 py-8">
              <h2 className="text-center w-full text-xl text-slate-600 font-bold">
                Login
              </h2>

              <div>
                <form onSubmit={login} className="text-slate-s600">
                  <div className="flex flex-col gap-1 mt-2">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={inputHandle}
                      value={state.email}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                      required
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={inputHandle}
                      value={state.password}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      required
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                    />
                  </div>
                  <button className="px-8 py-2 mt-2 w-full bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md">
                    Login
                  </button>
                </form>
                <div className="flex justify-center items-center py-2">
                  <div className="h-[1px] bg-slate-300 w-[90%]"></div>
                  <span className="px-3 text-slate-600">Or</span>
                  <div className="h-[1px] bg-slate-300 w-[90%]"></div>
                </div>
                <button className="px-8 w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  <span>
                    <FaFacebookF />
                  </span>
                  <span>Login With Facebook</span>
                </button>
                <button className="px-8 w-full py-2 bg-red-500 shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  <span>
                    <FaGoogle />
                  </span>
                  <span>Login With Gmail</span>
                </button>
              </div>
              <div className="text-center text-slate-600 pt-1">
                <p>
                  Don't Have An Account ?{" "}
                  <Link className="text-blue-500" to={"/register"}>
                    Register
                  </Link>
                </p>
              </div>
              <a target="_blank" href="http://localhost:3000/login" rel="noreferrer">
                <div className="px-8 w-full py-2 bg-[#02e3e0] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                    Login As a Seller
                </div>
              </a>
              <a target="_blank" href="http://localhost:3000/register" rel="noreferrer">
                <div className="px-8 w-full py-2 bg-[#ad2cc4] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                    Register As a Seller
                </div>
              </a>

            </div>

            <div className="w-full h-full py-4 pr-4">
              <img
                className="rounded-md"
                src="http://localhost:3000/images/login.jpg"
                alt="login"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
