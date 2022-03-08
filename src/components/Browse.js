import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiKey } from "../index";
import LineBreak from "./utils/LineBreak";

function Browse(props) {
  const params = useParams();
  const [results, setResults] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${params.id}&include_null_first_air_dates=false&adult=false`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("error");
        }
      })
      .then((jsonData) => {
        if (jsonData.results.length > 0) {
          setResults(jsonData.results);
          setIsReady(true);
        } else {
          throw new Error("Error");
        }
      })
      .catch((error) => {
        setNotFound(true);
      });

    return setNotFound(false);
  }, [params.id]);

  function displaySearchResults(results) {
    return results.map((result, index) => {
      return (
        <div key={result.id}>
          <Link to={`/shows/${result.id}`}>
            <button className='block px-2 lg:px-10 w-full grid gap-x-3 grid-cols-[min(25%,150px)_1fr] my-4'>
              {result.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt={result.name}
                  loading='lazy'
                ></img>
              ) : (
                <div className='w-full h-0 pb-[150%] bg-neutral-900'>
                  <h2 className='text-white text-xs sm:text-sm md:text-xl mt-4'>
                    Image
                    <br />
                    Not
                    <br />
                    Available
                  </h2>
                </div>
              )}
              <div>
                <h2 className='font-2xl font-bold text-left'>
                  {result.name} (
                  {result.first_air_date && result.first_air_date.slice(0, 4)})
                </h2>
                <h3 className='font-xl text-left'>{result.overview}</h3>
              </div>
            </button>
          </Link>
          {index < results.length - 1 && (
            <LineBreak type='margin-4'></LineBreak>
          )}
        </div>
      );
    });
  }

  if (notFound) {
    return <h2>Your search does not match any TV shows</h2>;
  }
  if (!isReady) {
    return null;
  }
  return (
    <div className='mb-4 flex justify-center flex-col'>
      <h2 className='flex items-center pl-10 w-full bg-slate-400 h-10 rounded-t-2xl'>
        Browsing {params.genre}
      </h2>
      <section className='my-4'>{displaySearchResults(results)}</section>
    </div>
  );
}
export default Browse;
