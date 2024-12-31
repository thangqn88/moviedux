import React, { useState, useEffect } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [genre, setGenre] = useState("All genres");
  const [rating, setRating] = useState("All rating");

  useEffect(() => {
    fetch("movies.json")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const handleSearch = (e) => {
    setSearchString(e.target.value);
  };
  const handleGenreSelected = (e) => {
    setGenre(e.target.value);
  };
  const handleRatingSelected = (e) => {
    setRating(e.target.value);
  };

  const matchGenre = (movie, genre) => {
    return (
      genre === "All genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;
      case "Good genres":
        return movie.rating >= 8;
      case "Ok":
        return movie.rating >= 5 && movie.rating < 8;
      case "Bad":
        return movie.rating < 5;
      default:
    }
  };

  const matchSearchString = (movie, searchString) => {
    return movie.title.toLowerCase().includes(searchString.toLowerCase());
  };

  const filteredMovies = movies.filter(
    (movie) =>
      matchGenre(movie, genre) &&
      matchRating(movie, rating) &&
      matchSearchString(movie, searchString)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchString}
        onChange={handleSearch}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreSelected}
          >
            <option>All genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingSelected}
          >
            <option>All</option>
            <option>Good genres</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
