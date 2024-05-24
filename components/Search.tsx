"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";


type Props = {
  placeholder: string;
};

function Search({ placeholder }: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("page", term);
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get("page")?.toString()} autoFocus />
  );
}

export default Search;