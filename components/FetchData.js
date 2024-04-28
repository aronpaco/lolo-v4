import { JSDOM } from "jsdom";

import * as React from "react";
import Typography from "@mui/material/Typography";
import {} from "path";

const page = `https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss`;
console.log(page);



const combinedDataOkidoki = async () => {
  const res = await fetch(page, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  const html = await res.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;
  console.log({html})

  return html;
};

export default combinedDataOkidoki;
