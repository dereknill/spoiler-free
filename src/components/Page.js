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

  // useEffect(() => {
  //   const docRef = doc(db, "comments", "vzCsksKSoSNtbIXiBzYq");
  //   const getResult = async ()  => await getDoc(docRef);

  //   getResult().then((result) => {
  //     console.log(result.data());
  //   });
  // }, []);
  return (
    <div>
      <div
        className={`w-full h-full bg-black/75 fixed top-0 left-0 right-0 transition-all bottom-0 z-[10500] ${
          !faded && "hidden"
        }`}
        onClick={() => {
          setMenuActive(false);
          setFaded(false);
        }}
      ></div>
      <Menu
        setFaded={setFaded}
        setMenuActive={setMenuActive}
        menuActive={menuActive}
        user={user}
        setUser={setUser}
      ></Menu>
      <Header
        faded={faded}
        setFaded={setFaded}
        setMenuActive={setMenuActive}
        user={user}
      ></Header>

      <main
        className={`mx-auto w-[95%] bg-slate-300 max-w-screen-lg min-h-screen shadow-lg shadow-black pb-6 mb-6 mt-16 lg:mt-20 rounded-2xl relative`}
      >
        <Outlet context={[user]}></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Page;
