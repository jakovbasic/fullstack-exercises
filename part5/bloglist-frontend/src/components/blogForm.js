import { useState } from 'react'

const BlogForm = ({create}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        create({ title: title, author: author, url: url })
        setTitle('')
        setAuthor('')
        setUrl('')
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
      <button type="submit">create</button>
    </form>
    )
}
export default BlogForm