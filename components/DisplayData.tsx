import React from "react";
import ParseData from "./ParseData";

type Props = {
  page?: string;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const categoryColors: Record<string, string> = {
  Technology: '#800000',
  Productivity: '#804000',
  "Machine Learning": '#7f8000',
  "Artificial Intelligence": '#008000',
  Databases: '#007f80',
  Design: '#000080',
  Architecture: '#400080',
  Microsoft: '#80007f'
};

function getCategoryColor(category: string) {
  return categoryColors[category] || '#6e6e6e';
}

let feedCounter = 0
const feedColors = [
  "#ffadad",  "#ffd6a5",  "#fdffb6",  "#caffbf",  "#9bf6ff",  "#a0c4ff",  "#bdb2ff",  "#ffc6ff"
]

let parsedPages: string[] = []

async function DisplayData({ page }: Props) {
  try {
    const parsedArticles = await ParseData(page);
    parsedPages.push(`${page}`)
    console.log("Done parsing");
    console.log({parsedPages})
    parsedArticles.sort((b, a) => {
      const dateA = new Date(a.date_published);
      const dateB = new Date(b.date_published);
      return dateA.getTime() - dateB.getTime();
    });
    feedCounter += 1

    return (
      <div className="articles-container">
        {parsedArticles.map((article, index) => {
          if (!article || !article.title) {
            return null;
          }

          return (
            <div key={index} className="article-card" style={{
              backgroundColor: feedColors[feedCounter],
            }}>
              {article.lead_image_url && (
                <div className="image-container">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={article.lead_image_url} alt={article.title} />
                  </a>
                </div>
              )}
              {article.category && article.category.length > 0 && (
                <strong>
                  {article.category.map((category, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && " "}
                      <span
                        style={{
                          backgroundColor: getCategoryColor(category),
                          padding: "0px 4px",
                          color: "#fff",
                        }}
                      >
                        {category}
                      </span>
                    </React.Fragment>
                  ))}
                </strong>
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
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.excerpt}
                  </a>
                  <br />
                  
                  <br />
                  {article.author && <strong>Author: {article.author}</strong>}
                  <br />
                  {article.date_published && (
                    <strong>{formatDate(article.date_published)}</strong>
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
}

export default DisplayData;
