import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import LineBreak from "./utils/LineBreak";

function Menu(props) {
  function handleExitMenu(event) {
    event.preventDefault();
    props.setFaded(false);
    props.setMenuActive(false);
  }

  return (
    <nav
      className={`fixed right-0 top-0 h-screen w-2/4 max-w-md z-[11000] bg-slate-700 text-white py-4 transition-transform ${
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
      <h2 className='bg-slate-900 text-center py-3 mt-4 text-2xl font-bold'>
        Account
      </h2>
      <div className='bg-slate-500 px-3 mb-4'>
        <ul className='text-lg mx-7 py-4'>
          <li className='px-2 font-bold'>Profile</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Shows</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Posts</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Comments</li>
        </ul>
      </div>
      <h2 className='bg-slate-900 text-center py-3 mt-8 text-2xl font-bold'>
        Browse
      </h2>
      <div className='bg-slate-500 px-3 mb-4'>
        <ul className='mx-7 py-4 text-lg'>
          <li className='px-2 font-bold'>{"Action & Adventure"}</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Animation</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Comedy</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Crime</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Documentary</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Drama</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Family</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Kids</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Mystery</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>Reality</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>{"Sci-Fi & Fantasy"}</li>
          <LineBreak margin='2'></LineBreak>
          <li className='px-2 font-bold'>{"War & Politics"}</li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
