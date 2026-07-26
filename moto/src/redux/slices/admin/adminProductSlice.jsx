import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const API = import.meta.env.VITE_API_URL

const initialState = {
  product: [],
  userProducts: [],
  products: [],
  total: 0,
  deletedProducts: [],
  totalDeletedProducts: 0,
  deletedProduct: [],
  productStats: [],
}

export const getProductStats = createAsyncThunk(
  'admin/getProductStats',
  async (_, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/products/stats`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const getProducts = createAsyncThunk(
  'admin/getProducts',
  async (page, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/products?page=${page}`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const getProduct = createAsyncThunk(
  'admin/getProduct',
  async (query, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/products/search${query}`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)


export const getUserProducts = createAsyncThunk(
  'amin/getUserProducts',
  async (id, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/products/user/${id}`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (data, thunkAPI) => {
    try{
      const res = await axios.delete(
        `${API}/api/admin/products/delete/${data.id}`,
        {
          withCredentials: true,
          data: { desc: data.desc },
        }
      )

      return data.id
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const deactiveProduct = createAsyncThunk(
  'admin/deactiveProduct',
  async (id, thunkAPI) => {
    try{
      const res = await axios.put(
        `${API}/api/admin/products/deactive/${id}`,
        {},
        { withCredentials: true }
      )

      return id
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const activeProduct = createAsyncThunk(
  'admin/activeProduct',
  async (id, thunkAPI) => {
    try{
      const res = await axios.put(
        `${API}/api/admin/products/active/${id}`,
        {},
        { withCredentials: true }
      )

      return id
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const getDeletedProducts = createAsyncThunk(
  'admin/getDeletedProducts',
  async (page, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/products/deleted?page=${page}`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const getDeletedProduct = createAsyncThunk(
  'admin/getDeletedProduct',
  async (query, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/products/deleted/search${query}`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const deleteDeletedProduct = createAsyncThunk(
  'admin/deleteDeletedProduct',
  async (id, thunkAPI) => {
    try{
      const res = await axios.delete(
        `${API}/api/admin/products/deleted/${id}`,
        { withCredentials: true }
      )

      return id
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const adminProductSlice = createSlice({
  name: 'admin/productSlice',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder

      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.data.products
        state.total = action.payload.data.total
      })

      .addCase(getUserProducts.fulfilled, (state, action) => {
        state.userProducts = action.payload.data
      })

      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload.data
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        if(state.products.length == 0){
          state.userProducts = state.userProducts.filter(p => p._id !== action.payload)
        }else {
          state.products = state.products.filter(p => p._id !== action.payload)
        }
      })

      .addCase(getProductStats.fulfilled, (state, action) => {
        state.productStats = action.payload.data
      })

      .addCase(getDeletedProducts.fulfilled, (state, action) => {
        state.deletedProducts = action.payload.data.products
        state.totalDeletedProducts = action.payload.data.total
      })

      .addCase(getDeletedProduct.fulfilled, (state, action) => {
        state.deletedProduct = action.payload.data
      })

      .addCase(deleteDeletedProduct.fulfilled, (state, action) => {
        state.deletedProducts = state.deletedProducts.filter(p => p._id !== action.payload)
      })
  }
})

// Action creators are generated for each case reducer function
export const {  } = adminProductSlice.actions

export default adminProductSlice.reducer