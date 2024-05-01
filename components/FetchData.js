import { JSDOM } from "jsdom";
import Parser from "@postlight/parser";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {} from "path";

const page = `https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss`;
let articleUrls = [];
let articleUrl;
const FetchData = async () => {
  const res = await fetch(page, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  const html = await res.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const itemElements = document.getElementsByTagName("item");
  extractArticleUrls();

  function extractArticleUrls() {
    for (let i = 0; i < itemElements.length; i++) {
      const itemElement = itemElements[i].innerHTML;
      const lines = itemElement.split("\n");
      lines.forEach((line) => {
        if (line.trim().startsWith("<link>")) {
          articleUrl = line.replace("<link>", "");
          articleUrls.push(articleUrl);
        } else if (
          line.trim().startsWith("&lt;link&gt;") &&
          line.trim().endsWith("&lt;/link&gt;")
        ) {
          articleUrl = line.replace("&lt;link&gt;", "");
          articleUrl = line.replace("&lt;/link&gt;", "");
          articleUrls.push(articleUrl);
        }
        return articleUrls;
      });
    }
    return articleUrls;
  }
  console.log({ articleUrls });
  return articleUrls;
};

export default FetchData;
