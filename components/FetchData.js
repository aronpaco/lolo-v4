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
  const articles = document.getElementsByTagName("item");

  for (let i = 0; i < articles.length; i++) {
    const articleContent = articles[i].innerHTML;
    console.log({ articleContent });
  }

  return html;
};

export default FetchData;
