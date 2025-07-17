import ShareCard from "@/components/dashboard/share-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ApiConnect } from "../components/account/ApiConnect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAssets } from "@/hooks/useAsset";
import { useBrokerageManagement } from "@/hooks/useBrokerages";
import { useDirections } from "@/hooks/useDirection";
import { useIndicators } from "@/hooks/useIndicator";
import { useIndicatorActions } from "@/hooks/useIndicatorAction";
import { useQuantities } from "@/hooks/useQuantity";
import { useTradeMappings } from "@/hooks/useTradeMapping";
import { useIndicatorValues } from "@/hooks/useValue";
import { useBotManagement } from "@/hooks/useBotManagement";
import {
  ChevronDown,
  MessageSquare,
  MoreVertical,
  RefreshCw,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import apiClient from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CollapsibleCard } from "@/components/collapsible-card";
// import StrategyBuilder from '@/components/strategy/StrategyBuilder'
// import { Logo } from "@/components/ui/logo";
import LoadingLogo from "@/components/ui/LoadingLogo";

interface ScannerData {
  name: string;
  dateTime: string;
  pairs: string;
  status: "Active" | "Closed";
}

interface SupportTicketData {
  number: string;
  createdOn: string;
  status: "Resolved" | "In Progress";
}

interface PlanData {
  name: string;
  duration: string;
  renewalDate: string;
}

// interface LiveOrder {
//   symbol: string;
//   orderId: number;
//   orderListId: number;
//   clientOrderId: string;
//   price: string;
//   origQty: string;
//   executedQty: string;
//   cummulativeQuoteQty: string;
//   status: string;
//   timeInForce: string;
//   type: string;
//   side: string;
//   stopPrice: string;
//   icebergQty: string;
//   time: number;
//   updateTime: number;
//   isWorking: boolean;
//   workingTime: number;
//   origQuoteOrderQty: string;
//   selfTradePreventionMode: string;
// }

interface StrategyDataItem {
  id: number;
  broker: string;
  api: string;
  strategy: string;
  assetSymbol: string;
  quantity: number;
  direction: string;
  runTime: string;
  availableInvestment: number;
  frozenInvestment: number;
  unrealizedPL: number;
  netPL: number;
  netPLPercentage: number;
  tradesExecuted: number;
  status: "Active" | "Inactive";
  botName: string;
  botMode: string;
  botExecutionType: string;
}

