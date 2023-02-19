import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(_state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notification = (content, time) => {
  return dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {dispatch(clearNotification())},time)
  }
}

export default notificationSlice.reducer