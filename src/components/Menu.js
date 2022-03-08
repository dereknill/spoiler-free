import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
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
    props.setNewBrowse(true);
    navigate(`/browse/${id}/${genre}`);
  }

  function handleSignOut(event) {
    event.preventDefault();
    const auth = getAuth();
    auth.signOut();
    handleExitMenu(event);
    navigate("/");
  }

  function handleAccountClick(event) {
    event.preventDefault();
    handleExitMenu(event);
    navigate(event.currentTarget.getAttribute("path"));
  }

  function displayUser() {
    if (props.user) {
      return <span className='text-sm'>{props.user.email}</span>;
    }
  }

  function displaySignInOut() {
    if (props.user) {
      return (
        <button onClick={handleSignOut}>
          <li className='px-2 font-bold hover:underline'>Sign Out</li>
        </button>
      );
    } else {
      return (
        <button onClick={handleAccountClick} path='/signin'>
          <li className='px-2 font-bold hover:underline'>Sign In</li>
        </button>
      );
    }
  }
  return (
    <nav
      className={`fixed right-0 h-screen top-0 w-3/4 max-w-md z-[11000] bg-slate-700 text-white py-4 transition-transform overflow-y-auto ${
        !props.menuActive && "translate-x-full"
      }`}
    >
      <div className='flex justify-between items-center mb-2 mx-6'>
        <button onClick={handleExitMenu}>
          <FontAwesomeIcon icon={faX} className='text-2xl'></FontAwesomeIcon>
        </button>
        {displayUser()}
      </div>
      <h2 className='bg-slate-900 text-center py-2 sm:py-3 text-2xl sm:text-2xl font-bold'>
        Account
      </h2>
      <div className='bg-slate-500 px-1 sm:px-3 mb-2 sm:mb-4'>
        <ul className='text-lg mx-7 py-4'>
          <li className='px-2'>
            <button
              onClick={handleAccountClick}
              path='/profile'
              className='font-bold hover:underline'
            >
              Profile
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              onClick={handleAccountClick}
              path='/myshows'
              className='font-bold hover:underline'
            >
              Shows
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>
            <button
              onClick={handleAccountClick}
              path='/myposts'
              className='font-bold hover:underline'
            >
              Posts
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>
          {displaySignInOut()}
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
              className='font-bold hover:underline'
            >
              {"Action & Adventure"}
            </button>
          </li>
          <LineBreak margin='2'></LineBreak>

          <li className='px-2 font-bold'>
            <button
              id='35'
              genre='Comedy'
              onClick={handleGenreLink}
              className='font-bold hover:underline'
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
              className='font-bold hover:underline'
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
              className='font-bold hover:underline'
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
              className='font-bold hover:underline'
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
              className='font-bold hover:underline'
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
              className='font-bold hover:underline'
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
              className='font-bold hover:underline'
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
              className='font-bold hover:underline'
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
              className='font-bold hover:underline'
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
              className='font-bold hover:underline'
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
