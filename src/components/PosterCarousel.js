import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function PosterCarousel(props) {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 3,
    },
    inbetween: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=1fc19e2dfd89d668063919143edc6e68&language=en-US&page=1"
    )
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData.results);
        setIsLoaded(true);
        console.log(apiData.results);
      });
  }, []);

  function getImages(array) {
    return array.map((entry) => {
      return (
        <img
          src={`https://image.tmdb.org/t/p/w200${entry.poster_path}`}
          key={`popular${entry.name}`}
          alt={entry.name}
        ></img>
      );
    });
  }

  if (!isLoaded) {
    return null;
  }
  return (
    <section className='w-full'>
      <h2 className='text-4xl my-4 text-center font-bold'>Popular</h2>
      <Carousel
        responsive={responsive}
        infinite={false}
        className='w-full mx-auto'
        itemClass='px-2'
        containerClass='px-5 bg-black'
      >
        {getImages(data)}
      </Carousel>
    </section>
  );
}

export default PosterCarousel;
