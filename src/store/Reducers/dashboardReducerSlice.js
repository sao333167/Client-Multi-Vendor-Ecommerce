import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_dashboard_index_data = createAsyncThunk(
    'dashboard/get_dashboard_index_data',
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/customer/get-dashboard-data/${userId}`)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)



export const dashboardReducerSlice = createSlice({
    name: 'dashboard',
    initialState: {
        loader: false,
        recentOrders: [],
        errorMessage: '',
        successMessage: '',
        totalOrder:0,
        pendingOrder:0,
        cancelledOrder:0,
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_dashboard_index_data.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(get_dashboard_index_data.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(get_dashboard_index_data.fulfilled, (state, { payload }) => {
                state.totalOrder = payload.totalOrder;
                state.pendingOrder = payload.pendingOrder;
                state.cancelledOrder = payload.cancelledOrder;
                state.recentOrders = payload.recentOrders;
                state.loader = false;
                
            })

    }

})
export const { messageClear } = dashboardReducerSlice.actions
export const dashboardReducer = dashboardReducerSlice.reducer;