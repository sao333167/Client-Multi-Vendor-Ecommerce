import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_category = createAsyncThunk(
    'product/get_category',
    async (_, { fulfillWithValue,rejectWithValue }) => {
        try {
            const { data } = await api.get('/home/get-categorys')
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error)
        }
    }
)

export const get_products = createAsyncThunk(
    'product/get_products',
    async (_, { fulfillWithValue,rejectWithValue }) => {
        try {
            const { data } = await api.get('/home/get-products')
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error)
        }
    }
)
export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async (_, { fulfillWithValue,rejectWithValue }) => {
        try {
            const { data } = await api.get('/home/price-range-latest-product')
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
            
        }
    }
)
export const query_products = createAsyncThunk(
    'product/query_products',
    async (query, { fulfillWithValue,rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''} `)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)

export const product_details = createAsyncThunk(
    'product/product_details',
    async (slug, { fulfillWithValue,rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/product-details/${slug}`)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
             return rejectWithValue(error)
        }
    }
)
export const customer_review = createAsyncThunk(
    'review/customer_review',
    async (info, { fulfillWithValue ,rejectWithValue}) => {
        try {
            const { data } = await api.post('/home/customer/submit-review', info)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)
export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async ({productId,pageNumber}, { fulfillWithValue,rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)
export const get_banners = createAsyncThunk(
    'review/get_banners',
    async (_, { fulfillWithValue,rejectWithValue }) => {
        try {
            const { data } = await api.get(`/banners`)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.respone)
            return rejectWithValue(error)
        }
    }
)




export const homeReducerSlice = createSlice({
    name: 'home',
    initialState: {
        loader: false,
        categorys: [],
        products: [],
        totalProduct: 0,
        parPage: 3,
        latest_product: [],
        topRated_product: [],
        discount_product: [],
        priceRange: {
            low: 0,
            high: 100
        },
        product: {},
        relatedProducts: [],
        moreProducts: [],
        successMessage: "",
        errorMessage: "",
        totalReview: 0,
        rating_review:[],
        reviews:[],
        banners:[],
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_category.fulfilled, (state, { payload }) => {
                state.categorys = payload.categorys;
            })
            .addCase(get_products.fulfilled, (state, { payload }) => {
                state.products = payload.products;
                state.latest_product = payload.latest_product;
                state.topRated_product = payload.topRated_product;
                state.discount_product = payload.discount_product;
            })
            .addCase(price_range_product.fulfilled, (state, { payload }) => {
                state.latest_product = payload.latest_product;
                state.priceRange = payload.priceRange;
            })
            .addCase(query_products.fulfilled, (state, { payload }) => {
                state.products = payload.products;
                state.totalProduct = payload.totalProduct;
                state.parPage = payload.parPage;
            })
            .addCase(product_details.fulfilled, (state, { payload }) => {
                state.product = payload.product;
                state.relatedProducts = payload.relatedProducts;
                state.moreProducts = payload.moreProducts;

            })
            .addCase(customer_review.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(customer_review.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(customer_review.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;

            })
            .addCase(get_reviews.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(get_reviews.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(get_reviews.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.totalReview = payload.totalReview; 
                state.rating_review = payload.rating_review; 
                state.reviews = payload.reviews; 

            })
            .addCase(get_banners.pending, (state, { payload }) => {
                state.loader = true;
            })
            .addCase(get_banners.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(get_banners.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.banners = payload.banners; 

            })
    }

})

export const { messageClear } = homeReducerSlice.actions
export const homeReducer = homeReducerSlice.reducer;