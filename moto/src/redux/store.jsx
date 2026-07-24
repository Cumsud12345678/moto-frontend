import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/product/productSlice'
import favoritesSlice from './slices/favorite/favoritesSlice'
import userSlice from './slices/user/userSlice'
import metadataSlice from './slices/metadata/metadataSlice'
import adminUserSlice from './slices/admin/adminUserSlice'
import adminProductSlice from './slices/admin/adminProductSlice'
import adminMetadataSlice from './slices/admin/adminMetadataSlice'

export const store = configureStore({
  reducer: {
    product: productSlice,
    favorite: favoritesSlice,
    user: userSlice,
    metadata: metadataSlice,
    
    adminUsers: adminUserSlice,
    adminProducts: adminProductSlice,
    adminMetadata: adminMetadataSlice
  },
})