import { Routes, Route, HashRouter } from "react-router-dom";
import Page from "./components/Page";
import Homepage from "./components/Homepage";
import Show from "./components/Show";
import ShowInfo from "./components/ShowInfo";
import Search from "./components/Search";
import Browse from "./components/Browse";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Page />}>
          <Route path='/' element={<Homepage></Homepage>}></Route>
          <Route path='shows' element={<Show />}>
            <Route path=':id' element={<ShowInfo></ShowInfo>}></Route>
          </Route>
          <Route path='search/:query' element={<Search></Search>}></Route>
          <Route path='browse/:id/:genre' element={<Browse></Browse>}></Route>
          <Route path='signin' element={<SignIn />}></Route>
          <Route path='signup' element={<SignUp />}></Route>
        </Route>
        <Route path='*' element={<Page />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
