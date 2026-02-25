import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaList } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { TbPasswordFingerprint } from "react-icons/tb";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { user_reset } from "../store/Reducers/authReducerSlice";
import { reset_count } from "../store/Reducers/cardReducerSlice";

export default function Dashboard() {
  const [filterShow, setFilterShow] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = async () => {
    try {
      await api.get('/customer/logout')
      localStorage.removeItem('customerToken')
      dispatch(user_reset())
      dispatch(reset_count())
      navigate('/login')
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-slate-200 mt-5">
        <div className="w-[90%] mx-auto md-lg:block hidden">
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center py-3 px-3 bg-green-500 text-white"
            >
              <FaList />
            </button>
          </div>
        </div>
        <div className="h-full mx-auto">
          <div className="py-5 flex md-lg:w-[90%] mx-auto relative">
            <div
              className={`rounded-md z-50 md-lg:absolute ${filterShow ? "-left-4" : "-left-[360px]"} w-[270px] ml-4 bg-white`}
            >
              <ul className="py-2 text-slate-600 px-4">
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-lg">
                    <FaTachometerAlt />
                  </span>
                  <Link to="/dashboard" className="block">
                    Dashboard
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-lg">
                    <FaCartArrowDown />
                  </span>
                  <Link to="/dashboard/my-orders" className="block">
                    My Order
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-lg">
                    <FaHeart />
                  </span>
                  <Link to="/dashboard/my-whishlist" className="block">
                    Wishlist
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-lg">
                    <IoChatbubbleEllipses />
                  </span>
                  <Link to="/dashboard/chat" className="block">
                    Chat
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-lg">
                    <TbPasswordFingerprint />
                  </span>
                  <Link to="/dashboard/change-password" className="block">
                    Change Password
                  </Link>
                </li>
                <li
                  onClick={logout}
                  className="flex justify-start items-center gap-2 py-2 cursor-pointer"
                >
                  <span className="text-lg">
                    <IoMdLogOut />
                  </span>
                  <div className="block">Logout</div>
                </li>
              </ul>
            </div>

            <div className="w-[calc(100%-270px)] md-lg:w-full">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
