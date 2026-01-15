import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";


// Import layouts immediately (they're needed for route structure)
import MainLayout from "./layouts/MainLayout";
import BuyerLayout from "./layouts/buyerLayout";
import SellerLayout from "./layouts/sellerLayout";
import AgentLayout from "./layouts/agentLayout";

// Lazy load all page components
const Home = lazy(() => import("./page/home"));
const Mapper = lazy(() => import("./page/map"));
const PropertyDetail = lazy(() => import("./page/propertyDetail"));
const Blogs = lazy(() => import("./page/blogs"));
const Blog = lazy(() => import("./page/blog"));
const HomeValuation = lazy(() => import("./page/homeValuation"));
const Agents = lazy(() => import("./page/agents"));
const PropertyListing = lazy(() => import("./page/buyer/propertyListing"));
const CategoryListing = lazy(() => import("./page/buyer/categoryListing"));
const RoleSelection = lazy(() => import("./page/auth/role"));
const Login = lazy(() => import("./page/auth/login"));
const SignUp = lazy(() => import("./page/auth/signup"));
const ForgotPassword = lazy(() => import("./page/auth/forgotPassword"));
const OTP = lazy(() => import("./page/auth/verifyOtp"));
const ConfirmPassword = lazy(() => import("./page/auth/confirmPassword"));
const NotFound = lazy(() => import("./page/notFound"));

// Seller pages
const SellerHome = lazy(() => import("./page/seller/home"));
const PropertyListingForm = lazy(() => import("./page/seller/properListing"));

// Buyer pages
const BuyerHome = lazy(() => import("./page/buyer/home"));
const NearbyProperties = lazy(() => import("./page/buyer/nearbyProperties"));
const AgentProfile = lazy(() => import("./page/buyer/agentDetail"));
const WatchList = lazy(() => import("./page/buyer/watchList"));

// Agent pages
const AgentHome = lazy(() => import("./page/agent/home"));
const AgentProperty = lazy(() => import("./page/agent/agentProperty"));

const UserProfileDashboard = lazy(() => import("./component/myProfile"));

// Import utility functions
import { encrypt, decrypt } from "./utils/constant";
import Header from "./component/header";
import Footer from "./component/footer";

// Loading component
const LoadingFallback = () => (
  <>
    <Header />
    <div role="status" className="my-4 max-w-7xl mx-auto rounded-lg flex items-center justify-center w-full h-56 min-h-screen bg-[#6b686940] rounded-base animate-pulse">
      <span className="sr-only">Loading...</span>
    </div>

    <Footer />
  </>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return null;
};

// Memoize auth check to avoid repeated localStorage access
const getAuthState = (() => {
  let cached = null;
  let lastCheck = 0;
  const CACHE_DURATION = 1000; // 1 second cache

  return () => {
    const now = Date.now();
    if (cached && (now - lastCheck) < CACHE_DURATION) {
      return cached;
    }

    const token = localStorage.getItem("token");
    const userRole = decrypt(localStorage.getItem("userRole") || "");

    cached = {
      isLoggedIn: !!(token && userRole),
      userRole
    };
    lastCheck = now;

    return cached;
  };
})();

