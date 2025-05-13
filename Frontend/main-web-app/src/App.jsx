import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import AddProduct from "./pages/AddProduct";
import QueryForm from "./pages/QueryForm";
import QueryList from "./pages/QueryList";
import IncomeStatement from "./pages/IncomeStatement";
import SalesDashboard from "./pages/SalesDashboard";
import Navbar from "./components/Nav";
import Repairs from "./pages/Repairs";
import IWBHome from "./components/Home-page";
import LandingPage from "./components/Home-page";
import AdminDashboard from "./components/AdminDashboard";
import AdminInventory from "./pages/AdminInventory";
import AdminSettings from "./pages/AdminSettings";
import OtpVerification from "./pages/OtpVerification";
import About from "./pages/About";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import NetIncomePage from "./pages/NetIncomePage";
import ProjectCharts from "./pages/ProjectCharts";
import ForexCharts from "./pages/ForexOverview";
import StockAnalysis from "./pages/StockAnalysis";
import MarketTrends from "./pages/MarketTrends";
import OrderPage from "./pages/OrderPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <main>
            <Routes>
              <Route path="/ss" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<p>Page not found</p>} />
              <Route path="/login" element={<Login />} />
              <Route path="/home-page" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route
                path="/dashboard/admin/add-product"
                element={<AddProduct />}
              />
              <Route path="/income-statements" element={<IncomeStatement />} />
              <Route path="/sales-dashboard" element={<SalesDashboard />} />
              <Route path="/landing-page" element={<IWBHome />} />
              <Route path="/nav" element={<Navbar />} />
              <Route path="/repairs" element={<Repairs />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin-inventory" element={<AdminInventory />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/settings" element={<AdminSettings />} />
              <Route path="/query-form" element={<QueryForm />} />
              <Route path="/query-list" element={<QueryList />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/query-lists" element={<QueryList />} />
              <Route path="/repairs" element={<Repairs />} />
              <Route path="/payment" element={<PaymentConfirmation />} />
              <Route path="/net-income" element={<NetIncomePage />} />
              <Route path="/project-chart" element={<ProjectCharts />} />
              <Route path="/forex" element={<ForexCharts />} />
              <Route path="/stock-analysis" element={<StockAnalysis />} />
              <Route path="/market-trends" element={<MarketTrends />} />
              <Route path="/order/:id" element={<OrderPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
