'use client';

import { useEffect, useState } from 'react'; // Importa hooks do React
import './index.scss'; // Importa estilos específicos para o componente

import { RiSearchFill } from "react-icons/ri"; // Importa o ícone de pesquisa

// Define o tipo para as props que o componente receberá
type Props = {
    onSearchChange: (search: string) => void; // Função callback para lidar com mudanças na busca
}

// Componente funcional SearchBar
export default function SearchBar(props: Props) {
    const [search, setSearch] = useState<string>(''); // Estado local para armazenar o texto da busca

    // Efeito que chama a função onSearchChange sempre que o texto da busca mudar
    useEffect(() => {
        props.onSearchChange(search); // Passa o texto da busca para o pai
    }, [search]); // Executa quando a variável 'search' muda

    return (
        <div className="search-container"> {/* Contêiner principal da barra de busca */}
            <div className="input-group"> {/* Agrupando o campo de entrada e o ícone */}
                <input 
                    type="text" 
                    className="input-field" // Classe para o campo de entrada
                    placeholder="Pesquise por filmes" // Texto de placeholder
                    value={search} // Valor do campo de entrada ligado ao estado
                    onChange={(e) => setSearch(e.target.value)} // Atualiza o estado ao digitar
                />
                <div className="input-icon"> {/* Ícone de pesquisa */}
                    <RiSearchFill /> {/* Componente do ícone de pesquisa */}
                </div>
            </div>
            <button className="filter"> {/* Botão para aplicar filtros */}
                <img src="/filter.svg" alt="Filtro" /> {/* Imagem do filtro */}
            </button>
        </div>
    );
}
