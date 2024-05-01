import { JSDOM } from "jsdom";
import Parser from "@postlight/parser";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {} from "path";

const page = `https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss`;

const FetchData = async () => {
  const res = await fetch(page, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  const html = await res.text();
  // console.log({ html });

  // const data = await Parser.parse(page, html);
  // console.log({ data });
  /*
  const {
    title,
    author,
    date_published,
    dek,
    lead_image_url,
    content,
    next_page_url,
    url,
    domain,
    excerpt,
    word_count,
    direction,
    total_pages,
    rendered_pages,
  } = data;
*/
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const itemElements = document.getElementsByTagName("item");

  for (let i = 0; i < itemElements.length; i++) {
    const itemElement = itemElements[i].innerHTML;
    //const linkElement = itemElement.querySelector("link");
    //const linkContent = linkElement.textContent;
    const lines = itemElement.split("\n");
    console.log(lines[2]);
  }

  return html;
};

export default FetchData;
