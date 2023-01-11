const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  const sum = blogs.map(blog => blog.likes)
                          .reduce((partialSum, a) => partialSum + a, 0)
  return sum
}

const favouriteBlog = (blogs) => {
  const topLikes = Math.max(...blogs.map(blog => blog.likes))
  const favourite = blogs.find(blog => blog.likes === topLikes)
  return favourite
}

const mostBlogs = (blogs) => {
  const byAuthor = _.groupBy(blogs, (blog) => blog.author)
  const blogCounts = Object.keys(byAuthor).map(key => {
    return {
        author: key,
        blogs: byAuthor[key].length
    } 
  })
  const most = Math.max(...blogCounts.map(auth => auth.blogs))
  const author = blogCounts.find(auth => auth.blogs === most)

  return author
}
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
  }