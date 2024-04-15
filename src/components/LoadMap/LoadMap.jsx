import React, { useEffect, useMemo, useState } from "react";
import { getMemoMap } from "../../utils/gitaApi";
import { Link } from "react-router-dom";
function groupArray(array, num) {
  const group = [];
  if (array) {
    for (let i = 0; i < array.length; i += num) {
      group.push(array.slice(i, i + num));
    }
  }

  return group;
}
window.groupArray = groupArray;
function LoadMap() {
  const [map, setMap] = useState(null);
  const [verseMap, setVerseMap] = useState([]);
  const [limit, setLimit] = useState(10);
  window.verseMap = verseMap;
  useMemo(() => {
    setMap(getMemoMap());
  }, []);
  useEffect(() => {
    if (map)
      if (map.chapters) {
        let chapters = map.chapters;
        let vmap = [];
        vmap.length = chapters.length;
        for (let i in chapters) {
          vmap[i] = new Array(chapters[i].verses_count).fill(null);
          for (let j in vmap[i]) {
            vmap[i][j] = map.verses[i] ? map.verses[i][j] : {};
          }
        }
        setVerseMap(vmap);
      }
  }, [map]);
  return (
    <div className="w-100 h-100 load-map vh-100 overflow-y-auto">
      <h1>LoadMap </h1>

      {map?.chapters?.map((chap, i) => (
        <div key={i}>
          <div className="h5 font-theme">{chap.name}</div>
          <div className="d-center">
            <div className="d-flex flex-column  flex-wrap gap-2 ">
              {groupArray(verseMap[i], limit)?.map((e, index_up) => (
                <React.Fragment key={index_up}>
                  {e ? (
                    <div className="d-flex gap-2 ">
                      {e.map((verse, index_down) => (
                        <React.Fragment key={index_down}>
                          {verse.verse_number ? (
                            <Link
                              to={
                                "/chapters/" +
                                (i + 1) +
                                "/verses/" +
                                verse.verse_number
                              }
                              key={index_up * limit + index_down + 1}
                              className="badge  rounded-pill px-2 w-em-3 text-decoration-none text-color bg-success"
                            >
                              {verse.verse_number}
                            </Link>
                          ) : (
                            <Link
                              to={
                                "/chapters/" +
                                (i + 1) +
                                "/verses/" +
                                (index_up * limit + index_down + 1)
                              }
                              key={index_up * limit + index_down + 1}
                              className="badge bg-color text-theme text-decoration-none rounded-pill px-2 w-em-3"
                            >
                              {index_up * limit + index_down + 1}
                            </Link>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadMap;
