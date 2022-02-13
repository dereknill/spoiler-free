import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className='w-full mx-auto flex justify-center bg-zinc-800 py-4 '>
      <div className='w-full max-w-screen-2xl px-4 flex justify-between items-center'>
        <div className=''>
          <span className='text-white text-5xl font-baskerville tracking-tighter'>
            Spoiler Free
          </span>
        </div>
        <div className='grow max-w-screen-md'>
          <input type='text' className='w-full'></input>
        </div>
        <div className='basis-0 text-right'>
          <Link to='/login'>
            <span className='text-white hover:underline'>Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
