import React from 'react';
import BrowseBooksPage from './BrowseBooks';
import { getAllBooks } from '@/app/lib/api/books';
import { getAllWriters } from '@/app/lib/api/writers';

// page.jsx is a Server Component — it reads searchParams and passes
// everything down to the client component as plain props.
const BooksPage = async ({ searchParams }) => {
    const params = await searchParams;

    const search = params?.search || "";
    const genre = params?.genre || "";
    const writer = params?.writer || "";
    const page = parseInt(params?.page || "1", 10);

    // Build a query string and forward it to the backend
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (genre) query.set("genre", genre);
    if (writer) query.set("writer", writer);
    if (page) query.set("page", String(page));
    query.set("limit", "9"); // 9 books per page (3×3 grid)

    const writers = await getAllWriters()

    const { books, total, totalPages } = await getAllBooks(query.toString());

    return (
        <BrowseBooksPage
            writers={writers}
            books={books}
            total={total}
            totalPages={totalPages}
            currentPage={page}
            currentSearch={search}
            currentGenre={genre}
            currentWriter={writer}
        />
    );
};

export default BooksPage;