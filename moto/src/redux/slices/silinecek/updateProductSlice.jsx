import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  fuels: [],
  speeds: [],
  cities: [],
  colors: [],
  equipments: [],

  details: [],

  success: true,
  loading: true
}

export const getFilterData = createAsyncThunk('update/data', async (_, thunkAPI) => {
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

export const getDetails = createAsyncThunk('update/details', async (id, thunkAPI) => {
  try{
    console.log('isdek atilir')
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/products/details/${id}`,
      { withCredentials: true }
    )

    return res.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})

export const setProduct = createAsyncThunk('product', async (productData, thunkAPI) => {
  try {
    const formData = new FormData()

    Object.entries(productData).forEach(([key, value]) => {
      if (key !== 'newImages' && key !== 'remainingOldImages' && key !== 'equipments') {
        formData.append(key, value)
      }
    })

    // köhnə (saxlanılan) şəkillərin URL-lərini array kimi göndər
    productData.remainingOldImages.forEach((url) => {
      formData.append('remainingOldImages', url)
    })

    // yeni əlavə olunan faylları göndər
    productData.newImages.forEach((file) => {
      formData.append('newImages', file)
    })

    productData.equipments.forEach((eq) => {
      formData.append('equipments', eq)
    })

    const res = await axios.put(   // ⚠️ create yox, UPDATE — put/patch olmalıdır
      `${import.meta.env.VITE_API_URL}/api/products/update/${productData.id}`, // id lazımdır
      formData,
      { withCredentials: true }
    )

    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})


export const updateProductSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilterData.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getFilterData.fulfilled, (state, action) => {
        // console.log(action.payload.data.makes)
        state.fuels = action.payload.data.fuels.filter(f => f.label !== 'Hamisi'),
        state.cities = action.payload.data.cities.filter(ci => ci.label !== 'Hamisi'),
        state.colors = action.payload.data.colors.filter(c => c.label !== 'Hamisi'),
        state.speeds = action.payload.data.speeds.filter(s => s.label !== 'Hamisi'),
        state.equipments = action.payload.data.equipments.filter(e => e.label !== 'Hamisi')
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

      .addCase(getDetails.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.details = action.payload.data
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.success = false
      })
  }
})

export const {  } = updateProductSlice.actions

export default updateProductSlice.reducer