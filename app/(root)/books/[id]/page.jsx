import { getBookDetailsById, getBooksByWriterId } from '@/app/lib/api/books';
import React from 'react';
import BookDetails from './BookDetails';

const BooksDetailsPage = async ({ params }) => {
    const { id } = await params
    const book = await getBookDetailsById(id)
    const writerWorks = await getBooksByWriterId(book.writerId)
    return (
        <BookDetails writerWorks={writerWorks} book={book}></BookDetails>
    );
};

export default BooksDetailsPage;