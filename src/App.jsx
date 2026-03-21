import React from "react";
import "./App.css";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "../src/Components/Navbar";
import { AuthProvider, useAuth } from "../src/Components/AuthContext";
import Landing from "../src/Pages/Landing";
import VendorInfo from "../src/Pages/VendorInformation";
import Footer from "../src/Components/Footer";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";
import Investors from "./Pages/Investors";
import About from "./Pages/About";
import MarketplaceTool from "./Pages/MarketplaceTool";
import AINodeTrainingInfo from "./Pages/AINodeTrainingInfo";




const ONBOARDING_ROUTE = "/onboarding/profile";
const ONBOARDING_GUARD_ENABLED =
  String(import.meta.env.VITE_ENABLE_ONBOARDING_GUARD || "false").toLowerCase() === "true";

function AppContent({ handleData, data }) {
  const location = useLocation();
  const { isLoggedIn, requiresOnboarding, onboardingCompleted } = useAuth();
  const hideNavbar = location.pathname === "/";
  const isOnboardingRoute = location.pathname === ONBOARDING_ROUTE;
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";
  const shouldGateToOnboarding =
    ONBOARDING_GUARD_ENABLED &&
    isLoggedIn &&
    !isOnboardingRoute &&
    !isAuthRoute &&
    (requiresOnboarding || onboardingCompleted === false);

  if (shouldGateToOnboarding) {
    return <Navigate to={ONBOARDING_ROUTE} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" exact element={<Landing />} />
      </Routes>
      {!hideNavbar && <Navbar />}
      <div className="flex-1 flex flex-col">
        <Routes>

          <Route path="/vendor/information" exact element={<VendorInfo />} />
          <Route path="/pricing" exact element={<Pricing />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/investors" exact element={<Investors />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/market" exact element={<MarketplaceTool />} />
          <Route path="/ai-node-training" exact element={<AINodeTrainingInfo />} />
          


          
        </Routes>
      
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const [data, setData] = React.useState([]);

  const handleData = (formData) => {
    console.log("Data received in App component:", formData);
    setData(formData);
  };

  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <AppContent handleData={handleData} data={data} />
      </Router>
    </AuthProvider>
  );
}
//   <Route path="/Search" exact element={<Search onSearchSubmit={handleData} />} />
export default App;