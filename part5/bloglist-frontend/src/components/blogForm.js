import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = { title: title, author: author, url: url }
    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(createBlog(blogObject))
    dispatch(notification(`a new blog ${blogObject.title} by ${blogObject.author} added`,5000))
  }

  return(
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )
}
export default BlogForm