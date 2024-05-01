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
    <article class="detailFrame">
      <div class="gradientFrame">
        <div class="gradient"></div>
        <div class="detailImg">
            <img src="https://image.tmdb.org/t/p/w300${movieImage}" class="posterImg" alt="poster"/>
        </div>
      </div>
      <div class="detail-body">
        <h1 class="detailTitle">${movieTitle}</h1>
        <h2 class="runTime">${runTime}</h2>
        <div class="detailInfo">
          <p class="detailVote">${releaseDate}</p>
          <p class="detailVote">${genreNames}</p>
        </div>
        <p class="detailVote">평점<br>${vote_average} 점</p>
        <p class="detailOverview">${overview}</p>
      </div>
    </article>
`;
  return detailCard;
}
