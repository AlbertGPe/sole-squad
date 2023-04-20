import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<Home />} /> {/* TODO */}
    </Routes>
   </>
  );
}

export default App;
