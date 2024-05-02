const idPasswordForm = document.querySelector(".id-password__box");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const commentWriteForm = document.querySelector(".comment-write");
const commentInput = document.getElementById("write");

//1. idPasswordForm이 submit되면 localStorage에 id, password 값 저장
//2. 저장되면 idPasswordForm hidden className추가해서 가려주고,
//3. idPasswordForm submit 해서 localStorage에 값이 있어야지 commentWriteForm submit 가능
//3. 작성한 정보 localStorage에 적재.

const submitIdForm = (event) => {
  event.preventDefault();
  idPasswordForm.classList.add("hidden");
  const username = usernameInput.value;
  const password = passwordInput.value;
  localStorage.setItem("Username", username);
  localStorage.setItem("Password", password);
  commentWriteForm.classList.remove("hidden");
};

idPasswordForm.addEventListener("submit", submitIdForm);

let comments = [];

// commentInput.addEventListener("focus", () => alert("로그인을 해주세요."));

const submitCommentForm = (event) => {
  event.preventDefault();
  let comment = commentInput.value;
  comments.push(comment);
  localStorage.setItem("Comment", comment);
  //   if (username === null) {
  //     alert("로그인을 해주세요");
  //   } else {
  //     comment = "";
  //     generateComment();
  //   }
};

console.log({ comments }); //로컬스토리지에 저장된 배열 확인.

// //Enter 키 입력해도 값 처리하기
// const enterKey = () => {
//   if (window.event.keyCode === 13) {
//     submitCommentForm.submit();
//   }
// };

// enterKey();

commentWriteForm.addEventListener("submit", submitCommentForm);

const savedUsername = localStorage.getItem("Username");
const savedComment = localStorage.getItem("Comment");
//section comment 부분에 변수로 아이템 넣어주기.

const generateComment = (event) => {
  const commentBox = document.querySelector(".comment__wrapper");

  commentBox.innerHTML += `
  <li class="comment__box">
    <img
    class="user-image"
    src="https://static.vecteezy.com/system/resources/thumbnails/005/276/776/small/logo-icon-person-on-white-background-free-vector.jpg"
    />
    <section class="comment">
    <h4>${savedUsername}</h4>
    <p>
        ${savedComment}
    </p>
    </section>
    <div class="rate">
    <i class="fa-regular fa-thumbs-up fa-lg"></i>
    <span>55</span>
    </div>
</li>`;
};

// 3.로컬스토리지에서 댓글 배열 가져오기

// 4. 페이지가 로드될 때 기존 댓글 불러오기
// window.onload = function () {
//     loadComments();
//   };

//5. 댓글 목록 불러오기
