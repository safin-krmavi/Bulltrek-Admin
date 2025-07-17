'use client'

import * as React from "react"
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card } from "@/components/ui/card"
// import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { AccountDetailsCard } from "@/components/trade/AccountDetailsCard"
import { brokerageService } from "@/api/brokerage"

export default function PriceAction() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false)
  // const [accountDetailsOpen, setAccountDetailsOpen] = React.useState(true)
  const [selectedApi, setSelectedApi] = React.useState("")
  const [isBrokeragesLoading, setIsBrokeragesLoading] = React.useState(false)
  const [brokerages, setBrokerages] = React.useState([])

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

  return (
    <div>
      <AccountDetailsCard
        selectedApi={selectedApi}
        setSelectedApi={setSelectedApi}
        isBrokeragesLoading={isBrokeragesLoading}
        brokerages={brokerages}
      />
      <form className="space-y-4 p-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#4A1C24] text-white rounded-t-md p-4 font-medium hover:bg-[#5A2525] transition-colors duration-200">
            <span>Price Action</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 rounded-b-md border border-border border-t-0 bg-card p-4">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Safe
              </Button>
              <Button variant="outline">Moderate</Button>
              <Button variant="outline">Risky</Button>
            </div>

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
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-md bg-[#4A1C24] rounded-b-md border border-border border-t-0 p-4 font-medium text-white dark:text-white dark:bg-[#232326]">
            <span>Advanced Settings</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 rounded-b-md border border-border border-t-0 bg-card p-4 dark:text-white dark:bg-[#232326]">
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
              <Label>Price Trigger Stop</Label>
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
              <Label>Take Profit</Label>
              <div className="relative">
                <Input placeholder="Value" />
                <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Stop Loss By</Label>
              <div className="relative">
                <Input placeholder="Value" />
                <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">%</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex justify-center gap-4 pt-2">
          <Button className="w-fit px-6 bg-[#4A1C24] hover:bg-[#5A2525] text-white shadow-md transition-colors duration-200">Proceed</Button>
          <Button className="w-fit px-4 bg-[#D97706] hover:bg-[#B45309] text-white shadow-md transition-colors duration-200">
            Reset
          </Button>
        </div>
      </form>
    </div>
  )
}

