import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../index";
import { doc, getDoc, setDoc } from "firebase/firestore";
import uuid from "react-uuid";

function Discussion(props) {
  const [details, user] = useOutletContext();
  const [ready, setReady] = useState(false);
  const [shows, setShows] = useState(null);
  const navigate = useNavigate();

  function handleWatchChange(event) {
    event.preventDefault();
    const season = event.target.getAttribute("season");
    const episode = event.target.getAttribute("episode");
    let showList = { ...shows };
    showList[details.id] = {
      season: season,
      episode: episode,
    };

    if (user) {
      const docRef = doc(db, "users", user.uid);
      const setResult = async () =>
        await setDoc(docRef, {
          shows: showList,
        });

      setResult().then(() => {
        setShows(showList);
      });
    }
  }
  function displaySeasons(theDetails, userShows) {
    console.log(userShows);
    const seasons = theDetails.seasons;
    const seasonWatched = userShows[theDetails.id]
      ? userShows[details.id].season
      : -1;

    const episodeWatched = userShows[theDetails.id]
      ? userShows[details.id].episode
      : -1;

    return seasons.map((season) => {
      let watched;
      if (season.season_number === 0) {
        return null;
      }
      if (parseInt(season.season_number) < seasonWatched) {
        watched = "all";
      } else if (parseInt(season.season_number) === parseInt(seasonWatched)) {
        watched = "some";
      } else {
        watched = "none";
      }
      return (
        <div
          className='grid grid-cols-1 md:grid-cols-[10rem_1fr] my-4'
          key={season.season_number}
        >
          <h3 className='font-bold text-xl'>Season {season.season_number}</h3>
          <div className='grid grid-cols-5 md:grid-cols-10 gap-1'>
            {getEpisodeArray(
              season.episode_count,
              watched,
              episodeWatched,
              season.season_number
            )}
          </div>
        </div>
      );
    });
  }

  function getEpisodeArray(count, seasonWatched, episodeWatched, seasonNumber) {
    let episodes = [];
    console.log(`Season Watched: ${seasonWatched}`);
    console.log(`Episode Watched: ${episodeWatched}`);

    for (let i = 1; i <= count; i++) {
      let bg;
      if (seasonWatched === "all") {
        bg = "bg-green-800";
      } else if (seasonWatched === "none") {
        bg = "bg-red-800";
      } else {
        if (i <= episodeWatched) {
          bg = "bg-green-800";
        } else {
          bg = "bg-red-800";
        }
      }
      episodes.push(
        <button
          key={uuid()}
          className={`${bg} bg-red-800 border-black border text-center text-white p-1`}
          episode={i}
          season={seasonNumber}
          onClick={handleWatchChange}
        >
          {i}
        </button>
      );
    }
    return episodes;
  }

  useEffect(() => {
    if (user) {
      console.log("Use effect triggered");
      const docRef = doc(db, "users", user.uid);
      const getResult = async () => await getDoc(docRef);

      getResult().then((result) => {
        setShows(result.data().shows);
        setReady(true);
      });
    }
  }, [user, navigate]);

  if (!ready || !shows) {
    return null;
  }
  if (!user) {
    navigate("/signin");
  }

  return (
    <div className='my-4 flex justify-center flex-col'>
      <section className='mx-7'>
        <h2 className='text-3xl font-bold'>{details.name}</h2>
        <h3 className=''>Select the episode you have watched through</h3>
      </section>
      <section className='mx-7'>{displaySeasons(details, shows)}</section>
    </div>
  );
}

export default Discussion;
