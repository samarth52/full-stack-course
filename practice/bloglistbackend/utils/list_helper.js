/* eslint-disable no-unused-vars */
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // eslint-disable-next-line no-shadow
  let favoriteBlog = null
  blogs.forEach((blog) => {
    if (!favoriteBlog || blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog
    }
  })

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCount = {}
  let mostBlogsAuthor = null
  blogs.forEach((blog) => {
    if (!authorCount[blog.author]) {
      authorCount[blog.author] = 1
    } else {
      authorCount[blog.author] += 1
    }
    if (!mostBlogsAuthor || authorCount[blog.author] > authorCount[mostBlogsAuthor]) {
      mostBlogsAuthor = blog.author
    }
  })
  return {
    author: mostBlogsAuthor,
    blogs: authorCount[mostBlogsAuthor],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCount = {}
  let mostLikesAuthor = null
  blogs.forEach((blog) => {
    if (!authorCount[blog.author]) {
      authorCount[blog.author] = blog.likes
    } else {
      authorCount[blog.author] += blog.likes
    }
    if (!mostLikesAuthor || authorCount[blog.author] > authorCount[mostLikesAuthor]) {
      mostLikesAuthor = blog.author
    }
  })
  return {
    author: mostLikesAuthor,
    likes: authorCount[mostLikesAuthor],
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
}
