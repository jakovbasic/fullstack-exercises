const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  const sum = blogs.reduce((partialSum, blog) => partialSum + blog.likes, 0)
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

const mostLikes = (blogs) => {
  const byAuthor = _.groupBy(blogs, (blog) => blog.author)
  const likeCounts = Object.keys(byAuthor).map(key => {
    return {
        author: key,
        likes: byAuthor[key].reduce((partialSum, blog) => partialSum + blog.likes, 0)
    } 
  })
  const most = Math.max(...likeCounts.map(auth => auth.likes))
  const author = likeCounts.find(auth => auth.likes === most)

  return author
}
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }