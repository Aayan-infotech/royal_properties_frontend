import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./page/home";
import MarketTrends from "./page/marketTrends";
import Agents from "./page/agents";
import Login from "./page/auth/login";
import SignUp from "./page/auth/signup";
import Blogs from "./page/blogs";
import RoleSelection from "./page/auth/role";
import OTP from "./page/auth/verifyOtp";
import ConfirmPassword from "./page/auth/confirmPassword";
import PropertyDetail from "./page/user/propertyDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/propertydetail/:id" element={<PropertyDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/role" element={<RoleSelection />} />
          <Route path="/market-trends" element={<MarketTrends />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/login/:userType" element={<Login />} />
          <Route path="/signup/:userType" element={<SignUp />} />
          <Route path="/verifyOTP" element={<OTP />} />
          <Route path="/confirmPassword" element={<ConfirmPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
