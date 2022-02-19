import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import MainLogo from "./MainLogo";
import { useState } from "react";

function Header(props) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/search/${query}`);
  }

  function handleMenuClick(event) {
    event.preventDefault();
    props.setFaded(true);
    props.setMenuActive(true);
  }

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
        <form
          onSubmit={handleSearch}
          className='grow max-w-screen-md mx-4 hidden md:inline-block relative'
        >
          <input
            type='text'
            required={true}
            placeholder='Search TV Shows'
            onChange={handleInputChange}
            value={query}
            className='w-full text-base lg:text-lg pl-2 pr-10 py-1 rounded outline-none focus:shadow-[0_0_0_3px_#1d4ed8]'
          ></input>
          <button
            type='submit'
            className='absolute right-0 top-0 h-full flex items-center mr-3'
          >
            <FontAwesomeIcon
              icon={faSearch}
              className='text-zinc-800 text-lg'
            ></FontAwesomeIcon>
          </button>
        </form>
        <div className='flex items-center'>
          <div className='text-xl text-white mx-6 flex items-center md:hidden'>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </div>
          <Link to='/login' className='hidden md:inline-block'>
            <span className='text-white hover:underline text-base lg:text-xl whitespace-nowrap'>
              Sign In
            </span>
          </Link>
          <button
            className='text-3xl text-white mx-3 md:mx-8 flex items-center'
            onClick={handleMenuClick}
          >
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
