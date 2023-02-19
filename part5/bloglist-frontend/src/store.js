import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer , { setBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: loginReducer
  }
})

blogService.getAll().then(blogs =>
  store.dispatch(setBlogs(blogs))
)

export default store