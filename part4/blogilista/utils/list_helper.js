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
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }