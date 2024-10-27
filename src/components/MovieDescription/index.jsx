import React from 'react';
import './index.scss';
import Footer from '../Footer'; 

const MovieDescription = ({ movie }) => {
    return (
        <div className="movie-description-container">
            <div className="movie-header">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                    width={354}
                    height={542}
                />
                <div className="movie-info">
                    <h2 className="movie-title">{movie.title}</h2>
                    <p className="movie-overview">{movie.overview || "Sinopse não disponível."}</p>
                    <p><strong>Avaliação:</strong> {movie.vote_average ? `${movie.vote_average * 10}%` : "N/A"}</p>
                </div>
            </div>
            <div className="movie-details">
                
            </div>
            <Footer/>
        </div>
    );
};

export default MovieDescription;
