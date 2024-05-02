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
  
  const homepage = movie.homepage;
  const originCountry = movie.origin_country
    .map((country) => country)
    .join(' • ');
  const originLang = movie.original_language;
  const originTitle = movie.original_title;
  const productionComp = movie.production_companies
    .map((comp) => comp.name)
    .join(' / ');
  
  const detailContainer = document.getElementById('container');
  const infoContianer = document.querySelector('.infoContianer');


  infoContianer.innerHTML = `
      <div class="section1">
        <h1 class="movieTitle">${movieTitle}</h1>
        <p class="ft-color-gray">${~~(runTime / 60)}시간 ${runTime % 60}분</p>
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
    `;
    const section3 = document.createElement('div');
    section3.classList.add('section3');
    const moreInfoBtn = document.createElement('button');
    moreInfoBtn.classList.add('moreInfoBtn');
    moreInfoBtn.innerHTML = `<i class="fa-regular fa-square-plus fa-2x"></i>`;

    const moreInfoText = document.createElement('div');
    moreInfoText.classList.add('moreInfoText');
    const hompageE = document.createElement('p');
    const originCountryE = document.createElement('p');
    const originLangE = document.createElement('p');
    const originTitleE = document.createElement('p');
    const productionCompE = document.createElement('p');

    if(homepage === ""){
      hompageE.innerHTML = `• homepage : `;
    } else {
      hompageE.innerHTML = `
      • homepage :
      <p>
        <a href="${homepage}" target="blank" class="homepage">${homepage}</a>
      </p>`;
    }
    originCountryE.textContent = `• Origin Country : ${originCountry}`;
    originLangE.textContent = `• Origin Language : ${originLang}`;
    originTitleE.textContent = `• Origin Title: ${originTitle}`;
    productionCompE.textContent = `• Production Company : ${productionComp}`;

    section3.append(moreInfoBtn, moreInfoText);
    moreInfoText.append(hompageE, originCountryE, originLangE, originTitleE, productionCompE);

    
    infoContianer.appendChild(section3);

    const mode = 'show';
    moreInfoBtn.addEventListener('click', () => {
        moreInfoText.classList.toggle(mode);
    });

  return infoContianer;
}



// scrollUP
const scrollBtn = document.querySelector('.scrollBtn');

scrollBtn.addEventListener('click', (e) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

// 모드 변경 저장
document.addEventListener('DOMContentLoaded', (event) => {
  const userTheme = localStorage.getItem('theme');
  if (userTheme === 'dark') {
    switchDarkTheme();
  } else {
    switchLightTheme();
  }
});

// 다크모드, 라이트모드 변경
const switchBtn = document.getElementById('switchBtn');
const html = document.getElementsByTagName('html')[0];
const mode = 'dark';

switchBtn.addEventListener('click', () => {
  if (html.classList.contains(mode)) {
    switchLightTheme();
  } else {
    switchDarkTheme();
  }
});
const switchDarkTheme = () => {
  localStorage.setItem('theme', 'dark');
  html.classList.add(mode);
};
const switchLightTheme = () => {
  localStorage.removeItem('theme', 'dark');
  html.classList.remove(mode);
};
