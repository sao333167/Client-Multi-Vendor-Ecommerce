import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Card from "./pages/Card";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { get_category } from "./store/Reducers/homeReducerSlice";
import CategoryShop from "./pages/CategoryShop";
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/ProtectUser";
import IndexPage from './components/dashboard/IndexPage';
import Orders from "./components/dashboard/Orders";
import ChangePassword from "./components/dashboard/ChangePassword";
import Wishlist from "./components/dashboard/Wishlist";
import OrderDetail from "./components/dashboard/OrderDetail";
import Chat from "./components/dashboard/Chat";
import ConfirmOrder from "./pages/ConfirmOrder";

function App() {
const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_category())
    },[dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/shops' element={<Shops/>} />
        <Route path='/card' element={<Card/>} />
        <Route path='/shipping' element={<Shipping/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/products?' element={<CategoryShop/>} />
        <Route path='/products/search?' element={<SearchProducts/>} />
        <Route path='/product/details/:slug' element={<Details/>} />
        <Route path='/order/confirm?' element={<ConfirmOrder/>} />

        <Route path="/dashboard" element={<ProtectUser/>} >
            <Route path="" element={<Dashboard/>} >
              <Route path="" element={<IndexPage/>} />
              <Route path="my-orders" element={<Orders/>} />
              <Route path="change-password" element={<ChangePassword/>} />
              <Route path="my-whishlist" element={<Wishlist/>} />
              <Route path="order/details/:orderId" element={<OrderDetail/>} />
              <Route path="chat" element={<Chat/>} />
              <Route path="chat/:sellerId" element={<Chat/>} />
            </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
