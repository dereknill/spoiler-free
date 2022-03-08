import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiKey, db } from "../index";
import LineBreak from "./utils/LineBreak";
import { getDoc, doc } from "firebase/firestore";
import PageSelector from "./utils/PageSelector";

function MyShows(props) {
  const [user] = useOutletContext();
  const [shows, setShows] = useState(null);
  const [showids, setShowids] = useState(null);
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const getShows = async () => await getDoc(docRef);

      getShows().then((result) => {
        setShowids(Object.keys(result.data().shows));
      });
    } else {
      navigate("/signin");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (showids) {
      const requests = showids.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
        )
      );

      const getResponses = async () => await Promise.all(requests);
      const getJson = async (data) =>
        await Promise.all(data.map((response) => response.json()));

      getResponses().then((responses) => {
        const filtered = responses.filter((response) => response.ok);
        getJson(filtered).then((shows) => {
          setShows(shows);
          setNumPages(Math.ceil(shows.length / 10));
          setReady(true);
        });
      });
    }
  }, [showids, page]);

  function displaySearchResults(shows) {
    const firstIndex = page * 10;
    const lastIndex = firstIndex + 9;

    return shows
      .filter((show, index) => index >= firstIndex && index <= lastIndex)
      .map((show, index, array) => {
        return (
          <div key={show.id}>
            <Link to={`/shows/${show.id}`}>
              <button className='block px-2 lg:px-10 w-full grid gap-x-3 grid-cols-[min(25%,150px)_1fr] my-4'>
                {show.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                    alt={show.name}
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
                    {show.name} (
                    {show.first_air_date && show.first_air_date.slice(0, 4)})
                  </h2>
                  <h3 className='font-xl text-left'>{show.overview}</h3>
                </div>
              </button>
            </Link>
            {index < array.length - 1 && (index + 1) % 10 !== 0 && (
              <LineBreak type='margin-4'></LineBreak>
            )}
          </div>
        );
      });
  }
  if (!ready) {
    return null;
  }

  if (!shows) {
    return <h2>No shows watched</h2>;
  }

  return (
    <div className='mb-4 flex justify-center flex-col'>
      <h2 className='flex items-center font-bold justify-center w-full bg-slate-400 h-10 rounded-t-2xl'>
        Your Watchlist
      </h2>
      <section className='my-4'>
        {displaySearchResults(shows)}{" "}
        <PageSelector
          page={page}
          setPage={setPage}
          numPages={numPages}
        ></PageSelector>
      </section>
    </div>
  );
}

export default MyShows;
