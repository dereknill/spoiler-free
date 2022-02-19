import { useParams, Outlet } from "react-router-dom";
import { apiKey } from "../index.js";
import { useState, useEffect } from "react";

function Show(props) {
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
      })
      .catch((error) => {
        setNotFound(true);
      });
  }, [params.id]);

  if (notFound) {
    return "Show not found";
  }
  if (!isReady) {
    return null;
  }
  return (
    <div className='mb-4 flex justify-center flex-col'>
      <div className='flex justify-end w-full bg-slate-400 h-10 rounded-t-2xl'>
        <button className='w-24 md:w-36 bg-slate-200'>Information</button>
        <button className='w-24 md:w-36 rounded-tr-2xl'>Discussion</button>
      </div>

      <Outlet context={[details, setDetails]}></Outlet>
    </div>
  );
}

export default Show;
