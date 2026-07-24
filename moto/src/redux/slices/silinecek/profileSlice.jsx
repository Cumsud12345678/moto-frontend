import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSelector } from 'react-redux'
const API = import.meta.env.VITE_API_URL

const initialState = {
  products: [],
  success: true,
  errorMessage: '',
  loading: false,

  updateUser: false
}

export const getMyProducts = createAsyncThunk('getMyProducts', async ({id, thunkAPI}) => {
  try{
    const res = await axios.get(
      `${API}/api/products/user/${id}`,
      { withCredentials: true }
    )

    return res.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})

export const deleteProduct = createAsyncThunk('Delete', async ({id, token}) => {
  const res = await axios.delete(
    `${API}/api/products/delete/${id}`, 
    { withCredentials: true }
  )
  return res.data
})

export const updatedUser = createAsyncThunk('updateUser', async (data, thunkAPI) => {
  try {
    const { id } = thunkAPI.getState().auth
    const res = await axios.put(
      `${API}/api/users/${id}`,
      data,
      { withCredentials: true }
    )

    return res.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data)
  }
})

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(getMyProducts.pending, (state) => {
        state.loading = true
      })  
      .addCase(getMyProducts.fulfilled, (state, action) => {
        state.products = action.payload.data
        state.success = true
        state.loading = false
      })
      .addCase(getMyProducts.rejected, (state, action) => {
        state.success = true
        state.loading = false
        state.errorMessage = action.payload?.message
      })

      .addCase(deleteProduct.pending, (state) => {
        // istəsən loading əlavə edə bilərsən
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedId = action.meta.arg.id  // ← dispatch-ə göndərdiyimiz id
        state.products = state.products.filter(p => p._id !== deletedId)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.success = false
        state.errorMessage = action.error.message
      })

      // .addCase(updatedUser.fulfilled, (state) => {
      //   state.updateUser = true

      // })
      // .addCase(updatedUser.rejected, (state, action) => {
      //   state.updateUser = false
      //   state.errorMessage = 'Bir xeta bas verdi'
      // })
      
  }
})

export const { } = profileSlice.actions

export default profileSlice.reducer