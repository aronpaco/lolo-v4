import ParseData from "../components/ParseData";

const DisplayData = async () => {
  try {
    const parsedArticles = await ParseData();
    console.log("Done parsing");

    parsedArticles.sort((b, a) => {
      const dateA = new Date(a.date_published);
      const dateB = new Date(b.date_published);
      return dateA - dateB;
    });

    return (
      <div className="articles-container">
        <h1>Articles</h1>
        {parsedArticles.map((article, index) => {
          if (!article || !article.title) {
            return null;
          }

          return (
            <div key={index} className="article-card">
              <h2 className="article-title">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h2>

              <p className="article-meta">
                <strong>Author:</strong> {article.author || "Unknown"} <br />
                <strong>Date Published:</strong> {article.date_published}
              </p>

              <p>
                <strong>Word Count:</strong> {article.word_count} <br />
              </p>
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
