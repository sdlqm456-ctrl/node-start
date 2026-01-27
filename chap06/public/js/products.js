// products.js (혼자 해보기)
// 상품: 상품번호, 상품명, 가격, 판매자 / 상품후기: 후기 번호,  상품사용후기, 상품번호, 작성자
// http://localhost:3001/products
// http://localhost:3001/reviews

fetch("products.json")
  .then((resp) => resp.json())
  .then((data) => {
    const tbody = document.getElementById("product-body");
  })
  .catch((err) => console.log(err));

// 비동기 =>  동기방식코드
// post, put, delete

async function reviewInfo(productsID) {
  const data = await fetch("productsreviews?productsID=" + productsID);
  const result = await data.json();
  console.log(result);
}
reviewInfo(1);
