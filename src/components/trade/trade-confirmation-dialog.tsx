import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Bot } from "@/hooks/useBotManagement";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import apiClient from "@/api/apiClient";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface TradeConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedApi: string;
  selectedBot: Bot | null;
}

// Add this interface for the backtest response
interface BacktestResponse {
  status: string;
  message: string;
  data: {
    result: string;
    metrics: {
      profit_loss: number;
      win_rate: number;
      // Add other metrics as needed
    };
  };
}

// Add this interface for the backtest results
interface BacktestResultResponse {
  result: string;
}

// Add this interface for the paper trade response
interface PaperTradeResponse {
  message: string;
}

export function TradeConfirmationDialog({
  isOpen,
  onClose,
  selectedApi,
  selectedBot,
}: TradeConfirmationDialogProps) {
  const [isBacktesting, setIsBacktesting] = useState(false);
  const [showBacktestAlert, setShowBacktestAlert] = useState(false);
  const [isPaperTrading, setIsPaperTrading] = useState(false);
  const [showPaperTradeAlert, setShowPaperTradeAlert] = useState(false);
  const [paperTradeMessage, setPaperTradeMessage] = useState<string>("");
  
  // New state for backtest results
  const [backtestResults, setBacktestResults] = useState<BacktestResultResponse | null>(null);
  const [showBacktestResults, setShowBacktestResults] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  // Add useEffect for auto-closing
  useEffect(() => {
    if (showBacktestAlert) {
      const timer = setTimeout(() => {
        setShowBacktestAlert(false);
        // Fetch backtest results after 5 seconds
        fetchBacktestResults();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showBacktestAlert]);

  // Function to fetch backtest results
  const fetchBacktestResults = async () => {
    if (!selectedBot) {
      toast.error("No bot selected");
      return;
    }

    setIsLoadingResults(true);
    try {
      const response = await apiClient.get<BacktestResultResponse>(
        `/api/v1/bots/${selectedBot.id}/backtest-result`
      );
      
      setBacktestResults(response.data);
      setShowBacktestResults(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch backtest results");
    } finally {
      setIsLoadingResults(false);
    }
  };

  // Add useEffect for auto-closing paper trade alert
  useEffect(() => {
    if (showPaperTradeAlert) {
      const timer = setTimeout(() => {
        setShowPaperTradeAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showPaperTradeAlert]);

  const handleBacktest = async () => {
    if (!selectedBot) {
      toast.error("No bot selected");
      return;
    }

    setIsBacktesting(true);
    try {
      await apiClient.post<BacktestResponse>(
        `/api/v1/bots/${selectedBot.id}/backtest`
      );

      // Show the alert dialog
      setShowBacktestAlert(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to run backtest");
    } finally {
      setIsBacktesting(false);
    }
  };

  const handlePaperTrade = async () => {
    if (!selectedBot) {
      toast.error("No bot selected");
      return;
    }

    setIsPaperTrading(true);
    try {
      const response = await apiClient.post<PaperTradeResponse>(
        `/api/v1/bots/${selectedBot.id}/paper/start`
      );
      setPaperTradeMessage(response.data.message);
      setShowPaperTradeAlert(true);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to start paper trading"
      );
    } finally {
      setIsPaperTrading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-lg flex justify-between items-center">
              <span>Confirm Trade Settings</span>
              <button onClick={onClose} className="text-lg font-bold"></button>
            </DialogTitle>
          </DialogHeader>

          <div className="p-4">
            {/* Account Details Section */}
            <div className="mb-4">
              <h3 className="font-bold text-sm mb-2">Account Details</h3>
              <div className="grid grid-cols-3 gap-y-2">
                <div className="text-sm">API Connection:</div>
                <div className="text-sm col-span-2 capitalize">
                  {selectedApi}
                </div>
              </div>
            </div>

            {/* Bot Details Section */}
            {selectedBot && (
              <div className="mb-4">
                <h3 className="font-bold text-sm mb-2">Bot Details</h3>
                <div className="grid grid-cols-3 gap-y-2">
                  <div className="text-sm">Name:</div>
                  <div className="text-sm col-span-2">{selectedBot.name}</div>

                  <div className="text-sm">Mode:</div>
                  <div className="text-sm col-span-2 capitalize">
                    {selectedBot.mode}
                  </div>

                  <div className="text-sm">Execution Type:</div>
                  <div className="text-sm col-span-2 capitalize">
                    {selectedBot.execution_type}
                  </div>

                  {selectedBot.schedule_expression && (
                    <>
                      <div className="text-sm">Schedule:</div>
                      <div className="text-sm col-span-2">
                        {selectedBot.schedule_expression}
                      </div>
                    </>
                  )}

                  <div className="text-sm">Created:</div>
                  <div className="text-sm col-span-2">
                    {format(new Date(selectedBot.created_at), "dd MMM yyyy HH:mm")}
                  </div>

                  <div className="text-sm">Last Updated:</div>
                  <div className="text-sm col-span-2">
                    {format(new Date(selectedBot.updated_at), "dd MMM yyyy HH:mm")}
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Settings Section */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-2">Advanced Settings</h3>
              <div className="grid grid-cols-3 gap-y-2">
                <div className="text-sm">Trading Pair:</div>
                <div className="text-sm col-span-2">BTC/USDT</div>

                <div className="text-sm">Time Frame:</div>
                <div className="text-sm col-span-2">1 Hour</div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2 mb-4">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm">
                I Agree Bulltrak's Terms & Conditions, Privacy policy and
                disclaimers
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-2">
              <Button
                variant="destructive"
                className="bg-[#4A1C24] text-white hover:bg-[#3A161C] text-white w-1/4"
              >
                Live Market
                {/* //Run on Live Market */}
              </Button>

              <Button
                variant="destructive"
                className="bg-[#4A1C24] text-white hover:bg-[#3A161C] text-white w-1/4"
              >
                Edit
              </Button>

              <Button
                variant="destructive"
                className="bg-[#4A1C24] text-white hover:bg-[#3A161C] text-white w-1/4"
                onClick={handlePaperTrade}
                disabled={isPaperTrading}
              >
                {isPaperTrading ? "Starting..." : "Paper Trade"}
              </Button>

              <Button
                variant="default"
                className="bg-amber-500 hover:bg-amber-600 text-white w-1/4"
                onClick={handleBacktest}
                disabled={isBacktesting}
              >
                {isBacktesting ? "Testing..." : "Backtest"}
              </Button>
            </div>

            <div className="text-center text-xs mt-4 text-gray-500">
              ** For Buttons see respective user **
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showBacktestAlert} onOpenChange={setShowBacktestAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Backtest Status</AlertDialogTitle>
            <AlertDialogDescription>
              Backtest started successfully. You will be notified when the results
              are ready.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowBacktestAlert(false)}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showPaperTradeAlert} onOpenChange={setShowPaperTradeAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Paper Trade Status</AlertDialogTitle>
            <AlertDialogDescription>
              {paperTradeMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowPaperTradeAlert(false)}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Backtest Results Dialog */}
      <AlertDialog open={showBacktestResults} onOpenChange={setShowBacktestResults}>
        <AlertDialogContent className="bg-white max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-800">
              Backtest Results
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              {isLoadingResults ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                  <span className="ml-2">Loading results...</span>
                </div>
              ) : backtestResults ? (
                <div className="space-y-6">
                  {/* Result Display */}
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3">Backtest Result</h3>
                    <div className="text-blue-700 text-lg">
                      {backtestResults.result}
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">Test Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Bot ID</div>
                        <div className="font-semibold">{selectedBot?.id}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Bot Name</div>
                        <div className="font-semibold">{selectedBot?.name}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Test Type</div>
                        <div className="font-semibold">Historical Backtest</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Status</div>
                        <div className="font-semibold text-green-600">Completed</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No results available
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowBacktestResults(false)}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}