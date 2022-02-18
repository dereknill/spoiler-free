import { useParams } from "react-router-dom";
import { apiKey } from "../index.js";
import { useState, useEffect } from "react";
import LineBreak from "./utils/LineBreak";

function ShowInfo(props) {
  const [isReady, setIsReady] = useState(false);
  const [details, setDetails] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${params.id}?api_key=${apiKey}&language=en-US`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setDetails(data);
        setIsReady(true);
        console.log(data);
      })
      .catch((error) => {
        setNotFound(true);
      });
  }, [params.id]);

  function getGenres() {
    return details.genres.reduce((prev, current, index) => {
      let returns;

      returns = prev + current.name;
      if (index < details.genres.length - 1) {
        returns += ", ";
      }

      return returns;
    }, "");
  }

  if (notFound) {
    return "Show not found";
  }
  if (!isReady) {
    return null;
  }
  return (
    <div className='my-4 flex justify-center flex-col'>
      <section className='mx-4'>
        <h2 className='text-3xl font-bold'>{details.name}</h2>
        <h3 className='mx-4'>
          {details.first_air_date.slice(0, 4)} -{" "}
          {details.status === "Ended" ? details.last_air_date.slice(0, 4) : ""}
        </h3>
      </section>

      <img
        src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
        alt='Poster'
      ></img>
      <section className='mx-4'>
        <h2 className='text-3xl font-bold my-4'>Overview</h2>
        <h3>{details.overview}</h3>
        <LineBreak></LineBreak>
        <h2 className='text-3xl font-bold my-4'>Genres</h2>
        <h3>{getGenres()}</h3>
      </section>
    </div>
  );
}

export default ShowInfo;
