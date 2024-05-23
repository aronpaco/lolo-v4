import React, { Suspense } from 'react'
import FetchData from '../components/FetchData'
import RssParser from '../components/RssParser'
import ParseData from '../components/ParseData'
import DisplayData from '../components/DisplayData'
import Link from 'next/link'

export default async function Index() {

  return (
    <body>
      <div>
        <h2>Articles</h2>
        <Suspense>
          <DisplayData/>
        </Suspense>
      </div>
    </body>
  )
}