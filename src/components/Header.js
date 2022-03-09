import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faX,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import MainLogo from "./MainLogo";
import { useState } from "react";

function Header(props) {
  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const navigate = useNavigate();

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearchActive(false);
    props.setNewSearch(true);
    navigate(`/search/${query}`);
  }

  function handleSearchOverlay(event) {
    event.preventDefault();
    setSearchActive(true);
  }

  function handleMenuClick(event) {
    event.preventDefault();
    props.setFaded(true);
    props.setMenuActive(true);
  }

  function handleCancelSearch(event) {
    event.preventDefault();
    setSearchActive(false);
  }

  function displaySignInOrUser() {
    if (!props.user) {
      return (
        <Link to='/signin' className='hidden md:inline-block'>
          <span className='text-white hover:underline text-base lg:text-xl whitespace-nowrap'>
            Sign In
          </span>
        </Link>
      );
    } else {
      return (
        <div className='hidden md:inline mx-5 bg-slate-500 rounded-full h-10 w-10 shadow shadow-slate-500'>
          <Link
            to='/profile'
            className='w-full h-full flex items-center justify-center text-xl text-white'
          >
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          </Link>
        </div>
      );
    }
  }

  return (
    <header className='w-full mx-auto px-2 flex justify-center bg-slate-900 py-2 fixed top-0 z-[10000]'>
      <div
        className={`flex absolute w-full h-full items-center justify-center transition-transform bg-black top-0 left-0 ${
          !searchActive && "-translate-y-full"
        }`}
      >
        <form onSubmit={handleSearch} className='w-full mx-6 relative'>
          <input
            type='text'
            required={true}
            placeholder='Search TV Shows'
            onChange={handleInputChange}
            value={query}
            className='w-full text-base lg:text-lg pl-2 pr-10 py-1 rounded outline-none focus:shadow-[0_0_0_3px_#1d4ed8]'
          ></input>
          <button type='submit'></button>
          <button
            onClick={handleCancelSearch}
            className='absolute right-0 top-0 h-full flex items-center mr-3'
          >
            <FontAwesomeIcon
              icon={faX}
              className='text-zinc-800 text-lg'
            ></FontAwesomeIcon>
          </button>
        </form>
      </div>
      <div className='w-full max-w-screen-xl flex justify-between items-center'>
        <div className='flex'>
          <div className='mx-3 w-[30px] lg:w-[50px] shrink-0'>
            <MainLogo />
          </div>

          <div className='flex items-center shrink'>
            <Link to='/'>
              <span className='text-white text-3xl lg:text-4xl font-sansita'>
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
            className='absolute right-0 top-0 h-full flex items-center mr-3'
            type={searchActive ? "" : "submit"}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className='text-zinc-800 text-lg'
            ></FontAwesomeIcon>
          </button>
        </form>
        <div className='flex items-center'>
          <div className='text-xl text-white mx-6 flex items-center md:hidden'>
            <button onClick={handleSearchOverlay}>
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
          </div>
          {displaySignInOrUser()}
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
