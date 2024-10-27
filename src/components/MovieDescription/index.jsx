import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState e useEffect
import './index.scss'; // Importa o arquivo de estilos (CSS) para estilizar o componente
import Footer from '../Footer'; // Importa o componente Footer para ser exibido no final
import Loading from '../Loading'; // Importa o componente Loading para mostrar enquanto os dados estão sendo carregados

const MovieDescription = ({ movie }) => { // Componente que recebe um objeto movie como props
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento dos dados
    const [additionalInfo, setAdditionalInfo] = useState(null); // Estado para informações adicionais do filme
    const [trailer, setTrailer] = useState(null); // Estado para o trailer do filme

    useEffect(() => { // Hook para executar efeitos colaterais
        if (movie) { // Verifica se o objeto movie existe
            // Função para buscar informações adicionais do filme e o trailer
            const fetchAdditionalInfo = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=fd7de7243ea08e4dd35cc4a5297127e3&language=pt-BR&append_to_response=videos,credits`);
                    
                    if (!response.ok) {
                        throw new Error('Erro ao buscar informações adicionais do filme'); // Lança um erro se a resposta não for bem-sucedida
                    }

                    const data = await response.json(); // Converte a resposta em JSON
                    setAdditionalInfo(data); // Armazena as informações adicionais no estado
                    
                    // Busca o trailer do filme
                    const trailerData = data.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                    setTrailer(trailerData ? `https://www.youtube.com/embed/${trailerData.key}` : null); // Armazena o link do trailer no estado
                    
                    setIsLoading(false); // Indica que o carregamento foi concluído
                } catch (error) {
                    console.error('Erro ao buscar informações adicionais:', error); // Exibe erro no console se a requisição falhar
                }
            };

            fetchAdditionalInfo(); // Chama a função para buscar as informações
        }
    }, [movie]); // Dependência: executa o efeito sempre que o objeto movie mudar

    if (isLoading) { // Se estiver carregando
        return <Loading />; // Exibe o componente Loading
    }

    // Desestrutura dados adicionais
    const { release_date, runtime, spoken_languages, credits } = additionalInfo || {};
    const cast = credits?.cast?.slice(0, 5).map(actor => actor.name).join(', ') || 'Informação indisponível'; // Armazena os nomes dos 5 primeiros atores

    return (
        <div className="movie-description-container"> {/* Container principal do componente */}
            <div className="movie-header"> {/* Header com pôster e informações do filme */}
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // URL da imagem do pôster
                    alt={movie.title} // Atributo alt para acessibilidade
                    className="movie-poster" // Classe para estilização
                />
                <div className="movie-info"> {/* Container para as informações do filme */}
                    <h2 className="movie-title">{movie.title}</h2> {/* Título do filme */}
                    <p className="movie-rating"><strong>Avaliação:</strong> {movie.vote_average ? `${movie.vote_average * 10}%` : "N/A"}</p> {/* Avaliação do filme */}
                    <p><strong>Lançamento:</strong> {release_date || "Data não disponível"}</p> {/* Data de lançamento */}
                    <p><strong>Duração:</strong> {runtime ? `${runtime} minutos` : "Duração não disponível"}</p> {/* Duração do filme */}
                    <p><strong>Idioma:</strong> {spoken_languages?.[0]?.name || "Idioma não disponível"}</p> {/* Idioma falado */}
                    <p><strong>Elenco principal:</strong> {cast}</p> {/* Nomes dos atores principais */}
                    <p className="synopsis-label" style={{ fontSize: '16px' }}><strong>Sinopse:</strong></p> {/* Rótulo da sinopse */}
                    <p className="movie-overview">{movie.overview || "Sinopse não disponível."}</p> {/* Sinopse do filme */}
                </div>
            </div>
            <div className="movie-details"> {/* Container para os detalhes do filme */}
                {trailer && ( // Verifica se o trailer existe
                    <div className="movie-trailer"> {/* Container para o trailer */}
                        <h3>Trailer</h3> {/* Título do trailer */}
                        <iframe
                            width="100%"
                            height="400"
                            src={trailer} // URL do trailer
                            title="Trailer do Filme" // Título do iframe para acessibilidade
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" // Permissões do iframe
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
            <Footer /> {/* Adiciona o rodapé */}
        </div>
    );
};

export default MovieDescription; // Exporta o componente
