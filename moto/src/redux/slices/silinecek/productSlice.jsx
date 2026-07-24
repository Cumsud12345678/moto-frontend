import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { products } from '../../../constants/devData/products'
import axios from 'axios'

const initialState = {
  products: [],
  loading: true,
  success: true,
  message: null
}

export const getProducts = createAsyncThunk('products', async (_, thunkAPI) => {
  try{
    // await new Promise(resolve => setTimeout(resolve, 3000))
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/products/`, 
      { withCredentials: true }
    )
    
    return response.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductData: (state) => {
      state.products = products
      state.loadin = false
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.data
      state.loading = false
      state.success = true
    })
    builder.addCase(getProducts.rejected, (state, action) => {
      state.success = false
      state.message = action.payload?.message
    })
  }
})

// Action creators are generated for each case reducer function
export const { setProductData } = productSlice.actions

export default productSlice.reducer