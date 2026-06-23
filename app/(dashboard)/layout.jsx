

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar></Sidebar>
                <div className='flex-1 overflow-y-scroll'>
                    {/* <Navbar></Navbar> */}
                    {children}
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;