import { BrowserRouter, Route, Routes } from "react-router";
import PageLayout from "../components/layout/PageLayout.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthContext.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";

import Home from "../pages/Home.jsx";
import Support from "../pages/Support.jsx";
import Billing from "../pages/Billing.jsx";
import Contracts from "../pages/Contracts.jsx";
import Outages from "../pages/Outages.jsx";
import Moving from "../pages/Moving.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Analytics from "../pages/Analytics.jsx";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <BrowserRouter>
        <PageLayout>
         <Routes>
           <Route path="/" element={<Home />} /> 
            <Route path="/support" element={<Support />} />
            <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
            <Route path="/contracts" element={<ProtectedRoute><Contracts /></ProtectedRoute>} />
            <Route path="/outages" element={<ProtectedRoute><Outages /></ProtectedRoute>} />
            <Route path="/moving" element={<ProtectedRoute><Moving /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
         </Routes>    
        </PageLayout>
      </BrowserRouter>
      </AuthProvider>
      </QueryClientProvider>
    ) }