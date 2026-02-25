
import { authReducer } from "./Reducers/authReducerSlice";
import { cardReducer } from "./Reducers/cardReducerSlice";
import { chatReducer } from "./Reducers/chatReducerSlice";
import { dashboardReducer } from "./Reducers/dashboardReducerSlice";
import { homeReducer } from "./Reducers/homeReducerSlice";
import { orderReducer } from "./Reducers/orderReducerSlice";


const rootReducer = {
    home: homeReducer,
    auth: authReducer,
    chat: chatReducer,
    card: cardReducer,
    order: orderReducer,
    dashboard: dashboardReducer,
}

export default rootReducer;