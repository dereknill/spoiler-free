import { Routes, Route, BrowserRouter } from "react-router-dom";
import Page from "./components/Page";
import Homepage from "./components/Homepage";
import Show from "./components/Show";
import ShowInfo from "./components/ShowInfo";
import Search from "./components/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Page />}>
          <Route path='/' element={<Homepage></Homepage>}></Route>
          <Route path='shows' element={<Show />}>
            <Route path=':id' element={<ShowInfo></ShowInfo>}></Route>
          </Route>
          <Route path='search/:query' element={<Search></Search>}></Route>
        </Route>
        <Route path='*' element={<Page />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
