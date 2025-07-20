'use client'

import * as React from "react"
import { ChevronDown, Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AccountDetailsCard } from "@/components/trade/AccountDetailsCard"
import { useEffect, useState } from "react"
import { brokerageService } from "@/api/brokerage"
import apiClient from "@/api/apiClient"
import { useToast } from "@/hooks/use-toast"
import { StrategyResponsePopup } from "@/components/ui/strategy-response-popup"

interface GridLevel {
  price: number;
  side: "BUY" | "SELL";
  quantity: number;
}

interface HumanGridStrategyConfig {
  symbol: string;
  levels: GridLevel[];
}

interface StrategyDetails {
  id: number;
  name: string;
  // Add other fields as needed based on the API response
}

export default function HumanGrid() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [selectedApi, setSelectedApi] = React.useState("");
  const [isBrokeragesLoading, setIsBrokeragesLoading] = React.useState(false);
  const [brokerages, setBrokerages] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [strategyDetails, setStrategyDetails] = useState<StrategyDetails | null>(null)
  const [isStrategyLoading, setIsStrategyLoading] = useState(false)
  const [showResponsePopup, setShowResponsePopup] = useState(false)
  const [responseData, setResponseData] = useState<any>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  // Function to handle banner close - only called when user explicitly clicks close
  const handleBannerClose = () => {
    setShowResponsePopup(false)
  }

  // Form state
  const [formData, setFormData] = useState<HumanGridStrategyConfig>({
    symbol: "BTCUSDT",
    levels: [
      {
        price: 60000,
        side: "BUY",
        quantity: 0.001
      },
      {
        price: 70000,
        side: "SELL",
        quantity: 0.001
      }
    ]
  })

  useEffect(() => {
    async function fetchBrokerages() {
      setIsBrokeragesLoading(true);
      try {
        const res = await brokerageService.getBrokerageDetails();
        setBrokerages(res.data.data || []);
      } catch {
        setBrokerages([]);
      } finally {
        setIsBrokeragesLoading(false);
      }
    }
    fetchBrokerages();
  }, []);

  useEffect(() => {
    async function fetchStrategyDetails() {
      setIsStrategyLoading(true)
      try {
        const response = await apiClient.get('/api/v1/strategies/3')
        
        // Handle different possible response structures
        const strategyData = response.data?.data || response.data
        
        if (strategyData && strategyData.name) {
          setStrategyDetails(strategyData)
        } else {
          // Set a fallback with the data we have
          setStrategyDetails({
            id: 3,
            name: strategyData?.name || 'Human Grid Strategy'
          })
        }
      } catch (error: any) {
        console.error('Failed to fetch strategy details:', error)
        toast({
          title: "Error",
          description: `Failed to load strategy details: ${error.response?.data?.message || error.message}`,
          variant: "destructive"
        })
        // Set fallback strategy details
        setStrategyDetails({
          id: 3,
          name: 'Human Grid Strategy'
        })
      } finally {
        setIsStrategyLoading(false)
      }
    }
    fetchStrategyDetails()
  }, [toast])

  const handleSymbolChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      symbol: value
    }))
  }

  const handleLevelChange = (index: number, field: keyof GridLevel, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      levels: prev.levels.map((level, i) => 
        i === index 
          ? { 
              ...level, 
              [field]: field === 'price' || field === 'quantity' ? parseFloat(value as string) || 0 : value 
            }
          : level
      )
    }))
  }

  const addLevel = () => {
    setFormData(prev => ({
      ...prev,
      levels: [...prev.levels, {
        price: 65000,
        side: "BUY",
        quantity: 0.001
      }]
    }))
  }

  const removeLevel = (index: number) => {
    if (formData.levels.length > 1) {
      setFormData(prev => ({
        ...prev,
        levels: prev.levels.filter((_, i) => i !== index)
      }))
    } else {
      toast({
        title: "Error",
        description: "At least one level is required",
        variant: "destructive"
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedApi) {
      toast({
        title: "Error",
        description: "Please select an API connection first",
        variant: "destructive"
      })
      return
    }

    if (formData.levels.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one grid level",
        variant: "destructive"
      })
      return
    }

    // Validate levels
    const invalidLevels = formData.levels.filter(level => 
      level.price <= 0 || level.quantity <= 0
    )
    
    if (invalidLevels.length > 0) {
      toast({
        title: "Error",
        description: "All levels must have valid price and quantity values",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await apiClient.post('/api/v1/strategies/3/run', {
        config: formData
      })
      
      setResponseData(response.data)
      setIsSuccess(true)
      setShowResponsePopup(true)
      
      console.log('Strategy response:', response.data)
    } catch (error: any) {
      console.error('Strategy execution error:', error)
      setResponseData(error.response?.data || { message: error.message })
      setIsSuccess(false)
      setShowResponsePopup(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      symbol: "BTCUSDT",
      levels: [
        {
          price: 60000,
          side: "BUY",
          quantity: 0.001
        },
        {
          price: 70000,
          side: "SELL",
          quantity: 0.001
        }
      ]
    })
  }

  return (
    <div>
      <AccountDetailsCard
        selectedApi={selectedApi}
        setSelectedApi={setSelectedApi}
        isBrokeragesLoading={isBrokeragesLoading}
        brokerages={brokerages}
      />
      <form onSubmit={handleSubmit} className="space-y-4 gap-4 dark:bg-[#232326] dark:text-white mt-2">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-md bg-[#4A1C24] text-white p-4 font-medium hover:bg-[#5A2525] transition-colors duration-200">
            <span>
              {isStrategyLoading ? "Loading Strategy..." : strategyDetails?.name || "Human Grid Strategy Configuration"}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 rounded-b-md border border-border border-t-0 bg-card p-4">

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Trading Symbol
                <span className="text-muted-foreground">ⓘ</span>
              </Label>
              <Select 
                value={formData.symbol} 
                onValueChange={handleSymbolChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTCUSDT">BTCUSDT</SelectItem>
                  <SelectItem value="ETHUSDT">ETHUSDT</SelectItem>
                  <SelectItem value="ADAUSDT">ADAUSDT</SelectItem>
                  <SelectItem value="DOTUSDT">DOTUSDT</SelectItem>
                  <SelectItem value="LINKUSDT">LINKUSDT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  Grid Levels
                  <span className="text-muted-foreground">ⓘ</span>
                </Label>
                <Button 
                  type="button"
                  onClick={addLevel}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Level
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData.levels.map((level, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm font-medium">Level {index + 1}</Label>
                      <Button
                        type="button"
                        onClick={() => removeLevel(index)}
                        size="sm"
                        variant="destructive"
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs">Price</Label>
                        <Input
                          type="number"
                          step="1"
                          placeholder="60000"
                          value={level.price}
                          onChange={(e) => handleLevelChange(index, 'price', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs">Side</Label>
                        <Select 
                          value={level.side} 
                          onValueChange={(value) => handleLevelChange(index, 'side', value as "BUY" | "SELL")}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BUY">BUY</SelectItem>
                            <SelectItem value="SELL">SELL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs">Quantity</Label>
                        <Input
                          type="number"
                          step="0.001"
                          placeholder="0.001"
                          value={level.quantity}
                          onChange={(e) => handleLevelChange(index, 'quantity', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground">
                Total levels: {formData.levels.length}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-center gap-4 pt-2">
          <Button 
            type="submit"
            disabled={isSubmitting || !selectedApi || formData.levels.length === 0}
            className="w-fit px-6 bg-[#4A1C24] hover:bg-[#5A2525] text-white shadow-md transition-colors duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Executing..." : "Execute Strategy"}
          </Button>
          <Button 
            type="button"
            onClick={handleReset}
            className="w-fit px-4 bg-[#D97706] hover:bg-[#B45309] text-white shadow-md transition-colors duration-200"
          >
            Reset
          </Button>
        </div>
      </form>
      
      <StrategyResponsePopup
        isOpen={showResponsePopup}
        onClose={handleBannerClose}
        response={responseData}
        isSuccess={isSuccess}
        strategyName={strategyDetails?.name || "Human Grid Strategy"}
      />
    </div>
  )
}

