import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import apiClient from "@/api/apiClient";
import { STRATEGY_KEYWORDS } from "../strategyKeywords";

const STAGES = [
  "indicator",         // 1. Indicator
  "indicatorAction",   // 2. Indicator Action
  "value",             // 3. Value
  "direction",         // 4. Direction
  "quantity",          // 5. Quantity
  "asset",             // 6. Asset
] as const;
type Stage = typeof STAGES[number];

// Add type for STRATEGY_KEYWORDS
const STRATEGY_KEYWORDS_TYPED: Record<string, string[]> = STRATEGY_KEYWORDS;

function getOptionLabel(stage: Stage, option: any) {
  // Handle custom inputs
  if (option.isCustom) {
    return option[stage] || option.value || option.name || "";
  }
  
  switch (stage) {
    case "direction": return option.direction;
    case "quantity": return option.quantity;
    case "asset": return option.symbol;
    case "indicator": return option.name;
    case "indicatorAction": return option.action;
    case "value": return option.value;
    default: return option.name || "";
  }
}

// Helper to determine the type of a token
function getTokenType(token: any): string {
  for (const [type, list] of Object.entries(STRATEGY_KEYWORDS_TYPED)) {
    if (list.includes(token.value || token.name || token)) {
      return type;
    }
  }
  if (token.stage) return token.stage;
  return "unknown";
}

// Check if the current sentence is complete
function isSentenceComplete(selected: any[]): boolean {
  // Define the required types in order for a valid sentence
  const requiredTypes = ["numbers", "timeframes", "connectors", "actions", "assets"];
  let idx = 0;
  for (const reqType of requiredTypes) {
    if (idx >= selected.length) return false;
    const tokenType = getTokenType(selected[idx]);
    if (tokenType !== reqType) return false;
    idx++;
  }
  return true;
}

// Helper: Parse a sentence (array of tokens) into backend payload fields
function parseStrategySentence(tokens: any[]) {
  // Example: [If, RSI, buy, 70, OR, MACD, crosses below, 20, then, buy, 2, BTC/USDT]
  // We'll extract conditions, operators, direction, quantity, asset
  const conditions = [];
  const operators = [];
  let i = 0;
  let direction = null;
  let quantity = null;
  let asset = null;
  let inThen = false;

  while (i < tokens.length) {
    const token = tokens[i];
    const val = (token.value || token.name || token.id || '').toString();
    // Detect 'then' (or similar) to switch to action part
    if (/then/i.test(val)) {
      inThen = true;
      i++;
      continue;
    }
    if (!inThen) {
      // Parse condition: indicator, action, value
      // Look ahead for indicator, action, value
      let indicator = null, action = null, value = null;
      // Indicator
      if (STRATEGY_KEYWORDS.indicators.includes(val)) {
        indicator = val;
        // Action (next token)
        if (i + 1 < tokens.length && STRATEGY_KEYWORDS.actions.includes((tokens[i + 1].value || tokens[i + 1].name || tokens[i + 1].id || '').toString())) {
          action = (tokens[i + 1].value || tokens[i + 1].name || tokens[i + 1].id || '').toString();
          i++;
        } else if (i + 1 < tokens.length && STRATEGY_KEYWORDS.operators.includes((tokens[i + 1].value || tokens[i + 1].name || tokens[i + 1].id || '').toString())) {
          action = (tokens[i + 1].value || tokens[i + 1].name || tokens[i + 1].id || '').toString();
          i++;
        }
        // Value (next token)
        if (i + 1 < tokens.length && (STRATEGY_KEYWORDS.numbers.includes((tokens[i + 1].value || tokens[i + 1].name || tokens[i + 1].id || '').toString()) || !isNaN(Number(tokens[i + 1].value || tokens[i + 1].name || tokens[i + 1].id)))) {
          value = (tokens[i + 1].value || tokens[i + 1].name || tokens[i + 1].id || '').toString();
          i++;
        }
        conditions.push({ indicator, action, value });
      } else if (STRATEGY_KEYWORDS.operators.includes(val)) {
        // Operator between conditions
        operators.push(val.toUpperCase());
      }
      // else: skip (could be 'If', 'when', etc.)
    } else {
      // After 'then': direction, quantity, asset
      if (!direction && STRATEGY_KEYWORDS.actions.includes(val)) {
        direction = val.toLowerCase();
      } else if (!quantity && (STRATEGY_KEYWORDS.numbers.includes(val) || !isNaN(Number(val)))) {
        quantity = Number(val);
      } else if (!asset && STRATEGY_KEYWORDS.assets.includes(val)) {
        asset = val;
      }
    }
    i++;
  }
  return { conditions, operators, direction, quantity, asset };
}

