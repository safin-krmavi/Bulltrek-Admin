'use client'

import * as React from "react"
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { BrokerageConnection, brokerageService } from "@/api/brokerage"
import apiClient from "@/api/apiClient"
import { useToast } from "@/hooks/use-toast"
import { StrategyResponsePopup } from "@/components/ui/strategy-response-popup"
import { AccountDetailsCard } from "./AccountDetailsCard"

interface DCATrendStrategyConfig {
  symbol: string;
  quantity: number;
  price_limit: number;
}

interface StrategyDetails {
  id: number;
  name: string;
  // Add other fields as needed based on the API response
}

export default function GrowthDCA() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [selectedApi, setSelectedApi] = useState("")
  const [brokerages, setBrokerages] = useState<BrokerageConnection[]>([])
  const [isBrokeragesLoading, setIsBrokeragesLoading] = useState(true)
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
  const [formData, setFormData] = useState<DCATrendStrategyConfig>({
    symbol: "BTCUSDT",
    quantity: 0.001,
    price_limit: 65000
  })

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
        const response = await apiClient.get('/api/v1/strategies/1')
        
        // Handle different possible response structures
        const strategyData = response.data?.data || response.data
        
        if (strategyData && strategyData.name) {
          setStrategyDetails(strategyData)
        } else {
          // Set a fallback with the data we have
          setStrategyDetails({
            id: 1,
            name: strategyData?.name || 'Growth DCA Strategy'
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
          id: 1,
          name: 'Growth DCA Strategy'
        })
      } finally {
        setIsStrategyLoading(false)
      }
    }
    fetchStrategyDetails()
  }, [toast])

  const handleInputChange = (field: keyof DCATrendStrategyConfig, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'quantity' || field === 'price_limit' ? parseFloat(value as string) || 0 : value
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

    if (formData.price_limit <= 0) {
      toast({
        title: "Error",
        description: "Price limit must be greater than 0",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await apiClient.post('/api/v1/strategies/1/run', {
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
      quantity: 0.001,
      price_limit: 65000
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

      <form onSubmit={handleSubmit} className="space-y-4 dark:bg-[#232326] dark:text-white mt-2">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-md bg-[#4A1C24] text-white p-4 font-medium hover:bg-[#5A2525] transition-colors duration-200">
            <span>
              {isStrategyLoading ? "Loading Strategy..." : strategyDetails?.name || "Growth DCA Strategy Configuration"}
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

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                Price Limit
                  <span className="text-muted-foreground">ⓘ</span>
                </Label>
              <Input 
                type="number"
                step="1"
                placeholder="65000"
                value={formData.price_limit}
                onChange={(e) => handleInputChange('price_limit', e.target.value)}
              />
              <p className="text-sm text-muted-foreground">Enter the price limit for DCA strategy</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex justify-center gap-4 pt-2">
            <Button
            type="submit"
            disabled={isSubmitting || !selectedApi || formData.price_limit <= 0}
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
          strategyName={strategyDetails?.name || "Growth DCA Strategy"}
        />
    </div>
  )
}

