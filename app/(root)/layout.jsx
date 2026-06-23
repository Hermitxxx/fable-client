import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const layout = ({ children }) => {
    return (
        <section>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </section>
    );
};

export default layout;