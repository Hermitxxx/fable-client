import React from 'react';
import WriterDashboard from './components/WriterDashboard';
import { getUserSession } from '@/app/lib/core/session';
import { getWriterStats } from '@/app/lib/api/writers';

const WriterPage = async () => {
    const session = await getUserSession();
    const data = await getWriterStats(session?.user?.id);

    const { stats, books } = data

    console.log(stats);
    return (
        <WriterDashboard stats={stats} books={books || []} />
    );
};

export default WriterPage;
