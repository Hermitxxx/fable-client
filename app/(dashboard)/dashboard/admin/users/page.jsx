import React from 'react';
import AllUsers from './AllUsers';
import { getAllUsers } from '@/app/lib/api/users';

const AdminUsersPage = async () => {
    const allUsers = await getAllUsers() || []
    // console.log(users);
    return (
        <>
            <AllUsers allUsers={allUsers}></AllUsers>
        </>
    );
};

export default AdminUsersPage;