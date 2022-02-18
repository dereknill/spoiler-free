import LineBreak from "./utils/LineBreak";
import { useOutletContext } from "react-router-dom";

function ShowInfo(props) {
  const [details, setDetails] = useOutletContext();

  function getGenres() {
    return details.genres.reduce((prev, current, index) => {
      let returns;

      returns = prev + current.name;
      if (index < details.genres.length - 1) {
        returns += ", ";
      }

      return returns;
    }, "");
  }

  return (
    <div className='my-4 flex justify-center flex-col mx-4'>
      <section>
        <h2 className='text-3xl font-bold'>{details.name}</h2>
        <h3 className='mx-4'>
          {details.first_air_date.slice(0, 4)} -{" "}
          {details.status === "Ended" ? details.last_air_date.slice(0, 4) : ""}
        </h3>
      </section>

      <img
        src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
        alt='Poster'
      ></img>
      <section>
        <h2 className='text-3xl font-bold my-4'>Overview</h2>
        <h3>{details.overview}</h3>
        <LineBreak></LineBreak>
        <h2 className='text-3xl font-bold my-4'>Genres</h2>
        <h3>{getGenres()}</h3>
      </section>
    </div>
  );
}

export default ShowInfo;
