import { useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Notification from './components/notification'
import Togglable from './components/togglable'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } else dispatch(setUser(null))
  }, [])

  const blogs = useSelector(state => {
    return state.blogs
  })

  const user = useSelector(state => {
    return state.user
  })

  const logout = () => {
    dispatch(setUser(null))
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      {!user ? <LoginForm/> :
        <div>
          <p>{user.name} logged in<button onClick={logout}>log out</button></p>
          <h2>create new</h2>
          <Togglable buttonLabel='add blog' buttonLabel2 = 'cancel'>
            <BlogForm />
          </Togglable>
          {blogs.slice().sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} loggedUser={user} />
          )}
        </div>
      }
    </div>
  )
}

export default App
