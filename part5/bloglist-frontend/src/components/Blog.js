import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, loggedUser }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    const newBlog = { ...blog, likes: blog.likes+1, user: blog.user.id }
    addLike(newBlog)
  }

  const remove = () => {
    removeBlog(blog)
  }

  const removeButton = () => {
    return(<div><button onClick={remove}>remove</button></div>)
  }


  const toggleView = () => {
    setView(!view)
  }

  return (
    <div className="blog" style={blogStyle}>
      {!view ? <div>{blog.title} {blog.author} <button onClick={toggleView}>view</button></div>
        : <div>
          <p>title: {blog.title} <button onClick={toggleView}>hide</button></p>
          <p>author: {blog.author}</p>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes} <button onClick={like}>like</button></p>
          {loggedUser.username === blog.user.username && removeButton()}
        </div>
      }
    </div>
  )
}

export default Blog