// pages/index.js
"use client"
import { GetQuery } from '@/components/GetQuery';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log(inputValue);
  };

  const feedId = 100

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a value"
      />
      <button onClick={handleSubmit}>Submit</button>
      <Link href={`feeds/${feedId}`}>Feed of {feedId}</Link>
    </div>
  );
}
