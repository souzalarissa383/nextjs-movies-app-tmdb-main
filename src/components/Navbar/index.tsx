'use client';

import Image from 'next/image';
import './index.scss';
import Link from 'next/link';

export default function Navbar() {
    const handleSearchChange = (search: string) => console.log(search);

    return (
        <nav className="navbar">
            <Link href="/movie"> 
            <Image
                src="/logo-cubos.svg"
                alt="Movies App Logo"
                width={160}
                height={36}
                priority
            />
            </Link>
            
           
        <h1 className="page-title">Movies</h1>
        <button className="light-mode">
                <img src="/children.svg" alt="Light Mode" />
            </button>
        </nav>
    );
}