import uuid from "react-uuid";

function WatchSelector(props) {
  function displaySeasons(theDetails, userShows) {
    console.log(userShows);
    const seasons = theDetails.seasons;
    const seasonWatched = userShows[theDetails.id]
      ? userShows[theDetails.id].season
      : -1;

    const episodeWatched = userShows[theDetails.id]
      ? userShows[theDetails.id].episode
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

      console.log(bg);
      episodes.push(
        <button
          key={uuid()}
          className={`${bg} border-black border text-center text-white p-1`}
          episode={i}
          season={seasonNumber}
          onClick={props.handleWatchChange}
        >
          {i}
        </button>
      );
    }
    return episodes;
  }

  return <div>{displaySeasons(props.details, props.shows)}</div>;
}

export default WatchSelector;
