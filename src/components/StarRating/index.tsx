'use client';

import { FaStar } from "react-icons/fa6"; // Ícone de estrela preenchida
import { FaRegStar } from "react-icons/fa6"; // Ícone de estrela vazia
import './index.scss';

export type Props = {
    rating: number, // Propriedade que define a classificação do filme
}

export default function StarRating(props: Props) {
    const numStars = Math.round(props.rating / 2); // Converte a classificação (0-10) para estrelas (0-5)

    const starsArrayGordo = []; // Estrelas preenchidas
    const starsArrayMagro = []; // Estrelas vazias

    // Preenche os arrays de estrelas
    for (let i = 0; i < 5; i++) {
        if (i < numStars) {
            starsArrayGordo.push(i); // Adiciona estrela preenchida
        } else {
            starsArrayMagro.push(i); // Adiciona estrela vazia
        }
    }

    return (
        <div className="movie-rate">
            {starsArrayGordo.map(index => <FaStar key={index} />)} {/*Renderiza estrelas preenchidas*/} 
            {starsArrayMagro.map(index => <FaRegStar key={index} />)} {/*Renderiza estrelas vazias*/}
        </div>
    )
};
