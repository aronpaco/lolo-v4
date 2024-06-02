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
const feedColors: string[] = [
  "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf",
  "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"
];
const feedColorMap: { [feed: string]: string } = {};

function getFeedColor(feed: string | undefined): string | undefined {
  if (feed === undefined) return undefined;

  if (feedColorMap.hasOwnProperty(feed)) {
    return feedColorMap[feed];
  }
  const colorIndex = Object.keys(feedColorMap).length % feedColors.length;
  const color = feedColors[colorIndex];
  feedColorMap[feed] = color;
  return color;
}

const checkIfArray = (value: any): boolean => {
  return Array.isArray(value);
};

let parsedPages: string[] = []
let parsedArticles: any[] = []
let feedsUsedForColor: string[] = []
let shownArticles: any[] = []

async function DisplayData({ feedUrl }: Props) {
  if (parsedPages.includes(`${feedUrl}`)) {
    console.log("This feed has already been fetched!")
    // Fetch from stored articles
  } else {
    // Fetch from with ParseData(feedUrl)
    try {
      if (checkIfArray(feedUrl)) { // check if one or multiple feeds
        feedUrl = feedUrl?.at(-1)
      }
      const parsedArticles = await ParseData(feedUrl);
      // parsedPages.push(`${feedUrl}`)

      console.log("Done parsing");
      // console.log({parsedPages})
      // parsedArticles.push(parsedArticlesFromOneFeed)
      parsedArticles.sort((b, a) => {
        const dateA = new Date(a.date_published);
        const dateB = new Date(b.date_published);
        return dateA.getTime() - dateB.getTime();
      });
      feedCounter += 1
      // console.log(parsedArticles[0])

      return (
        <div className="articles-container">
          {parsedArticles.map((article, index) => {
            if (!article || !article.title) {
              return null;
            }

            return (
              <div key={index} className="article-card" style={{
                backgroundColor: getFeedColor(article.feed)
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
}

export default DisplayData;
