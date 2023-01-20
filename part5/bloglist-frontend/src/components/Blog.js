import Togglable from "./togglable"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {}

  return (
    <div style={blogStyle}>
      <div> {blog.title} {blog.author} </div>
      <Togglable buttonLabel='show'>
      <div> {blog.url} </div>
      <div> {blog.likes} <button onClick={like}>like</button></div>
      </Togglable>
  </div>
)}

export default Blog