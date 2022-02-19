import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import MainLogo from "./MainLogo";
import LineBreak from "./utils/LineBreak";

function Menu(props) {
  return (
    <nav className='fixed right-0 top-0 h-screen w-2/4 max-w-md z-[11000] bg-slate-600 text-white py-4'>
      <div className='flex justify-between items-center mx-10'>
        <div></div>
        <div className='w-12'>
          <MainLogo></MainLogo>
        </div>
        <FontAwesomeIcon
          icon={faSquareXmark}
          className='text-3xl'
        ></FontAwesomeIcon>
      </div>
      <div className='bg-slate-500 px-10'>
        <h2 className='text-2xl font-bold mt-5 mb-1'>Your...</h2>
        <ul className='mx-7'>
          <li>Profile</li>
          <LineBreak></LineBreak>
          <li>Shows</li>
          <li>Posts</li>
          <li>Comments</li>
        </ul>
      </div>
      <h2 className='text-2xl font-bold mt-5 mb-1'>Browse</h2>
      <ul className='mx-3'>
        <li>Profile</li>
        <li>Shows</li>
        <li>Discussions</li>
      </ul>
    </nav>
  );
}

export default Menu;
