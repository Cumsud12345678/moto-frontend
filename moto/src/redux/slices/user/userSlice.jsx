import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL

const initialState = {
  id: null,
  name: null,
  phone: null,
  profile: null,
  isAuth: false,
  role: null,

  registerMessage: null,
  loginMessage: null,
  logoutMessage: null,
  updateMessage: null,

  authStatus: 'idle',
  registerStatus: 'idle',
  loginStatus: 'idle',
  logoutStatus: 'idle',
  updateStatus: 'idle',

  stepRegister: 'register',
  stepLogin: 'login'
}

// CHECK ME
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


// REGISTER
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


// REGISTER VERIFY
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


// LOGIN
export const login = createAsyncThunk(
  'user/login',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API}/api/users/login`, 
        { phone: data }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  } 
)


// LOGIN VERIFY
export const loginVerify = createAsyncThunk(
  'user/loginVerify',
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


// LOGOUT
export const logout = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/users/logout`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)


// UPDATE USER
export const updatedUser = createAsyncThunk(
  'user/updateUser', 
  async (data, thunkAPI) => {
    try {
      const { id } = thunkAPI.getState().user
      console.log(id)
      const res = await axios.put(
        `${API}/api/users/${id}`,
        data,
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)


export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder

      // CHECK ME
      .addCase(checkMe.fulfilled, (state, action) => {
        state.id = action.payload.user.id
        state.name = action.payload.user.name
        state.phone = action.payload.user.phone
        state.profile = action.payload.user.profile
        state.role = action.payload.user.role
        state.isAuth = true
        state.authStatus = 'success'
      })
      .addCase(checkMe.rejected, (state, action) => {
        state.isAuth = false
        state.id = null
        state.name = null
        state.phone = null
        state.profile = null
        state.role = null
        state.authStatus = 'error'
      })

      // REGISTER
      .addCase(register.fulfilled, (state, action) => {
        state.registerMessage = action.payload?.message
        state.registerStatus = 'loading'
        state.stepRegister = 'verify'
      })
      .addCase(register.rejected, (state, action) => {
        state.registerMessage = action.payload?.message
        state.registerStatus = 'error'
      })

      // REGISTER VERIFY
      .addCase(registerVerify.fulfilled, (state, action) => {
        state.id = action.payload.id
        state.name = action.payload.name
        state.phone = action.payload.phone
        state.profile = action.payload.profile
        state.role = action.payload.role
        state.isAuth = true
        state.stepRegister = 'done'
        state.registerStatus = 'success'
      })
      .addCase(registerVerify.rejected, (state, action) => {
        state.registerMessage = action.payload?.message
        state.registerStatus = 'error'
      })

      // LOGIN
      .addCase(login.fulfilled, (state, action) => {
        state.loginMessage = action.payload?.message
        state.loginStatus = 'loading'
        state.stepLogin = 'verify'
      })
      .addCase(login.rejected, (state, action) => {
        state.loginMessage = action.payload?.message
        state.loginStatus = 'error'
      })

      // LOGIN VERIFY
      .addCase(loginVerify.fulfilled, (state, action) => {
        state.id = action.payload.id
        state.name = action.payload.name
        state.phone = action.payload.phone
        state.profile = action.payload.profile
        state.role = action.payload.role
        state.isAuth = true
        state.stepLogin = 'done'
        state.loginStatus = 'success'
      })
      .addCase(loginVerify.rejected, (state, action) => {
        state.loginMessage = action.payload?.message
        state.loginStatus = 'error'
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state, action) => {
        state.logoutStatus = 'success'
        state.id = null
        state.name = null
        state.phone = null
        state.profile = null
        state.role = null
        state.isAuth = false

        state.stepRegister = 'register'
        state.stepLogin = 'login'
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = 'error'
        state.logoutMessage = action.payload?.message
      })

      // UPDATE
      .addCase(updatedUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.name = action.payload.data.name
        state.profile = action.payload.data.profile
        state.updateStatus = 'success'
      })
      .addCase(updatedUser.rejected, (state, action) => {
        state.updateStatus = 'error'
        state.updateMessage = action.payload?.message
      })

  }
})

// Action creators are generated for each case reducer function
export const {  } = userSlice.actions

export default userSlice.reducer