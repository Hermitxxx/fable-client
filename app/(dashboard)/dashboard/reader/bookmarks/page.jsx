import React from 'react';
import { getUserSession } from '@/app/lib/core/session';
import { getBookmarkBooks } from '@/app/lib/api/bookmark';
import ReaderBookmarkBooks from './ReaderBookmarkBooks';

const ReaderBookmarksPage = async () => {
    const session = await getUserSession()
    const user = session?.user
    const userId = user?.id

    const bookmarkBooks = await getBookmarkBooks(userId)
    console.log(bookmarkBooks);
    return (
        <ReaderBookmarkBooks bookmarkBooks={bookmarkBooks}></ReaderBookmarkBooks>
    );
};

export default ReaderBookmarksPage;