import React from "react";

type Props = {
    feedUrls?: string[];
};

function FeedsDisplayed({ feedUrls }: Props) {
    return (
        <div>
            Feeds displayed: {feedUrls && feedUrls.map((url, index) => <div key={index}>{url}</div>)}
        </div>
    );
}

export default FeedsDisplayed;
