import { getPurchasedBooks } from '@/app/lib/api/transactions';
import { getUserSession } from '@/app/lib/core/session';
import React from 'react';
import ReaderDashboard from './ReaderDashboard';

const ReaderDashboardPage = async () => {
    const session = await getUserSession()
    const userId = session?.user?.id

    const books = await getPurchasedBooks(userId)
    return (
        <ReaderDashboard books={books}></ReaderDashboard>
    );
};

export default ReaderDashboardPage;