import { JSDOM } from "jsdom";
import Parser from '@postlight/parser'
import * as React from "react";
import Typography from "@mui/material/Typography";
import {} from "path";

const url = `https://flipboard.com/@raimoseero/feed-nii8kd0sz`;

const FetchData = async () => {
  Parser.parse(url).then(result => console.log("result: ",result));
  

  const res = await fetch(url, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  const html = await res.text();

  const dom = new JSDOM(html);

  // const document = dom.window.document;
  // console.log({html})

  return html
};

export default FetchData;
