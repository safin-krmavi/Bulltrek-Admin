import { ShareCard } from "@/components/dashboard/share-card";
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

interface LiveOrder {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  stopPrice: string;
  icebergQty: string;
  time: number;
  updateTime: number;
  isWorking: boolean;
  workingTime: number;
  origQuoteOrderQty: string;
  selfTradePreventionMode: string;
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

function useLiveOrders() {
  return useQuery({
    queryKey: ["liveOrders"],
    queryFn: async () => {
      const response = await apiClient.get(
        "/api/v1/brokerage/binance/orders/live",
        {
          params: {
            symbol: "BTCUSDT",
          },
        }
      );
      return response.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export default function Dashboard({ userId }: { userId?: string }) {
  const [showModal, setShowModal] = useState(false);
  const [openSections, setOpenSections] = useState({
    strategy: true,
    scanner: true,
    api: true,
    support: true,
    plan: true,
  });

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
    indicators,
    isLoading: isIndicatorsLoading,
    error: indicatorsError,
  } = useIndicators();
  const {
    actions: indicatorActions,
    isLoading: isActionsLoading,
    error: actionsError,
  } = useIndicatorActions();
  const {
    assets,
    isLoading: isAssetsLoading,
    error: assetsError,
  } = useAssets();
  const {
    values: indicatorValues,
    isLoading: isValuesLoading,
    error: valuesError,
  } = useIndicatorValues();
  const {
    quantities,
    isLoading: isQuantitiesLoading,
    error: quantitiesError,
  } = useQuantities();
  const {
    directions,
    isLoading: isDirectionsLoading,
    error: directionsError,
  } = useDirections();
  const { getBrokerageDetails } = useBrokerageManagement();
  const { data: liveOrders, isLoading: isLiveOrdersLoading } = useLiveOrders();

  // Combined loading state
  const isLoading =
    isMappingsLoading ||
    isIndicatorsLoading ||
    isActionsLoading ||
    isAssetsLoading ||
    isValuesLoading ||
    isQuantitiesLoading ||
    isDirectionsLoading;

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
      <div className="min-h-screen bg-[#F8F8F8] w-full flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] w-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  // Transform trade mappings into strategy data for the table
  const strategyData = (() => {
    // Debug logging
    console.log("Trade Mappings:", tradeMappings);
    console.log("Assets:", assets);
    console.log("Indicators:", indicators);
    console.log("Actions:", indicatorActions);
    console.log("Quantities:", quantities);
    console.log("Directions:", directions);
    console.log("Values:", indicatorValues);

    // Ensure tradeMappings is an array
    if (!Array.isArray(tradeMappings)) {
      console.error("tradeMappings is not an array:", tradeMappings);
      return [];
    }

    return tradeMappings
      .map((mapping) => {
        // Ensure all required data exists
        if (!mapping) {
          console.error("Invalid mapping:", mapping);
          return null;
        }

        const asset = Array.isArray(assets)
          ? assets.find((a) => a?.id === mapping.asset_id)
          : null;
        const indicator = Array.isArray(indicators)
          ? indicators.find((i) => i?.id === mapping.indicator_id)
          : null;
        const action = Array.isArray(indicatorActions)
          ? indicatorActions.find((a) => a?.id === mapping.indicator_action_id)
          : null;
        const quantity = Array.isArray(quantities)
          ? quantities.find((q) => q?.id === mapping.quantity_id)
          : null;
        const direction = Array.isArray(directions)
          ? directions.find((d) => d?.id === mapping.direction_id)
          : null;
        const value = Array.isArray(indicatorValues)
          ? indicatorValues.find((v) => v?.id === mapping.value_id)
          : null;

        const strategyData = {
          id: mapping.id,
          broker: getBrokerageDetails.data?.brokerage_name || "Not Connected",
          api: "REST API",
          strategy: `${indicator?.name || "N/A"} ${value?.value || "N/A"} → ${
            action?.action || "N/A"
          }`,
          assetSymbol: asset?.symbol || "N/A",
          quantity: quantity?.quantity || 0,
          direction: direction?.direction || "N/A",
          runTime: "2 Hrs",
          availableInvestment: 45600,
          frozenInvestment: 5600,
          unrealizedPL: 600,
          netPL: Math.random() > 0.5 ? -50000 : 50000,
          netPLPercentage: Math.random() * 100,
          tradesExecuted: 300,
          status: "Active" as const,
        };

        return strategyData;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  })();

  // Calculate summary data (must be after strategyData is defined)
  const totalStrategies = Array.isArray(tradeMappings) ? tradeMappings.length : 0;

  // Use strategyData for dynamic values if available
  const totalTradesExecuted = Array.isArray(strategyData)
    ? strategyData.reduce((sum, s) => sum + (s.tradesExecuted || 0), 0)
    : 0;

  const netPL = Array.isArray(strategyData)
    ? strategyData.reduce((sum, s) => sum + (s.netPL || 0), 0)
    : 0;

  const netPLPercentage = Array.isArray(strategyData) && strategyData.length > 0
    ? strategyData.reduce((sum, s) => sum + (s.netPLPercentage || 0), 0) / strategyData.length
    : 0;

  // Placeholder data for other sections
  const scanners: ScannerData[] = [
    {
      name: "RSI Scanner",
      dateTime: new Date().toLocaleString(),
      pairs: "BTC/USD, ETH/USD",
      status: "Active" as const,
    },
    {
      name: "MACD Scanner",
      dateTime: new Date().toLocaleString(),
      pairs: "AAPL, MSFT",
      status: "Closed" as const,
    },
  ];

  const supportTickets: SupportTicketData[] = [
    { number: "TST123", createdOn: "12 Aug 2024", status: "Resolved" as const },
    {
      number: "TST124",
      createdOn: "13 Aug 2024",
      status: "In Progress" as const,
    },
  ];

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

  console.log("Trade Mappings:", tradeMappings);
  console.log("Strategies API response:", strategies);
  console.log("First strategy:", strategies?.data?.[0]);
  return (
    <div className="min-h-screen bg-[#F8F8F8] w-full">
      <main className="max-w-7xl mx-auto  py-6 w-full">
        {/* Add Make a Strategy Button */}
        {/* Summary Section */}
        <div className="grid gap-6">
          <h2 className="text-lg">
            Hi {userData?.name || "User"}, here is your summary
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-[#FFE6E6] border-none">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Platforms Added</div>
                    <div className="text-2xl font-bold">
                      {Array.isArray(getBrokerageDetails.data?.data)
                        ? getBrokerageDetails.data.data.length
                        : 0}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#FFE6E6] border-none">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">
                      Strategies Active
                    </div>
                    <div className="text-2xl font-bold">{totalStrategies}</div>
                  </CardContent>
                </Card>
                <Card className="bg-[#FFE6E6] border-none">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Trades Executed</div>
                    <div className="text-2xl font-bold">
                      {totalTradesExecuted}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#FFE6E6] border-none">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">Net P/L</div>
                    <div className="text-2xl font-bold text-green-600">
                      ${netPL}
                    </div>
                    <div className="text-sm text-green-600">
                      +{netPLPercentage}%
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <ShareCard />
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span>
              Verified Referrals: <strong>238</strong>
            </span>
            <span>
              Pending Referrals: <strong>23</strong>
            </span>
          </div>
        </div>

        {/* Strategy Summary */}
        <Collapsible
          open={openSections.strategy}
          onOpenChange={() => toggleSection("strategy")}
          className="mt-6"
        >
          <Card className="border-0">
            <CardHeader className="bg-[#4A0D0D] text-white rounded-t-lg">
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
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Broker/Exchange</TableHead>
                          <TableHead>Strategy Rule</TableHead>
                          <TableHead>Asset</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Direction</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {strategyData.map((strategy, i) => (
                          <TableRow key={i}>
                            <TableCell>{strategy.broker}</TableCell>
                            <TableCell>{strategy.strategy}</TableCell>
                            <TableCell>{strategy.assetSymbol}</TableCell>
                            <TableCell>{strategy.quantity}</TableCell>
                            <TableCell>{strategy.direction}</TableCell>
                            <TableCell>
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
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  if (tradeMappings?.[i]?.id) {
                                    deleteMapping.mutate(tradeMappings[i].id);
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
                        {strategyData.length} of {strategyData.length} entries
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled>
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-[#4A0D0D] text-white"
                        >
                          1
                        </Button>
                        <Button variant="outline" size="sm">
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
              <Card className="border-0">
                <CardHeader className="bg-[#4A0D0D] text-white rounded-t-lg">
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
                        {scanners.map((scanner, i) => (
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
                        ))}
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
              <Card className="border-0">
                <CardHeader className="bg-[#4A0D0D] text-white rounded-t-lg">
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

          <div className="space-y-6">
            <CollapsibleCard
              title="API Connect"
              className="col-span-2"
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
              <Card className="border-0">
                <CardHeader className="bg-[#4A0D0D] text-white rounded-t-lg">
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
                        {supportTickets.map((ticket, i) => (
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
                        ))}
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
        <Card className="border bg-white rounded-lg shadow-sm mt-6 mb-6">
          <CardHeader className="bg-[#4A0D0D] text-white rounded-t-lg flex">
            <CardTitle className="text-lg font-medium">
              Binance Live Orders
            </CardTitle>
            {/* <RefreshCw className={`h-4 w-4 ${isLiveOrdersLoading ? 'animate-spin' : ''}`} /> */}
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
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
          </CardContent>
        </Card>
        {/* Create Strategy Button above the Strategy Table */}
        {/* Strategy Table Section */}
        <Card className="border bg-white rounded-lg shadow-sm mt-0">
          <CardHeader className="bg-[#4A0D0D] text-white rounded-t-lg">
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
                  {Array.isArray(strategies?.data) &&
                  strategies.data.length > 0 ? (
                    strategies.data.map((strategy: any) => (
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
