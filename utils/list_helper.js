const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes  
  } 
  return blogs.reduce(reducer, 0)

}

const favouriteBlog = (blogs) => {
  const reducer = (fav, blog) => {
    return fav.likes > blog.likes ? fav : blog  
  } 
  return blogs.reduce(reducer)

}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  // console.log('Authors', authors)
  const dictionary = {}
  authors.forEach(author => {dictionary[author] === undefined ? dictionary[author] = 1 : dictionary[author] = dictionary[author] + 1})
  // console.log('Authors dict', dictionary)
  const largestAuthor = Object.keys(dictionary).reduce((a, b) => dictionary[a] > dictionary[b] ? a : b)
  return {author : largestAuthor, blogs : dictionary[largestAuthor]} 
}

const mostLikes = (blogs) => {
  const authors = blogs.map(blog => {return {author: blog.author, likes: blog.likes}})
  //console.log('Authors', authors)
  const dictionary = {}
  authors.forEach(auth => {dictionary[auth.author] === undefined ? dictionary[auth.author] = auth.likes : dictionary[auth.author] = dictionary[auth.author] + auth.likes})
  //console.log('Authors dict', dictionary)

  const favouritedAuthor = Object.keys(dictionary).reduce((a, b) => dictionary[a] > dictionary[b] ? a : b)
  return {author : favouritedAuthor, likes : dictionary[favouritedAuthor]} 
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}