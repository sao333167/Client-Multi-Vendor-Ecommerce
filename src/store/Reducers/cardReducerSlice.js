import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const add_to_card = createAsyncThunk(
    'card/add_to_card',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/home/product/add-to-card`, info)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)
export const get_card_products = createAsyncThunk(
    'card/get_card_products',
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/product/get-card-product/${userId}`)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)

export const delete_card_product = createAsyncThunk(
    'card/delete_card_product',
    async (card_Id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/home/product/delete-card-product/${card_Id}`)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)

export const quantity_inc = createAsyncThunk(
    'card/quantity_inc',
    async (card_Id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/home/product/quantity-inc/${card_Id}`)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)
export const quantity_dec = createAsyncThunk(
    'card/quantity_dec',
    async (card_Id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/home/product/quantity-dec/${card_Id}`)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)
export const add_to_wishlist = createAsyncThunk(
    'card/add_to_wishlist',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/home/product/add-to-wishlist`, info)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)
export const get_wishlist_products = createAsyncThunk(
    'card/get_wishlist_products',
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/product/get-wishlist-products/${userId}`)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)
export const remove_wishlist_product = createAsyncThunk(
    'card/remove_wishlist_product',
    async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/home/product/remove-wishlist-product/${wishlistId}`)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)





export const cardReducerSlice = createSlice({
    name: 'card',
    initialState: {
        loader: false,
        card_products : [],
        card_product_count:0,
        wishlist_count:0,
        wishlist:[],
        price:0,
        errorMessage: '',
        successMessage: '',
        shipping_fee:0,
        outofstock_products:[],
        buy_product_item: 0,
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""

        },
        reset_count: (state,_) => {
            state.card_product_count = 0
            state.wishlist_count = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_to_card.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(add_to_card.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(add_to_card.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.card_product_count = state.card_product_count + 1
                state.loader = false;
            })
            .addCase(get_card_products.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(get_card_products.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(get_card_products.fulfilled, (state, { payload }) => {
                state.card_products = payload.card_products;
                state.price = payload.price;
                state.card_product_count = payload.card_product_count
                state.shipping_fee = payload.shipping_fee;
                state.outofstock_products = payload.outOfStockProduct;
                state.buy_product_item = payload.buy_product_item
                state.loader = false;
            })
            .addCase(delete_card_product.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(delete_card_product.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(delete_card_product.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.loader = false;
            })
            .addCase(quantity_inc.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(quantity_inc.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(quantity_inc.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.loader = false;
            })
            .addCase(quantity_dec.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(quantity_dec.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(quantity_dec.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.loader = false;
            })
            .addCase(add_to_wishlist.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(add_to_wishlist.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(add_to_wishlist.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.loader = false;
                state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count + 1 : 1
            })
            .addCase(get_wishlist_products.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(get_wishlist_products.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(get_wishlist_products.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.wishlist_count = payload.wishlistCount
                state.wishlist = payload.wishlists
            })
            .addCase(remove_wishlist_product.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.wishlist = state.wishlist.filter(p => p._id !== payload.wishlistId)
                state.wishlist_count = state.wishlist_count - 1
            })
            

    }

})
export const { messageClear,reset_count } = cardReducerSlice.actions
export const cardReducer = cardReducerSlice.reducer;