import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function BrowseSelector(props) {
  if (!props.hasShows) {
    return null;
  }
  return (
    <div className='mx-auto w-24 flex justify-between items-center'>
      <div>
        {props.page > 1 && (
          <button
            onClick={() => {
              props.setPage(props.page - 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          </button>
        )}
      </div>

      <span>Page {props.page}</span>
      <div>
        {props.hasShows && (
          <button
            onClick={() => {
              props.setPage(props.page + 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </button>
        )}
      </div>
    </div>
  );
}

export default BrowseSelector;
