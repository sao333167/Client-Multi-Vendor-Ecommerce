import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get_orders } from "../../store/Reducers/orderReducerSlice";

export default function Orders() {
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders } = useSelector((state) => state.order);
  const [state, setState] = useState("all");
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(get_orders({ status: state, customerId: userInfo.id }));
  }, [dispatch, orderId, state, userInfo.id]);


  const redirect = (ord) => {
    
    let items = 0;
    for (let i = 0; i < ord.length; i++) {
      items = ord.products[i].quantity + items;
    }
    navigate("/payment", {
      state: {
        price: ord.price,
        items,
        orderId: ord._id,
      },
    });
  };


  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-slate-600">My Orders</h2>
        <select
          name=""
          id=""
          className="outline-none border px-3 py-1 rounded-md text-slate-600"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">--Order status--</option>
          <option value="placed">Placed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>
      <div className="pt-4">
        <div className="relative overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o, i) => (
                <tr key={i} className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    #{o._id}
                  </th>
                  <td className="px-6 py-4 whitespace-nowrap">${o.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {o.payment_status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {o.delivery_status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/dashboard/order/details/${o._id}`}>
                      <span className="bg-green-200 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                        Veiw
                      </span>
                    </Link>
                    {o.payment_status !== "paid" && (
                      <span
                        onClick={() => redirect(o)}
                        className="bg-green-200 text-md font-semibold mr-2 px-3 py-[2px] rounded cursor-pointer"
                      >
                        Pay Now
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
