import React from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function WatchList({ movies, watchlist, toggleWatchList }) {
  return (
    <div>
      <div className="title">Your watchlist</div>
      <div className="watchlist">
        {watchlist.map((id) => {
          const movie = movies.find((m) => m.id === id);
          return (
            <MovieCard
              key={id}
              movie={movie}
              toggleWatchList={toggleWatchList}
              isWatchlist={true}
            />
          );
        })}
      </div>
    </div>
  );
}
