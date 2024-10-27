'use client'; // Indica que este componente é um cliente, ou seja, executado no navegador.

import { MovieType } from '@/types/movie'; // Importa o tipo MovieType, que define a estrutura do objeto filme.
import StarRating from '../StarRating'; // Importa o componente StarRating para exibir a avaliação do filme.
import './index.scss'; // Importa o arquivo de estilos (CSS) para estilizar o componente.
import Link from 'next/link'; // Importa o componente Link do Next.js para navegação entre páginas.

export type Props = {
    movie: MovieType, // Define o tipo das propriedades que o componente MovieCard recebe.
}

// Componente MovieCard que recebe um objeto movie como props.
export default function MovieCard(props: Props) {
    const movie = props.movie; // Desestrutura o objeto movie das props recebidas.

    return (
        <li className="movie-card"> {/* Cada cartão de filme é um item de lista */}
            <div className='movie-poster'> {/* Container para o pôster do filme */}
                <img 
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} // URL da imagem do pôster do filme.
                    alt={movie.title} // Atributo alt para acessibilidade, usando o título do filme.
                />
            </div>

            <div className='movie-infos'> {/* Container para as informações do filme */}
                <p className='movie-title'>
                    {movie.title} {/* Exibe o título do filme */}
                </p>
                
                <div className='hidden-content'> {/* Container para conteúdo que pode ser oculto inicialmente */}
                    {movie.vote_average > 0 && // Verifica se a média de votos é maior que 0
                        <StarRating rating={movie.vote_average}/> // Exibe a classificação em estrelas, se houver
                    }
                    {movie.overview && // Verifica se há uma sinopse disponível
                        <p className='movie-description'>
                            {movie.overview.length > 100 // Se a sinopse for longa
                                ? `${movie.overview.substring(0, 100)}...` // Exibe os primeiros 100 caracteres e adiciona "..."
                                : movie.overview // Se a sinopse for curta, exibe-a toda
                            }
                        </p>
                    }
                    <Link href="/movie-description"> {/* Link para a página de descrição do filme */}
                        <button className="btn-default">Ver mais</button> {/* Botão para ver mais detalhes */}
                    </Link>
                </div>
            </div>
        </li>
    );
}
