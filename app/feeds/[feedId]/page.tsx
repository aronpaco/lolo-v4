import React from 'react'

export default function FeedDetails({
    params,
}: {
    params: {feedId: string }
}) {
        return <h1>Feed: {params.feedId}</h1>
}
