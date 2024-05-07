import { JSDOM } from "jsdom";
import Parser from "@postlight/parser";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {} from "path";

const page = `https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss`;
let articleUrls = [];
let articleUrl, articleCategory;
let articleCategories = [];
const FetchData = async () => {
  const res = await fetch(page, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  const html = await res.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const itemElements = document.getElementsByTagName("item"); /* 
  let articleCategories = document.querySelectorAll("category");
  // articleCategories = articleCategories.innerHTML;
  console.log({ articleCategories }); */
  extractArticleUrls();
  // extractArticleCategories();

  function extractArticleUrls() {
    for (let i = 0; i < itemElements.length; i++) {
      const itemElement = itemElements[i].innerHTML;

      const itemElement_ = itemElements[i];
      const categoryElements = itemElement_.querySelectorAll("category");
      categoryElements.forEach((categoryElement) => {
        const categoryContent = categoryElement.textContent.trim();
        if (categoryContent) {
          articleCategories.push(categoryContent);
        }
        return articleCategories;
      });

      const lines = itemElement.split("\n");
      lines.forEach((line) => {
        if (line.trim().startsWith("<link>")) {
          articleUrl = line.replace("<link>", "");
          articleUrls.push(articleUrl);
        }
        return articleUrls;
      });
    }
    return articleCategories, articleUrls;
  }
  console.log(articleCategories);

  return articleUrls;
};

export default FetchData;
