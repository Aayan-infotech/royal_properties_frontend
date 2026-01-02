import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";

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
import NotFound from "./page/notFound";
import SellerLayout from "./layouts/sellerLayout";
import SellerHome from "./page/seller/home";
import PropertyListingForm from "./page/seller/properListing";
import { encrypt, decrypt } from "./utils/constant";
import UserProfileDashboard from "./component/myProfile";
import SellerPropertyDetail from "./page/seller/propertyDetail";
// Create a wrapper component that validates userType
const ValidatedRoute = ({ children }) => {
  const { userType } = useParams();
  const allowedUserTypes = ["buyers", "sellers", "agents"];

  if (!allowedUserTypes.includes(userType)) {
    return <NotFound />;
  }

  return children;
};

// Create a specific wrapper for seller-only routes
const SellerOnlyRoute = ({ children }) => {
  const { userType } = useParams();
  console.log("User Type in SellerOnlyRoute:", userType);
  const decryptedUserType = decrypt(localStorage.getItem("userRole") || "");
  console.log("Decrypted User Type in SellerOnlyRoute:", decryptedUserType);

  if (userType !== "sellers" && decryptedUserType !== "sellers") {
    return <NotFound />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/propertydetail/:id" element={<PropertyDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/market-trends" element={<MarketTrends />} />
          <Route path="/agents" element={<Agents />} />

          {/* Add validation for RoleSelection too */}
          <Route path="/role/:userType" element={<RoleSelection />} />

          <Route
            path="/:userType/login"
            element={
              <ValidatedRoute>
                <Login />
              </ValidatedRoute>
            }
          />

          <Route
            path="/:userType/signup"
            element={
              <ValidatedRoute>
                <SignUp />
              </ValidatedRoute>
            }
          />

          <Route
            path="/:userType/verify-otp"
            element={
              <ValidatedRoute>
                <OTP />
              </ValidatedRoute>
            }
          />

          <Route
            path="/:userType/confirm-password"
            element={
              <ValidatedRoute>
                <ConfirmPassword />
              </ValidatedRoute>
            }
          />
        </Route>

        {/* Seller routes with explicit path */}
        <Route path="/sellers" element={<SellerLayout />}>
          <Route
            path="home"
            element={
              <SellerOnlyRoute>
                <SellerHome />
              </SellerOnlyRoute>
            }
          />
          <Route
            path="property-listing"
            element={
              <SellerOnlyRoute>
                <PropertyListingForm />
              </SellerOnlyRoute>
            }
          />

            <Route
            path="property/:id"
            element={
              <SellerOnlyRoute>
                <SellerPropertyDetail />
              </SellerOnlyRoute>
            }
          />

           <Route
            path="user-profile"
            element={
              <SellerOnlyRoute>
                <UserProfileDashboard />
              </SellerOnlyRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
