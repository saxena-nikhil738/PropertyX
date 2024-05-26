import "./App.css";
import Header from "./components/Header/header";
import { Routes, Route } from "react-router-dom";
import Login from "./components/account/login";
import Signup from "./components/account/signup";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PageNotFound from "./components/InvalidRoute/PageNotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPPage from "./components/OTPVerification/OTPPage";
import EnterEmail from "./components/ForgetPassword/EnterEmail";
import ResetPassword from "./components/ForgetPassword/ResetPassword";
import Property from "./components/Complaints/Property";

function App() {
  {
    document.title = `PropertyX`;
  }
  return (
    <div>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/verifyOTP" element={<OTPPage />} />
        <Route path="/forgetpassword" element={<EnterEmail />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/main" element={<PrivateRoute />}>
          <Route path="property" element={<Property />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route
          path="/sellerlogin"
          element={<Login endpoint={"sellerlogin"} />}
        />
        <Route
          path="/sellersignup"
          element={<Signup endpoint={"sellersignup"} />}
        />
        <Route path="/buyerlogin" element={<Login endpoint={"buyerlogin"} />} />
        <Route
          path="/buyersignup"
          element={<Signup endpoint={"buyersignup"} />}
        />
        <Route path="/logout" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
