import { BrowserRouter, Route, Routes } from "react-router";
import PageLayout from "../components/layout/PageLayout.jsx";

import Home from "../pages/Home.jsx";
import Support from "../pages/Support.jsx";
import Billing from "../pages/Billing.jsx";
import Contracts from "../pages/Contracts.jsx";
import Outages from "../pages/Outages.jsx";
import Moving from "../pages/Moving.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Analytics from "../pages/Analytics.jsx";

export default function App() {
  return (
      <BrowserRouter>
        <PageLayout>
         <Routes>
           <Route path="/" element={<Home />} /> 
            <Route path="/support" element={<Support />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/outages" element={<Outages />} />
            <Route path="/moving" element={<Moving />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
         </Routes>    
        </PageLayout>
      </BrowserRouter>
    ) }