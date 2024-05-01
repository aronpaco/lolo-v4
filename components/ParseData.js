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
        console.log(`Retrying ${url}. Remaining retries: ${retries}`);
        return await parseWithRetry(url, retries - 1);
      }
      throw error;
    }
  };

  articleUrls.forEach(async (articleUrl) => {
    try {
      const result = await parseWithRetry(articleUrl);
      results.push(result);
      console.log(`Parsed successfully: ${articleUrl}`);
      parsedArticles.push(result);
    } catch (error) {
      console.error(`Error parsing ${articleUrl}:`, error);
    }
  });

  /*
  Parser.parse("https://techcrunch.com/2023/11/28/plane-takes-on-jira-with-open-source-project-management-tools-for-software-teams/").then((result) =>
    console.log({ result })
  );
*/
  /*
  for (const articleUrl of articleUrls) {
    Parser.parse(articleUrl).then((result) => console.log("i"));
    results.push(result);
  }
  console.log({ results });
  */
  return articleUrls;
};

export default ParseData;
