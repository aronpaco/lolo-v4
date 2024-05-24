import DisplayData from "@/components/DisplayData";
import Search from "@/components/Search";
import { Suspense } from "react";

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      page?: string;
    };
  }) {
    const page = searchParams?.page || "";

    return(
        <div>
            <h1>Lolo-v4</h1>
            <Search placeholder="https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss"/>
            <h2>Articles</h2>
            <Suspense fallback={<p>Loading feed...</p>}>      
                <DisplayData page={page}/>
            </Suspense>
        </div>
    )
}