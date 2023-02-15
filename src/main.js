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
            <div class="movie-container">
                <img
                src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                class="movie-img"
                alt="${movie.title}"
                />
            </div>`
            trendingMoviesPreviewList.innerHTML += template;
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
            <div class="movie-container">
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