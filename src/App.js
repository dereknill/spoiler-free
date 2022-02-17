import { Routes, Route, BrowserRouter } from "react-router-dom";
import Page from "./components/Page";
import Homepage from "./components/Homepage";
import ShowInfo from "./components/ShowInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Page />}>
          <Route path='/' element={<Homepage></Homepage>}></Route>
          <Route path='shows' element={<ShowInfo />}>
            <Route path=':id' element={<ShowInfo></ShowInfo>}></Route>
          </Route>
        </Route>
        <Route path='*' element={<Page componentName='homepage' />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
