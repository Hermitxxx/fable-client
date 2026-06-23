'use client'

import { getBooksByWriterId } from '@/app/lib/api/books';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const OtherWorks = ({ writerId }) => {
    const [works, setWorks] = useState([])

    useEffect(() => {
        try {
            const getWriterWorks = async () => {
                const writerWorks = await getBooksByWriterId(writerId)
                setWorks(writerWorks)
                return writerWorks
            }

            getWriterWorks()
        } catch (error) {
            return
        }
    }, [writerId])

    console.log(works); // returning undefined
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {works.map((book) => (
                <div
                    key={book._id}
                    className="card-ink p-5 flex flex-col justify-between bg-[#F0E3CE]"
                >
                    <div className="space-y-2">
                        <span className="text-[9px] font-bold text-[#CC7722] tracking-widest uppercase font-display">
                            {book.genre}
                        </span>
                        <h4 className="font-display font-bold text-base text-[#0D0D15]">
                            {book.title}
                        </h4>
                    </div>
                    <div className="flex justify-between items-center mt-6 pt-3 border-t border-[#0D0D15]/10">
                        <span className="font-display font-bold text-sm text-[#0D0D15]">
                            ¥{book.price.toFixed(2)}
                        </span>
                        <Link href={`/books/${book._id}`}>
                            <button className="btn-ghost text-[10px] py-1 px-3 shadow-ink-sm uppercase font-display">
                                inspect scroll
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OtherWorks;