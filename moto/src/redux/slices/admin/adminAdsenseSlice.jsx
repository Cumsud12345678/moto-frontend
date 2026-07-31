import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const API = import.meta.env.VITE_API_URL

const initialState = {
  adsenseData: [],

  clickStatus: 'idle'
}

export const getAdsense = createAsyncThunk(
  'admin/getAdsense',
  async (_, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/adsense`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const createAdsense = createAsyncThunk(
  'admin/createAdsense',
  async (data, thunkAPI) => {
    try{
      const res = await axios.post(
        `${API}/api/admin/adsense/create`,
        data,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const clickAdsense = createAsyncThunk(
  'admin/clickAdsense',
  async (id, thunkAPI) => {
    try{
      const res = await axios.put(
        `${API}/api/admin/adsense/${id}`,
        { withCredentials: true }
      )

      return id
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const deleteAdsense = createAsyncThunk(
  'admin/deleteAdsense',
  async (id, thunkAPI) => {
    try{
      const res = await axios.delete(
        `${API}/api/admin/adsense/${id}`,
        { withCredentials: true }
      )

      return id
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const adminAdsenseSlice = createSlice({
  name: 'admin/adminAdsenseSlice',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder

    .addCase(getAdsense.fulfilled, (state, action) => {
      state.adsenseData = action.payload.data
    })

    .addCase(createAdsense.fulfilled, (state, action) => {
      const data = {}
      data._id = action.payload.data._id
      data.image = action.payload.data.image
      data.link = action.payload.data.link
      data.click = 0
      data.owner = action.payload.data.owner
      state.adsenseData = state.adsenseData.push(data)
    })

    .addCase(clickAdsense.pending, (state) => {
      state.clickStatus = 'idle'
    })
    .addCase(clickAdsense.fulfilled, (state, action) => {
      state.clickStatus = 'success'
    })

    .addCase(deleteAdsense.fulfilled, (state, action) => {
      state.adsenseData = state.adsenseData.filter(ads => ads._id !== action.payload)
    })

  }
  
})

// Action creators are generated for each case reducer function
export const {  } = adminAdsenseSlice.actions

export default adminAdsenseSlice.reducer