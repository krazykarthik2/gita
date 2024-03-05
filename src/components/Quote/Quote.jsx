import React, { useMemo } from "react";
import { getRandomSlok } from "../../utils/gitaApi";

function Quote() {
  const [slok, setSlok] = React.useState({});
  window.slok = slok;
  useMemo(() => {
    getRandomSlok()
      .then((data) => {
        setSlok(data);
        
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="quote-screen">
      <h1>slok</h1>
    </div>
  );
}

export default Quote;
