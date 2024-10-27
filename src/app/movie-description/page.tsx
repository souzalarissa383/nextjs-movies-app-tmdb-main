'use client';

import React, { useEffect, useState } from 'react';
import MovieDescription from '@/components/MovieDescription';

const MoviePage = () => {
    const [movie, setMovie] = useState(null); // Estado do filme
    const [error, setError] = useState<string | null>(null); // Estado de erro, tipo correto definido

    const movieId = 1184918; // ID do filme para testes

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=fd7de7243ea08e4dd35cc4a5297127e3&language=pt-BR`);

                if (!response.ok) {
                    throw new Error('Erro ao buscar os detalhes do filme');
                }

                const data = await response.json();
                setMovie(data);
            } catch (err) {
                console.error('Erro ao buscar os detalhes do filme:', err);
                setError('Não foi possível carregar os detalhes do filme.'); // Mensagem de erro
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    // Tratamento de erros
    if (error) {
        return <div>{error}</div>;
    }

    // Enquanto o filme não é carregado
    if (!movie) {
        return <div>Carregando...</div>;
    }

    return (
        <MovieDescription movie={movie} />
    );
};

export default MoviePage;
