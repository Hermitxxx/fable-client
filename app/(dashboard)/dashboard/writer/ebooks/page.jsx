import React from 'react';
import { getUserSession } from '@/app/lib/core/session';
import { getWriterStats } from '@/app/lib/api/writers';
import WriterEbooks from './Ebooks';

const WriterEbooksPage = async () => {
    const session = await getUserSession();
    const data = await getWriterStats(session?.user?.id);

    const { stats, books } = data
    return (
        <WriterEbooks ebooks={books} stats={stats}></WriterEbooks>
    );
};

export default WriterEbooksPage;