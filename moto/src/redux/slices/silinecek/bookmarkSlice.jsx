import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Cookies from "js-cookie";
const API = import.meta.env.VITE_API_URL

const initialState = {
  favorites: [],
  products: [],
  success: true,
  loading: true,
  message: null,

  deleteId: null
}

// KAYIT OLMAYAN USERLER UCUN
export const getBookmarksCookie = createAsyncThunk('user/bookmarksCookie', async (favorites, thunkAPI) => {
  try{
    console.log(favorites)
    const res = await axios.post(
      `${API}/api/products/bookmarks`,
      {favorites}
    )

    return res.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
  
})

// KAYIT OLAN USERLER UCUN
export const setBookmark = createAsyncThunk('user/setBookmark', async (data, thunkAPI) => {
  try{
    const res = await axios.post(
      `${API}/api/users/favorites`,
      {data},
      { withCredentials: true }
    )
    return { data, res: res.data }
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})

export const deleteBookmark = createAsyncThunk('user/deleteBookmark', async (id, thunkAPI) => {
  try{
    const res = await axios.delete(
      `${API}/api/users/favorites/${id}`,
      { withCredentials: true }
    )

    return id
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})

export const getBookmarks = createAsyncThunk('user/getBookmark', async (data, thunkAPI) => {
  try{
    const res = await axios.get(
      `${API}/api/users/favorites`,
      { withCredentials: true }
    )

    return res.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})


export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setCookie(state, action) {
      if(action.payload){
        console.log('1')
        state.favorites = action.payload
      }else{
        console.log('2')
        state.favorites = JSON.parse(Cookies.get('favorites') || '[]')
      }
    },
    removeBookmark(state, action) {
      const id = action.payload
      state.deleteId = id
      state.favorites = state.favorites.filter(fav => fav !== id)
      state.products = state.products.filter(p => p._id !== id)
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBookmarksCookie.pending, (state) => {
        state.loading = true
      })
      .addCase(getBookmarksCookie.fulfilled, (state, action) => {
        state.products = action.payload.data
        console.log(state.products)
        state.success = true,
        state.loading = false
      })
      .addCase(getBookmarksCookie.rejected, (state, action) => {
        state.message = action.payload?.message
        state.loading = false
        state.success = false
      })


      .addCase(setBookmark.fulfilled, (state, action) => {
        const { data } = action.payload
        if (Array.isArray(data)) {
          state.favorites.push(...data)
        } else {
          state.favorites.push(data)
        }
        state.success = true
      })
      .addCase(setBookmark.rejected, (state, action) => {
        state.success = false
        state.message = action.message
      })


      .addCase(getBookmarks.pending, (state) => {
        state.loading = true
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.products = action.payload.data
        state.favorites = action.payload.data.map(p => p.product._id)
        console.log(state.favorites)
        state.success = true
        state.loading = false
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.success = false
        state.loading = false
        state.message = action.payload?.message
      })

      
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const id = action.payload
        state.products = state.products.filter(pr => pr.product._id !== id)
        state.favorites = state.favorites.filter(p => p !== id)
        console.log(state.favorites)
        state.success = true
        state.loading = false
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.success = false
        state.loading = false
        state.message = action.payload?.message
      })

  }
})

// Action creators are generated for each case reducer function
export const { setCookie, removeBookmark } = bookmarkSlice.actions

export default bookmarkSlice.reducer