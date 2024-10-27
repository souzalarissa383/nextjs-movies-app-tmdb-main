'use client'; // Indica que este componente é um cliente React

import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import MovieCard from '../MovieCard'; // Importa o componente MovieCard para exibir informações de cada filme
import { useEffect, useState } from 'react'; // Importa hooks do React para gerenciamento de estado e efeitos colaterais
import { MovieType } from '@/types/movie'; // Importa o tipo MovieType para tipagem do estado
import './index.scss'; // Importa os estilos do componente
import SearchBar from '../SearchBar'; // Importa o componente de barra de pesquisa
import Loading from '../Loading'; // Importa o componente de carregamento
import Pagination from '../Pagination'; // Importa o componente de paginação

export default function MovieList() {
    const [movies, setMovies] = useState<MovieType[]>([]); // Estado para armazenar a lista completa de filmes
    const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]); // Estado para armazenar filmes filtrados pela pesquisa
    const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para indicar se os filmes estão sendo carregados
    const [search, setSearch] = useState<string>(''); // Estado para armazenar o termo de busca
    const [currentPage, setCurrentPage] = useState<number>(1); // Estado para a página atual da lista de filmes
    const totalPages = 5; // Número total de páginas (definido estaticamente para fins de exemplo)

    // Efeito que busca filmes ao montar o componente ou mudar a página atual
    useEffect(() => {
        getMovies();
    }, [currentPage]);

    // Efeito que filtra os filmes com base no termo de pesquisa
    useEffect(() => {
        let newMovieList = [...movies]; // Cria uma cópia da lista de filmes
        if (search !== '') { // Se há um termo de pesquisa
            newMovieList = newMovieList.filter(movie =>
                formatString(movie.title).includes(formatString(search)) // Filtra filmes com títulos que incluem o termo de pesquisa
            );
        }
        setFilteredMovies(newMovieList); // Atualiza a lista de filmes filtrados
    }, [search, movies]);

    // Função assíncrona para buscar filmes da API
    const getMovies = async () => {
        setIsLoading(true); // Define o estado de carregamento como verdadeiro
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie', // URL da API para buscar filmes
            params: {
                api_key: 'fd7de7243ea08e4dd35cc4a5297127e3', // Chave da API
                language: 'pt-BR', // Define a linguagem como português
                page: currentPage // Passa a página atual como parâmetro
            }
        }).then(response => {
            setMovies(response.data.results); // Atualiza o estado com os resultados da API
            setFilteredMovies(response.data.results); // Também define os filmes filtrados inicialmente como os resultados
            setIsLoading(false); // Define o estado de carregamento como falso
        });
    };

    // Função para formatar strings (normaliza e remove acentos)
    const formatString = (value: string) => {
        return value
            .toLowerCase() // Converte a string para minúsculas
            .trim() // Remove espaços em branco no início e no final
            .normalize('NFD') // Normaliza a string para decompor caracteres acentuados
            .replace(/[\u0300-\u036f]/g, ''); // Remove os acentos
    };

    // Se os filmes estão carregando, exibe o componente Loading
    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className='movie-container'> {/* Contêiner principal da lista de filmes */}
            <div className='sub-header'> {/* Subtítulo que contém a barra de pesquisa*/}
                <SearchBar onSearchChange={setSearch} /> {/* Componente de barra de pesquisa*/}
            </div>
            <ul className='movie-list'> {/* Lista não ordenada que conterá os cartões dos filmes*/}
                {filteredMovies.map(movie => ( // Mapeia os filmes filtrados e cria um cartão para cada um
                    <MovieCard
                        key={movie.id} // Usa o ID do filme como chave
                        movie={movie} // Passa os dados do filme para o componente MovieCard
                    />
                ))}
            </ul>
            <Pagination // Componente de paginação
                currentPage={currentPage} // Página atual
                totalPages={totalPages} // Total de páginas
                onPageChange={(page: number) => setCurrentPage(page)} // Função para mudar a página atual
            />
        </section>
    );
}
