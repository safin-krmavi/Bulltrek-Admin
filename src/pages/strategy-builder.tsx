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
  const testApiConnection = async () => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      console.log('Testing API connection with token:', token ? 'Present' : 'Missing');
      
      const response = await apiClient.get("/api/v1/assets");
      console.log('API connection test successful:', response.data);
      alert('API connection successful!');
    } catch (error: any) {
      console.error('API connection test failed:', error);
      const errorMessage = error.response?.data?.message || error.message || "Unknown error";
      alert(`API connection failed: ${errorMessage}`);
    }
  };

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
    <div className="min-h-screen w-full bg-[#F5F6FA] flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl mx-auto my-12 bg-white p-10 border rounded-xl shadow-lg flex flex-col" style={{ boxShadow: '0 2px 16px 0 rgba(44, 39, 56, 0.10)' }}>
        {/* Strategy Name Input */}
        <div className="mb-8">
          <label htmlFor="strategyName" className="block text-lg font-semibold text-[#7B2323] mb-2">
            Strategy Name
          </label>
          <input
            id="strategyName"
            type="text"
            value={strategyName}
            onChange={(e) => setStrategyName(e.target.value)}
            placeholder="Enter your strategy name..."
            className="w-full px-4 py-3 border border-[#FF8C00] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent text-[#7B2323] placeholder-gray-400"
          />
        </div>
        {/* Entry Conditions Builder */}
        <div className="mb-8">
          <div className="text-lg text-[#7B2323] mb-2 font-semibold">Add Entry Conditions</div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <select
              className="px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323]"
              value={currentCondition.indicator}
              onChange={e => setCurrentCondition({ ...currentCondition, indicator: e.target.value })}
            >
              <option value="">Select Indicator</option>
              {indicatorOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323]"
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
              className="px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323]"
              placeholder="Value"
              value={currentCondition.value}
              onChange={e => setCurrentCondition({ ...currentCondition, value: e.target.value })}
            />
            {conditions.length > 0 && (
              <select
                className="px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323]"
                value={currentOperator}
                onChange={e => setCurrentOperator(e.target.value)}
              >
                {OPERATORS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}
            <Button className="bg-[#FF8C00] text-white hover:bg-[#FFA500] px-6" onClick={handleAddCondition}>
              Add Condition
            </Button>
          </div>
          {/* List of added conditions */}
          {conditions.length > 0 && (
            <div className="mb-4">
              {conditions.map((cond, idx) => (
                <div key={idx} className="flex items-center bg-[#FFF3E0] text-[#7B2323] rounded px-4 py-2 mb-2 text-base font-medium border border-[#FF8C00]">
                  <span className="mr-2">{`Condition ${idx + 1}: ${cond.indicator} ${cond.action} ${cond.value}`}</span>
                  {idx > 0 && <span className="mx-2 text-[#FF8C00]">{operators[idx - 1]}</span>}
                  <button className="ml-auto text-red-500 hover:text-red-700" onClick={() => handleRemoveCondition(idx)}>×</button>
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
              className="w-full px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323]"
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
              className="w-full px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323]"
              placeholder="Quantity"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[#7B2323] font-semibold mb-2">Asset</label>
            <select
              className="w-full px-4 py-2 border border-[#FF8C00] rounded-lg text-[#7B2323]"
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
        <div className="flex gap-4 justify-end">
          <Button
            className="bg-gray-500 text-white hover:bg-gray-600 px-6"
            onClick={testApiConnection}
            disabled={loading}
          >
            Test API
          </Button>
          <Button
            className="bg-[#7B2323] text-white hover:bg-[#FF8C00] px-8"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transform animate-scaleIn">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#7B2323] mb-2">Success!</h2>
              <p className="text-gray-600 mb-6">{successMessage}</p>
              <Button
                className="bg-[#FF8C00] text-white hover:bg-[#FFA500] px-8 py-2 rounded-lg transition-colors duration-200"
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