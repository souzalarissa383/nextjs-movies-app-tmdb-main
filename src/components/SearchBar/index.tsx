'use client';

import { useEffect, useState } from 'react';
import './index.scss';

import { RiSearchFill } from "react-icons/ri";

type Props = {
    onSearchChange: (search: string) => void;
}

export default function SearchBar(
    props: Props
) {
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        props.onSearchChange(search);
    }, [search]);

    return (
        <div className="search-container">
        <div className="input-group">
           
            <input 
                type="text" 
                className="input-field" 
                placeholder="Pesquise por filmes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
              
             <div className="input-icon">
             <RiSearchFill />
            </div>
            </div>
            <button className="filter"> 
                <img src="/filter.svg" alt="Filtro" />
            </button>
       
        </div>
    );
}
