import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import MainLogo from "./MainLogo";

function Header(props) {
  return (
    <header className='w-full mx-auto flex justify-center bg-slate-900 py-2 fixed z-[10000]'>
      <div className='w-full max-w-screen-xl flex justify-between items-center'>
        <div className='flex'>
          <div className='mx-3 w-[30px] lg:w-[50px] shrink-0'>
            <MainLogo />
          </div>

          <div className='flex items-center shrink'>
            <Link to='/'>
              <span className='text-white text-2xl lg:text-4xl tracking-tighter'>
                Spoilerphobia
              </span>
            </Link>
          </div>
        </div>
        <div className='grow max-w-screen-md mx-4 hidden md:inline-block relative'>
          <input
            type='text'
            placeholder='Search TV Shows'
            className='w-full text-base lg:text-lg pl-2 pr-10 py-1 rounded outline-none focus:shadow-[0_0_0_3px_#1d4ed8]'
          ></input>
          <div className='absolute right-0 top-0 h-full flex items-center mr-3'>
            <FontAwesomeIcon
              icon={faSearch}
              className='text-zinc-800 text-lg'
            ></FontAwesomeIcon>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='text-xl text-white mx-6 flex items-center md:hidden'>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </div>
          <Link to='/login' className='hidden md:inline-block'>
            <span className='text-white hover:underline text-base lg:text-xl whitespace-nowrap'>
              Sign In
            </span>
          </Link>
          <div className='text-3xl text-white mx-3 md:mx-8 flex items-center'>
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
