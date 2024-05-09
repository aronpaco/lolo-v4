import FetchData from "../components/FetchData";
import Parser from "@postlight/parser";

const ParseData = async () => {
  let articleUrls = [];
  const articleData = await FetchData();

  for (let i = 0; i < articleData.length; i++) {
    let articleUrl = articleData[i][0];
    articleUrls.push(articleUrl);
  }
  const parseWithRetry = async (url) => {
    try {
      return await Parser.parse(url);
    } catch (error) {
      throw error;
    }
  };

  const parsingPromises = articleUrls.map(async (articleUrl) => {
    try {
      const result = await parseWithRetry(articleUrl);
      // console.log(`Parsed successfully: ${articleUrl}`);
      return result;
    } catch (error) {
      // console.error(`Error parsing ${articleUrl}`);
    }
  });

  const parsedArticles = await Promise.all(parsingPromises);

  // console.log({ parsedArticles });

  return parsedArticles;
};

export default ParseData;
