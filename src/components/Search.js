import { useParams, Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiKey } from "../index";
import LineBreak from "./utils/LineBreak";
import BrowseSelector from "./utils/BrowseSelector";

function Search(props) {
  const params = useParams();
  const context = useOutletContext();
  const [results, setResults] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [notFound, setNotFound] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    let currentPage = page;
    if (context[1]) {
      setPage(1);
      currentPage = 1;
      context[2](false);
    }
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&page=${currentPage}&include_adult=false&query=${params.query}`
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
          fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&page=${
              page + 1
            }&include_adult=false&query=${params.query}`
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                setHasNextPage(false);
                throw new Error("error");
              }
            })
            .then((jsonData) => {
              if (jsonData.results.length > 0) {
                setHasNextPage(true);
              } else {
                setHasNextPage(false);
              }
              setIsReady(true);
            });
        } else {
          throw new Error("Error");
        }
      })
      .catch((error) => {
        setNotFound("Your search does not match any TV shows");
      });

    return () => {
      setNotFound(null);
    };
  }, [params.query, page, context]);

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
    return <h2 className='pt-5 text-center font-bold'>{notFound}</h2>;
  }
  if (!isReady) {
    return null;
  }
  return (
    <div className='mb-4 flex justify-center flex-col'>
      <h2 className='flex items-center justify-center font-bold w-full bg-slate-400 h-10 rounded-t-2xl'>
        Search Results: {params.query}
      </h2>
      <section className='my-4'>
        {displaySearchResults(results)}
        <BrowseSelector
          page={page}
          setPage={setPage}
          hasShows={hasNextPage}
        ></BrowseSelector>
      </section>
    </div>
  );
}

export default Search;
