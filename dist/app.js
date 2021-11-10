// SEARCH ANIMATION

const searchBtn = document.querySelector(".search-btn");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  searchInput.classList.toggle("hide");
});

// MOVIE API
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=2";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

// DOM ELEMENTS
const mainContainer = document.querySelector(".movies-container");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovie(data.results);
}

function showMovie(movies) {
  movies.forEach((movie) => {
    let movieEl = document.createElement("div");
    movieEl.classList.add("movie-box");

    movieEl.innerHTML = `
      <img src="${IMG_PATH + movie.poster_path}  " alt="free guy" />
        <div class="movie-info">
          <h4 class="movie-title">${movie.title}</h4>
          <div class="rating">
            <h4 class="movie-rating">${movie.vote_average}</h4>
          </div>
        </div>
        <div class="movie-overview">
          <h4 class="overview-title">Overview</h4>
          <p class="overview-body">
          ${movie.overview}
          </p>
        </div>
      `;
    mainContainer.appendChild(movieEl);
  });
}

searchInput.addEventListener("input", function (e) {
  const searchValue = e.target.value;
  const movieTitle = document.querySelectorAll(".movie-title");

  movieTitle.forEach((title) => {
    title.parentElement.parentElement.style.display = "none";

    if (
      title.textContent.toLocaleLowerCase().includes(searchValue.toLowerCase())
    ) {
      title.parentElement.parentElement.style.display = "block";
    }
  });
});
