import React from 'react';
import WriterBookmarkBooks from './WriterBookmarkBooks';
import { getUserSession } from '@/app/lib/core/session';
import { getBookmarkBooks } from '@/app/lib/api/bookmark';

const WriterBookmarks = async () => {
    const session = await getUserSession()
    const user = session?.user
    const userId = user?.id

    const bookmarkBooks = await getBookmarkBooks(userId)
    console.log(bookmarkBooks);
    return (
        <WriterBookmarkBooks bookmarkBooks={bookmarkBooks}></WriterBookmarkBooks>
    );
};

export default WriterBookmarks;