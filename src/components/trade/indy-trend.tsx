'use client'

import * as React from "react"
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import { AccountDetailsCard } from "@/components/trade/AccountDetailsCard"
import { useEffect, useState } from "react"
import { brokerageService } from "@/api/brokerage"
import apiClient from "@/api/apiClient"
import { useToast } from "@/hooks/use-toast"

interface TrendStrategyConfig {
  symbol: string;
  quantity: number;
  indicators: string[];
}

interface StrategyDetails {
  id: number;
  name: string;
  // Add other fields as needed based on the API response
}

export default function IndyTrend() {
  const [isIndyOpen, setIsIndyOpen] = React.useState(true)
  const [selectedApi, setSelectedApi] = React.useState("")
  const [isBrokeragesLoading, setIsBrokeragesLoading] = React.useState(false)
  const [brokerages, setBrokerages] = React.useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [strategyDetails, setStrategyDetails] = useState<StrategyDetails | null>(null)
  const [isStrategyLoading, setIsStrategyLoading] = useState(false)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState<TrendStrategyConfig>({
    symbol: "BTCUSDT",
    quantity: 0.001,
    indicators: ["rsi", "supertrend"]
  })

  // Available indicators
  const availableIndicators = [
    { id: "rsi", label: "RSI" },
    { id: "supertrend", label: "Supertrend" },
    { id: "adx", label: "ADX" },
    { id: "macd", label: "MACD" },
    { id: "bollinger", label: "Bollinger Bands" }
  ]

  useEffect(() => {
    async function fetchBrokerages() {
      setIsBrokeragesLoading(true)
      try {
        const res = await brokerageService.getBrokerageDetails()
        setBrokerages(res.data.data || [])
      } catch {
        setBrokerages([])
      } finally {
        setIsBrokeragesLoading(false)
      }
    }
    fetchBrokerages()
  }, [])

  useEffect(() => {
    async function fetchStrategyDetails() {
      setIsStrategyLoading(true)
      try {
        console.log('Fetching strategy details...')
        const response = await apiClient.get('/api/v1/strategies/22')
        console.log('Strategy details response:', response.data)
        
        // Handle different possible response structures
        const strategyData = response.data?.data || response.data
        console.log('Processed strategy data:', strategyData)
        
        if (strategyData && strategyData.name) {
          setStrategyDetails(strategyData)
        } else {
          console.warn('Strategy data does not contain name field:', strategyData)
          // Set a fallback with the data we have
          setStrategyDetails({
            id: 22,
            name: strategyData?.name || 'Indy Trend Strategy'
          })
        }
      } catch (error: any) {
        console.error('Failed to fetch strategy details:', error)
        console.error('Error response:', error.response?.data)
        toast({
          title: "Error",
          description: `Failed to load strategy details: ${error.response?.data?.message || error.message}`,
          variant: "destructive"
        })
        // Set fallback strategy details
        setStrategyDetails({
          id: 22,
          name: 'Indy Trend Strategy'
        })
      } finally {
        setIsStrategyLoading(false)
      }
    }
    fetchStrategyDetails()
  }, [toast])

  const handleInputChange = (field: keyof TrendStrategyConfig, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'quantity' ? parseFloat(value as string) || 0 : value
    }))
  }

  const handleIndicatorToggle = (indicatorId: string) => {
    setFormData(prev => ({
      ...prev,
      indicators: prev.indicators.includes(indicatorId)
        ? prev.indicators.filter(id => id !== indicatorId)
        : [...prev.indicators, indicatorId]
    }))
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

    if (formData.indicators.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one indicator",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await apiClient.post('/api/v1/strategies/22/run', {
        config: formData
      })
      
      toast({
        title: "Success",
        description: "Strategy executed successfully",
      })
      
      console.log('Strategy response:', response.data)
    } catch (error: any) {
      console.error('Strategy execution error:', error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to execute strategy",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      symbol: "BTCUSDT",
      quantity: 0.001,
      indicators: ["rsi", "supertrend"]
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
      <form onSubmit={handleSubmit} className="space-y-4 dark:bg-[#232326] dark:text-white gap-4 mt-2">
        <Collapsible
          open={isIndyOpen}
          onOpenChange={setIsIndyOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-md bg-[#4A1C24] text-white p-4 font-medium hover:bg-[#5A2525] transition-colors duration-200">
            <span>
              {isStrategyLoading ? "Loading Strategy..." : strategyDetails?.name || "Indy Trend Strategy Configuration"}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isIndyOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 rounded-b-md border border-border border-t-0 bg-card p-4">
            {/* Debug section - remove this after fixing */}
            {process.env.NODE_ENV === 'development' && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm font-medium text-yellow-800">Debug Info:</p>
                <p className="text-xs text-yellow-700">Strategy Details: {JSON.stringify(strategyDetails)}</p>
                <p className="text-xs text-yellow-700">Form Data: {JSON.stringify(formData)}</p>
                <p className="text-xs text-yellow-700">Loading: {isStrategyLoading.toString()}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Trading Symbol
                <span className="text-muted-foreground">ⓘ</span>
              </Label>
              <Select 
                value={formData.symbol} 
                onValueChange={(value) => handleInputChange('symbol', value)}
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
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Quantity
                <span className="text-muted-foreground">ⓘ</span>
              </Label>
              <Input 
                type="number"
                step="0.001"
                placeholder="0.001"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
              />
              <p className="text-sm text-muted-foreground">Enter the trading quantity</p>
            </div>

            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                Technical Indicators
                <span className="text-muted-foreground">ⓘ</span>
              </Label>
              <div className="space-y-3">
                {availableIndicators.map((indicator) => (
                  <div key={indicator.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={indicator.id}
                      checked={formData.indicators.includes(indicator.id)}
                      onCheckedChange={() => handleIndicatorToggle(indicator.id)}
                    />
                    <Label htmlFor={indicator.id} className="text-sm font-medium">
                      {indicator.label}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Selected indicators: {formData.indicators.length > 0 ? formData.indicators.join(', ') : 'None'}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-center gap-4 pt-2">
          <Button 
            type="submit"
            disabled={isSubmitting || !selectedApi || formData.indicators.length === 0}
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
    </div>
  )
}

