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
import Blog from "./page/blog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/propertydetail/:id" element={<PropertyDetail />} />
          <Route path="/blogs" element={<Blogs />} />
           <Route path="/blog/:id" element={<Blog />} />
          <Route path="/role/:userType" element={<RoleSelection />} />
          <Route path="/market-trends" element={<MarketTrends />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/:userType/login" element={<Login />} />
          <Route path="/:userType/signup" element={<SignUp />} />
          <Route path="/:userType/verify-otp" element={<OTP />} />
          <Route path="/:userType/confirm-password" element={<ConfirmPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
