import DisplayData from "@/components/DisplayData";
import Search from "@/components/Search";
import { Suspense } from "react";
import FeedsDisplayed from "@/components/FeedsDisplayed"

export default function Page({
    searchParams,
  }: {
    searchParams?: {
      feedUrl?: string | string[];
    };
  }) {
    const feedUrls = Array.isArray(searchParams?.feedUrl)
      ? searchParams?.feedUrl
      : [searchParams?.feedUrl].filter(Boolean);

    return(
        <div>
            <h1>Lolo-v4</h1>
            <Search placeholder="https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss"/>
            
            <h2>Articles</h2>
            <Suspense fallback={<p>Loading feed...</p>}>      
                {feedUrls.map((feedUrl, index) => (
                  <DisplayData key={index} feedUrl={feedUrl}/>
                ))}
            </Suspense>
        </div>
    )
}
