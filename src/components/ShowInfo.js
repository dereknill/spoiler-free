import LineBreak from "./utils/LineBreak";
import { useOutletContext } from "react-router-dom";

function ShowInfo(props) {
  const [details] = useOutletContext();

  function getList(array, key) {
    return array.reduce((prev, current, index) => {
      let returns;

      returns = prev + current[key];
      if (index < array.length - 1) {
        returns += ", ";
      }

      return returns;
    }, "");
  }

  return (
    <div className='my-4 flex justify-center flex-col'>
      <section className='mx-7'>
        <h2 className='text-3xl font-bold'>{details.name}</h2>
        <h3 className='mx-4'>
          {details.first_air_date.slice(0, 4)} -{" "}
          {details.status === "Ended" ? details.last_air_date.slice(0, 4) : ""}
        </h3>
      </section>

      {details.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
          alt='Poster'
        ></img>
      )}
      <section className='mx-7'>
        <h2 className='text-xl sm:text-3xl font-bold mt-4 mb-1'>Overview</h2>
        <h3>{details.overview}</h3>
        <LineBreak type='margin-4'></LineBreak>
        <h2 className='text-xl sm:text-3xl font-bold mt-4 mb-1'>Genres</h2>
        <h3>{getList(details.genres, "name")}</h3>
        <LineBreak type='margin-4'></LineBreak>
        <ul className='grid grid-cols-[auto_1fr] gap-x-4 gap-y-1'>
          <li>
            <span className='font-bold'>Seasons</span>
          </li>
          <li>
            <span className=''>{details.number_of_seasons}</span>
          </li>
          <li>
            <span className='font-bold'>Episodes</span>
          </li>
          <li>
            <span className=''>{details.number_of_episodes}</span>
          </li>
          <li>
            <span className='font-bold'>Created By</span>
          </li>
          <li>
            <span className=''>{getList(details.created_by, "name")}</span>
          </li>
          <li>
            <span className='font-bold'>Status</span>
          </li>
          <li>
            <span className=''>{details.status}</span>
          </li>
          <li>
            <span className='font-bold'>Language</span>
          </li>
          <li>
            <span className=''>
              {getList(details.spoken_languages, "english_name")}
            </span>
          </li>
          <li>
            <span className='font-bold'>Networks</span>
          </li>
          <li>
            <span className=''>{getList(details.networks, "name")}</span>
          </li>
          <li>
            <span className='font-bold'>Country</span>
          </li>
          <li>
            <span className=''>{details.origin_country}</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ShowInfo;
