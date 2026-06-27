
import { requireRole } from '@/app/lib/core/session';
import React from 'react';

const RecruiterLayout = async ({ children }) => {
    await requireRole('writer')
    return children;
};

export default RecruiterLayout;