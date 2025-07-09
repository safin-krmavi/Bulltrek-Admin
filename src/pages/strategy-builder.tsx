import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import apiClient from "@/api/apiClient";
import { STRATEGY_KEYWORDS } from "../strategyKeywords";

const ACTIONS = STRATEGY_KEYWORDS.actions || [];
const INDICATORS = STRATEGY_KEYWORDS.indicators || [];
const OPERATORS = STRATEGY_KEYWORDS.operators || ["AND", "OR"];
const ASSETS = STRATEGY_KEYWORDS.assets || [];

export default function StrategyBuilderPage() {
  const [strategyName, setStrategyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [conditions, setConditions] = useState<any[]>([]);
  const [operators, setOperators] = useState<string[]>([]);
  const [currentCondition, setCurrentCondition] = useState({ indicator: '', action: '', value: '' });
  const [currentOperator, setCurrentOperator] = useState('AND');
  const [direction, setDirection] = useState('');
  const [quantity, setQuantity] = useState('');
  const [asset, setAsset] = useState('');
  const [apiAssets, setApiAssets] = useState<any[]>([]);
  const [apiIndicators, setApiIndicators] = useState<any[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      try {
        const [assetsRes, indicatorsRes] = await Promise.all([
          apiClient.get("/api/v1/assets"),
          apiClient.get("/api/v1/indicators"),
        ]);
        setApiAssets(assetsRes.data?.data || []);
        setApiIndicators(indicatorsRes.data?.data || []);
        console.log('API Data loaded:', { assets: assetsRes.data, indicators: indicatorsRes.data });
      } catch (error) {
        console.error('Failed to load API data:', error);
        setApiAssets([]);
        setApiIndicators([]);
      }
      setLoading(false);
    };
    fetchApiData();
  }, []);

  // Test API connection
  // const testApiConnection = async () => {
  //   try {
  //     const token = localStorage.getItem("AUTH_TOKEN");
  //     console.log('Testing API connection with token:', token ? 'Present' : 'Missing');
      
  //     const response = await apiClient.get("/api/v1/assets");
  //     console.log('API connection test successful:', response.data);
  //     alert('API connection successful!');
  //   } catch (error: any) {
  //     console.error('API connection test failed:', error);
  //     const errorMessage = error.response?.data?.message || error.message || "Unknown error";
  //     alert(`API connection failed: ${errorMessage}`);
  //   }
  // };

  // Create bot function
  const createBotForStrategy = async (strategyId: number) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const botPayload = {
        name: `${strategyName} Bot`,
        strategy_id: strategyId,
        mode: "paper",
        execution_type: "manual"
      };
      
      console.log('Creating bot with payload:', botPayload);
      
      const response = await apiClient.post("/api/v1/bots", botPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('Bot creation response:', response.data);
      alert(`Bot created successfully! Bot ID: ${response.data?.data?.id || 'N/A'}`);
      return response.data;
    } catch (error: any) {
      console.error('Bot creation error:', error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to create bot";
      alert(`Failed to create bot: ${errorMessage}`);
      throw error;
    }
  };

  // Build options for dropdowns
  const indicatorOptions = [
    ...INDICATORS.map((i: string) => ({ value: i, label: i })),
    ...apiIndicators.map((i: any) => ({ value: i.name || i.indicator || i.id, label: i.name || i.indicator || i.id }))
  ];
  const actionOptions = ACTIONS.map((a: string) => ({ value: a, label: a }));
  const assetOptions = [
    ...ASSETS.map((a: string) => ({ value: a, label: a })),
    ...apiAssets.map((a: any) => ({ value: a.symbol || a.name || a.asset || a.id, label: a.symbol || a.name || a.asset || a.id }))
  ];

  // Add a condition
  const handleAddCondition = () => {
    if (currentCondition.indicator && currentCondition.action && currentCondition.value) {
      setConditions((prev) => [...prev, { ...currentCondition }]);
      if (conditions.length > 0) {
        setOperators((prev) => [...prev, currentOperator]);
      }
      setCurrentCondition({ indicator: '', action: '', value: '' });
      setCurrentOperator('AND');
    } else {
      alert('Please fill all fields for the condition.');
    }
  };

  // Remove a condition
  const handleRemoveCondition = (idx: number) => {
    setConditions(conditions.filter((_, i) => i !== idx));
    setOperators(operators.filter((_, i) => i !== idx));
  };

  // Submit strategy
  const handleSubmit = async () => {
    if (!strategyName.trim()) {
      alert("Please enter a strategy name");
      return;
    }
    if (conditions.length === 0) {
      alert("Please add at least one condition");
      return;
    }
    if (!direction) {
      alert("Please select a direction");
      return;
    }
    if (!quantity) {
      alert("Please enter a quantity");
      return;
    }
    if (!asset) {
      alert("Please select an asset");
      return;
    }
    // Validate all conditions
    for (const cond of conditions) {
      if (!cond.indicator || !cond.action || !cond.value) {
        alert("All conditions must have indicator, action, and value.");
        return;
      }
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      
      // Convert condition values to numbers and ensure proper data types
      const processedConditions = conditions.map(cond => ({
        ...cond,
        value: Number(cond.value) // Ensure value is a number
      }));
      
      const payload = {
        user_id: 20, // TODO: Replace with actual user id if available
        name: strategyName.trim(),
        conditions: processedConditions,
        operators,
        direction,
        quantity: Number(quantity),
        asset
      };
      
      console.log('Sending strategy payload:', payload);
      
      const response = await apiClient.post("/api/v1/strategies", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('Strategy creation response:', response.data);
      
      // Always create a bot after successful strategy creation
      const strategyId = response.data?.data?.id;
      if (strategyId) {
        try {
          await createBotForStrategy(strategyId);
          setSuccessMessage(`Strategy and Bot created successfully! Strategy ID: ${strategyId}`);
        } catch (botError) {
          console.error('Bot creation failed but strategy was created:', botError);
          setSuccessMessage(`Strategy created successfully! (Bot creation failed)`);
        }
      } else {
        setSuccessMessage("Strategy created but couldn't get strategy ID for bot creation");
      }
      
      setShowSuccessPopup(true);
      
      // Auto-hide popup after 5 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);
      
      setConditions([]);
      setOperators([]);
      setCurrentCondition({ indicator: '', action: '', value: '' });
      setDirection('');
      setQuantity('');
      setAsset('');
      setStrategyName('');
    } catch (err: any) {
      console.error('Strategy creation error:', err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to create strategy";
      alert(`Failed to create strategy: ${errorMessage}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F6FA] dark:bg-[#18181B] flex flex-col items-center justify-start">
      {/* Card container for dark mode with gradient and shadow */}
      <div className="w-full max-w-4xl mx-auto my-12 bg-card dark:bg-gradient-to-br dark:from-[#232326] dark:to-[#18181B] border border-border dark:border-gray-700 shadow-2xl text-foreground dark:text-white rounded-2xl transition-all duration-300 p-10 flex flex-col relative overflow-hidden">
        {/* Accent bar */}
        <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-[#FF8C00] to-[#7B2323] rounded-l-2xl" />
        {/* Strategy Name Input */}
        <div className="mb-8">
          <label htmlFor="strategyName" className="block text-2xl font-bold text-[#7B2323] mb-2 flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-[#FF8C00] rounded-full mr-2"></span>
            Strategy Name
          </label>
          <input
            id="strategyName"
            type="text"
            value={strategyName}
            onChange={(e) => setStrategyName(e.target.value)}
            placeholder="Enter your strategy name..."
            className="w-full px-4 py-3 border border-[#FF8C00] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent text-[#7B2323] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-[#232326] shadow-sm transition-all duration-200"
          />
        </div>
        {/* Entry Conditions Builder */}
        <div className="mb-8">
          <div className="text-xl text-[#7B2323] mb-2 font-bold flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-[#FF8C00] rounded-full mr-2"></span>
            Add Entry Conditions
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <select
              className="px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323] dark:text-white bg-white dark:bg-[#232326] focus:ring-2 focus:ring-[#FF8C00] shadow-sm transition-all duration-200"
              value={currentCondition.indicator}
              onChange={e => setCurrentCondition({ ...currentCondition, indicator: e.target.value })}
            >
              <option value="">Select Indicator</option>
              {indicatorOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323] dark:text-white bg-white dark:bg-[#232326] focus:ring-2 focus:ring-[#FF8C00] shadow-sm transition-all duration-200"
              value={currentCondition.action}
              onChange={e => setCurrentCondition({ ...currentCondition, action: e.target.value })}
            >
              <option value="">Select Action</option>
              {actionOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <input
              type="number"
              className="px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323] dark:text-white bg-white dark:bg-[#232326] focus:ring-2 focus:ring-[#FF8C00] shadow-sm transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Value"
              value={currentCondition.value}
              onChange={e => setCurrentCondition({ ...currentCondition, value: e.target.value })}
            />
            {conditions.length > 0 && (
              <select
                className="px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323] dark:text-white bg-white dark:bg-[#232326] focus:ring-2 focus:ring-[#FF8C00] shadow-sm transition-all duration-200"
                value={currentOperator}
                onChange={e => setCurrentOperator(e.target.value)}
              >
                {OPERATORS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}
            <Button className="bg-[#FF8C00] hover:bg-[#FFA500] text-white rounded-full shadow-md px-6 font-semibold transition-all duration-200" onClick={handleAddCondition}>
              Add Condition
            </Button>
          </div>
          {/* List of added conditions */}
          {conditions.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 animate-fadeIn">
              {conditions.map((cond, idx) => (
                <div key={idx} className="flex items-center bg-gradient-to-r from-[#FFF3E0] to-[#FFE0B2] dark:from-[#2d2323] dark:to-[#3a2d1a] text-[#7B2323] dark:text-[#FF8C00] rounded-full px-4 py-2 mb-2 text-base font-medium border border-[#FF8C00] shadow-sm transition-all duration-200 animate-fadeIn">
                  <span className="mr-2">{`[${cond.indicator} ${cond.action} ${cond.value}]`}</span>
                  {idx > 0 && <span className="mx-2 text-[#FF8C00]">{operators[idx - 1]}</span>}
                  <button className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-200" onClick={() => handleRemoveCondition(idx)}>
                    <span className="material-icons text-lg">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Direction, Quantity, Asset */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[#7B2323] font-semibold mb-2">Direction</label>
            <select
              className="w-full px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323] dark:text-white bg-white dark:bg-[#232326] focus:ring-2 focus:ring-[#FF8C00] shadow-sm transition-all duration-200"
              value={direction}
              onChange={e => setDirection(e.target.value)}
            >
              <option value="">Select Direction</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div>
            <label className="block text-[#7B2323] font-semibold mb-2">Quantity</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323] dark:text-white bg-white dark:bg-[#232326] focus:ring-2 focus:ring-[#FF8C00] shadow-sm transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Quantity"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[#7B2323] font-semibold mb-2">Asset</label>
            <select
              className="w-full px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323] dark:text-white bg-white dark:bg-[#232326] focus:ring-2 focus:ring-[#FF8C00] shadow-sm transition-all duration-200"
              value={asset}
              onChange={e => setAsset(e.target.value)}
            >
              <option value="">Select Asset</option>
              {assetOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex gap-4 justify-end mt-6">
          {/* <Button
            className="bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800 px-8 rounded-full shadow-md flex items-center gap-2 transition-all duration-200"
            onClick={testApiConnection}
            disabled={loading}
          >
            <span className="material-icons text-lg">cloud_done</span>
            Test API
          </Button> */}
          <Button
            className="bg-[#FF8C00] hover:bg-[#FFA500] text-white rounded-full shadow-md px-10 py-3 font-semibold transition-all duration-200"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Strategy"}
          </Button>
        </div>
        {/* Show completed strategies summary at the bottom */}
        {conditions.length > 0 && (
          <div className="mt-8">
            <div className="text-green-700 mb-2">
              <b>Entry Strategy:</b>
              {conditions.map((cond, idx) => (
                <span key={idx} className="ml-2">[{cond.indicator} {cond.action} {cond.value}]</span>
              ))}
            </div>
          </div>
        )}
      </div>
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] dark:from-[#232326] dark:to-[#18181B] p-10 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-scaleIn text-[#7B2323] dark:text-white border-2 border-[#FF8C00] dark:border-[#FF8C00] relative overflow-hidden">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounceIn">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="text-center mt-12">
              <h2 className="text-3xl font-extrabold text-[#7B2323] dark:text-[#FF8C00] mb-2">Success!</h2>
              <p className="text-gray-600 dark:text-gray-200 mb-6">{successMessage}</p>
              <Button
                className="bg-gradient-to-r from-[#FF8C00] to-[#7B2323] text-white hover:from-[#FFA500] hover:to-[#7B2323] px-10 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-200"
                onClick={() => setShowSuccessPopup(false)}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}