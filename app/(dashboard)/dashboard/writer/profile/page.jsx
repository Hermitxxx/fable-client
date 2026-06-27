import React from 'react';
import ProfilePage from './Profile';
import { getUserSession } from '@/app/lib/core/session';

const page = async () => {
    const session = await getUserSession()
    const user = session?.user

    const name = user?.name
    const role = user?.role
    const image = user?.image
    return (
        <ProfilePage image={image} name={name} role={role}></ProfilePage>
    );
};

export default page;