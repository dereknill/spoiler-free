import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import LineBreak from "./utils/LineBreak";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

function Menu(props) {
  const navigate = useNavigate();
  function handleExitMenu(event) {
    event.preventDefault();
    props.setFaded(false);
    props.setMenuActive(false);
  }

  function handleGenreLink(event) {
    event.preventDefault();
    const id = event.target.getAttribute("id");
    const genre = event.target.getAttribute("genre");
    handleExitMenu(event);
    navigate(`/browse/${id}/${genre}`);
  }

  function handleSignOut(event) {
    event.preventDefault();
    const auth = getAuth();
    auth.signOut();
    handleExitMenu(event);
    navigate("/");
  }
  return (
    <nav
      className={`fixed right-0 h-screen top-0 w-3/4 max-w-md z-[11000] bg-slate-700 text-white py-4 transition-transform overflow-y-auto ${
        !props.menuActive && "translate-x-full"
      }`}
    >
      <div className='flex justify-between items-center mx-10'>
        <button onClick={handleExitMenu}>
          <FontAwesomeIcon
            icon={faSquareXmark}
            className='text-3xl'
          ></FontAwesomeIcon>
        </button>
      </div>
      <h2 className='bg-slate-900 text-center py-2 sm:py-3 mt-4 text-2xl sm:text-2xl font-bold'>
        Account
      </h2>
      <div className='bg-slate-500 px-1 sm:px-3 mb-2 sm:mb-4'>
        <ul className='text-lg mx-7 py-4'>
          <li className='px-2 font-bold'>Profile</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Shows</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Posts</li>
          <LineBreak margin='2'></LineBreak>
          <button onClick={handleSignOut}>
            <li className='px-2 font-bold'>Sign Out</li>
          </button>
        </ul>
      </div>
      <h2 className='bg-slate-900 text-center py-2 sm:py-3 mt-4 text-2xl sm:text-2xl font-bold'>
        Browse
      </h2>
      <div className='bg-slate-500 px-1 sm:px-3 mb-4'>
        <ul className='mx-7 py-4 text-lg font-bold'>
          <li className='px-2 font-bold'>
            <button
              id='10759'
              genre={"Action & Adventure"}
              onClick={handleGenreLink}
              className='font-bold'
            >
              {"Action & Adventure"}
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              id='16'
              genre='Animation'
              onClick={handleGenreLink}
              className='font-bold'
            >
              Animation
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              id='35'
              genre='Comedy'
              onClick={handleGenreLink}
              className='font-bold'
            >
              Comedy
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              id='80'
              genre='Crime'
              onClick={handleGenreLink}
              className='font-bold'
            >
              Crime
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              id='99'
              genre='Documentary'
              onClick={handleGenreLink}
              className='font-bold'
            >
              Documentary
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              id='18'
              genre='Drama'
              onClick={handleGenreLink}
              className='font-bold'
            >
              Drama
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              id='10751'
              genre='Family'
              onClick={handleGenreLink}
              className='font-bold'
            >
              Family
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              id='10762'
              genre='Kids'
              onClick={handleGenreLink}
              className='font-bold'
            >
              Kids
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              id='9648'
              genre='Mystery'
              onClick={handleGenreLink}
              className='font-bold'
            >
              Mystery
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              id='10764'
              genre='Reality'
              onClick={handleGenreLink}
              className='font-bold'
            >
              Reality
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              id='10765'
              genre={"Sci-Fi & Fantasy"}
              onClick={handleGenreLink}
              className='font-bold'
            >
              {"Sci-Fi & Fantasy"}
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              id='10768'
              genre={"War & Politics"}
              onClick={handleGenreLink}
              className='font-bold'
            >
              {"War & Politics"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
