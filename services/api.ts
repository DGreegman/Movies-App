export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API}`
    }
}

export const fetchPopularMovies = async({query}: {query: string}) =>{
    const endpoint =  query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    })

    if(!response.ok) throw new Error(`Failed to fetch movies ${response.statusText}`)

    const data = await response.json()
    return data.results
}

export const fetchMovieDetails = async (movieId: string):Promise<MovieDetails> =>{

   try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
          method: 'GET',
          headers: TMDB_CONFIG.headers
      })
      
      if(!response.ok) throw new Error('Failed to fetch movie details')

      const data = response.json()
      return data
   } catch (error) {
      console.log(error);
      throw error
      
   }


}

/* const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTdmZmY5NWIxZDUzNDI0ODI1ODExYjBhYTNmNzhhMSIsIm5iZiI6MTc0MTQyODc3MC43MTcsInN1YiI6IjY3Y2MxODIyOWVmMGFjZGI4YjViYTA0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6iy3yadGBFDDz5sUPZM3pC8cxOlNHDZd3dOxrB5LXkU'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err)); */


