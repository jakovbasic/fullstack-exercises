import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
//import blogService from './services/blogs'

const store = configureStore({
  reducer: {
    notification: notificationReducer
  }
})
/*
blogService.getAll().then(blogs =>
  store.dispatch(setBlogs(blogs))
)*/

export default store