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
import CartPage from "./Pages/CartPage";
import AboutUsPage from "./Pages/AboutUsPage";
import CommunityPage from "./Pages/CommunityPage";
import Error404Page from "./Pages/Error404Page";
import SeconHandPage from "./Pages/SeconHandPage";
import './index.css'
import UserPaymentPage from "./Pages/UserPaymentPage";
import Error403Page from "./Pages/Error403Page";
import AddSneakerPage from "./Pages/AddSneakerPage";
import TicketPage from "./Pages/TicketPage";

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
        <Route path='sneakers/add' element={<AddSneakerPage />} />
        <Route path='/users' element={<CommunityPage />} />
        <Route path='/users/:id' element={<ProfilePage />} />
        <Route path='/users/:id/edit' element={<ProfileEditPage />} />  
        <Route path='/user/cart' element={<CartPage />} /> 
        <Route path='/about' element={<AboutUsPage />} />
        <Route path='/second-hand' element={<SeconHandPage />} /> 
        <Route path='/payment' element={<UserPaymentPage />} /> 
        <Route path='/user-ticket' element={<TicketPage />} />
        <Route path='/403' element={<Error403Page />} />
        <Route path='/*' element={<Error404Page />} />
      </Routes>
    </AuthStore>
   </div>
  );
}

export default App;
