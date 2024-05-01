import ParseData from "../components/ParseData";

const DisplayData = async () => {
  try {
    const parsedArticles = await ParseData();
    console.log("Done parsing");
    // console.log({ parsedArticles });

    parsedArticles.sort((b, a) => {
      const dateA = new Date(a.date_published);
      const dateB = new Date(b.date_published);
      return dateA - dateB;
    }, []);

    return (
      <div>
        <h1>Articles</h1>
        {parsedArticles.map((article, index) => {
          if (!article || !article.title) {
            return null;
          }

          return (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h2>{article.title}</h2>
              <br />
              <strong>Author:</strong> {article.author || "Unknown"}
              <br />
              <strong>Date Published:</strong> {article.date_published}
              <br />
              <strong>Excerpt:</strong> {article.excerpt}
              <br />
              <strong>Word Count:</strong> {article.word_count}
              <br />
              <strong>URL:</strong> <a href={article.url}>{article.url}</a>
              <br />
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error fetching articles.</div>;
  }
};

export default DisplayData;
