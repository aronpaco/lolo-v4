import FetchData from "../components/FetchData";
import Parser from "@postlight/parser";

const ParseData = async (feedUrl) => {
  let articleUrls = [];
  let articleCategories = [];
  let articleCategory;
  let articleData = [];
  const articleDataAll = await FetchData(feedUrl);

  const parseWithRetry = async (url) => {
    try {
      return await Parser.parse(url);
    } catch (error) {
      throw error;
    }
  };

  const parsingPromises = articleDataAll.map(async (articleData) => {
    try {
      let articleCategories = [];
      const result = await parseWithRetry(articleData[0]);

      for (let i = 1; i < articleData.length; i++) {
        articleCategory = articleData[i];
        articleCategories.push(articleCategory);
      }

      result.category = articleCategories;
      result.feed = feedUrl;
      return result;
    } catch (error) {
      // console.error(`Error parsing ${articleUrl}`);
    }
  });

  const parsedArticles = await Promise.all(parsingPromises);

  return parsedArticles;
};

export default ParseData;
