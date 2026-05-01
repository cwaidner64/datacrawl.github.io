import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "../src/Components/Navbar";
import Landing from "../src/Pages/Landing";
import VendorInfo from "../src/Pages/VendorInformation";
import Footer from "../src/Components/Footer";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";
import Investors from "./Pages/Investors";
import About from "./Pages/About";
import MarketplaceTool from "./Pages/MarketplaceTool";
import Services from "./Pages/Services";
import Validation from "./Pages/Validation";
import MakeWebhookErrors from "./Pages/MakeWebhookErrors";
import N8nSchemaDriftPage from "./Pages/N8nSchemaDriftPage";
import ZapierWebhookFailures from "./Pages/ZapierWebhookFailures";
import ApiPayloadBreakage from "./Pages/ApiPayloadBreakage";
import AutomationFailureMonitoring from "./Pages/AutomationFailureMonitoring";
import MakeWebhookBreakage from "./Pages/guides/MakeWebhookBreakage";
import N8nSchemaDrift from "./Pages/guides/N8nSchemaDrift";
import ZapierPayloadMismatch from "./Pages/guides/ZapierPayloadMismatch";

const ONBOARDING_ROUTE = "/onboarding/profile";

function AppContent({ handleData, data }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" exact element={<Landing />} />
      </Routes>
      {!hideNavbar && <Navbar />}
      <div className="flex-1 flex flex-col">
        <Routes>       
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/validation" exact element={<Validation />} />
          <Route path="/pricing" exact element={<Pricing />} />
          <Route path="/make-webhook-errors" exact element={<MakeWebhookErrors />} />
          <Route path="/n8n-schema-drift" exact element={<N8nSchemaDriftPage />} />
          <Route path="/zapier-webhook-failures" exact element={<ZapierWebhookFailures />} />
          <Route path="/api-payload-breakage" exact element={<ApiPayloadBreakage />} />
          <Route path="/automation-failure-monitoring" exact element={<AutomationFailureMonitoring />} />
          <Route path="/guides/make-webhook-breakage" element={<MakeWebhookBreakage />} />
          <Route path="/guides/n8n-schema-drift" element={<N8nSchemaDrift />} />
          <Route path="/guides/zapier-payload-mismatch" element={<ZapierPayloadMismatch />} />
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
    <Router basename={import.meta.env.BASE_URL}>
      <AppContent handleData={handleData} data={data} />
    </Router>
  );
}

//   <Route path="/Search" exact element={<Search onSearchSubmit={handleData} />} />
export default App;