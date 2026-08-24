import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Cookies from "js-cookie";
const API = import.meta.env.VITE_API_URL

const initialState = {
  favoritesNotLogin: [],
  favorites: [],

  favoritesNotLoginStatus: 'idle',
  favoritesStatus: 'idle',
}

// KAYIT OLMAYAN USERLER UCUN
export const getFavoritesNotLogin = createAsyncThunk(
  'favorites/getFavoritesNotLogin', 
  async (favorites, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API}/api/favorites/not/login`,
        { favorites }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

// KAYIT OLAN USERLER UCUN
export const setFavorites = createAsyncThunk(
  'favorites/setFavorites', 
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API}/api/favorites`,
        { data },
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const deleteFavorites = createAsyncThunk(
  'favorites/deleteFavorites', 
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${API}/api/favorites/${id}`,
        { withCredentials: true }
      )

      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const getFavorites = createAsyncThunk(
  'favorites/getFavorites', 
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API}/api/favorites`,
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)


export const favoritesSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder

      .addCase(getFavoritesNotLogin.fulfilled, (state, action) => {
        state.favoritesNotLogin = action.payload.data
        state.favoritesNotLoginStatus = 'success'
      })

      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload.data
        state.favoritesStatus = 'success'
      })

  }
})

// Action creators are generated for each case reducer function
export const {  } = favoritesSlice.actions

export default favoritesSlice.reducer