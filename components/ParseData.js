import FetchData from "../components/FetchData";
import Parser from "@postlight/parser";

let newArticle, result;
let results = [];
let parsedArticles = [];
const ParseData = async () => {
  const articleUrls = await FetchData();

  const parseWithRetry = async (url, retries = 3) => {
    try {
      return await Parser.parse(url);
    } catch (error) {
      if (retries > 0) {
        return await parseWithRetry(url, retries - 1);
      }
      throw error;
    }
  };

  // Use map to create an array of promises
  const parsingPromises = articleUrls.map(async (articleUrl) => {
    try {
      const result = await parseWithRetry(articleUrl);
      console.log(`Parsed successfully: ${articleUrl}`);
      return result;
    } catch (error) {
      console.error(`Error parsing ${articleUrl}`);
    }
  });

  const parsedArticles = await Promise.all(parsingPromises);

  // console.log({ parsedArticles });

  return parsedArticles;
};

export default ParseData;
