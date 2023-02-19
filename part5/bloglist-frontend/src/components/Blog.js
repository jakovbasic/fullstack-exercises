import { useState } from 'react'
import { voteById, removeById } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, loggedUser }) => {

  const dispatch = useDispatch()

  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    console.log('like pressed')
    dispatch(voteById(blog.id))
  }

  const remove = () => {
    if(window.confirm(`Delete blog: ${blog.title}?`)) {
      console.log('remove pressed')
      dispatch(removeById(blog.id))
    }
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