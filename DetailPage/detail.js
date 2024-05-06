const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

getmovieData(movieId);

function getmovieData(id) {
  const apiKey = "f5475cb87195d22e7fbee353e3247ba5";
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=1`;

  fetch(movieUrl)
    .then((response) => response.json())
    .then((data) => {
      movieData(data);
      loadComments(id);
    })
    .catch((error) => console.error("Error fetching movie details:", error));
}

function movieData(movie) {
  const detailFlex = document.getElementById("movieDetail");
  const detailCard = movieDetailInfo(movie);
  detailFlex.appendChild(detailCard);
}

function movieDetailInfo(detail) {
  const movieImage = detail.poster_path;
  const backImg = detail.backdrop_path;
  const movieTitle = detail.title;
  const runTime = detail.runtime;
  const releaseDate = detail.release_date;
  const genreNames = detail.genres.map((genre) => genre.name).join(" • ");
  const overview = detail.overview;
  const vote_average = detail.vote_average.toFixed(2);

  const detailCard = document.createElement("div");
  detailCard.classList.add("detail");
  detailCard.classList.add("detailCard");

  detailCard.innerHTML = `
    <article class="Detail">
      <div class="background">
        <div class="backFrame"></div>
        <div class="detailImg">
            <img class="backImg" src="https://image.tmdb.org/t/p/w300${backImg}" alt="poster"/>
            <div class="mask"></div>
            <div class="mask2"></div>
        </div>
      </div>
      <div class="detail-body">
        <div class="detailText">
          <h1 class="detailTitle">${movieTitle}</h1>
          <h2 class="runTime">${~~(runTime / 60)} 시간 ${runTime % 60} 분</h2>
          <div class="detailInfo">
            <p class="releaseDate">${releaseDate}</p>
            <p class="bar">|</p>
            <p class="genreNames">${genreNames}</p>
          </div>
          <div class="voteFlex">
              <span class="starIcon material-symbols-outlined">kid_star</span>
              <p class="detailVote">평점 : ${vote_average} 점</p>
          </div>
        </div>
        <div class="overView-frame">
          <img class="posterImg" src="https://image.tmdb.org/t/p/w300${movieImage}" alt="poster"/>
          <p class="detailOverview">${overview}</p>
        </div>
      </div>
    </article>
`;
  return detailCard;
}

function goHome() {
  window.location.href = "../index.html";
}

// scrollUP
const scrollBtn = document.querySelector(".scrollBtn");

scrollBtn.addEventListener("click", (e) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// 모드 변경 저장
document.addEventListener("DOMContentLoaded", (event) => {
  const userTheme = localStorage.getItem("theme");
  if (userTheme === "dark") {
    switchDarkTheme();
  } else {
    switchLightTheme();
  }
});

// 다크모드, 라이트모드 변경
const switchBtn = document.getElementById("switchBtn");
const html = document.getElementsByTagName("html")[0];
const mode = "dark";

switchBtn.addEventListener("click", () => {
  console.log("click");
  if (html.classList.contains(mode)) {
    switchLightTheme();
  } else {
    switchDarkTheme();
  }
});
const switchDarkTheme = () => {
  localStorage.setItem("theme", "dark");
  html.classList.add(mode);
};
const switchLightTheme = () => {
  localStorage.removeItem("theme", "dark");
  html.classList.remove(mode);
};

// 댓글 기능
const commentForm = document.querySelector(".comment-write__box");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const commentInput = document.getElementById("write");

// 로컬스토리지 데이터 불러오기
function loadComments(movieId) {
  const comments = getComments(movieId);
  generateComment(comments);
}

// 로컬스토리지에 데이터 저장하기
function saveComments(movieId, comments) {
  localStorage.setItem(`comments_${movieId}`, JSON.stringify(comments));
}

//로컬스토리지에서 데이터 가져오기
function getComments(movieId) {
  const savedComments = localStorage.getItem(`comments_${movieId}`);
  return savedComments ? JSON.parse(savedComments) : [];
}

// const randomId = Date.now(); //uuid js

const handleSubmitForm = (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;
  const comment = commentInput.value;
  const rating = selectedRating;
  // const indexBox = document.querySelector(".comment__box");
  // const index = indexBox.dataset["index"];
  const randomId = Date.now().toString();

  usernameInput.value = "";
  passwordInput.value = "";
  commentInput.value = "";

  let newComment = {
    User: username,
    Password: password,
    Review: comment,
    Rating: rating,
    Id: randomId,
  };

  //로컬스토리지 아이템 갯수 -> 총 댓글 수에 반영하기
  //  comments.length

  loadComments(movieId);
  let comments = getComments(movieId);
  comments.unshift(newComment);
  saveComments(movieId, comments);
  generateComment(comments);
};

commentForm.addEventListener("submit", handleSubmitForm);

const generateComment = (comments) => {
  const commentBox = document.querySelector(".comment__wrapper");
  commentBox.innerHTML = "";
  let commentDrawn = getComments(movieId, comments);

  commentDrawn.forEach((element) => {
    commentBox.innerHTML += `
      <li class="comment__box" id=${element.Id}>
        <img
          class="user-image"
          src="https://static.vecteezy.com/system/resources/thumbnails/005/276/776/small/logo-icon-person-on-white-background-free-vector.jpg"
        />
        <section class="comment">
          <div class="userInfo">
              <h4>${element.User}</h4>
              <div class="star-box">
                <span class="starsIcon material-symbols-outlined" style="font-size: 18px"">kid_star</span>
                <span class="stars">${element.Rating}</span>
              </div>
          </div>
          <p>${element.Review}</p>
          <div class="edit-delete" >
            <button class="edit"><i class="fa-solid fa-pen fa-lg"></i></button>
            <button class="delete"><i class="fa-regular fa-trash-can fa-lg"></i></i></button>
          </div>
        </section>
        <div class="rate">
          <i class="fa-regular fa-thumbs-up fa-lg"></i>
          <span>55</span>
        </div>
      </li>`;
  });

  //댓글 삭제하기
  const deleteComment = (event) => {
    const li =
      event.target.parentElement.parentElement.parentElement.parentElement;
    let cancelSwitch = Boolean;

    commentDrawn.forEach((element) => {
      if (li.getAttribute("id") === String(element.Id)) {
        const passwordTry = prompt("패스워드를 입력해주세요.");
        if (passwordTry === element.Password) {
          cancelSwitch = true;
          li.remove();
        } else {
          cancelSwitch = false;
          alert("비밀번호가 틀렸습니다. 다시 시도해주세요.");
        }
      }
    });

    if (cancelSwitch) {
      const newComments = commentDrawn.filter(
        (element) => element.Id !== li.getAttribute("id")
      );
      // console.log({ newComments }); //새로운 배열 확인

      saveComments(movieId, newComments);

      alert("삭제되었습니다.");
      // location.reload(); //
    }
  };

  const deleteBtn = document.querySelectorAll(".delete");
  deleteBtn.forEach((element) =>
    element.addEventListener("click", deleteComment)
  );
};

// 페이지가 로드될 때 기존 댓글 불러오기
window.onload = function () {
  generateComment();
};

//댓글 수정하기

//6. 별점 주기
const stars = document.querySelectorAll(".star");
let selectedRating = 0;

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const value = parseInt(star.getAttribute("data-value"));
    selectedRating = value;
    highlightStars(value);
    saveRating(value);
  });
});

const saveRating = (rating) => {
  localStorage.setItem("Rating", rating);
};

const highlightStars = (value) => {
  stars.forEach((star, index) => {
    if (index < value) {
      star.textContent = "★";
    } else {
      star.textContent = "☆";
    }
  });
};
