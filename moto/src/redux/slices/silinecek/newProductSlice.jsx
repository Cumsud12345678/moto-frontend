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

  success: true,
  loading: true
}

export const getFilterData = createAsyncThunk('data', async (_, thunkAPI) => {
  try{
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/products/filter/options`,
      { withCredentials: true }
    )

    return res.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
  
})

export const setProduct  = createAsyncThunk('product', async (productData, thunkAPI) => {
  try{
    const formData = new FormData()

    Object.entries(productData).forEach(([key, value]) => {
      if (key !== 'images' && key !== 'equipments') {
        formData.append(key, value)
      }
    })

    productData.images.forEach((img) => {
      formData.append('images', img.file)
    })

    productData.equipments.forEach((eq) => {
      formData.append('equipments', eq)
    })

    console.log(formData)

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/products/create`,
      formData,
      { withCredentials: true }
    )

    return await res.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
  
})

export const newProductSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {
    setSelectedMake: (state, action) => {
      state.models = []
      state.models = top10Model.filter(model => model.makeName == action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilterData.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getFilterData.fulfilled, (state, action) => {
        // console.log(action.payload.data.makes)
        state.makes = action.payload.data.makes
        state.models = action.payload.data.models,
        state.fuels = action.payload.data.fuels,
        state.cities = action.payload.data.cities,
        state.colors = action.payload.data.colors,
        state.speeds = action.payload.data.speeds,
        state.categories = action.payload.data.categories
        state.statuses = action.payload.data.statuses
        state.equipments = action.payload.data.equipments

        state.loading = false,
        state.success = true
      })
      .addCase(getFilterData.rejected, (state) => {
        state.loading = false,
        state.success = false
      })
      
      .addCase(setProduct.fulfilled, (state, action) => {
        state.success = action.payload.success
      })
  }
})

export const { setSelectedMake } = newProductSlice.actions

export default newProductSlice.reducer