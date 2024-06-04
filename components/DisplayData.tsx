import React from "react";
import ParseData from "./ParseData";

type Props = {
  feedUrl?: string;
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
  "Technology": '#800000',
  "Productivity": '#804000',
  "Machine Learning": '#7f8000',
  "Artificial Intelligence": '#008000',
  "Databases": '#007f80',
  "Design": '#000080',
  "Architecture": '#400080',
  "Microsoft": '#80007f',
  "Authentication": '#660000',
  "Security": '#663300',
  "The Web": '#336600',
  "Web Applications": '#003366'
};

function getCategoryColor(category: string) {
  return categoryColors[category] || '#6e6e6e';
}

let parsedPages: string[] = []

async function DisplayData({ feedUrl }: Props) {
  if (parsedPages.includes(`${feedUrl}`)) {
    console.log("This feed has already been fetched!")
  } else {
    try {
      const parsedArticles = await ParseData(feedUrl);

      console.log("Done parsing");
      parsedArticles.sort((b, a) => {
        const dateA = new Date(a.date_published);
        const dateB = new Date(b.date_published);
        return dateA.getTime() - dateB.getTime();
      });

      return (
        <div className="articles-container">
          {parsedArticles.map((article, index) => {
            if (!article || !article.title) {
              return null;
            }

            return (
              <div key={index} className="article-card" >
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
}

export default DisplayData;
