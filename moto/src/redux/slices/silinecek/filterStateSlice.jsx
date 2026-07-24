import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {

  makes: [],
  originalModels: [],
  fuels: [],
  speeds: [],
  cities: [],
  colors: [],
  categories: [],
  statuses: [],
  modelArr: [],
  equipments: [],

  selectedMake: null,
  selectedModel: null,
  selectedCategory: '6a41390bae0d7c2e537aa41d',
  selectedStatus: '6a426f58031261513cde8f9c',
  selectedFuelType: '6a48ac1fef14ff38de16323a',
  selectedCity: '',
  selectedColor: '6a48abf4ef14ff38de163237',
  selectedSpeedBox: '6a48ad18ef14ff38de163253',
  selectedEquipments: [],
  
  minPrice: null,
  maxPrice: null,
  minYear: null,
  maxYear: null,
  minEngine: null,
  maxEngine: null,
  minVolume: null,
  maxVolume: null,
  minDistance: null,
  maxDistance: null,

  success: true,
  message: null

}

export const getFilterData = createAsyncThunk('data', async (_, thunkAPI) => {
  try{
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/products/filter/options`, 
      { withCredentials: true }
    )
    
    return response.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setMake: (state, action) => {
      state.selectedMake = action.payload
      state.selectedModel = ''
      state.modelArr = state.originalModels.filter((model) => model.make_id == action.payload)
    },
    setElement: (state, action) => {
      const {id, type} = action.payload
      state[type] = id
    },
    setEquipments: (state, action) => {
      console.log(action.payload)
      if(state.selectedEquipments.includes(action.payload)){
        console.log('evet')
        state.selectedEquipments = state.selectedEquipments.filter(eq => eq !== action.payload)
      }else{
        console.log('hayir')
        state.selectedEquipments = [...state.selectedEquipments, action.payload]
      }
    },


    // autos seyfesi ucun
    setFiltersFromURL: (state, action) => {
      const { 
        make, 
        model 
      } = action.payload

      state.selectedMake = make
      state.modelArr = state.originalModels.filter(m => m.make_id == make)

      state.selectedModel = model || ''
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(getFilterData.fulfilled, (state, action) => {
        state.makes = action.payload.data.makes
        state.originalModels = action.payload.data.models,
        state.fuels = action.payload.data.fuels,
        state.cities = action.payload.data.cities,
        state.colors = action.payload.data.colors,
        state.speeds = action.payload.data.speeds,
        state.categories = action.payload.data.categories
        state.statuses = action.payload.data.statuses
        state.equipments = action.payload.data.equipments
        // YENİ: data gələndən sonra modelArr-ı yenidən hesabla
        if (state.selectedMake) {
          state.modelArr = state.originalModels.filter(
            (model) => model.make_id == state.selectedMake
          )
        }

        state.success = true
      })
      .addCase(getFilterData.rejected, (state, action) => {
        console.log(action.payload)
        state.success = false,
        state.message = action.payload?.message 
      })
  }
})

// Action creators are generated for each case reducer function
export const { setMake, setElement, setFiltersFromURL, setEquipments } = filterSlice.actions

export default filterSlice.reducer