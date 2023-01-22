import Togglable from "./togglable"

const Blog = ({ blog, addLike, removeBlog, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    const newBlog = {...blog, likes: blog.likes+1, user: blog.user.id}
    addLike(newBlog)
  }

  const remove = () => {
    removeBlog(blog)
  }

  const removeButton = () => {
    return(<div><button onClick={remove}>remove</button></div>)
  }

  return (
    <div style={blogStyle}>
      <div> {blog.title} {blog.author} </div>
      <Togglable buttonLabel='show' buttonLabel2 = 'hide'>
      <div> {blog.url} </div>
      <div> likes: {blog.likes} <button onClick={like}>like</button></div>
      {loggedUser.username === blog.user.username && removeButton()}
      </Togglable>
  </div>
)}

export default Blog