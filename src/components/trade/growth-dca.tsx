'use client'

import * as React from "react"
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TradeConfirmationDialog } from "@/components/trade/trade-confirmation-dialog"
import { useBotManagement } from "@/hooks/useBotManagement"
import { useEffect, useState } from "react"
import { BrokerageConnection, brokerageService } from "@/api/brokerage"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function GrowthDCA() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false)
  const [accountDetailsOpen, setAccountDetailsOpen] = useState(true)

  // Dialog and selection state
  const [selectedApi, setSelectedApi] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [brokerages, setBrokerages] = useState<BrokerageConnection[]>([])
  const [isBrokeragesLoading, setIsBrokeragesLoading] = useState(true)

  const {
  } = useBotManagement()

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

  const handleProceed = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!selectedApi) {
      // Optionally show an error
      return
    }
    setShowConfirmation(true)
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <Card className="bg-card dark:bg-[#232326] border border-border dark:border-gray-700 shadow-lg text-foreground dark:text-white rounded-lg transition-colors duration-300">
        <CardHeader
          className="bg-[#4A1C24] text-white cursor-pointer flex flex-row items-center justify-between p-4 rounded-t-lg"
          onClick={() => setAccountDetailsOpen((open) => !open)}
        >
          <CardTitle className="text-base font-medium">
            Account Details
          </CardTitle>
          {accountDetailsOpen ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </CardHeader>
        <div
          className={accountDetailsOpen ? "block" : "hidden"}
        >
          <CardContent className="p-4 pt-0 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Select value={selectedApi} onValueChange={setSelectedApi}>
                <SelectTrigger className="w-full bg-background border border-border rounded">
                  <SelectValue placeholder="Select API connection" />
                </SelectTrigger>
                <SelectContent>
                  {isBrokeragesLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : brokerages.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No brokerages found
                    </SelectItem>
                  ) : (
                    brokerages.map((b) => (
                      <SelectItem key={b.id} value={b.id.toString()}>
                        {b.brokerage_name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
          </CardContent>
        </div>
      </Card>
      <Card className="mt-4 bg-card dark:bg-[#232326] border border-border dark:border-gray-700 shadow-lg text-foreground dark:text-white rounded-lg transition-colors duration-300">
        <form className="space-y-4 p-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-md bg-[#4A1C24] text-white p-4 font-medium hover:bg-[#5A2525] transition-colors duration-200">
              <span>Growth DCA</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 rounded-b-md border border-border border-t-0 bg-card p-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Strategy Name
                  <span className="text-muted-foreground">ⓘ</span>
                </Label>
                <Input placeholder="Enter Name" />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Investment
                  <span className="text-muted-foreground">ⓘ</span>
                </Label>
                <div className="flex gap-2">
                  <Input placeholder="Value" />
                  <Select defaultValue="USTD">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USTD">USTD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-orange-500">Avbl: 389 USTD</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Investment CAP
                  <span className="text-muted-foreground">ⓘ</span>
                </Label>
                <div className="flex gap-2">
                  <Input placeholder="Value" />
                  <Select defaultValue="USTD">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USTD">USTD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Duration
                  <span className="text-muted-foreground">ⓘ</span>
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" className="flex-1">Daily</Button>
                  <Button variant="outline" className="flex-1">Weekly</Button>
                  <Button variant="outline" className="flex-1">Monthly</Button>
                  <Button variant="outline" className="flex-1">Hourly</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Book Profit By
                  <span className="text-muted-foreground">ⓘ</span>
                </Label>
                <div className="relative">
                  <Input placeholder="Value" />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">%</span>
                </div>
                <p className="text-sm text-green-500">+ 88 Value</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-md bg-primary p-4 font-medium text-primary-foreground hover:bg-primary/90">
              <span>Advanced Settings</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 rounded-b-md border border-border border-t-0 bg-card p-4">
              <div className="space-y-2">
                <Label>Price Trigger Start</Label>
                <div className="flex gap-2">
                  <Input placeholder="Value" />
                  <Select defaultValue="USTD">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USTD">USTD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Price Trigger End</Label>
                <div className="flex gap-2">
                  <Input placeholder="Value" />
                  <Select defaultValue="USTD">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USTD">USTD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Stop Loss</Label>
                <div className="relative">
                  <Input placeholder="Value" />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Take Profit</Label>
                <div className="relative">
                  <Input placeholder="Value" />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">%</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex justify-center gap-4 pt-2">
            <Button
              className="w-fit px-6 bg-[#4A1C24] hover:bg-[#5A2525] text-white shadow-md transition-colors duration-200"
              onClick={handleProceed}
              disabled={!selectedApi}
            >
              Proceed
            </Button>
            <Button
              className="w-fit px-4 bg-[#D97706] hover:bg-[#B45309] text-white shadow-md transition-colors duration-200"
              onClick={() => console.log("Reset clicked")}
            >
              Reset
            </Button>
          </div>
        </form>
      </Card>
      <TradeConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        selectedApi={selectedApi}
        selectedBot={null}
      />
    </div>
  )
}

