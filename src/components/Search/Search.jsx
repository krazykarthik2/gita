import React, { useEffect, useMemo, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { FaAngleDown, FaAngleUp, FaStop } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getChapters } from "../../utils/gitaApi";
import { CiSearch } from "react-icons/ci";
function Search() {
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);
  const [obj_chapters, setObjChapters] = useState([]);
  const navigate = useNavigate();
  window.chapters = obj_chapters;
  useMemo(() => {
    getChapters()
      .then((data) => {
        console.log(data);
        setObjChapters(data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (obj_chapters)
      if (obj_chapters[chapter])
        if (obj_chapters[chapter].verses_count < verse) {
          setVerse(obj_chapters[chapter].verses_count);
        }
  }, [chapter]);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(chapter, verse);
    navigate(`/chapters/${chapter}/verses/${verse}`);
  }
  function validateChapter(e) {
    return e != null && !isNaN(e) && e < obj_chapters.length + 1 && e > 0;
  }
  return (
    <div className="w-100 h-100 d-center">
      <div className="d-center w-100">
        <Form onSubmit={handleSubmit}>
          <div className="d-center flex-column">
            <div className="vstack">
              <div className="hstack justify-content-between">
                <div className="vstack py-5">
                  <div className="display-1">chapter</div>
                  {validateChapter(chapter) && (
                    <div className="h2 align-self-end">
                      {obj_chapters[chapter - 1]?.name}
                    </div>
                  )}
                </div>
                <FormNumber
                  value={chapter || 0}
                  onChangeNum={(e) => setChapter(e)}
                  min={1}
                  max={obj_chapters.length}
                />
              </div>
              <div className="hstack justify-content-between">
                <div className="vstack py-5">
                  <div className="display-1">verse</div>
                  {validateChapter(chapter) && (
                    <div className="h2 align-self-end opacity-25">
                      {verse} of 1-{obj_chapters[chapter - 1]?.verses_count}
                    </div>
                  )}
                </div>

                <FormNumber
                  value={verse || 0}
                  onChangeNum={(e) => setVerse(e)}
                  min={1}
                  max={obj_chapters[chapter - 1]?.verses_count}
                />
              </div>
            </div>
            {validateChapter(chapter) && (
              <div className="action-button">
                <button
                  type="submit"
                  className="btn action-btn  gap-1"
                  onClick={() => console.log("clicked")}
                >
                  <div className="line">Read</div>
                  <div className="line">verse : {verse} </div>
                  <div className="line">
                    of {obj_chapters[chapter - 1]?.name}
                  </div>
                </button>
              </div>
            )}
            <CiSearch size={"15vh"} />
          </div>
        </Form>
      </div>
    </div>
  );
}
function FormNumber({ value = 0, max, min, onChangeNum }) {
  function changeNumber(e) {
    let y = Math.max(Math.min(e, max), min);
    window.value = y;
    onChangeNum(y);
  }
  function changeNumIn(e) {
    if (e == 0) {
      onChangeNum(e);
      return true;
    }
    let y = Math.max(Math.min(e, max), min);
    window.value = y;
    onChangeNum(y);
  }
  window.changeNumber = changeNumber;
  return (
    <div className="d-center flex-column">
      <button
        type="button"
        tabIndex={-1}
        className="btn border-0 p-0"
        onClick={() => changeNumber(value + 1)}
      >
        {value == max ? <FaStop size={"3em"} /> : <FaAngleUp size={"3em"} />}
      </button>

      <FormControl
        type="number"
        className="display-2 border-0 outline-0 text-center -webkit-appearance-none-num"
        value={value}
        onChange={(e) => changeNumIn(e.target.value)}
        max={max}
      />
      <button
        type="button"
        tabIndex={-1}
        className="btn border-0 p-0"
        onClick={() => changeNumber(value - 1)}
      >
        {value == min ? <FaStop size={"3em"} /> : <FaAngleDown size={"3em"} />}
      </button>
    </div>
  );
}
export default Search;
