import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../index";
import { doc, getDoc } from "firebase/firestore";
// import { uuid } from "uuidv4";

function Discussion(props) {
  const [details, user] = useOutletContext();
  const [ready, setReady] = useState(false);
  const [shows, setShows] = useState(null);
  const navigate = useNavigate();

  function displaySeasons(theDetails, theUser) {
    console.log(shows);
    const seasons = theDetails.seasons;
    return seasons.map((season) => {
      return (
        <div className='grid grid-cols-[10rem, 1fr]' key={season.season_number}>
          <h3 className='font-bold text-lg'>Season {season.season_number}</h3>
          <div className='grid grid-cols-10'>
            {getEpisodeArray(season.episode_count)}
          </div>
        </div>
      );
    });
  }

  function getEpisodeArray(count) {
    let episodes = [];
    for (let i = 1; i <= count; i++) {
      episodes.push(<div key={i}>{i}</div>);
    }
    return episodes;
  }

  useEffect(() => {
    if (!user && ready) {
      navigate("/signin");
    }
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const getResult = async () => await getDoc(docRef);

      getResult().then((result) => {
        setShows(result.data().shows);
        setReady(true);
      });
    }
  }, [user]);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className='my-4 flex justify-center flex-col'>
      <section className='mx-7'>
        <h2 className='text-3xl font-bold'>{details.name}</h2>
        <h3 className=''>
          Showing comments through episode {displaySeasons(details)}
        </h3>
      </section>
      <section className='mx-7'></section>
    </div>
  );
}

export default Discussion;
