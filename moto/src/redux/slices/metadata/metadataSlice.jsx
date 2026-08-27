import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  makes: [],
  models: [],
  fuels: [],
  speeds: [],
  cities: [],
  colors: [],
  categories: [],
  statuses: [],
  equipments: [],

  reqStatus: 'idle'
}

export const getMetadata = createAsyncThunk(
  'metadata/getMetadata', 
  async (_, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products/metadata`,
        { withCredentials: true }
      )

      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder

      .addCase(getMetadata.pending, (state) => {
        state.reqStatus = 'idle'
      })
      .addCase(getMetadata.fulfilled, (state, action) => {
        state.makes = action.payload.data.makes
        state.models = action.payload.data.models,
        state.fuels = action.payload.data.fuels,
        state.cities = action.payload.data.cities,
        state.colors = action.payload.data.colors,
        state.speeds = action.payload.data.speeds,
        state.categories = action.payload.data.categories
        state.statuses = action.payload.data.statuses
        state.equipments = action.payload.data.equipments
        state.reqStatus = 'success'
      })
  }
})

// Action creators are generated for each case reducer function
export const {  } = metadataSlice.actions

export default metadataSlice.reducer