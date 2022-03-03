import { useOutletContext, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../index";
import { doc, getDoc, setDoc } from "firebase/firestore";
import WatchSelector from "./WatchSelector";
import Forum from "./Forum";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Discussion(props) {
  const [details, user, setOnInfo, postid, setFromPost] = useOutletContext();
  const [ready, setReady] = useState(false);
  const [shows, setShows] = useState(null);
  const [selecting, setSelecting] = useState(true);
  const [posting, setPosting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
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
    if (postid) {
      return null;
    }
    if (selecting) {
      return (
        <section className='mx-7'>
          <h2 className='text-3xl font-bold'>{details.name}</h2>
          <h3 className='mt-3'>Select the episode you have watched through</h3>
        </section>
      );
    } else {
      return (
        <section className='mx-7 pb-4'>
          <h2 className='text-3xl font-bold'>{details.name}</h2>
          <div className='mt-2'>
            <div className='flex sm:gap-1 flex-col sm:flex-row sm:items-center sm:items-start'>
              <span>
                {posting
                  ? "Creating post referencing content through"
                  : "Showing discussion through"}
              </span>
              <span className='font-bold'>
                {`Season ${shows[details.id].season}, Episode ${
                  shows[details.id].episode
                }`}
                <button
                  className='bg-slate-900 text-white rounded px-3 py-1 ml-4 hover:darker-bg'
                  onClick={() => {
                    setSelecting(true);
                  }}
                >
                  Edit
                </button>
              </span>
            </div>
            {posting && (
              <div className='text-red-800 text-sm'>
                Do not reference any content past this episode
              </div>
            )}
          </div>
        </section>
      );
    }
  }

  useEffect(() => {
    const auth = getAuth();

    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    setOnInfo(false);
    if (isAuthenticated !== null) {
      if (!isAuthenticated) {
        navigate("/signin");
      } else if (user) {
        const docRef = doc(db, "users", user.uid);
        const getResult = async () => await getDoc(docRef);

        getResult().then((result) => {
          setShows(result.data().shows);
          if (result.data().shows[details.id]) {
            setSelecting(false);
          }
          setReady(true);
        });
      }
    }
  }, [isAuthenticated, user, navigate, details.id, setOnInfo, posting]);

  if (!ready) {
    return null;
  }

  return (
    <div className='mt-4 flex justify-center flex-col relative'>
      {!props.postid && displaySubHeading(selecting)}

      <div className={`mx-7 ${!selecting && "hidden"}`}>
        <WatchSelector
          shows={shows}
          details={details}
          handleWatchChange={handleWatchChange}
        />
      </div>
      {!selecting && (
        <Forum
          showId={details.id}
          showName={details.name}
          episode={shows[details.id].episode}
          season={shows[details.id].season}
          posting={posting}
          setPosting={setPosting}
          user={user}
          postid={postid}
          setFromPost={setFromPost}
        ></Forum>
      )}
    </div>
  );
}

export default Discussion;
