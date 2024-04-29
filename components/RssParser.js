import Parser from "@postlight/parser";
import FetchData from "./FetchData";

const RssParser = async () => {
  const page = `https://flipboard.com/@raimoseero/feed-nii8kd0sz`;
  const data = await Parser.parse(page);
  console.log({ data });
  const { title, content } = data;

  return (
    <div>
      <h1>{title}</h1>
      <div>{content}</div>
    </div>
  );
};

export default RssParser;
