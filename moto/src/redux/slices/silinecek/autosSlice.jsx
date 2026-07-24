import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products: [],
  success: true,
  loading: true,
  message: null
}

export const getFilteredData = createAsyncThunk(
  'filteredData', 
  async (query, thunkAPI) => {
    try{
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products/autos${query}`
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const autosSlice = createSlice({
  name: 'autos',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFilteredData.pending, (state) => {
        state.loading = true
        state.products = []
      })
      .addCase(getFilteredData.fulfilled, (state, action) => {
        state.products = action.payload.data
        state.success = true
        state.loading = false
      })
      .addCase(getFilteredData.rejected, (state, action) => {
        state.success = false
        state.message = action.payload?.message
      })
  }
})

// Action creators are generated for each case reducer function
export const {  } = autosSlice.actions

export default autosSlice.reducer