function useStrategies() {
  return useQuery({
    queryKey: ["strategies"],
    queryFn: async () => {
      const response = await apiClient.get("/api/v1/strategies");
      return response.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

// function useLiveOrders() {
//   return useQuery({
//     queryKey: ["liveOrders"],
//     queryFn: async () => {
//       const response = await apiClient.get(
//         "/api/v1/brokerage/binance/orders/live",
//         {
//           params: {
//             symbol: "BTCUSDT",
//           },
//         }
//       );
//       return response.data;
//     },
//     refetchInterval: 30000, // Refetch every 30 seconds
//   });
// }

export default function Dashboard({ userId }: { userId?: string }) {
  const [showModal, setShowModal] = useState(false);
  const [openSections, setOpenSections] = useState({
    strategy: true,
    scanner: true,
    api: true,
    support: true,
    plan: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [strategyTablePage, setStrategyTablePage] = useState(1);
  const strategiesPerPage = 4;

  const { data: profileData } = useUserProfile();
  const userData = profileData?.data;

  // API Data Hooks
  const {
    mappings: tradeMappings,
    deleteMapping,
    isLoading: isMappingsLoading,
    error: mappingsError,
  } = useTradeMappings();
  const {
    isLoading: isIndicatorsLoading,
    error: indicatorsError,
  } = useIndicators();
  const {
    isLoading: isActionsLoading,
    error: actionsError,
  } = useIndicatorActions();
  const {
    isLoading: isAssetsLoading,
    error: assetsError,
  } = useAssets();
  const {
    isLoading: isValuesLoading,
    error: valuesError,
  } = useIndicatorValues();
  const {
    isLoading: isQuantitiesLoading,
    error: quantitiesError,
  } = useQuantities();
  const {
    isLoading: isDirectionsLoading,
    error: directionsError,
  } = useDirections();
  const { getBrokerageDetails } = useBrokerageManagement();
  // const { data: liveOrders, isLoading: isLiveOrdersLoading } = useLiveOrders();
  const { bots, isLoading: isBotsLoading } = useBotManagement();

  // Combined loading state
  const isLoading =
    isMappingsLoading ||
    isIndicatorsLoading ||
    isActionsLoading ||
    isAssetsLoading ||
    isValuesLoading ||
    isQuantitiesLoading ||
    isDirectionsLoading ||
    isBotsLoading;

  // Combined error state
  const error =
    mappingsError ||
    indicatorsError ||
    actionsError ||
    assetsError ||
    valuesError ||
    quantitiesError ||
    directionsError;

  // Fetch strategies
  const {
    data: strategies,
    isLoading: isStrategiesLoading,
    error: strategiesError,
  } = useStrategies();

  const navigate = useNavigate();

  useEffect(() => {
    toast.dismiss();
  }, [isLoading]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-[#18181b] w-full flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <LoadingLogo size={80} />
          <p className="text-muted-foreground mt-4 dark:text-white">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background dark:bg-[#18181b] w-full flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Error Loading Dashboard
          </h2>
          <p className="text-muted-foreground mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  // Transform strategies and bots into strategy data for the table
  const strategyData = (() => {
    // Debug logging
    console.log("Strategies:", strategies);
    console.log("Bots:", bots);

    // Ensure strategies and bots are arrays
    if (!Array.isArray(strategies?.data)) {
      console.error("strategies is not an array:", strategies);
      return [];
    }

    if (!Array.isArray(bots?.data)) {
      console.error("bots is not an array:", bots);
      return [];
    }

    return strategies.data
      .map((strategy: any) => {
        // Find the corresponding bot for this strategy
        const bot = bots?.data?.find((b: any) => b.strategy_id === strategy.id);
        
        if (!strategy) {
          console.error("Invalid strategy:", strategy);
          return null;
        }

        // Debug logging for strategy and bot matching
        console.log(`Strategy ${strategy.id}:`, {
          strategyName: strategy.name,
          botFound: !!bot,
          botStatus: bot?.status,
          botName: bot?.name
        });

        // Parse strategy conditions to create a readable strategy rule
        const strategyRule = (() => {
          if (strategy.conditions && Array.isArray(strategy.conditions)) {
            return strategy.conditions
              .map((condition: any, index: number) => {
                const operator = strategy.operators && strategy.operators[index - 1] ? ` ${strategy.operators[index - 1]} ` : '';
                return `${condition.indicator} ${condition.action} ${condition.value}${operator}`;
              })
              .join('');
          }
          return strategy.name || "N/A";
        })();

        // Determine strategy status based on bot status
        const getStrategyStatus = () => {
          if (!bot) {
            console.log(`Strategy ${strategy.id} has no associated bot`);
            return "Inactive" as const;
          }
          
          switch (bot.status) {
            case 'running':
              return "Active" as const;
            case 'idle':
            case 'stopped':
            default:
              return "Inactive" as const;
          }
        };

        const strategyData = {
          id: strategy.id,
          broker: "Binance", // Default to Binance as requested
          api: "REST API",
          strategy: strategyRule,
          assetSymbol: strategy.asset || "N/A",
          quantity: strategy.quantity || 0,
          direction: strategy.direction || "N/A",
          runTime: "2 Hrs",
          availableInvestment: 0, // Set to 0 instead of static value
          frozenInvestment: 0, // Set to 0 instead of static value
          unrealizedPL: 0, // Set to 0 instead of static value
          netPL: 0, // Set to 0 instead of random value
          netPLPercentage: 0, // Set to 0 instead of random value
          tradesExecuted: 0, // Set to 0 instead of static value
          status: getStrategyStatus(),
          botName: bot?.name || "N/A",
          botMode: bot?.mode || "N/A",
          botExecutionType: bot?.execution_type || "N/A",
        };

        return strategyData;
      })
      .filter((item: any): item is NonNullable<typeof item> => item !== null);
  })();

  // Use strategyData for dynamic values if available, default to 0 if no data
  const totalTradesExecuted = Array.isArray(strategyData) && strategyData.length > 0
    ? strategyData.reduce((sum, s) => sum + (s.tradesExecuted || 0), 0)
    : 0;

  const netPL = Array.isArray(strategyData) && strategyData.length > 0
    ? strategyData.reduce((sum, s) => sum + (s.netPL || 0), 0)
    : 0;

  const netPLPercentage = Array.isArray(strategyData) && strategyData.length > 0
    ? strategyData.reduce((sum, s) => sum + (s.netPLPercentage || 0), 0) / strategyData.length
    : 0;

  // Placeholder data for other sections
  // For new users, these arrays should be empty
  const scanners: ScannerData[] = [];
  const supportTickets: SupportTicketData[] = [];

  const plan: PlanData = {
    name: "Gold Membership",
    duration: "24 Months",
    renewalDate: "12 July 2024",
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof openSections],
    }));
  };

  // Pagination logic for strategy summary table
  const indexOfLastStrategy = currentPage * strategiesPerPage;
  const indexOfFirstStrategy = indexOfLastStrategy - strategiesPerPage;
  const currentStrategies = strategyData.slice(indexOfFirstStrategy, indexOfLastStrategy);
  const totalPages = Math.ceil(strategyData.length / strategiesPerPage);

  // Pagination logic for strategy table
  const strategyTableIndexOfLast = strategyTablePage * strategiesPerPage;
  const strategyTableIndexOfFirst = strategyTableIndexOfLast - strategiesPerPage;
  const currentStrategyTableItems = Array.isArray(strategies?.data) 
    ? strategies.data.slice(strategyTableIndexOfFirst, strategyTableIndexOfLast)
    : [];
  const strategyTableTotalPages = Array.isArray(strategies?.data) 
    ? Math.ceil(strategies.data.length / strategiesPerPage)
    : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStrategyTablePageChange = (page: number) => {
    setStrategyTablePage(page);
  };

  console.log("Strategies:", strategies);
  console.log("Bots:", bots);
  console.log("Strategy Data:", strategyData);
  
  // Debug summary
  console.log("=== DASHBOARD DEBUG SUMMARY ===");
  console.log("Total Strategies:", Array.isArray(strategies?.data) ? strategies.data.length : 0);
  console.log("Total Bots:", Array.isArray(bots?.data) ? bots.data.length : 0);
  console.log("Active Strategies:", strategyData.filter((s: StrategyDataItem) => s.status === "Active").length);
  console.log("Inactive Strategies:", strategyData.filter((s: StrategyDataItem) => s.status === "Inactive").length);
  console.log("Strategies without bots:", strategyData.filter((s: StrategyDataItem) => s.botName === "N/A").length);
  console.log("Total Trades Executed:", totalTradesExecuted);
  console.log("Net P/L:", netPL);
  console.log("Net P/L Percentage:", netPLPercentage);
  console.log("=================================");

  return (
    <div className="min-h-screen bg-background dark:bg-[#18181b] text-foreground dark:text-white w-full transition-colors duration-300">
      <main className="max-w-7xl mx-auto py-6 w-full">
        {/* Pixel-perfect Summary Section */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          {/* Left: Greeting + Summary Cards in a white container */}
          <div className="flex-1 max-w-[calc(100%-250px)]">
            <div className="bg-white dark:bg-[#232326] rounded-xl shadow p-4 flex flex-row items-center gap-6 h-[130px]">
              {/* Greeting */}
              <div className="flex flex-col justify-center items-start min-w-[140px] pr-2 mb-2">
                <span className="font-semibold text-[16px] leading-tight text-black dark:text-white">Hi {userData?.name || "User"},</span>
                <span className="text-[15px] text-black/80 dark:text-white/80">here is your summary</span>
              </div>
              {/* Summary Cards */}
              <div className="flex flex-row gap-6 flex-1 justify-end">
                {/* Platforms Added */}
                <div className="flex flex-row items-center justify-between bg-[#FFE6EA] dark:bg-[#2d2326] rounded-lg min-w-[150px] w-[150px] min-h-[100px] h-[100px] px-4 py-3">
                  <span className="text-[15px] text-[#4A0D0D] dark:text-white text-left leading-tight">Platforms<br/>Added</span>
                  <span className="text-[22px] font-bold text-[#2D0A0A] dark:text-white text-right leading-none">{Array.isArray(getBrokerageDetails.data?.data) ? getBrokerageDetails.data.data.length : 0}</span>
                </div>
                {/* Strategies Active */}
                <div className="flex flex-row items-center justify-between bg-[#FFE6EA] dark:bg-[#2d2326] rounded-lg min-w-[150px] w-[150px] min-h-[100px] h-[100px] px-4 py-3">
                  <span className="text-[15px] text-[#4A0D0D] dark:text-white text-left leading-tight">Strategies<br/>Active</span>
                  <span className="text-[22px] font-bold text-[#2D0A0A] dark:text-white text-right leading-none">{Array.isArray(strategies?.data) ? strategies.data.length : 0}</span>
                </div>
                {/* Trades Executed */}
                <div className="flex flex-row items-center justify-between bg-[#FFE6EA] dark:bg-[#2d2326] rounded-lg min-w-[150px] w-[150px] min-h-[100px] h-[100px] px-4 py-2">
                  <span className="text-[15px] text-[#4A0D0D] dark:text-white text-left leading-tight">Trades<br/>Executed</span>
                  <span className="text-[22px] font-bold text-[#2D0A0A] dark:text-white text-right leading-none">{totalTradesExecuted}</span>
                </div>
                {/* Net P/L */}
                <div className="flex flex-row items-center justify-between bg-[#FFE6EA] dark:bg-[#2d2326] rounded-lg min-w-[150px] w-[150px] min-h-[100px] h-[100px] px-4 py-3">
                  <span className="text-[15px] text-[#4A0D0D] dark:text-white text-left leading-tight">Net<br/>P/L</span>
                  <div className="flex flex-col items-end">
                    <span className="text-[22px] font-bold text-green-600 dark:text-green-400 text-right leading-none">${netPL}</span>
                    <span className="text-[14px] font-semibold text-green-600 dark:text-green-400 text-right leading-none">+{netPLPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Referral Card */}
          <div className="flex flex-col w-full md:w-[450px] max-w-[500px] h-[130px]">
           
              <ShareCard />
          </div>
        </div>

        {/* Strategy Summary */}
        <Collapsible
          open={openSections.strategy}
          onOpenChange={() => toggleSection("strategy")}
          className="mt-6"
        >
          <Card className="border-0 dark:bg-[#232326]">
            <CardHeader className="bg-[#4A0D0D] dark:bg-[#3b3b41] text-white rounded-t-lg transition-colors duration-300 dark:text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-medium">
                    Strategy Summary
                  </CardTitle>
                  <RefreshCw className="h-4 w-4" />
                </div>
                <CollapsibleTrigger>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <RefreshCw className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <>
                    <Table className="bg-card dark:bg-[#232326] text-foreground dark:text-white transition-colors duration-300">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-foreground dark:text-white">Broker/Exchange</TableHead>
                          <TableHead className="text-foreground dark:text-white">Strategy Rule</TableHead>
                          <TableHead className="text-foreground dark:text-white">Asset</TableHead>
                          <TableHead className="text-foreground dark:text-white">Quantity</TableHead>
                          <TableHead className="text-foreground dark:text-white">Direction</TableHead>
                          <TableHead className="text-foreground dark:text-white">Bot</TableHead>
                          <TableHead className="text-foreground dark:text-white">Status</TableHead>
                          <TableHead className="text-foreground dark:text-white">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentStrategies.map((strategy: any, i: number) => (
                          <TableRow key={strategy.id || i} className="border-border dark:text-white">
                            <TableCell className="text-foreground dark:text-white">{strategy.broker}</TableCell>
                            <TableCell className="text-foreground dark:text-white">{strategy.strategy}</TableCell>
                            <TableCell className="text-foreground dark:text-white">{strategy.assetSymbol}</TableCell>
                            <TableCell className="text-foreground dark:text-white">{strategy.quantity}</TableCell>
                            <TableCell className="text-foreground dark:text-white">{strategy.direction}</TableCell>
                            <TableCell className="text-foreground dark:text-white">{strategy.botName}</TableCell>
                            <TableCell className="text-foreground dark:text-white">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2 w-2 rounded-full ${
                                    strategy.status === "Active"
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }`}
                                />
                                {strategy.status}
                              </div>
                            </TableCell>
                            <TableCell className="text-foreground dark:text-white">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const globalIndex = indexOfFirstStrategy + i;
                                  if (tradeMappings?.[globalIndex]?.id) {
                                    deleteMapping.mutate(tradeMappings[globalIndex].id);
                                  }
                                }}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="p-4 flex items-center justify-between text-sm">
                      <div>
                        {indexOfFirstStrategy + 1}-{Math.min(indexOfLastStrategy, strategyData.length)} of {strategyData.length} entries
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          Previous
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant="outline"
                            size="sm"
                            className={currentPage === page ? "bg-[#4A0D0D] text-white" : ""}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        ))}
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Smart Scanner Summary */}
          <div>
            <Collapsible
              open={openSections.scanner}
              onOpenChange={() => toggleSection("scanner")}
            >
              <Card className="bg-card dark:bg-[#232326] border border-border dark:border-gray-700 shadow-lg text-foreground dark:text-white transition-colors duration-300">
                <CardHeader className="bg-[#4A0D0D] dark:bg-[#3b3b41] text-white rounded-t-lg transition-colors duration-300 dark:text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg font-medium">
                        Smart Scanner Summary
                      </CardTitle>
                      <RefreshCw className="h-4 w-4" />
                    </div>
                    <CollapsibleTrigger>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                  </div>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Scanner Name</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Pairs</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scanners.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-4">
                              No data available
                            </TableCell>
                          </TableRow>
                        ) : (
                          scanners.map((scanner, i) => (
                            <TableRow key={i}>
                              <TableCell>{scanner.name}</TableCell>
                              <TableCell>{scanner.dateTime}</TableCell>
                              <TableCell>{scanner.pairs}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-2 w-2 rounded-full ${
                                      scanner.status === "Active"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }`}
                                  />
                                  {scanner.status}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            <Collapsible
              open={openSections.plan}
              onOpenChange={() => toggleSection("plan")}
              className="mt-6"
            >
              <Card className="bg-card dark:bg-[#232326] border border-border dark:border-gray-700 shadow-lg text-foreground dark:text-white transition-colors duration-300">
                <CardHeader className="bg-[#4A0D0D] dark:bg-[#3b3b41] text-white rounded-t-lg transition-colors duration-300 dark:text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg font-medium">
                        Plan Details
                      </CardTitle>
                      <RefreshCw className="h-4 w-4" />
                    </div>
                    <CollapsibleTrigger>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                  </div>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="pt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Plan Name</div>
                          <div className="font-medium">{plan.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Duration</div>
                          <div className="font-medium">{plan.duration}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">
                            Next Renewal Date
                          </div>
                          <div className="font-medium">{plan.renewalDate}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button className="bg-[#4A0D0D] hover:bg-[#3A0808] text-white">
                          Upgrade
                        </Button>
                        <Button variant="outline">Renew</Button>
                        <Button
                          variant="secondary"
                          className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                        >
                          Gift Membership
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>

          <div className="space-y-6 ">
            <CollapsibleCard
              title="API Connect "
              className="col-span-2 "
              contentClassName="p-0"
              action={
                <Button
                  className="bg-[#FF8C00] text-white hover:bg-[#FFA500] rounded"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents toggling the card when clicking the button
                    setShowModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Brokers
                </Button>
              }
            >
              <ApiConnect
                userId={userId}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </CollapsibleCard>
            {/* Support Tickets */}
            <Collapsible
              open={openSections.support}
              onOpenChange={() => toggleSection("support")}
            >
              <Card className="bg-card dark:bg-[#232326] border border-border dark:border-gray-700 shadow-lg text-foreground dark:text-white transition-colors duration-300">
                <CardHeader className="bg-[#4A0D0D] dark:bg-[#3b3b41] text-white rounded-t-lg transition-colors duration-300 dark:text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg font-medium">
                        Support Tickets
                      </CardTitle>
                      <RefreshCw className="h-4 w-4" />
                    </div>
                    <CollapsibleTrigger>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                  </div>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ticket Number</TableHead>
                          <TableHead>Created On</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {supportTickets.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-4">
                              No data available
                            </TableCell>
                          </TableRow>
                        ) : (
                          supportTickets.map((ticket, i) => (
                            <TableRow key={i}>
                              <TableCell>{ticket.number}</TableCell>
                              <TableCell>{ticket.createdOn}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    ticket.status === "Resolved"
                                      ? "default"
                                      : "destructive"
                                  }
                                >
                                  {ticket.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                    <div className="p-4 text-center">
                      <Button variant="ghost" className="text-gray-500">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Give Feedback
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        </div>

        {/* Live Orders Section */}
        {/* <Card className="bg-card dark:bg-[#232326] border border-border dark:border-gray-700 shadow-lg text-foreground dark:text-white rounded-lg shadow-sm mt-6 mb-6 transition-colors duration-300">
          <CardHeader className="bg-[#4A0D0D] text-white rounded-t-lg flex">
            <CardTitle className="text-lg font-medium">
              Binance Live Orders
            </CardTitle> */}
            {/* <RefreshCw className={`h-4 w-4 ${isLiveOrdersLoading ? 'animate-spin' : ''}`} /> */}
          {/* </CardHeader> */}
          {/* <CardContent className="p-0">
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10">
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLiveOrdersLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        Loading live orders...
                      </TableCell>
                    </TableRow>
                  ) : !liveOrders?.data?.length ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No live orders available
                      </TableCell>
                    </TableRow>
                  ) : (
                    liveOrders.data.map((order: LiveOrder) => (
                      <TableRow
                        key={order.orderId}
                        className="hover:bg-muted/50"
                      >
                        <TableCell>{order.symbol}</TableCell>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{order.type}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.side === "BUY" ? "success" : "destructive"
                            }
                          >
                            {order.side}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {parseFloat(order.price) === 0
                            ? "MARKET"
                            : parseFloat(order.price).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {parseFloat(order.origQty).toFixed(8)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "FILLED"
                                ? "success"
                                : order.status === "CANCELED"
                                ? "destructive"
                                : "warning"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(order.time).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent> */}
        {/* </Card> */}
        {/* Create Strategy Button above the Strategy Table */}
        {/* Strategy Table Section */}
        <Card className="bg-card dark:bg-[#232326] border border-border dark:border-gray-700 shadow-lg text-foreground dark:text-white rounded-lg shadow-sm mt-4 transition-colors duration-300">
          <CardHeader className="bg-[#4A0D0D] dark:bg-[#3b3b41] text-white rounded-t-lg transition-colors duration-300 dark:text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Strategy Table
              </CardTitle>
              <Button
                className="bg-[#FF8C00] text-white hover:bg-[#FFA500]"
                onClick={() => navigate("/strategy-builder")}
              >
                Create Strategy
              </Button>
            </div>
            {/* <CardTitle className="text-lg font-medium">Strategy Table</CardTitle> */}
          </CardHeader>
          <CardContent className="p-0">
            {isStrategiesLoading ? (
              <div className="flex justify-center items-center h-64">
                <TableCell colSpan={8} className="text-center py-4">
                  Loading Strategies please wait...
                </TableCell>
              </div>
            ) : strategiesError ? (
              <div className="flex justify-center items-center h-64 text-red-600">
                Error loading strategies.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strategy Name</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Updated At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStrategyTableItems.length > 0 ? (
                    currentStrategyTableItems.map((strategy: any) => (
                      <TableRow key={strategy.id}>
                        <TableCell>
                          {strategy.name || strategy.strategy_name || "-"}
                        </TableCell>
                        <TableCell>
                          {strategy.created_at
                            ? new Date(strategy.created_at).toLocaleString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {strategy.updated_at
                            ? new Date(strategy.updated_at).toLocaleString()
                            : "-"}
                        </TableCell>
                        <TableCell>{strategy.status || "-"}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No strategies found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
            {/* Pagination for Strategy Table */}
            {strategyTableTotalPages > 1 && (
              <div className="p-4 flex items-center justify-between text-sm">
                <div>
                  {strategyTableIndexOfFirst + 1}-{Math.min(strategyTableIndexOfLast, Array.isArray(strategies?.data) ? strategies.data.length : 0)} of {Array.isArray(strategies?.data) ? strategies.data.length : 0} entries
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={strategyTablePage === 1}
                    onClick={() => handleStrategyTablePageChange(strategyTablePage - 1)}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: strategyTableTotalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant="outline"
                      size="sm"
                      className={strategyTablePage === page ? "bg-[#4A0D0D] text-white" : ""}
                      onClick={() => handleStrategyTablePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={strategyTablePage === strategyTableTotalPages}
                    onClick={() => handleStrategyTablePageChange(strategyTablePage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
