// Api 연결
function tmdbApi() {
  const apiKey = "f5475cb87195d22e7fbee353e3247ba5";
  const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US&page=1`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => movieData(data.results))
    .catch((error) => console.error("Error fetching movies:", error));
}
document.addEventListener("DOMContentLoaded", function () {
  tmdbApi();
});

// 영화 데이터 처리
function movieData(datas) {
  const cardFlex = document.getElementById("cardFlex");

  datas.forEach((movies) => {
    const movieCard = createCard(movies);
    cardFlex.appendChild(movieCard);

    movieCard.addEventListener("click", () => {
      window.location.href = `./DetailPage/sunmin.html?id=${movies.id}`;
    });
  });
}

// 영화 카드 생성
function createCard(movie) {
  const movieImage = movie.poster_path;
  const movieTitle = movie.title;
  const overview = movie.overview;
  const vote_average = movie.vote_average.toFixed(2);

  const movieCard = document.createElement("div");
  movieCard.classList.add("card");
  movieCard.classList.add("movieCard");

  movieCard.innerHTML = `
    <article class="cardFrame>
        <div class="cardImg">

            <img src="https://image.tmdb.org/t/p/w300${movieImage}" class="posterImg" alt="poster"/>
        </div>

        <div class="card-body">
            <h1 class="movieTitle">${movieTitle}</h1>
            <div class="textFrame">
            <p class="movieOverview">줄거리 요약<br>${overview}</p>
            <p class="movieVote">평점<br>${vote_average} 점</p>
            </div>
        </div>
    <article>
`;
  return movieCard;
}

// 영화 아이디 알림창
function movieId(id) {
  swal.fire("해당 영화의 id 값은", `${id}번 입니다`);
}

// 영화 검색
const searchInput = document.getElementById("searchBar");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const movieCards = Array.from(document.getElementsByClassName("movieCard"));

  movieCards.forEach((card) => {
    const title = card.querySelector(".movieTitle").textContent.toLowerCase();
    card.style.display = title.includes(searchTerm) ? "block" : "none";
  });
});

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
