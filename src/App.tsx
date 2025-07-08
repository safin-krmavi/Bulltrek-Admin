import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import AuthLayout from "./layout/auth-layout"
import GenericLayout from "./layout/generic-layout"
import AccountPage from "./pages/account"
import AuthenticationPage from "./pages/authentication"
import CopyTradePage from "./pages/copy-trade"
import DashboardPage from "./pages/dashboard"
import DiverseFollowPage from "./pages/diverse-follow"
import LoginPage from "./pages/login"
import MarketPlacePage from "./pages/market-pace"
import PaymentPage from "./pages/payment"
import PricingPage from "./pages/pricing"
import RecoverPasswordPage from "./pages/recover-password"
import RegisterPage from "./pages/register"
import SmartCopyPage from "./pages/smart-copy"
import SupportPage from "./pages/support"
import TradePage from "./pages/trade"
import TraderOverview from "./pages/trader-overview"
import { TradersComparison } from "./pages/traders-comparison"
import TradingReportsPage from "./pages/trading-reports"
import StrategyBuilderPage from "./pages/strategy-builder"
import { Toaster } from "react-hot-toast";
import { useEffect, useState, createContext, useContext } from "react";

// Theme context and hook
const ThemeContext = createContext<{theme: string, toggleTheme: () => void}>({ theme: 'light', toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="relative min-h-screen bg-background transition-colors duration-300">
        <Router>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<AuthLayout children={<LoginPage />} />} />
            <Route path="/login" element={<AuthLayout children={<LoginPage /> } />} />
            <Route path="/register" element={<AuthLayout children={<RegisterPage /> } />} />
            <Route path="/authentication" element={<AuthLayout children={<AuthenticationPage /> } />} />
            <Route path="/recover-password" element={<AuthLayout children={<RecoverPasswordPage  /> } />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/dashboard" element={<GenericLayout children={<DashboardPage />} />} />
            <Route path="/account" element={<GenericLayout  children={<AccountPage />} />} />
            <Route path="/support" element={<GenericLayout  children={<SupportPage />} />} />
            <Route path="/ticket-chat" element={<GenericLayout  children={<SupportPage />} />} />
            <Route path="/trade" element={<GenericLayout  children={<TradePage />} />} />
            <Route path="/growth-dca" element={<GenericLayout  children={<TradePage />} />} />
            <Route path="/human-grid" element={<GenericLayout  children={<TradePage />} />} />
            <Route path="/smart-grid" element={<GenericLayout  children={<TradePage />} />} />
            <Route path="/indie-lesi" element={<GenericLayout  children={<TradePage />} />} />
            <Route path="/price-action" element={<GenericLayout  children={<TradePage />} />} />
            <Route path="/indie-trend" element={<GenericLayout  children={<TradePage />} />} />
            <Route path="/trading-report" element={<GenericLayout  children={<TradingReportsPage />} />} />
            <Route path="/market-place" element={<GenericLayout  children={<MarketPlacePage />} />} />
            <Route path="/copy-trade" element={<GenericLayout  children={<CopyTradePage />} />} />
            <Route path="/copy-trade-1" element={<GenericLayout  children={<CopyTradePage />} />} />
            <Route path="/copy-trade-2" element={<GenericLayout  children={<CopyTradePage />} />} />
            <Route path="/copy-trade-3" element={<GenericLayout  children={<CopyTradePage />} />} />
            <Route path="/trader-overview" element={<GenericLayout  children={<TraderOverview />} />} />
            <Route path="/diverse-follow" element={<GenericLayout  children={<DiverseFollowPage />} />} />
            <Route path="/smart-copy" element={<GenericLayout  children={<SmartCopyPage />} />} />
            <Route path="/traders-comparison" element={<GenericLayout  children={<TradersComparison />} />} />
            <Route path="/strategy-builder" element={<GenericLayout children={<StrategyBuilderPage />} />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  )
}

export default App