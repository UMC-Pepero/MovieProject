const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

getmovieDataImg(movieId);

function getmovieDataImg(id) {
const apiKey = 'f5475cb87195d22e7fbee353e3247ba5';
const movieUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`;

fetch(movieUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    movieData(data.results);
  }
    
  )
  .catch(err => console.error(err));
}

// 영화 데이터 처리
function movieData(datas) {
  movieSimilar(datas);
}

function movieSimilar(simMovie) {
  const container = document.getElementById('container');
  const similarContainer = document.querySelector('.similarContainer');

 
  similarContainer.innerHTML = `
    <div class="simDiv">
      <div class="simItem">f</div>
      <div class="simItem">f</div>
      <div class="simItem"></div>
    </div>
  `;
  
  similarContainer.appendChild(container);

  return container;

}
