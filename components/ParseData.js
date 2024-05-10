import FetchData from "../components/FetchData";
import Parser from "@postlight/parser";

const ParseData = async () => {
  let articleUrls = [];
  let articleCategories = [];
  let articleCategory;
  let articleData = [];
  const articleDataAll = await FetchData();
  /*
  for (let i = 0; i < articleData.length; i++) {
    let articleUrl = articleData[i][0];
    let articleCategory = articleData[i];
    console.log({ articleCategory });
    articleUrls.push(articleUrl, articleCategory);
  }
  //console.log({ articleUrls });
  */

  const parseWithRetry = async (url) => {
    try {
      return await Parser.parse(url);
    } catch (error) {
      throw error;
    }
  };

  const parsingPromises = articleDataAll.map(async (articleData) => {
    try {
      const result = await parseWithRetry(articleData[0]);

      for (let i = 1; i < articleData.length; i++) {
        //console.log({ articleUrl });
        articleCategory = articleData[i];
        articleCategories.push(articleCategory);
      }

      //console.log({ articleCategories });
      result.category = articleCategories;
      //console.log(`Parsed successfully: ${articleUrl}`);
      console.log({ result });
      return result;
    } catch (error) {
      //console.error(`Error parsing ${articleUrl[0]}`);
    }
  });

  const parsedArticles = await Promise.all(parsingPromises);

  //console.log({ parsedArticles });

  return parsedArticles;
};

export default ParseData;
