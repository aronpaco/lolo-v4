import React from "react";
import ParseData from "../components/ParseData";
import Image from "next/image";

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
        {parsedArticles.map((article, index) => {
          if (!article || !article.title) {
            return null;
          }

          return (
            <div key={index} className="article-card">
              {article.lead_image_url && (
                <div className="image-container">
                  <img src={article.lead_image_url} alt={article.title} />
                </div>
              )}

              <div className="text-content">
                <h2 className="article-title">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h2>

                <p className="article-meta">
                  {article.category && article.category.length > 0 && (
                    <strong>
                      Category:{" "}
                      {article.category.map((category, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && ", "}
                          {category}
                        </React.Fragment>
                      ))}
                    </strong>
                  )}
                  <br />
                  {article.author && <strong>Author: {article.author}</strong>}
                  <br />
                  {article.date_published && (
                    <strong>Date published: {article.date_published}</strong>
                  )}
                  <br />
                  <strong>Word Count:</strong> {article.word_count}
                </p>
              </div>
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
