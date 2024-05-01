import ParseData from "../components/ParseData";

let parsedArticles;
const DisplayData = async () => {
  const parsedArticles = await ParseData();
  console.log({ parsedArticles });

  return 0;
};

export default DisplayData;
