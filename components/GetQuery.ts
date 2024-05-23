"use client"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { NextRequest } from "next/server";

export default function GetQuery() {
    const searchParams = useSearchParams();
    let defaultValue = searchParams.get('query')?.toString()

    return defaultValue
}
