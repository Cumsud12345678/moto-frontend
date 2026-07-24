import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { detail } from '../../../constants/devData/detail'
import { user } from '../../../constants/devData/user'
import axios from 'axios'

const initialState = {
  maxVisible: 5,
  activeImageIndex: 0,

  prId: null,
  loading: true,
  success: true,
  message: null,

  details: [],
  similarProducts: []
}

export const getDetails = createAsyncThunk('details', async (id, thunkAPI) => {
  try{
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/products/details/similer/${id}`, 
      { withCredentials: true }
    )
    
    return res.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.prId = action.payload
    },
    increment: (state, action) => {
      if(state.activeImageIndex == action.payload.length - 1){
        state.activeImageIndex = -1
      }
      state.activeImageIndex = state.activeImageIndex + 1
    },
    decrement: (state, action) => {
      if(state.activeImageIndex == 0){
        state.activeImageIndex = action.payload.length
      }
      state.activeImageIndex = state.activeImageIndex - 1
    },
    setActiveImage: (state, action) => {
      state.activeImageIndex = action.payload
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.details = action.payload.details
        state.similarProducts = action.payload.similarProducts
        state.loading = false
        state.success = true
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.loading = false
        state.success = false,
        state.message = action.payload?.message
      })
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setActiveImage, setId } = productDetailsSlice.actions

export default productDetailsSlice.reducer