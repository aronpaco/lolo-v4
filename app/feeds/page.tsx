import Link from 'next/link';
import React from 'react'

export default function FeedList() {
    const feedId = 100

    return(
        <>
            <h1>feed list</h1>
            
        <Link href={`feeds/${feedId}`}>Feed of {feedId}</Link>
        </>
    )
}