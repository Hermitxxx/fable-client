import React from 'react';
import AdminEbooksPage from './Ebooks';
import { getAllBooks } from '@/app/lib/api/books';

const EbooksPage = async () => {
    const ebooks = await getAllBooks()
    return (
        <AdminEbooksPage ebooks={ebooks}></AdminEbooksPage>
    );
};

export default EbooksPage;