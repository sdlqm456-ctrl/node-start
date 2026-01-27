// post.js
// http://localhost:3001/index
// http://localhost:3001/posts

fetch("comments?writer=홍길동&post=1")
  .then((resp) => resp.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
