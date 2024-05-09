import FetchData from "../components/FetchData";
import Parser from "@postlight/parser";

const ParseData = async () => {
  let articleUrls = [];
  const articleData = await FetchData();

  for (let i = 0; i < articleData.length; i++) {
    let articleUrl = articleData[i][0];
    let articleCategory = articleData[i];
    articleUrls.push(articleUrl, articleCategory);
  }
  console.log({ articleUrls });

  const parseWithRetry = async (url) => {
    try {
      return await Parser.parse(url);
    } catch (error) {
      throw error;
    }
  };

  const parsingPromises = articleUrls.map(async (articleUrl) => {
    try {
      const result = await parseWithRetry(articleUrl[0]);
      let articleCategory = articleUrl[1];
      console.log({ articleCategory });
      result.category = articleCategory;
      //console.log(`Parsed successfully: ${articleUrl}`);
      return result;
    } catch (error) {
      //console.error(`Error parsing ${articleUrl[0]}`);
    }
  });

  const parsedArticles = await Promise.all(parsingPromises);

  console.log({ parsedArticles });

  return parsedArticles;
};

export default ParseData;
