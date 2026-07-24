import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openModal: false,
}

export const menuModalSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openModal: (state) => {
      state.openModal = true
    },
    closeModal: (state) => {
      state.openModal = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = menuModalSlice.actions

export default menuModalSlice.reducer