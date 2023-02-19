import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(_state, action) {
      return action.payload
    }
  }
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const voteById = id => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const voted = blogs.find(b => b.id === id)

    const newBlog = { ...voted, votes: voted.votes+1 }
    await blogService.update(id, newBlog)

    const newBlogs = blogs.map(b => b.id === id ? newBlog : b)
    dispatch(setBlogs(newBlogs))
  }
}

export const removeById = id => {
  return async dispatch => {
    await blogService.remove(id)

    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer