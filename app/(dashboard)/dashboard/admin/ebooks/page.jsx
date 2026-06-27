import React from 'react';
import AdminEbooksPage from './Ebooks';
import { getAllBooks, getAllBooksAdmin } from '@/app/lib/api/books';

const EbooksPage = async () => {
    const data = await getAllBooksAdmin('')
    const ebooks = data.books

    console.log(ebooks);
    return (
        <AdminEbooksPage ebooks={ebooks}></AdminEbooksPage>
    );
};

export default EbooksPage;