import React from 'react';
import { getUserSession } from '@/app/lib/core/session';
import ProfilePageReader from './ProfilePageReader';

const page = async () => {
    const session = await getUserSession()
    const user = session?.user

    const name = user?.name
    const role = user?.role
    const image = user?.image
    return (
        <ProfilePageReader image={image} name={name} role={role}></ProfilePageReader>
    );
};

export default page;