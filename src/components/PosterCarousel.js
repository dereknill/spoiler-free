import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { apiKey } from "../index.js";
import { Link } from "react-router-dom";

function PosterCarousel(props) {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
      slidesToSlide: 3,
    },
    inbetween: {
      breakpoint: { max: 800, min: 500 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  };

  const ref = useRef(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${props.category}?api_key=${apiKey}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData.results.filter((entry) => entry.poster_path));
        setIsLoaded(true);
        const carousel = ref.current;
        carousel.goToSlide(1);
      });
  }, [props.category]);

  useLayoutEffect(() => {}, [ref]);

  function getImages(array) {
    return array.map((entry) => {
      return (
        <Link to={`/shows/${entry.id}`} key={`${props.category}${entry.name}`}>
          <img
            src={`https://image.tmdb.org/t/p/w200${entry.poster_path}`}
            alt={entry.name}
            loading='lazy'
          ></img>
        </Link>
      );
    });
  }

  if (!isLoaded) {
    return null;
  }
  return (
    <section className='w-full bg-black w-11/12 mx-auto rounded-lg my-5 py-3 shadow-lg shadow-slate-800'>
      <h2 className='text-xl md:text-2xl pl-[5%] mb-3 text-white font-bold'>
        {props.displayTitle}
      </h2>
      <Carousel
        responsive={responsive}
        infinite={false}
        className='w-full mx-auto'
        itemClass='px-2'
        containerClass='bg-black w-11/12'
        showDots={false}
        centerMode={true}
        ref={ref}
        minimumTouchDrag={30}
        draggable={false}
        removeArrowOnDeviceType={["mobile"]}
      >
        {getImages(data)}
      </Carousel>
    </section>
  );
}

export default PosterCarousel;
