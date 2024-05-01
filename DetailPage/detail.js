const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

getmovieData(movieId);

function getmovieData(id) {
  const apiKey = "f5475cb87195d22e7fbee353e3247ba5";
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=1`;

  fetch(movieUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error fetching movie details:", error));
}

function movieDetail(movie) {
  console.log(movie);
}
