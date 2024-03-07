import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getChapters } from "../../utils/gitaApi";

function SiteMap() {
  const [chapters, setChapters] = React.useState([]);
  const [random_index, setRandomIndex] = React.useState(1);
  window.chapters = chapters;
  useMemo(() => {
    getChapters()
      .then((data) => {
        setChapters(data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * (chapters.length - 1) + 1));
  }, [chapters]);
  const site_map = [
    {
      path: "/",
      name: "/",
      description: "Welcome page of the website",
    },
    {
      path: "/time",
      name: "/time/",
      description: "Displays the current time",
    },
    {
      path: "/quote",
      name: "/quote/",
      description: "Provides an inspirational quote",
    },
    {
      path: "/chapters",
      name: "/chapters/",
      description: "Lists all chapters of the Bhagavad Gita",
    },
    {
      path: "/chapters/"+random_index,
      name: "chapters/"+random_index,
      description: "Displays a specific chapter of the Bhagavad Gita",
    },
    {
      path: "/chapters/"+random_index+"/verses",
      name: "chapters/"+random_index+"/verses",
      description: "Displays a specific chapter of the Bhagavad Gita",
    },
    {
      path: "/krishna",
      name: "/krishna/",
      description: "Information about Lord Krishna",
    },
    {
      path: "/arjuna",
      name: "/arjuna/",
      description: "Information about Arjuna",
    },
    {
      path: "/background",
      name: "/background/",
      description: "Details about the website's background and development",
    },
    {
      path: "/credits",
      name: "/credits/",
      description: "Acknowledgments and credits for the website",
    },
  ];
  return (
    <div className="sitemap">
      <h1>Bhagavad Gita Website Sitemap</h1>
      <ul>
        {site_map.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>
              <div className="hstack justify-content-between">
                <div className="left">{item.name}</div>
                <div className="right">{item.description}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SiteMap;
