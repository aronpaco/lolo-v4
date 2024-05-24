"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  placeholder: string;
};

function Search({ placeholder }: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("page")?.toString() || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (searchTerm) {
      params.set("page", searchTerm);
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input">
        <label htmlFor="rss_url">Enter the URL of an RSS feed</label>
        <input
          placeholder={placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          autoFocus
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Search;
