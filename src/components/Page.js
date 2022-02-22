import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Page(props) {
  const [faded, setFaded] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <div>
      <Menu
        setFaded={setFaded}
        setMenuActive={setMenuActive}
        menuActive={menuActive}
        user={user}
        setUser={setUser}
      ></Menu>
      <div
        className={`flex flex-col w-full bg-slate-800 min-h-screen transition-all ${
          faded && "brightness-[0.25]"
        }`}
      >
        <Header
          setFaded={setFaded}
          setMenuActive={setMenuActive}
          user={user}
        ></Header>
        <main
          className={`mx-auto w-[95%] bg-slate-300 max-w-screen-lg min-h-screen shadow-lg shadow-black mb-6 mt-16 lg:mt-24 rounded-2xl relative`}
        >
          <Outlet context={[user]}></Outlet>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Page;
