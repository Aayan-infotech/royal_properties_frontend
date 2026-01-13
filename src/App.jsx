import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./page/home";
import MarketTrends from "./page/homeValuation";
import Agents from "./page/agents";
import Login from "./page/auth/login";
import ForgotPassword from "./page/auth/forgotPassword";
import SignUp from "./page/auth/signup";
import Blogs from "./page/blogs";
import RoleSelection from "./page/auth/role";
import OTP from "./page/auth/verifyOtp";
import ConfirmPassword from "./page/auth/confirmPassword";
import PropertyDetail from "./page/propertyDetail";
import Blog from "./page/blog";
import NotFound from "./page/notFound";
import SellerHome from "./page/seller/home";
import PropertyListingForm from "./page/seller/properListing";
import { encrypt, decrypt } from "./utils/constant";
import UserProfileDashboard from "./component/myProfile";
import SellerPropertyDetail from "./page/seller/propertyDetail";

// buyer pages
import BuyerHome from "./page/buyer/home";
import NearbyProperties from "./page/buyer/nearbyProperties";
import AgentProfile from "./page/buyer/agentDetail";
import WatchList from "./page/buyer/watchList";

// agent pages
import AgentHome from "./page/agent/home";

import BuyerLayout from "./layouts/buyerLayout";
import SellerLayout from "./layouts/sellerLayout";
import AgentLayout from "./layouts/agentLayout";
import Mapper from "./page/map";
import AgentProperty from "./page/agent/agentProperty";
import HomeValuation from "./page/homeValuation";
import PropertyListing from "./page/buyer/propertyListing";
import CategoryListing from "./page/buyer/categoryListing";

// Create a wrapper component that validates userType
const checkAuthToken = () => {
  const token = localStorage.getItem("token");
  const userRole = decrypt(localStorage.getItem("userRole") || "");

  // Return true if both token and role exist
  return !!(token && userRole);
};
const ValidUserRoute = ({ children }) => {
  const { userType } = useParams();
  const allowedUserTypes = ["buyers", "sellers", "agents"];
  const isLoggedIn = checkAuthToken();

  // If user is logged in, redirect to NotFound
  if (isLoggedIn) {
    return <NotFound />;
  }

  // Check if this is being used on the home page (no userType param)
  if (!userType) {
    return children;
  }

  // For routes with userType param, validate it
  const decryptedUserType = decrypt(localStorage.getItem("userRole") || "");

  if (allowedUserTypes.includes(userType)) {
    return children;
  }

  return <NotFound />;
};


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

const BuyerOnlyRoute = ({ children }) => {
  const { userType } = useParams();
  console.log("User Type in BuyerOnlyRoute:", userType);
  const decryptedUserType = decrypt(localStorage.getItem("userRole") || "");
  console.log("Decrypted User Type in BuyerOnlyRoute:", decryptedUserType);
  if (userType !== "buyers" && decryptedUserType !== "buyers") {
    return <NotFound />;
  }

  return children;
};

const AgentOnlyRoute = ({ children }) => {
  const { userType } = useParams();
  console.log("User Type in AgentOnlyRoute:", userType);
  const decryptedUserType = decrypt(localStorage.getItem("userRole") || "");
  console.log("Decrypted User Type in AgentOnlyRoute:", decryptedUserType);
  if (userType !== "agents" && decryptedUserType !== "agents") {
    return <NotFound />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<ValidUserRoute><Home /></ValidUserRoute>} />
          <Route path="/map" element={<ValidUserRoute><Mapper /></ValidUserRoute>} />
          <Route path="/propertydetail/:id" element={<ValidUserRoute><PropertyDetail /></ValidUserRoute>} />
          <Route path="/blogs" element={<ValidUserRoute><Blogs /></ValidUserRoute>} />
          <Route path="/blog/:id" element={<ValidUserRoute><Blog /></ValidUserRoute>} />
          <Route path="/home-valuation" element={<ValidUserRoute><HomeValuation /></ValidUserRoute>} />
          <Route path="/agents" element={<ValidUserRoute><Agents /></ValidUserRoute>} />

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
            path="/:userType/forgot-password"
            element={
              <ValidatedRoute>
                <ForgotPassword />
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
            path="property-detail/:id"
            element={
              <SellerOnlyRoute>
                <PropertyDetail />
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

        <Route path="/buyers" element={<BuyerLayout />}>
          <Route
            path="home"
            element={
              <BuyerOnlyRoute>
                <BuyerHome />
              </BuyerOnlyRoute>
            }
          />

            <Route
            path="category-listing"
            element={
              <BuyerOnlyRoute>
                <CategoryListing />
              </BuyerOnlyRoute>
            }
          />

          <Route
            path="agents"
            element={
              <BuyerOnlyRoute>
                <Agents />
              </BuyerOnlyRoute>
            }
          />

          <Route
            path="map"
            element={
              <BuyerOnlyRoute>
                <Mapper />
              </BuyerOnlyRoute>
            }
          />

           <Route
            path="property-listing"
            element={
              <BuyerOnlyRoute>
                <PropertyListing />
              </BuyerOnlyRoute>
            }
          />

          <Route
            path="property-detail/:id"
            element={
              <BuyerOnlyRoute>
                <PropertyDetail />
              </BuyerOnlyRoute>
            }
          />
          <Route
            path="nearby-properties"
            element={
              <BuyerOnlyRoute>
                <NearbyProperties />
              </BuyerOnlyRoute>
            }
          />

          <Route
            path="user-profile"
            element={
              <BuyerOnlyRoute>
                <UserProfileDashboard />
              </BuyerOnlyRoute>
            }
          />

          <Route
            path="watchlist"
            element={
              <BuyerOnlyRoute>
                <WatchList />
              </BuyerOnlyRoute>
            }
          />


          <Route
            path="agent-detail/:id"
            element={
              <BuyerOnlyRoute>
                <AgentProfile />
              </BuyerOnlyRoute>
            }
          />
        </Route>

        <Route path="/agents" element={<AgentLayout />}>
          <Route
            path="home"
            element={
              <AgentOnlyRoute>
                <AgentHome />
              </AgentOnlyRoute>
            }
          />

           <Route
            path="map"
            element={
              <AgentOnlyRoute>
                <Mapper />
              </AgentOnlyRoute>
            }
          />
          <Route
            path="agent-property"
            element={
              <AgentOnlyRoute>
                <AgentProperty />
              </AgentOnlyRoute>
            }
          />

          <Route
            path="property-detail/:id"
            element={
              <AgentOnlyRoute>
                <PropertyDetail />
              </AgentOnlyRoute>
            }
          />

          <Route
            path="user-profile"
            element={
              <AgentOnlyRoute>
                <UserProfileDashboard />
              </AgentOnlyRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
