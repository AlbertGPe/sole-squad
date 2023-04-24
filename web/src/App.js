import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage"
import Home from "./components/home/Home"
import AuthStore from "./contexts/AuthStore"
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
   <>
    <AuthStore>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthStore>
   </>
  );
}

export default App;
