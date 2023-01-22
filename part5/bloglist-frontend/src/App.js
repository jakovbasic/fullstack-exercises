import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import loginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Notification from './components/notification'
import Togglable from './components/togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )  
  }, [])

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
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const likeBlog = (blogObject) => {
    blogService
      .update(blogObject.id,blogObject)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.map(b => b !== returnedBlog ? b : returnedBlog ))
      })
  }

  const deleteBlog = (blogObject) => {
    if(window.confirm(`Delete blog: ${blogObject.title}?`)) {
      blogService
        .remove(blogObject.id)
        .then(returnedBlog => {
          console.log(returnedBlog)
          setBlogs(blogs.filter(b => b !== returnedBlog))
        })
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}/>
        {loginForm({ handleLogin, username, setUsername, password, setPassword })}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <p>{user.name} logged in<button onClick={logout}>log out</button></p>
      <h2>create new</h2>
      <Togglable buttonLabel='add blog' buttonLabel2 = 'cancel'>
        <BlogForm create={addBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={likeBlog} removeBlog={deleteBlog} loggedUser={user} />
      )}
    </div>
  )
}

export default App
