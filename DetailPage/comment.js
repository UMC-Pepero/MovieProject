const commentForm = document.querySelector(".comment-write__box");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const commentInput = document.getElementById("write");

// const movieId = getMovieIdFromURL(); // URL에서 영화 식별자를 가져오는 함수

const handleSubmitForm = (event) => {
  event.preventDefault();
  // 입력된 이름, 댓글 내용 가져오기
  const username = usernameInput.value;
  const password = passwordInput.value;
  const comment = commentInput.value;
  //값 비우기, 변수의 값에는 영향 x
  usernameInput.value = "";
  passwordInput.value = "";
  commentInput.value = "";
  //로컬 스토리지에 username이랑 password 저장

  // 값을 담을 새로운 객체 생성
  let newComment = {
    user: username,
    password: password,
    review: comment,
  };
  // 1. 로컬스토리지에서 가져온다.
  const commentsArr = getComments();

  // 새로운 배열에 객체 값 넣어주기
  // 2. 로컬스토리지에 있는 데이터에 추가한다.
  commentsArr.unshift(newComment); //push는 배열 뒤부터 추가, unshift는 앞에서부터 추가

  saveComments(commentsArr); //commentsArr배열을 추가해서 저장
  generateComment(newComment);
};

commentForm.addEventListener("submit", handleSubmitForm);

//여기서 comments는 인자로 사용
const saveComments = (comments) => {
  localStorage.setItem("comments", JSON.stringify(comments));
};

// 로컬 스토리지에서 댓글 배열 가져오기
const getComments = () => {
  const savedComments = localStorage.getItem("comments");

  if (savedComments) {
    return JSON.parse(savedComments); //다시 배열로 바꿔주기
  } else {
    return [];
  }
};

const generateComment = (newComment) => {
  const commentBox = document.querySelector(".comment__wrapper");
  commentBox.innerHTML = "";

  let commentDrawn = getComments();
  //commentsArr를 순회하면서 댓글 그리기
  commentDrawn.forEach((element) => {
    commentBox.innerHTML += `
  <li class="comment__box">
    <img
    class="user-image"
    src="https://static.vecteezy.com/system/resources/thumbnails/005/276/776/small/logo-icon-person-on-white-background-free-vector.jpg"
    />
    <section class="comment">
    <h4>${element.user}</h4>
    <p>${element.review}</p>
    </section>
    <div class="rate">
    <i class="fa-regular fa-thumbs-up fa-lg"></i>
    <span>55</span>
    </div>
</li>`;
  });
};

// 4. 페이지가 로드될 때 기존 댓글 불러오기
window.onload = function () {
  generateComment();
};

//5. 댓글 목록 불러오기
