import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Load } from "../../utils/components/Loaders";
import { CiSearch } from "react-icons/ci";

function Query() {
  const params = useParams();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  function answerQuery(query) {
    query = query.toLowerCase();
    if (query.startsWith("bg") || query.startsWith("bg.")) {
      let x = query.replace("bg.", "").replace("bg", "");
      console.log(x);
      let [chapter, verse] = x.split(".");
      navigate(`/quote/${chapter}/${verse}`);
    } else if (!isNaN(query)) {
      let [chapter, verse] = query.split(".");
      navigate(`/quote/${chapter}/${verse}`);
    } else setNotFound(true);
  }
  useEffect(() => {
    if (params) if (params.query) answerQuery(params.query);
  }, [params]);

  return !notFound ? (
    <Load value={null} />
  ) : (
    <div className="err-404 h-100 w-100 d-center">
      <div className="d-flex h-100 flex-column align-items-center justify-content-between">
        <div className="top"></div>
        <div className="middle d-center flex-column">
          <div className="display-1 fw-bold font-Neue">404</div>
          <div className="display-4 fw-bold">Not Found</div>
        </div>
        <div className="bottom">
          <div className="display-6">
            <Link to="/search" className="text-color">
              <CiSearch size={"15vh"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Query;
