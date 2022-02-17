import { apiKey } from "../index.js";
import { useState, useEffect } from "react";

function MainBackdrop(props) {
  const [bgUrl, setBgUrl] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((parsedData) => {
        const filteredArray = parsedData.results
          .filter((entry) => entry.backdrop_path)
          .map((entry) => entry.backdrop_path);

        const randomNum = Math.floor(
          Math.random() * (filteredArray.length - 1) + 1
        );

        let url = `https://image.tmdb.org/t/p/original${filteredArray[randomNum]}`;
        setBgUrl(url);
        setIsReady(true);
      });
  }, []);

  if (!isReady) {
    return null;
  }
  return (
    <section
      className={"w-full h-96 rounded-t-2xl relative bg-cover brightness-[0.3]"}
      style={{
        backgroundImage: `url(${bgUrl})`,
      }}
    ></section>
  );
}

export default MainBackdrop;
