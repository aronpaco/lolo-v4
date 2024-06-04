import DisplayData from "@/components/DisplayData";
import Search from "@/components/Search";
import { Suspense } from "react";
import FeedsDisplayed from "@/components/FeedsDisplayed"

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      feedUrl?: string;
    };
  }) {
    const feedUrl = searchParams?.feedUrl || "";

    return(
          <body>
            <div className="main-container">
              <h1>Lolo-v4</h1>
              <Search placeholder="https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss"/>
              
              <h2>Articles</h2>
              <Suspense fallback={<p>Loading feed...</p>}>      
                  <DisplayData feedUrl={feedUrl}/>
              </Suspense>

            </div>
          </body>
    )
}