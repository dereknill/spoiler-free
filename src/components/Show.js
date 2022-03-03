import {
  useParams,
  Outlet,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import { apiKey } from "../index.js";
import { useState, useEffect } from "react";

function Show(props) {
  const [isReady, setIsReady] = useState(false);
  const [details, setDetails] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [onInfo, setOnInfo] = useState(true);
  const [fromPost, setFromPost] = useState("");
  const params = useParams();
  const [user] = useOutletContext();
  const navigate = useNavigate();

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
      })
      .catch((error) => {
        setNotFound(true);
      });
  }, [params.id]);

  function handleDiscussion(event) {
    event.preventDefault();
    setOnInfo(false);
    navigate(`/shows/${params.id}/discussion${fromPost}`);
  }

  function handleInfo(event) {
    event.preventDefault();
    setOnInfo(true);
    navigate(`/shows/${params.id}`);
  }

  if (notFound) {
    return "Show not found";
  }
  if (!isReady) {
    return null;
  }
  return (
    <div className='mb-4 flex justify-center flex-col'>
      <div className='flex justify-end w-full bg-slate-400 h-10 rounded-t-2xl'>
        <button
          className={`w-24 md:w-36 ${onInfo && "bg-slate-300"}`}
          onClick={handleInfo}
        >
          Information
        </button>
        <button
          className={`w-24 md:w-36 rounded-tr-2xl ${!onInfo && "bg-slate-300"}`}
          onClick={handleDiscussion}
        >
          Discussion
        </button>
      </div>

      <Outlet
        context={[details, user, setOnInfo, params.postid, setFromPost]}
      ></Outlet>
    </div>
  );
}

export default Show;
