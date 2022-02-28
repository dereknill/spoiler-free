import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../index";
import { doc, getDoc, setDoc } from "firebase/firestore";
import WatchSelector from "./WatchSelector";

function Discussion(props) {
  const [details, user] = useOutletContext();
  const [ready, setReady] = useState(false);
  const [shows, setShows] = useState(null);
  const [selecting, setSelecting] = useState(true);
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

    setShows(showList);
    setSelecting(false);
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const setResult = async () =>
        await setDoc(docRef, {
          shows: showList,
        });

      setResult();
    }
  }

  function displaySubHeading(selecting) {
    if (selecting) {
      return (
        <section className='mx-7'>
          <h2 className='text-3xl font-bold'>{details.name}</h2>
          <h3 className='mt-3'>Select the episode you have watched through</h3>
        </section>
      );
    } else {
      return (
        <section className='mx-7'>
          <h2 className='text-3xl font-bold'>{details.name}</h2>
          <h3 className='mt-2'>
            <div className='inline-block'>
              {`Showing discussion through Season ${
                shows[details.id].season
              }, Episode ${shows[details.id].episode}`}
            </div>
            <button
              className='bg-slate-900 text-white rounded px-3 py-2 ml-4 hover:darker-bg'
              onClick={() => {
                setSelecting(true);
              }}
            >
              Edit
            </button>
          </h3>
        </section>
      );
    }
  }
  useEffect(() => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const getResult = async () => await getDoc(docRef);

      getResult().then((result) => {
        setShows(result.data().shows);
        if (result.data().shows[details.id]) {
          setSelecting(false);
        }
        setReady(true);
      });
    } else {
      navigate("/signin");
    }
  }, [user, navigate, details.id]);

  if (!ready) {
    return null;
  }

  return (
    <div className='my-4 flex justify-center flex-col'>
      {displaySubHeading(selecting)}

      <div className={`mx-7 ${!selecting && "hidden"}`}>
        <WatchSelector
          shows={shows}
          details={details}
          handleWatchChange={handleWatchChange}
        />
      </div>
    </div>
  );
}

export default Discussion;
