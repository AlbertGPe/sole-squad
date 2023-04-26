import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage"
import AuthStore from "./contexts/AuthStore"
import Navbar from "./components/navbar/Navbar";
import SneakersPage from "./Pages/SneakersPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
   <>
    <AuthStore>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/sneakers' element={<SneakersPage />} />
      </Routes>
    </AuthStore>
   </>
  );
}

export default App;
