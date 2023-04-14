const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    Headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
})
async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    trendingMoviesPreviewList.innerHTML = '';
    movies.forEach(movie => {
        const template = `
            <div class="movie-container" onclick="showMovieDetails(${movie.id})">
                <img
                src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                class="movie-img"
                alt="${movie.title}"
                />
            </div>`
            trendingMoviesPreviewList.innerHTML += template;
    });
}

async function getTrendingMoviesPage(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    genericSection.innerHTML = '';
    movies.forEach(movie => {
        const template = `
            <div class="movie-container"onclick="showMovieDetails(${movie.id})">
                <img
                src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                class="movie-img"
                alt="${movie.title}"
                />
            </div>`
            genericSection.innerHTML += template;
    });
}

async function getCategoriesMoviesPreview(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    categoriesPreviewList.innerHTML = '';
    categories.forEach(category => {
        const template = `
        <div class="category-container">
            <h3 id="id${category.id}" class="category-title" onclick="categoryFilter(${category.id},'${category.name}')">${category.name}</h3>
         </div>`
         categoriesPreviewList.innerHTML += template;
        //  console.log('categorias', category);
        
    })
}
function categoryFilter(id,name) {
    location.hash = `#category=${id}-${name}`;
    console.log(location.hash)
}

function showMovieDetails(movieId){
    location.hash = `#movie=${movieId}`
}

async function getMoviesByCategories(id){
    const {data} = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    });

    genericSection.innerHTML = '';
    const movies = data.results;
    movies.forEach(movie => {
        const template = `
            <div class="movie-container" onclick="showMovieDetails(${movie.id})">
                <img
                src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                class="movie-img"
                alt="${movie.title}"
                id="${movie.id}"
                />
            </div>
        `
        genericSection.innerHTML += template;
    })
}
async function getMoviesBySearch(query){
    const {data} = await api('search/movie', {
        params: {
            query,
        }
    });

    genericSection.innerHTML = '';
    const movies = data.results;
    movies.forEach(movie => {
        const template = `
            <div class="movie-container" onclick="showMovieDetails(${movie.id})">
                <img
                src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                class="movie-img"
                alt="${movie.title}"
                id="${movie.id}"
                />
            </div>
        `
        genericSection.innerHTML += template;
    })
}
async function getMovieById(id){
    const {data: movie} = await api('movie/' + id);
    const categories = movie.genres;
    const imageURL = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;
    movieDetailSection.innerHTML = '';
    headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(${imageURL})`;
    const template = `
        <h1 class="movieDetail-title">${movie.title}</h1>
        <span class="movieDetail-score">${movie.vote_average}</span>
        <p class="movieDetail-description">${movie.overview}</p>`
    movieDetailSection.innerHTML += template;

    categories.forEach(category =>{
        const templateCategorye = `
        <article class="categories-list">
        <div class="category-container">
        <h3 id="id${category.id}" class="category-title" onclick="categoryFilter(${category.id},'${category.name}')">${category.name}</h3>
        </div>
        </article>`
        movieDetailSection.innerHTML += templateCategorye;
        
    })
    getRelatedMovieById(id);
}

async function getRelatedMovieById(id){
    const {data} = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;
    console.log(relatedMovies);

    relatedMovies.forEach(movie => {
        const template = `
        <article class="relatedMovies-container">
        <h2 class="relatedMovies-title">Películas similares</h2>
        <div class="relatedMovies-scrollContainer">
            <div class="movie-container" onclick="showMovieDetails(${movie.id})">
                <img
                src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
                class="movie-img"
                alt="${movie.title}"
                />
            </div>
        </div>
    </article>
        `
        movieDetailSection.innerHTML += template;
    })
}