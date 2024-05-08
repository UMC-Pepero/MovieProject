const commentForm = document.querySelector(".comment-write__box");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const commentInput = document.getElementById("write");

const handleSubmitForm = (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;
  const comment = commentInput.value;

  usernameInput.value = "";
  passwordInput.value = "";
  commentInput.value = "";

  let newComment = {
    user: username,
    password: password,
    review: comment,
    id: movieId,
  };
  // 1. 로컬스토리지에서 가져온다.
  const commentsArr = getComments();

  // 2. 로컬스토리지에 있는 데이터에 추가한다.
  commentsArr.unshift(newComment);

  saveComments(commentsArr);
  generateComment(newComment);
};

commentForm.addEventListener("submit", handleSubmitForm);

const saveComments = (movieID, comments) => {
  localStorage.setItem(`comments_${movieID}`, JSON.stringify(comments));
};

const getComments = (movieID) => {
  const savedComments = localStorage.getItem(`comments_${movieID}`);

  return savedComments ? JSON.parse(savedComments) : [];
};

const generateComment = () => {
  const commentBox = document.querySelector(".comment__wrapper");
  commentBox.innerHTML = "";

  let commentDrawn = getComments();
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
