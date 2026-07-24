import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL

const initialState = {
  isAuth: false,
  id: null,
  name: null,
  phone: null,
  profile: null,
  loading: true
}

export const checkMe = createAsyncThunk(
  'user/checkMe', 
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API}/api/users/me`,
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const {isAuth, id, name, phone} = action.payload
      state.isAuth = isAuth
      state.id = id
      state.name = name
      state.phone = phone
    },
    updateUserData: (state, action) => {
      state.name = action.payload.name
      state.profile = action.payload.profile
      state.id = action.payload._id
      state.phone = action.payload.phone
      state.isAuth = true
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkMe.fulfilled, (state, action) => {
        state.isAuth = true
        state.id = action.payload.user.id
        state.name = action.payload.user.name
        state.phone = action.payload.user.phone
        state.profile = action.payload.user.profile
        state.loading = false
      })
      .addCase(checkMe.rejected, (state, action) => {
        state.isAuth = false
        state.id = null
        state.name = null
        state.phone = null
        state.profile = null
        state.loading = false
      })
  }
})

// Action creators are generated for each case reducer function
export const { setAuth, updateUserData } = authSlice.actions

export default authSlice.reducer