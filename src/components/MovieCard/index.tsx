'use client';

import { MovieType } from '@/types/movie';
import StarRating from '../StarRating';
import './index.scss'
import Link from 'next/link';

export type Props = {
    movie: MovieType,
}

export default function MovieCard(props: Props) {
    const movie = props.movie;

    return (
        <li className="movie-card">
            <div className='movie-poster'>
                <img 
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                />
            </div>

            <div className='movie-infos'>
                <p className='movie-title'>
                    {movie.title}
                </p>
                
                <div className='hidden-content'>
                {movie.vote_average > 0 &&
                    <StarRating rating={movie.vote_average}/>
                }
                    {movie.overview &&
                        <p className='movie-description'>
                            {movie.overview.length > 100
                                ? `${movie.overview.substring(0, 100)}...`
                                : movie.overview
                            }
                        </p>
                    }
                    <Link href="/movie-description">
                        <button className="btn-default">Ver mais</button>
                    </Link>
                </div>
            </div>
        </li>
        );
    
}