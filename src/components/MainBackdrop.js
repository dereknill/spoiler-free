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
      className={
        "w-full h-48 bg-black sm:h-64 md:h-96 rounded-t-2xl grayscale relative bg-cover"
      }
      style={{
        backgroundImage: `url(${bgUrl})`,
      }}
    >
      <div className='w-full rounded-t-2xl h-full bg-black/50 flex justify-center gap-1 flex-col items-center text-white font-crimson font-extralight text-2xl sm:text-3xl lg:text-6xl'>
        <div>Discuss your favorite shows</div>
        <div className='font-bold'>Spoiler Free</div>
      </div>
    </section>
  );
}

export default MainBackdrop;