export default function StrategyBuilderPage() {
  const [strategyName, setStrategyName] = useState("");
  const [step, setStep] = useState<"entry" | "exit">("entry");
  const [selected, setSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [entryConditions, setEntryConditions] = useState<any[][]>([]);
  const [exitConditions, setExitConditions] = useState<any[][]>([]);
  const [customInput, setCustomInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [openPackage, setOpenPackage] = useState<string | null>(null); // For package selection

  // API data for assets and indicators
  const [apiAssets, setApiAssets] = useState<any[]>([]);
  const [apiIndicators, setApiIndicators] = useState<any[]>([]);

  // Fetch API data for assets and indicators once
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
      } catch {
        setApiAssets([]);
        setApiIndicators([]);
      }
      setLoading(false);
    };
    fetchApiData();
  }, []);

  // --- PACKAGE RECOMMENDATION SYSTEM ---
  // Always show all packages (categories) from STRATEGY_KEYWORDS
  const getAllPackages = () => {
    return Object.keys(STRATEGY_KEYWORDS);
  };

  // Get options for a given package
  const getOptionsForPackage = (pkg: string) => {
    let options: any[] = [];
    if (pkg === "assets") {
      options = apiAssets.map((a) => ({ ...a, value: a.symbol || a.name || a.asset || a.id }));
    } else if (pkg === "indicators") {
      options = apiIndicators.map((i) => ({ ...i, value: i.name || i.indicator || i.id }));
    } else if ((Object.keys(STRATEGY_KEYWORDS) as string[]).includes(pkg)) {
      options = (STRATEGY_KEYWORDS as Record<string, string[]>)[pkg].map((val: string) => ({ id: val, value: val }));
    }
    // Remove duplicates by value
    const seen = new Set();
    return options.filter((opt) => {
      if (seen.has(opt.value)) return false;
      seen.add(opt.value);
      return true;
    });
  };

  const allPackages = getAllPackages();
  const packageOptions = openPackage ? getOptionsForPackage(openPackage) : [];

  // Handle selection at each stage
  const handleSelect = (option: any) => {
    setSelected((prev) => [...prev, option]);
    setIsEditing(false);
  };

  // Remove a selected token
  const handleRemove = (idx: number) => {
    setSelected(selected.slice(0, idx));
  };

  // Add another condition
  const handleAddCondition = () => {
    if (selected.length > 0) {
      if (step === "entry") {
        setEntryConditions((prev) => [...prev, selected]);
      } else {
        setExitConditions((prev) => [...prev, selected]);
      }
      setSelected([]);
    }
  };

  // Next button logic
  const handleNext = () => {
    if (selected.length > 0) {
      if (step === "entry") {
        setEntryConditions((prev) => [...prev, selected]);
        setSelected([]);
        setStep("exit");
      } else {
        setExitConditions((prev) => [...prev, selected]);
        setSelected([]);
      }
    }
  };

  // Handle custom input submission
  const handleCustomInputSubmit = () => {
    if (customInput.trim()) {
      const customOption = {
        id: `custom-${Date.now()}`,
        value: customInput.trim(),
        isCustom: true,
      };
      handleSelect(customOption);
      setCustomInput("");
      setIsEditing(false);
    }
  };

  // Handle custom input key press
  const handleCustomInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCustomInputSubmit();
    } else if (e.key === "Escape") {
      setCustomInput("");
      setIsEditing(false);
    }
  };

  // Handle clicking on the sentence builder area
  const handleSentenceBuilderClick = () => {
    setIsEditing(true);
  };

  // Build readable sentence
  const buildSentence = (arr: any[]) =>
    arr.map((opt, idx) => (
      <span key={idx} style={{ marginRight: 8 }}>
      {getOptionLabel(STAGES[idx], opt)}
    </span>
    ));

  // Build current sentence (with remove buttons)
  const buildCurrentSentence = () =>
    selected.map((opt, idx) => (
      <span
        key={idx}
        className="inline-flex items-center bg-[#F3E8E8] text-[#4A0D0D] rounded px-3 py-1 mr-2 mb-2 text-base font-medium"
        style={{ borderBottom: "2px solid #7B2323" }}
      >
        {opt.value || opt.name || opt.id}
        <button
          className="ml-2 text-xs text-[#7B2323] hover:text-red-400"
          onClick={() => handleRemove(idx)}
          tabIndex={-1}
        >
          ×
        </button>
      </span>
    ));

  // Submit both strategies
  const handleSubmit = async () => {
    if (!strategyName.trim()) {
      alert("Please enter a strategy name");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      // Parse entry and exit strategies
      const entryParsed = entryConditions.map(parseStrategySentence);
      // For now, only send the first entry/exit (can be extended for multiple)
      const entry = entryParsed[0] || {};
      // Compose payload (send both entry and exit as separate strategies if needed)
      const payload = {
        name: strategyName.trim(),
        user_id: 1, // TODO: Replace with actual user id if available
        // Use entry as main
        conditions: entry.conditions || [],
        operators: entry.operators || [],
        direction: entry.direction || '',
        quantity: entry.quantity || '',
        asset: entry.asset || '',
        // Optionally, add time fields if you want to parse them from tokens
        // start_time: ...,
        // end_time: ...,
      };
      await apiClient.post("/api/v1/strategies", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Strategy created successfully!");
      // Optionally reset state
      setEntryConditions([]);
      setExitConditions([]);
      setSelected([]);
      setStrategyName("");
    } catch (err) {
      alert("Failed to create strategy");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F6FA] flex flex-col items-center justify-start">
     <div className="w-full max-w-4xl mx-auto my-12 bg-white p-10 border  rounded-xl shadow-lg flex flex-col" style={{boxShadow: '0 2px 16px 0 rgba(44, 39, 56, 0.10)'}}>
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

        {/* Stepper */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center w-full max-w-4xl mx-auto">
            <div className="flex-1 flex flex-col items-center">
              <span className={`font-semibold text-lg ${step === "entry" ? "text-[#7B2323]" : "text-gray-400"}`}>Entry Strategy</span>
              <div className={`w-4 h-4 ${step === "entry" ? "bg-[#FF8C00]" : "bg-gray-200"} rounded-full mt-2`} />
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-2 relative">
              <div className="absolute left-0 top-0 h-1 bg-[#FF8C00]" style={{ width: step === "entry" ? "50%" : "100%" }} />
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className={`font-semibold text-lg ${step === "exit" ? "text-[#7B2323]" : "text-gray-400"}`}>Exit Strategy</span>
              <div className={`w-4 h-4 ${step === "exit" ? "bg-[#FF8C00]" : "bg-gray-200"} rounded-full mt-2`} />
            </div>
          </div>
        </div>

        {/* Render entry/exit conditions for the current step */}
        {step === "entry" && entryConditions.length > 0 && (
          <div className="mb-4">
            {entryConditions.map((cond, idx) => (
              <div key={idx} className="bg-[#FFF3E0] text-[#7B2323] rounded px-4 py-2 mb-2 text-base font-medium border border-[#FF8C00]">
                Entry Condition {idx + 1}: {buildSentence(cond)}
              </div>
            ))}
          </div>
        )}
        {step === "exit" && exitConditions.length > 0 && (
          <div className="mb-4">
            {exitConditions.map((cond, idx) => (
              <div key={idx} className="bg-[#E3F2FD] text-[#1E3A8A] rounded px-4 py-2 mb-2 text-base font-medium border border-[#90CAF9]">
                Exit Condition {idx + 1}: {buildSentence(cond)}
              </div>
            ))}
          </div>
        )}

        {/* Input-like sentence builder */}
        <div className="mb-6">
          <div className="text-lg text-[#7B2323] mb-2">
            Type or select keywords to describe your {step} strategy
            {isSentenceComplete(selected) && (
              <span className="ml-4 text-green-600 font-semibold">Sentence Complete!</span>
            )}
          </div>
          <div 
            className="min-h-[48px] flex flex-wrap items-center border-b border-[#FF8C00] pb-2 bg-white px-2 cursor-text"
            onClick={handleSentenceBuilderClick}
          >
            {buildCurrentSentence()}
            {!isEditing && (
              <span className="text-gray-400 italic">
                {packageOptions.length > 0 ? "Select or type next..." : "No suggestions"}
              </span>
            )}
            {isEditing && (
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyPress={handleCustomInputKeyPress}
                onBlur={handleCustomInputSubmit}
                placeholder={`Type next keyword...`}
                className="flex-1 min-w-[200px] px-2 py-1 border-none outline-none bg-transparent text-black placeholder-gray-400"
                autoFocus
              />
            )}
          </div>
        </div>

        {/* Option Buttons - horizontal scroll */}
        <div className="w-full overflow-x-auto mb-8 scrollbar-hide">
          <div className="flex gap-2 min-w-fit scrollbar-hide">
            {/* Show all packages if none open, else show options for open package */}
            {!openPackage ? (
              allPackages.length === 0 ? (
                <span className="text-[#7B2323]">No packages available.</span>
              ) : (
                allPackages.map((pkg) => (
                  <button
                    key={pkg}
                    type="button"
                    className="px-4 py-2 rounded border bg-white text-[#7B2323] border-[#FF8C00] hover:bg-[#FF8C00] hover:text-white transition font-semibold"
                    onClick={() => setOpenPackage(pkg)}
                  >
                    {pkg.charAt(0).toUpperCase() + pkg.slice(1)}
                  </button>
                ))
              )
            ) : (
              <>
                <button
                  className="px-2 text-gray-400 hover:text-[#7B2323]"
                  onClick={() => setOpenPackage(null)}
                >
                  &#8592; Back
                </button>
                {packageOptions.length === 0 ? (
                  <span className="text-[#7B2323]">No options in this package.</span>
                ) : (
                  packageOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className="px-4 py-2 rounded border bg-white text-[#7B2323] border-[#FF8C00] hover:bg-[#FF8C00] hover:text-white transition"
                      onClick={() => {
                        handleSelect(option);
                        setOpenPackage(null);
                      }}
                    >
                      {option.value}
                    </button>
                  ))
                )}
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button
            className="bg-[#7B2323] text-white hover:bg-[#FF8C00] px-8"
            onClick={handleNext}
          >
            {step === "entry" ? "Next (to Exit)" : "Finish"}
          </Button>
          <Button
            className="bg-[#FF8C00] text-white hover:bg-[#FFA500] px-8"
            onClick={handleAddCondition}
          >
            Add another Condition
          </Button>
        </div>

        {/* Show completed strategies summary at the bottom */}
        {entryConditions.length > 0 && exitConditions.length > 0 && (
          <div className="mt-8">
            <div className="text-green-700 mb-2">
              <b>Entry Strategy:</b>
              {entryConditions.map((cond, idx) => (
                <span key={idx} className="ml-2">[{buildSentence(cond)}]</span>
              ))}
            </div>
            <div className="text-blue-700 mb-2">
              <b>Exit Strategy:</b>
              {exitConditions.map((cond, idx) => (
                <span key={idx} className="ml-2">[{buildSentence(cond)}]</span>
              ))}
            </div>
            <Button className="bg-[#4A0D0D] text-white hover:bg-[#7B2323] px-8 mt-4" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Create Strategy"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}