const ValidUserRoute = ({ children }) => {
  const { userType } = useParams();
  const allowedUserTypes = ["buyers", "sellers", "agents"];
  const { isLoggedIn, userRole } = getAuthState();

  if (isLoggedIn) {
    return <Navigate to={`/${userRole}/home`} replace />;
  }

  if (!userType) {
    return children;
  }

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

const SellerOnlyRoute = ({ children }) => {
  const { userType } = useParams();
  const { userRole } = getAuthState();

  if (userType !== "sellers" && userRole !== "sellers") {
    return <NotFound />;
  }

  return children;
};

const BuyerOnlyRoute = ({ children }) => {
  const { userType } = useParams();
  const { userRole } = getAuthState();

  if (userType !== "buyers" && userRole !== "buyers") {
    return <NotFound />;
  }

  return children;
};

const AgentOnlyRoute = ({ children }) => {
  const { userType } = useParams();
  const { userRole } = getAuthState();

  if (userType !== "agents" && userRole !== "agents") {
    return <NotFound />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<ValidUserRoute><Home /></ValidUserRoute>} />
            <Route path="/map" element={<ValidUserRoute><Mapper /></ValidUserRoute>} />
            <Route path="/propertydetail/:id" element={<ValidUserRoute><PropertyDetail /></ValidUserRoute>} />
            <Route path="/blogs" element={<ValidUserRoute><Blogs /></ValidUserRoute>} />
            <Route path="/blog/:id" element={<ValidUserRoute><Blog /></ValidUserRoute>} />
            <Route path="/home-valuation" element={<ValidUserRoute><HomeValuation /></ValidUserRoute>} />
            <Route path="/agents" element={<ValidUserRoute><Agents /></ValidUserRoute>} />
            <Route path="property-listing" element={<ValidUserRoute><PropertyListing /></ValidUserRoute>} />
            <Route path="category-listing" element={<ValidUserRoute><CategoryListing /></ValidUserRoute>} />
            <Route path="/role/:userType" element={<RoleSelection />} />
            <Route path="/:userType/login" element={<ValidatedRoute><Login /></ValidatedRoute>} />
            <Route path="/:userType/signup" element={<ValidatedRoute><SignUp /></ValidatedRoute>} />
            <Route path="/:userType/forgot-password" element={<ValidatedRoute><ForgotPassword /></ValidatedRoute>} />
            <Route path="/:userType/verify-otp" element={<ValidatedRoute><OTP /></ValidatedRoute>} />
            <Route path="/:userType/confirm-password" element={<ValidatedRoute><ConfirmPassword /></ValidatedRoute>} />
          </Route>

          <Route path="/sellers" element={<SellerLayout />}>
           <Route path="map" element={<SellerOnlyRoute><Mapper /></SellerOnlyRoute>} />
            <Route path="home" element={<SellerOnlyRoute><SellerHome /></SellerOnlyRoute>} />
            <Route path="property-listing" element={<SellerOnlyRoute><PropertyListingForm /></SellerOnlyRoute>} />
            <Route path="property-detail/:id" element={<SellerOnlyRoute><PropertyDetail /></SellerOnlyRoute>} />
            <Route path="user-profile" element={<SellerOnlyRoute><UserProfileDashboard /></SellerOnlyRoute>} />
          </Route>

          <Route path="/buyers" element={<BuyerLayout />}>
            <Route path="home" element={<BuyerOnlyRoute><BuyerHome /></BuyerOnlyRoute>} />
            <Route path="category-listing" element={<BuyerOnlyRoute><CategoryListing /></BuyerOnlyRoute>} />
            <Route path="agents" element={<BuyerOnlyRoute><Agents /></BuyerOnlyRoute>} />
            <Route path="map" element={<BuyerOnlyRoute><Mapper /></BuyerOnlyRoute>} />
            <Route path="property-listing" element={<BuyerOnlyRoute><PropertyListing /></BuyerOnlyRoute>} />
            <Route path="property-detail/:id" element={<BuyerOnlyRoute><PropertyDetail /></BuyerOnlyRoute>} />
            <Route path="nearby-properties" element={<BuyerOnlyRoute><NearbyProperties /></BuyerOnlyRoute>} />
            <Route path="user-profile" element={<BuyerOnlyRoute><UserProfileDashboard /></BuyerOnlyRoute>} />
            <Route path="watchlist" element={<BuyerOnlyRoute><WatchList /></BuyerOnlyRoute>} />
            <Route path="agent-detail/:id" element={<BuyerOnlyRoute><AgentProfile /></BuyerOnlyRoute>} />
          </Route>

          <Route path="/agents" element={<AgentLayout />}>
            <Route path="home" element={<AgentOnlyRoute><AgentHome /></AgentOnlyRoute>} />
            <Route path="map" element={<AgentOnlyRoute><Mapper /></AgentOnlyRoute>} />
            <Route path="agent-property" element={<AgentOnlyRoute><AgentProperty /></AgentOnlyRoute>} />
            <Route path="property-detail/:id" element={<AgentOnlyRoute><PropertyDetail /></AgentOnlyRoute>} />
            <Route path="user-profile" element={<AgentOnlyRoute><UserProfileDashboard /></AgentOnlyRoute>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;