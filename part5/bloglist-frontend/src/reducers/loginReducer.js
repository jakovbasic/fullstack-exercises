import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: [],
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
    clearUser(){
      return null
    }
  }
})

export const { setUser, clearUser } = loginSlice.actions

export default loginSlice.reducer