import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="zoom-effect">
            <div className="Movie-title">{movie.title}</div>
            <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt="" />
            <div className="Movie-date">{movie.release_date}</div>
            <div className="Movie-rating">{movie.vote_average}</div>
            {/* <div className="Movie-overview">{movie.overview}</div> */}
          </div>
        </div>
      );
    });
  };
  //console.log({ popularMovies: popularMovies });
  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
    // console.log({ query: query });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movieku</h1>
        <input placeholder="cari film kesayangan..." className="Movie-search" onChange={({ target }) => search(target.value)} />
        <div className="Movie-container">
          <PopularMoviesList />
        </div>
      </header>
    </div>
  );
};

export default App;
