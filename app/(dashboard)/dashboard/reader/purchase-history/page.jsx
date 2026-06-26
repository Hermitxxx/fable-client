import { getPurchasedBooks } from '@/app/lib/api/transactions';
import { getUserSession } from '@/app/lib/core/session';
import React from 'react';
import PurchasedBooks from './PurchasedBooks';

const PurchaseHistoryPage = async () => {
    const session = await getUserSession()
    const user = session?.user

    const books = await getPurchasedBooks(user?.id)

    return (
        <>
            <PurchasedBooks books={books}></PurchasedBooks>
        </>
    );
};

export default PurchaseHistoryPage;