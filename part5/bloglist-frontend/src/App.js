import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import loginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Notification from './components/notification'
import Togglable from './components/togglable'
import { useSelector, useDispatch } from 'react-redux'
import { notification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'

const App = () => {

  const blogs = useSelector(state => {
    return state.blogs
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(notification('wrong username or password', 5000))
    }
  }

  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(notification(`a new blog ${blogObject.title} by ${blogObject.author} added`,5000))
  }

  const likeBlog = () => {/*
    blogService
      .update(blogObject.id,blogObject)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.map(b => b !== returnedBlog ? b : returnedBlog ))
      })*/
  }

  const deleteBlog = () => {/*
    if(window.confirm(`Delete blog: ${blogObject.title}?`)) {
      blogService
        .remove(blogObject.id)
        .then(returnedBlog => {
          console.log(returnedBlog)
          setBlogs(blogs.filter(b => b !== returnedBlog))
        })
    }*/
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      {!user ? loginForm({ handleLogin, username, setUsername, password, setPassword }) :
        <div>
          <p>{user.name} logged in<button onClick={logout}>log out</button></p>
          <h2>create new</h2>
          <Togglable buttonLabel='add blog' buttonLabel2 = 'cancel'>
            <BlogForm create={addBlog}/>
          </Togglable>
          {blogs.slice().sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} addLike={likeBlog} removeBlog={deleteBlog} loggedUser={user} />
          )}
        </div>
      }
    </div>
  )
}

export default App
