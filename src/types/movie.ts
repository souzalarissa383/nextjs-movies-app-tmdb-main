// Define uma interface chamada MovieType para descrever a estrutura de um objeto de filme
export interface MovieType {
    // 'id' é um número que representa a identificação única do filme
    id: number;
    
    // 'title' é uma string que representa o título do filme
    title: string;
    
    // 'poster_path' é uma string que contém o caminho da imagem do cartaz do filme
    // Este caminho pode ser usado para construir a URL completa para a imagem
    poster_path: string;
    
    // 'vote_average' é um número que representa a média de votos do filme
    // Geralmente, esse valor está em uma escala de 0 a 10
    vote_average: number;
    
    // 'overview' é uma string que contém uma breve descrição do filme
    // Pode ser null se não houver descrição disponível
    overview: null | string;
}
