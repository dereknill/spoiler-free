import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiKey } from "../index";
import LineBreak from "./utils/LineBreak";

function Search(props) {
  const params = useParams();
  const [results, setResults] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${params.query}`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setResults(jsonData.results);
        setIsReady(true);
      });
  }, [params.query]);

  function displaySearchResults(results) {
    return results.map((result) => {
      return (
        <div key={result.id}>
          <Link to={`/shows/${result.id}`}>
            <button className='block px-2 lg:px-10 w-full grid gap-x-3 grid-cols-[min(25%,150px)_1fr] my-4'>
              <img
                src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                alt={result.name}
                loading='lazy'
              ></img>
              <div>
                <h2 className='font-2xl font-bold text-left'>
                  {result.name} ({result.first_air_date.slice(0, 4)})
                </h2>
                <h3 className='font-xl text-left'>{result.overview}</h3>
              </div>
            </button>
          </Link>
          <LineBreak></LineBreak>
        </div>
      );
    });
  }
  if (!isReady) {
    return null;
  }
  return (
    <div className='mb-4 flex justify-center flex-col'>
      <h2 className='flex items-center pl-10 w-full bg-slate-400 h-10 rounded-t-2xl'>
        Search Results: {params.query}
      </h2>
      <section className='my-4'>{displaySearchResults(results)}</section>
    </div>
  );
}

export default Search;
