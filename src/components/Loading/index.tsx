'use client';


import ReactLoading from 'react-loading';
import './index.scss';

export default function Loading() {
    return (
        <div className='loading-container'>
            <ReactLoading type='spin' color='#B744F714' height={'5%'} width={'5%'} />
        </div>
    );
}