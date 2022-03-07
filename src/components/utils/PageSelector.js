import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function PageSelector(props) {
  if (props.numPages < 2) {
    return null;
  }
  return (
    <div className='mx-auto w-24 flex justify-between items-center'>
      <div>
        {props.page > 0 && (
          <button
            onClick={() => {
              props.setPage(props.page - 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          </button>
        )}
      </div>

      <span>Page {props.page + 1}</span>
      <div>
        {props.page + 1 < props.numPages && (
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

export default PageSelector;
