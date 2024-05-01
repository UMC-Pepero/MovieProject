const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

getmovieData(movieId);

function getmovieData(id) {
  const apiKey = 'f5475cb87195d22e7fbee353e3247ba5';
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=1`;

  fetch(movieUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      movieDetail(data);
    })
    .catch((error) => console.error('Error fetching movie details:', error));
}

// 영화 데이터 처리
function movieData(datas) {
  movieDetail(datas);
  console.log('dkk: movie');
}

function movieDetail(movie) {
  const movieImage = movie.poster_path;
  const backImage = movie.backdrop_path;
  const movieTitle = movie.title;
  const overview = movie.overview;
  const vote_average = movie.vote_average.toFixed(2);
  const runTime = movie.runtime;
  const releaseDate = movie.release_date;
  const genres = movie.genres.map((genre) => genre.name).join(' • ');

  const detailContainer = document.getElementById('container');
  const detail = document.createElement('div');
  detail.classList.add('movie_detail');
  
  detailContainer.append(detail);

  detail.innerHTML = `
          <article class="infoContianer">
            <div class="section1">
              <h1 class="movieTitle">${movieTitle}</h1>
              <p class="ft-color-gray">${~~(runTime/60)}시간 ${(runTime%60)}분</p>
              <div class="section1-1">
                <p class="releaseDate ft-color-gray" >${releaseDate}</p>
                <p class="ft-color-gray"> | </p>
                <p class="genres ft-color-gray">${genres}</p>
              </div>
                <p class="movieVote">⭐️ ${vote_average}점</p>
                <div class="section1-2">
                  <img src="https://image.tmdb.org/t/p/w300${movieImage}" class="posterImg" alt="${movieTitle}"/>
                  <p class="movieOverview ft-color-gray">${overview}</p>
                </div>
            </div>
            <div class="section2">
              <img class="backImg" src="http://image.tmdb.org/t/p/w300${backImage}"/>
              <div class="backImg2"></div>
            </div>
          </article>
        `;
  return detail;
}

// scrollUP
const scrollBtn = document.querySelector('.scrollBtn');

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