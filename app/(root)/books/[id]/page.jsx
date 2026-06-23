import { getBookDetailsById } from '@/app/lib/api/books';
import React from 'react';
import BookDetails from './BookDetails';

const BooksDetailsPage = async ({ params }) => {
    const { id } = await params
    const book = await getBookDetailsById(id)
    return (
        <BookDetails book={book}></BookDetails>
    );
};

export default BooksDetailsPage;