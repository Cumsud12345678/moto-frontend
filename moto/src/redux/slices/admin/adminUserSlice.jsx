import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const API = import.meta.env.VITE_API_URL

const initialState = {
  user: [],
  users: [],
  total: 1,
  stats: [],
  deletedUsers: [],
  warningCount: null
}

export const getUserStats = createAsyncThunk(
  'admin/getUserStats',
  async (_, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/users/stats`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (page, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/users?page=${page}`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const getUser = createAsyncThunk(
  'admin/getUser',
  async (query, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/users/search${query}`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async(data, thunkAPI) => {
    console.log(data)
    try{
      const res = await axios.delete(
        `${API}/api/admin/users/${data.id}`,
        { 
          withCredentials: true,
          data: { desc: data.desc },
        }
      )

      return data.id
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const warnUser = createAsyncThunk(
  'admin/warnUser',
  async(id, thunkAPI) => {
    try{
      const res = await axios.put(
        `${API}/api/admin/users/warning/${id}`,
        {},
        { withCredentials: true }
      )

      return id
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const lockUser = createAsyncThunk(
  'admin/lockUser',
  async(id, thunkAPI) => {
    try{
      const res = await axios.put(
        `${API}/api/admin/users/lock/${id}`,
        {},
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const unlockUser = createAsyncThunk(
  'admin/unlockUser',
  async (id, thunkAPI) => {
    try{
      const res = await axios.put(
        `${API}/api/admin/users/unlock/${id}`,
        {},
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const resetWarning = createAsyncThunk(
  'admin/resetWarning',
  async (id, thunkAPI) => {
    try{
      const res = await axios.put(
        `${API}/api/admin/users/reset/warning/${id}`,
        {},
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const getDeletedUsers = createAsyncThunk(
  'admin/getDeletedUsers',
  async (_, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/admin/users/deleted`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const deleteDeletedUser = createAsyncThunk(
  'admin/deleteDeletedUser',
  async (id, thunkAPI) => {
    try{
      const res = await axios.delete(
        `${API}/api/admin/users/deleted/${id}`,
        { withCredentials: true }
      )

      return id
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const adminUserSlice = createSlice({
  name: 'admin/userSlice',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder

      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.data.users
        state.total = action.payload.data.total
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload)
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data
      })

      .addCase(getUserStats.fulfilled, (state, action) => {
        state.stats = action.payload.data
      })

      .addCase(getDeletedUsers.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.deletedUsers = action.payload.data
      })

      .addCase(deleteDeletedUser.fulfilled, (state, action) => {
        state.deletedUsers = state.deletedUsers.filter(u => u._id !== action.payload)
      })
  }
})

// Action creators are generated for each case reducer function
export const {  } = adminUserSlice.actions

export default adminUserSlice.reducer