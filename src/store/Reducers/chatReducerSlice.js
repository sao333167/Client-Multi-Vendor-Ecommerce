import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const add_friend = createAsyncThunk(
    'chat/add_friend',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/chat/customer/add-customer-friend`, info)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)
export const send_message = createAsyncThunk(
    'chat/send_message',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/chat/customer/send-message-to-seller`, info)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)



export const chatReducerSlice = createSlice({
    name: 'chat',
    initialState: {
        loader: false,
        my_friends:[],
        fd_messages:[],
        currentFd:"",
        errorMessage: '',
        successMessage: '',
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""

        },
        updateMessage: (state, {payload}) => {
            state.fd_messages = [...state.fd_messages,payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_friend.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(add_friend.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(add_friend.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.fd_messages = Array.isArray(payload.messages) ? payload.messages : [];
                state.currentFd = payload.currentFd;
                state.my_friends = payload.MyFriends;
            })
            .addCase(send_message.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(send_message.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(send_message.fulfilled, (state, { payload }) => {
                state.loader = false;
                let tempFriends = state.my_friends
                let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId)
                while(index > 0) {
                let temp = tempFriends[index]
                tempFriends[index] = tempFriends[index - 1]
                tempFriends[index - 1] = temp
                index--
                }
                state.my_friends = tempFriends;
                state.fd_messages = [...state.fd_messages, payload.message];
                state.successMessage = 'Message Send Success';
            })
        

    }

})
export const { messageClear,updateMessage } = chatReducerSlice.actions
export const chatReducer = chatReducerSlice.reducer;