import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuth } from '../authSlice'

const API = import.meta.env.VITE_API_URL

const initialState = {
  loading: false,
  message: null,
  success: null,

  id: null,
  name: null,
  phone: null,

  registerPhone: null,
  loginPhone: null,

  step: 'register', // register | verify
  stepLogin: 'login',

  logoutState: false
}

export const register = createAsyncThunk(
  'user/register',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/api/users/register`, {
        name: data.name,
        phone: data.phone
      })

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

export const registerVerify = createAsyncThunk(
  'user/registerVerify',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API}/api/users/register/verify`, 
        { phone: data.phone, otp: data.otp },
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)


export const login = createAsyncThunk(
  'user/login',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/api/users/login`, {
        phone: data
      })

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  } 
)

export const loginVerify = createAsyncThunk(
  'user/loginValidate',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API}/api/users/login/verify`, 
        { phone: data.phone, otp: data.otp},
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)


export const logout = createAsyncThunk(
  'user/logour',
  async (_, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/users/logout`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.message)
    }
  }
)



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPhone: (state, action) => {
      const {type, phone} = action.payload
      state[type] = phone
    },
    resetMessage: (state) => {
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder

      // REGISTER START
      .addCase(register.pending, (state) => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload?.message
        state.success = action.payload.success
        state.step = 'verify'
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.message = action.payload?.message
        state.success = action.payload.success
      })

      // VERIFY
      .addCase(registerVerify.pending, (state) => {
        state.loading = true
      })
      .addCase(registerVerify.fulfilled, (state, action) => {
        state.loading = false
        state.id = action.payload.id
        state.name = action.payload.name
        state.phone = action.payload.phone
        state.step = 'done'
        state.success = action.payload.success
      })
      .addCase(registerVerify.rejected, (state, action) => {
        state.loading = false
        state.message = action.payload?.message
        state.success = action.payload.success
      })



      // LOGIN START
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload?.message
        state.success = action.payload.success
        state.stepLogin = 'verify'
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.message = action.payload?.message
        state.success = action.payload.success
      })

      // VERIFY
      .addCase(loginVerify.pending, (state) => {
        state.loading = true
      })
      .addCase(loginVerify.fulfilled, (state, action) => {
        state.loading = false
        state.id = action.payload.id
        state.name = action.payload.name
        state.phone = action.payload.phone
        state.stepLogin = 'done'
        state.success = action.payload.success
      })
      .addCase(loginVerify.rejected, (state, action) => {
        state.loading = false
        state.message = action.payload?.message
        state.success = action.payload.success
      })


      // LOGOUT
      .addCase(logout.fulfilled, (state, action) => {
        state.logoutState = true
        state.message = action.payload?.message
        state.id = null
        state.name = null
        state.phone = null
        state.step = 'register'
        state.stepLogin = 'login'
        state.registerPhone = null
        state.loginPhone = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutState = false
        state.message = action.payload?.message
      })
  }
})

export const { setPhone, resetMessage } = userSlice.actions
export default userSlice.reducer