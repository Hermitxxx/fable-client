import LoadingSpinner from '@/components/LoadingSpinner';
import SkeletonGrid from '@/components/SkeletonGrid';
import React from 'react';

const loading = () => {
    return (
        <section className='flex items-center justify-center min-h-screen'>
            <LoadingSpinner size={60}></LoadingSpinner>
        </section>
    );
};

export default loading;