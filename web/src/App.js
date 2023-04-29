import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage"
import AuthStore from "./contexts/AuthStore"
import Navbar from "./components/navbar/Navbar";
import SneakersPage from "./Pages/SneakersPage";
import HomePage from "./Pages/HomePage";
import SneakerPage from "./Pages/SneakerPage";
import ProfilePage from "./Pages/ProfilePage";
import ProfileEditPage from "./Pages/ProfileEditPage";

function App() {
  return (
   <div className='bg'>
    <AuthStore>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/sneakers/:id' element={<SneakerPage />} />
        <Route path='/sneakers' element={<SneakersPage />} />
        <Route path='/users/:id' element={<ProfilePage />} />
        <Route path='users/:id/edit' element={<ProfileEditPage />} />       
      </Routes>
    </AuthStore>
   </div>
  );
}

export default App;
