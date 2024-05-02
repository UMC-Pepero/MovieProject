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
  const genreNames = detail.genres.map((genre) => genre.name).join(", ");
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
          <h2 class="runTime">${runTime} 분</h2>
          <div class="detailInfo">
            <p class="releaseDate">${releaseDate}</p>
            <p>|</p>
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
