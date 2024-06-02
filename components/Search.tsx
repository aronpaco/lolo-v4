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
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (searchTerm && !Array.from(params.getAll("page")).includes(searchTerm)) {
      params.append("page", searchTerm);
    }

    replace(`${pathname}?${params.toString()}`);
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input">
        <h3>Enter the URL of an RSS feed</h3>
        <input
          placeholder={placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          autoFocus
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Search;
