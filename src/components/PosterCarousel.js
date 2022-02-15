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
          loading='lazy'
        ></img>
      );
    });
  }

  if (!isLoaded) {
    return null;
  }
  return (
    <section className='w-full bg-black w-11/12 mx-auto rounded-xl my-5 py-3 shadow-lg shadow-neutral-500'>
      <h2 className='text-4xl pl-20 mb-3 text-neonred font-bold'>Popular</h2>
      <Carousel
        responsive={responsive}
        infinite={false}
        className='w-full mx-auto'
        itemClass='px-2'
        containerClass='bg-black w-11/12'
        renderButtonGroupOutside={true}
        showDots={true}
        centerMode={true}
      >
        {getImages(data)}
      </Carousel>
    </section>
  );
}

export default PosterCarousel;
