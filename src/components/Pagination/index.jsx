'use client'; // Indica que este componente deve ser renderizado no lado do cliente

import React from 'react'; // Importa o React para criar componentes
import './index.scss'; // Importa o arquivo de estilo SCSS para o componente

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    // Gera um array de números representando as páginas disponíveis
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination"> {/* Contêiner principal para os botões de paginação */}
            <button
                className="pagination-button" // Classe de estilo para o botão de paginação
                disabled={currentPage === 1} // Desabilita o botão se estiver na primeira página
                onClick={() => onPageChange(currentPage - 1)} // Chama a função onPageChange para ir à página anterior
            >
                &lt; {/* Ícone para retroceder uma página */}
            </button>
            {pages.map((page) => ( // Mapeia cada número de página para criar um botão
                <button
                    key={page} // A chave única para cada botão
                    className={`pagination-button ${page === currentPage ? 'active' : ''}`} // Adiciona classe 'active' se for a página atual
                    onClick={() => onPageChange(page)} // Chama a função onPageChange ao clicar na página correspondente
                >
                    {page} {/* Número da página exibido no botão */}
                </button>
            ))}
            <button
                className="pagination-button" // Classe de estilo para o botão de paginação
                disabled={currentPage === totalPages} // Desabilita o botão se estiver na última página
                onClick={() => onPageChange(currentPage + 1)} // Chama a função onPageChange para ir à próxima página
            >
                &gt; {/* Ícone para avançar uma página */}
            </button>
        </div>
    );
}
