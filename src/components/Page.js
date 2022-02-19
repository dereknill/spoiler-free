import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import { useState } from "react";

function Page(props) {
  const [faded, setFaded] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div>
      <Menu
        setFaded={setFaded}
        setMenuActive={setMenuActive}
        menuActive={menuActive}
      ></Menu>
      <div
        className={`flex flex-col w-full bg-slate-800 min-h-screen ${
          faded && "brightness-[0.25]"
        }`}
      >
        <Header setFaded={setFaded} setMenuActive={setMenuActive}></Header>
        <main className='mx-auto w-[95%] bg-slate-200 max-w-screen-lg shadow-lg shadow-black mt-20 mb-6 rounded-2xl relative'>
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Page;
