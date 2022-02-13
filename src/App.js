import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='*' element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
