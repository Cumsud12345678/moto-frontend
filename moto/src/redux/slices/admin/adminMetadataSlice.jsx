import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const API = import.meta.env.VITE_API_URL

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
}

export const getMetadata = createAsyncThunk(
  'admin/getMetadata',
  async (_, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/metadata`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const createMetadata = createAsyncThunk(
  'admin/createMetadata',
  async (data, thunkAPI) => {
    try{
      const res = await axios.post(
        `${API}/api/admin/metadata`,
        data,
        { withCredentials: true }
      )

      return data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const deleteMetadata = createAsyncThunk(
  'admin/deleteMetadata', 
  async (data, thunkAPI) => {
    try{
      const res = await axios.delete(
        `${API}/api/admin/metadata`,
        {
          withCredentials: true,
          data: { data: data }
        }
      )

      return data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const adminMetadataSlice = createSlice({
  name: 'admin/adminMetadataSlice',
  initialState,
  reducers: {
    setData: (state, action) => {
      const {type, label} = action.payload
      if(type == 'makes&models') {
        state.makes.push({_id: 'Tezedi', label: label, logo: 'Tezedi'})
        const models = JSON.parse(action.payload.models)
        models.map(item => {
          state.models.push({_id: 'Tezedi', label: item, make: {label: label}})
        })
      }else if(type == 'models') {
        const models = JSON.parse(action.payload.models)
        models.map(item => {
          state.models.push({_id: 'Tezedi', label: item, make: {label: label}})
        })
      }else {
        state[type].push({label: label})
      }
    },

    deleteData: (state, action) => {
      const {type, id} = action.payload
      if(type == 'makes') {
        state.makes = state.makes.filter(m => m._id !== id)
        state.models = state.models.filter(m => m.make._id !== id)
      }else {
        state[type] = state[type].filter(m => m._id !== id)
      }
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(getMetadata.fulfilled, (state, action) => {
        state.makes = action.payload.data.make
        state.models = action.payload.data.model,
        state.fuels = action.payload.data.fuel,
        state.cities = action.payload.data.city,
        state.colors = action.payload.data.color,
        state.speeds = action.payload.data.speed,
        state.categories = action.payload.data.category
        state.statuses = action.payload.data.status
        state.equipments = action.payload.data.equipment
      })
  }
})

// Action creators are generated for each case reducer function
export const { setData, deleteData } = adminMetadataSlice.actions

export default adminMetadataSlice.reducer