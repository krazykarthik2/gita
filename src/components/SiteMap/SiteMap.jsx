import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getChapters } from "../../utils/gitaApi";

function SiteMap() {
  const [chapters, setChapters] = React.useState([]);
  const [random_index, setRandomIndex] = React.useState(1);
  const [random_index_2, setRandomIndex2] = React.useState(1);
  window.chapters = chapters;
  useMemo(() => {
    getChapters()
      .then((data) => {
        setChapters(data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    const randInt1 = Math.floor(Math.random() * (chapters.length - 1) + 1);
    setRandomIndex(randInt1);
    if (chapters)
      if (chapters.length > 0)
        setRandomIndex2(
          Math.floor(Math.random() * (chapters[randInt1].verses_count - 1) + 1)
        );
  }, [chapters]);
  const site_map = [
    {
      path: "/",
      name: "/",
      description: "Welcome page of the website",
    },
    {
      path: "/search",
      name: "/search",
      description: "search for a verse in the Bhagavad Gita",
    },
    {
      path: "/time",
      name: "/time",
      description: "Displays the current time",
    },
    {
      path: "/quote",
      name: "/quote",
      description: "Provides an inspirational quote",
    },
    {
      path: "/chapters",
      name: "/chapters",
      description: "Lists all chapters of the Bhagavad Gita",
    },
    {
      path: "/chapters/" + random_index,
      name: "/chapters/" + random_index,
      description: "Displays a specific chapter of the Bhagavad Gita",
    },
    {
      path: "/chapters/" + random_index + "/verses",
      name: "/chapters/" + random_index + "/verses",
      description:
        "Displays all verses in specific chapter of the Bhagavad Gita",
    },
    {
      path: "/chapters/" + random_index + "/verses/" + random_index_2,
      name: "/chapters/" + random_index + "/verses/" + random_index_2,
      description:
        "Displays a specific verse in a specific chapter of the Bhagavad Gita",
    },
    {
      path: "/krishna",
      name: "/krishna",
      description: "Information about Lord Krishna",
    },
    {
      path: "/arjuna",
      name: "/arjuna",
      description: "Information about Arjuna",
    },
    {
      path: "/background",
      name: "/background",
      description: "Details about the website's background and development",
    },
    {
      path: "/credits",
      name: "/credits",
      description: "Acknowledgments and credits for the website",
    },
    {
      path: `/bg.${random_index}.${random_index_2}`,
      name: `/bg.${random_index}.${random_index_2}`,
      description: "Quote from Bhagavad Gita",
    },
    {
      path: "/loadmap",
      name: "/loadmap",
      description: "Loads the map of the Bhagavad Gita loaded in this site",
    },
  ];
  return (
    <div className="sitemap d-flex flex-column">
      <h1>Bhagavad Gita Website Sitemap</h1>
      <ul className="vstack list-group px-4 py-3 vh-90 overflow-y-auto">
        {site_map.map((item, index) => (
          <li key={index} className="list-group-item bg-secondary ">
            <Link to={item.path} className="text-color text-decoration-none">
              <div className="hstack justify-content-between flex-wrap  px-2 py-1 gap-3 ">
                <div className="left h4">{item.name}</div>
                <div className="right text-end  flex-grow-1">
                  {item.description}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SiteMap;
