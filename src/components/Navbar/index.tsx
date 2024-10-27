'use client'; // Indica que este componente deve ser renderizado no lado do cliente

import Image from 'next/image'; // Importa o componente Image do Next.js para otimização de imagens
import './index.scss'; // Importa o arquivo de estilo SCSS para o componente
import Link from 'next/link'; // Importa o componente Link do Next.js para navegação entre páginas

export default function Navbar() {
    // Função que trata a mudança de pesquisa (atualmente apenas registra no console)
    const handleSearchChange = (search: string) => console.log(search);

    return (
        <nav className="navbar"> {/* Elemento nav que representa a barra de navegação */}
            <Link href="/movie"> {/* Link que leva à página de filmes */}
                <Image
                    src="/logo-cubos.svg" // Caminho para a imagem do logotipo
                    alt="Movies App Logo" // Texto alternativo para a imagem
                    width={160} // Largura da imagem
                    height={36} // Altura da imagem
                    priority // Prioriza o carregamento da imagem
                />
            </Link>
            
            <h1 className="page-title">Movies</h1> {/* Título da página exibido na barra de navegação */}
            
            <button className="light-mode"> {/* Botão para alternar entre modos (claro e escuro) */}
                <img src="/children.svg" alt="Light Mode" /> {/* Ícone representando o modo claro */}
            </button>
        </nav>
    );
}
