const role = localStorage.getItem("role"); // role 속성으로 지정된 값
const uid = localStorage.getItem("uid");
const txt = document.createTextNode("(당신은 손님입니다)");

// DOM 객체
if (role || uid) {
  // alert(`${uid}의 권한은 ${role}`);
  const txt = document.createTextNode(`${uid}의 권한은 ${role}`);
}
document.querySelector("h3").appendChild(txt);

// 목록 가져오기 위한 라우팅 정보 확인
fetch("list")
  .then((resp) => resp.json())
  .then((data) => {
    const listBody = document.querySelector("#list");
    data.forEach((elem) => {
      listBody.insertAdjacentHTML(
        "beforeend",
        `<tr id="member_${elem.user_id}">
        <td><strong>${elem.user_id}</strong></td>
        <td>${elem.user_name}</td>
        <td style="text-align: center;"></td>
          <img class="profile-img" src="images/${elem.user_img}" alt="${elem.user_name}">
        <td><button class="deleteBtn" onclick="deleteMember('${elem.user_id}')"data-uid="${elem.user_id}">삭제하기</button></td>
        </tr>`,
      );
    });
  })
  .catch((err) => {
    console.error("데이터 로드 실패:", err);
    document.querySelector("#list").innerHTML =
      '<tr><td colspan="3" style="text-align:center;">데이터를 불러올 수 없습니다.</td></tr>';
  });

// deleteMember() 함수 정의
function deleteMember(uid) {
  if (role === "Admin") {
    if (confirm("내용을 삭제 하시겠습니까?")) {
      fetch("delete/" + uid, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.retCode == "OK") {
            // 화면에서 해당 행 삭제
            document.querySelector("#member_" + uid).remove();
            alert("삭제되었습니다.");
          } else {
            alert("삭제 중 예외.");
          }
        })
        .catch(console.log);
    }
  } else {
    alert("삭제권한이 없습니다");
  }
}
