import { getAllTrans } from '@/app/lib/api/transactions';
import React from 'react';
import TransactionsPage from './TransactionsPage';

const page = async () => {
    const transactions = await getAllTrans()
    return (
        <TransactionsPage transactions={transactions}></TransactionsPage>
    );
};

export default page;