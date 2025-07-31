import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom"
import AuthLayout from "./layout/auth-layout"
import GenericLayout from "./layout/generic-layout"
import AccountPage from "./pages/Accounts";
import AuthenticationPage from "./pages/authentication"
import DashboardPage from "./pages/dashboard"
import ForgotPasswordPage from "./pages/forgot-password";
import LoginPage from "./pages/login"
import RecoverPasswordPage from "./pages/recover-password"
import RegisterPage from "./pages/register"
import ResetPasswordPage from "./pages/reset-password"
import { Toaster } from "react-hot-toast";
import { useEffect, useState, createContext, useContext } from "react";
import { NotificationProvider } from "./contexts/NotificationContext";
import TicketDetailsPage from "./pages/ticket-details"
import UserListPage from "./pages/UserList";
import CreateUserPage from "./pages/Createuser";
import Userdetails from "./pages/Userdetails";
import StaffList from "./pages/StaffList"
import Staffdetails from "./pages/Staffdetails";
import CreateStaff from "./pages/CreateStaff";
import PlanInvoice from "./components/Users/Userdetails/PlanInvoice";
import  Subscription  from "./pages/subscription";
import CreatePlan from "./pages/CreatePlan";
import PushNotification from "./pages/PushNotification";
import Chathistory from "./pages/ChatHistory";
import FinanceInfo from "./components/Payment/FinanceInfo" ;
import Affiliate from "./pages/Affiliate";
import Coupon from "./pages/Coupon";
import Settings from "./pages/Settings";
import DeleteInfo from "./pages/DeleteInfo";
// import change from "./components"


// Theme context and hook
const ThemeContext = createContext<{theme: string, toggleTheme: () => void}>({ theme: 'light', toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

const AppRouter = ({ theme }: { theme: string }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    if (!isAuthPage) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    } else {
      document.documentElement.classList.remove('light', 'dark');
    }
  }, [theme, isAuthPage]);

  return (
    <div className="relative min-h-screen bg-background transition-colors duration-300">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<AuthLayout children={<LoginPage />} />} />
        <Route path="/login" element={<AuthLayout children={<LoginPage />} />} />
        <Route path="/forgot-password" element={<AuthLayout children={<ForgotPasswordPage />} />} />
         <Route path="/reset-password" element={<AuthLayout children={<ResetPasswordPage />} />} />
        <Route path="/account" element={<GenericLayout children={<AccountPage />} />} />
        <Route path="/dashboard" element={<GenericLayout children={<DashboardPage />} />} />
        <Route path="/ticket-details" element={<GenericLayout children={<TicketDetailsPage />} />} />
        <Route path="/user-list" element={<GenericLayout children={<UserListPage />} />} />
        <Route path="/create-user" element={<GenericLayout children={<CreateUserPage />} />} />
        <Route path="/staff-list" element={<GenericLayout children={<StaffList />} />} />
        <Route path="/register" element={<AuthLayout children={<RegisterPage /> } />} />
        <Route path="/authentication" element={<AuthLayout children={<AuthenticationPage /> } />} />
        <Route path="/recover-password" element={<AuthLayout children={<RecoverPasswordPage  /> } />} />
        <Route path="/user-details" element={<GenericLayout children={<Userdetails />} />} />
        <Route path="/staff-details" element={<GenericLayout children={<Staffdetails />} />} />
        <Route path="/create-staff" element={<GenericLayout children={<CreateStaff />} />} />
        <Route path="/subscriptions-plans" element={<GenericLayout children={<PlanInvoice />} />} />
        <Route path="/subscriptions" element={<GenericLayout children={<Subscription />} />} />
        <Route path="/create-plan" element={<GenericLayout children={<CreatePlan />} />} />
        <Route path="/push-notification" element={<GenericLayout children={<PushNotification />} />}/>
        <Route path="/chat-history" element={<GenericLayout children={<Chathistory />} />} />
        <Route path="/finance-info" element={<GenericLayout children={<FinanceInfo />} />} />
        <Route path="/affiliate" element={<GenericLayout children={<Affiliate />} />} />
        <Route path="/coupon" element={<GenericLayout children={<Coupon />} />} />
        <Route path="/settings" element={<GenericLayout children={<Settings />} />} />
        <Route path="/delete-info" element={<GenericLayout children={<DeleteInfo />} />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <NotificationProvider>
        <Router>
          <AppRouter theme={theme} />
        </Router>
      </NotificationProvider>
    </ThemeContext.Provider>
  );
}

export default App