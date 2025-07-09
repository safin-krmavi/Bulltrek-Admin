import React from "react";
import { Button } from "./ui/button";
import { Bell, HelpCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/App";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectChange = (path: string) => {
    navigate(path);
  };

  return (
    <header className="border-b border-border bg-background/90 w-full transition-colors duration-300 shadow-sm backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img src="/logo.svg" alt="Builtrek" className="h-8 drop-shadow dark:drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]" />
            <nav className="flex items-center gap-6">
              <Link to="/dashboard" className="text-foreground dark:text-white hover:text-primary transition-colors">Dashboard</Link>
              <Select onValueChange={(value) => handleSelectChange(value)}>
                <SelectTrigger className="min-w-[100px] truncate border-transparent bg-secondary text-secondary-foreground dark:text-white" >
                  <SelectValue placeholder="Trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/trade">Trade</SelectItem>
                  <SelectItem value="/indie-lesi">Indy Lesi</SelectItem>
                  <SelectItem value="/indie-trend">Indy Trend</SelectItem>
                  <SelectItem value="/growth-dca">Growth Dca</SelectItem>
                  <SelectItem value="/price-action">Price Action</SelectItem>
                  <SelectItem value="/human-grid">Human Grid</SelectItem>
                  <SelectItem value="/smart-grid">Smart Grid</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleSelectChange(value)}>
                <SelectTrigger className="min-w-[100px] border-transparent bg-secondary text-secondary-foreground dark:text-white" >
                  <SelectValue placeholder="Analysis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/trading-report">Reports</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleSelectChange(value)}>
                <SelectTrigger className="w-[130px] border-transparent bg-secondary text-secondary-foreground dark:text-white" >
                  <SelectValue placeholder="Copy Trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/copy-trade">Copy Trade</SelectItem>
                  <SelectItem value="/copy-trade-1">Copy Trade 1</SelectItem>
                  <SelectItem value="/copy-trade-2">Copy Trade 2</SelectItem>
                  <SelectItem value="/copy-trade-3">Copy Trade 3</SelectItem>
                  <SelectItem value="/trader-overview">
                    Trader Overview
                  </SelectItem>
                  <SelectItem value="/diverse-follow">
                    Diverse Follow
                  </SelectItem>
                  <SelectItem value="/smart-copy">Smart Copy</SelectItem>
                  <SelectItem value="/traders-comparison">
                    Traders Comparison
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleSelectChange(value)}>
                <SelectTrigger className="min-w-[130px] bg-secondary text-secondary-foreground dark:text-white" >
                  <SelectValue placeholder="Market Place" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/market-place">Market Place</SelectItem>
                  <SelectItem value="/pricing">Pricing</SelectItem>
                  <SelectItem value="/payment">Payment</SelectItem>
                </SelectContent>
              </Select>
              <Link to="/support" className="text-foreground dark:text-white hover:text-primary transition-colors">Support</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <ThemeToggleButton />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-5 w-5 text-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/help")}
            >
              <HelpCircle className="h-5 w-5 text-foreground" />
            </Button>
            <div
              className="h-8 w-8 rounded-full bg-muted border border-border cursor-pointer"
              onClick={() => navigate("/account ")}
            />
            <Button
              className="bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 shadow-md"
              onClick={() => navigate("/tutorial")}
            >
              Tutorial
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Theme toggle button component
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-muted shadow-md hover:scale-110 transition-transform"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 4.05l-.71.71M21 12h-1M4 12H3m16.95 7.95l-.71-.71M4.05 19.95l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
      )}
    </button>
  );
};

export default Header;
