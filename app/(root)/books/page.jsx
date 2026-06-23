import React from 'react';
import BrowseBooksPage from './BrowseBooks';
import { getAllBooks } from '@/app/lib/api/books';

const BooksPage = async () => {
    const books = await getAllBooks()
    return (
        <BrowseBooksPage books={books}></BrowseBooksPage>
    );
};

export default BooksPage;