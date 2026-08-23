import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL

const initialState = {
  products: [],
  productsPage: 1,
  productsHasMore: true,
  selectedProduct: [],
  similarProducts: [],

  filteredProducts: [],
  totalFilteredProducts: null,

  userProducts: [],
  userActiveProducts: [],
  userDeactiveProducts: [],

  systemMessages: [],

  productsStatus: 'idle',
  detailsStatus: 'idle',
  similarStatus: 'idle',
  filteredStatus: 'idle',
  userStatus: 'idle',
  deleteStatus: 'idle',
  updateStatus: 'idle',
  systemMessagesStatus: 'idle',

  productsCache: {},
  similarCache: {},

  ids: null,
  message: null
}

// GET ALL PRODUCTS
export const getAllProducts = createAsyncThunk(
  'product/getAllProducts', 
  async (page = 1, thunkAPI) => {
    try{
      const response = await axios.get(
        `${API}/api/products/?page=${page}&limit=8`, 
        { withCredentials: true }
      )
    
      return { ...response.data, page }
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  } 
)

// PRODUCT DETAILS
export const getProductDetails = createAsyncThunk(
  'product/getProductDetails', 
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API}/api/products/details/${id}`,
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

// PRODUCT SIMILARS
export const getSimilarProducts = createAsyncThunk(
  'product/getSimilarProducts', 
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API}/api/products/similars/${id}`,
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

// CLICK PRODUCT
export const clickProduct = createAsyncThunk(
  'user/clickProduct',
  async (id, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/products/click/${id}`,
        { withCredentials: true }
      )
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

// GET FILTERED PRODUCTS 
export const getFilteredProducts = createAsyncThunk(
  'product/getFilteredProducts',
  async (query, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/products/autos${query}`,
        { withCredentials: true }
      )

      return res.data
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)


// CREATE PRODUCT
export const createProduct  = createAsyncThunk(
  'product/createProduct', 
  async (productData, thunkAPI) => {
    try {
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

      const res = await axios.post(
        `${API}/api/products/create`,
        formData,
        { withCredentials: true }
      )

      return await res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }

  }
)

// USERIN PRODUCTLARIN GETIR
export const getMyProducts = createAsyncThunk(
  'products/getMyProducts', 
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API}/api/products/user/${id}`,
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

// USERIN AKTIV PRODUCTLARIN GETIR
export const getMyActiveProducts = createAsyncThunk(
  'products/getMyActiveProducts', 
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API}/api/products/user/active/${id}`,
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

// USERIN DEAKTIV PRODUCTLARIN GETIR
export const getMyDeactiveProducts = createAsyncThunk(
  'products/getMyDeactiveProducts', 
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API}/api/products/user/deactive/${id}`,
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

// USERIN MESAJLARIN GETIR
export const getMyMessages = createAsyncThunk(
  'products/getMyMessages', 
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API}/api/messages/${id}`,
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

// USERIN PRODUCTIN GETIR
export const getMyProduct = createAsyncThunk(
  'products/getMyProduct', 
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API}/api/products/user/product/${id}`,
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)

// SET ACTIVE PRODUCT
export const setActiveProduct = createAsyncThunk(
  'products/setActiveProduct', 
  async (id, thunkAPI) => {
    try{
      const res = await axios.get(
        `${API}/api/products/actived/${id}`,
        { withCredentials: true }
      )
      return id
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
    
  }
)

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct', 
  async (id, thunkAPI) => {
    try{
      const res = await axios.delete(
        `${API}/api/products/delete/${id}`,
        { withCredentials: true }
      )
    return id
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data)
    }
    
  }
)


// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  'products/updateProduct', 
  async (productData, thunkAPI) => {
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
        `${API}/api/products/update/${productData.id}`, // id lazımdır
        formData,
        { withCredentials: true }
      )

      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data)
    }
  }
)


export const productSlice = createSlice({
  name: 'products',
  initialState,
  // productSlice.js
  reducers: {
    toggleProductLike: (state, action) => {
      const product = state.products.find(p => p._id === action.payload)
      if (product) product.is_liked = !product.is_liked
    }
  },

  extraReducers: (builder) => {
    builder
      // ALL PRODUCTS
      .addCase(getAllProducts.fulfilled, (state, action) => {
        if(action.payload.page === 1){
          state.products = action.payload.data
        } else {
          state.products = [...state.products, ...action.payload.data]
        }
        state.productsHasMore = action.payload.hasMore
        state.productsPage = action.payload.page
        state.productsStatus = 'success'
      })

      .addCase(getAllProducts.rejected, (state, action) => {
        state.message = action.payload?.message
        state.productsStatus = 'error'
      })
    
      // PRODUCT DETAILS
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.selectedProduct = action.payload.data
        state.ids = action.payload.ids
        state.productsCache[action.payload.data._id] = action.payload.data
        state.detailsStatus = 'success'
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.message = action.payload?.message
        state.detailsStatus = 'error'
      })

      // PRODUCT SIMILARS
      .addCase(getSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload.data
        state.similarCache[action.meta.arg] = action.payload.data
        state.similarStatus = 'success'
      })
      .addCase(getSimilarProducts.rejected, (state, action) => {
        state.message = action.payload?.message
        state.similarStatus = 'error'
      })

      // FILTERLENMIS ELANLAR
      .addCase(getFilteredProducts.pending, (state) => {
        state.filteredStatus = 'idle'
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.filteredProducts = action.payload.data
        state.totalFilteredProducts = action.payload.total
        state.filteredStatus = 'success'
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.message = action.payload?.message
        state.filteredStatus = 'error'
      })

      // USERIN ELANI
      .addCase(getMyProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload.data
        state.detailsStatus = 'success'
      })
      .addCase(getMyProduct.rejected, (state, action) => {
        state.message = action.payload?.message
        state.detailsStatus = 'error'
      })

      // ELANI EKTIV ET
      .addCase(setActiveProduct.fulfilled, (state, action) => {
        const product = state.userDeactiveProducts.find(p => p._id === action.payload)
        if (product) {
          state.userActiveProducts.push({ ...product, is_active: true })
        }
        state.userDeactiveProducts = state.userDeactiveProducts.filter(p => p._id !== action.payload)
      })

      // USERIN ELANLARI
      .addCase(getMyProducts.fulfilled, (state, action) => {
        state.userProducts = action.payload.data
        state.userStatus = 'success'
      })
      .addCase(getMyProducts.rejected, (state, action) => {
        state.message = action.payload?.message
        state.userStatus = 'error'
      })

      .addCase(getMyActiveProducts.fulfilled, (state, action) => {
        state.userActiveProducts = action.payload.data
      })
      .addCase(getMyDeactiveProducts.fulfilled, (state, action) => {
        state.userDeactiveProducts = action.payload.data
      })

      .addCase(getMyMessages.fulfilled, (state, action) => {
        state.systemMessages = action.payload.data
        state.systemMessagesStatus = 'success'
      })
      .addCase(getMyMessages.rejected, (state, action) => {
        state.message = action.payload?.message
        state.systemMessagesStatus = 'error'
      })

      // DELETE PRODUCT
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.userProducts = state.userProducts.filter(p => p._id !== action.payload)
        state.deleteStatus = 'success'
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.message = action.payload?.message
        state.deleteStatus = 'error'
      })

      // UPDATE PRODUCT
      .addCase(updateProduct.fulfilled, (state) => {
        state.updateStatus = 'success'
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.message = action.payload?.message
        state.updateStatus = 'error'
      })


  }
})

// Action creators are generated for each case reducer function
export const { toggleProductLike } = productSlice.actions

export default productSlice.reducer