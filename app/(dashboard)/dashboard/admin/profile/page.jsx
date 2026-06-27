import React from 'react';
import { getUserSession } from '@/app/lib/core/session';
import ProfilePageAdmin from './ProfilePageAdmin';

const page = async () => {
    const session = await getUserSession()
    const user = session?.user

    const name = user?.name
    const role = user?.role
    const image = user?.image

    return (
        <ProfilePageAdmin image={image} name={name} role={role}></ProfilePageAdmin>
    );
};

export default page;