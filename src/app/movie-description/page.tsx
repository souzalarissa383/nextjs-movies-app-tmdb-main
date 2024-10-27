'use client'; // Indica que este componente é um cliente (executado no navegador).

import React, { useEffect, useState } from 'react'; // Importa o React e hooks necessários.
import MovieDescription from '@/components/MovieDescription'; // Importa o componente MovieDescription para exibir detalhes do filme.

const MoviePage = () => {
    const [movie, setMovie] = useState(null); // Estado para armazenar os dados do filme, inicialmente nulo.
    const [error, setError] = useState<string | null>(null); // Estado para armazenar mensagens de erro, inicialmente nulo.

    const movieId = 1184918; // ID do filme que será buscado (neste caso, um ID fixo para testes).

    useEffect(() => {
        // Função assíncrona para buscar os detalhes do filme.
        const fetchMovieDetails = async () => {
            try {
                // Faz a requisição para a API do TMDB usando o movieId.
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=fd7de7243ea08e4dd35cc4a5297127e3&language=pt-BR`);

                // Verifica se a resposta da requisição não foi bem-sucedida.
                if (!response.ok) {
                    throw new Error('Erro ao buscar os detalhes do filme'); // Lança um erro caso a requisição falhe.
                }

                const data = await response.json(); // Converte a resposta da API em formato JSON.
                setMovie(data); // Atualiza o estado do filme com os dados recebidos.
            } catch (err) {
                console.error('Erro ao buscar os detalhes do filme:', err); // Loga o erro no console.
                setError('Não foi possível carregar os detalhes do filme.'); // Atualiza o estado de erro com uma mensagem amigável.
            }
        };

        fetchMovieDetails(); // Chama a função para buscar os detalhes do filme.
    }, [movieId]); // O efeito será executado sempre que movieId mudar.

    // Se houver um erro, exibe a mensagem de erro.
    if (error) {
        return <div>{error}</div>;
    }

    // Enquanto os dados do filme não forem carregados, exibe uma mensagem de carregamento.
    if (!movie) {
        return <div>Carregando...</div>;
    }

    // Se o filme foi carregado, renderiza o componente MovieDescription passando os dados do filme.
    return (
        <MovieDescription movie={movie} />
    );
};

export default MoviePage; // Exporta o componente MoviePage para ser utilizado em outras partes do aplicativo.
