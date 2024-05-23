import DisplayData from "@/components/DisplayData";
import Search2 from "@/components/Search2";
import { Suspense } from "react";
import TestComponent from "@/components/TestComponent"

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
            <h1>Search page</h1>
            <Search2 placeholder="Search..."/>
            <h2>Articles</h2>
            <Suspense>      
                <DisplayData page={page}/>
            </Suspense>
        </div>
    )
}