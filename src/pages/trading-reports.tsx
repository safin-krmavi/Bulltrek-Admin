import { useState } from 'react'
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn, generateMockData } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"

// Generate 15 mock entries
const MOCK_DATA = generateMockData(15)
const ITEMS_PER_PAGE = 5

export default function TradingReportsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [platform, setPlatform] = useState("")
  const [botTrader, setBotTrader] = useState("")
  const [pairs, setPairs] = useState("")

  // Calculate pagination
  const totalPages = Math.ceil(MOCK_DATA.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentData = MOCK_DATA.slice(startIndex, endIndex)

  const handleExport = (type: string) => {
    console.log(`Exporting ${type}`)
  }

  const handleApplyFilters = () => {
    console.log('Applying filters:', { fromDate, toDate, platform, botTrader, pairs })
  }

  return (
    <div className="mx-auto p-4 space-y-6 w-full max-w-7xl">
      <div className=" rounded-lg p-6 space-y-6">
        <p className="text-gray-600">
          Generate and Download Strategies Trading reports in CSV Formats. Due to High Volumes, only 10 Exports is Limited Per Month.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-medium dark:text-white">Export By:</span>
            <div className="flex flex-wrap gap-2">
              <Button 
                className="bg-[#4A1C24] text-white hover:bg-[#3A161C] dark:text-white"
                onClick={() => handleExport('financial-year')}
              >
                Financial Year
              </Button>
              <Button 
                className="bg-[#4A1C24] text-white hover:bg-[#3A161C]"
                onClick={() => handleExport('last-6-months')}
              >
                Last 6 Months
              </Button>
              <Button 
                className="bg-[#4A1C24] text-white hover:bg-[#3A161C]"
                onClick={() => handleExport('last-month')}
              >
                Last Month
              </Button>
              <Button 
                className="bg-[#4A1C24] text-white hover:bg-[#3A161C]"
                onClick={() => handleExport('filter-selections')}
              >
                Filter Selections
              </Button>
            </div>
          </div>

          <div className="flex gap-8 items-center w-full dark:text-white">
            <div className="font-medium">Filters:</div>
            <div className="flex gap-4 w-full">
              <div className="space-y-2 w-fit">
                <label className="text-sm font-medium">Duration</label>
                <div className="flex gap-2 w-full">
                  <Popover >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full min-w-40 max-w-48 justify-start text-left font-normal",
                          !fromDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fromDate ? fromDate.toLocaleDateString() : "From"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-[#232326] border border-border dark:border-gray-700 shadow-lg text-foreground dark:text-white rounded-lg transition-colors duration-300">
                      <Calendar
                        mode="single"
                        selected={fromDate}
                        onSelect={setFromDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full min-w-40 max-w-48  justify-start text-left font-normal",
                          !toDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {toDate ? toDate.toLocaleDateString() : "To"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-[#232326] border border-border dark:border-gray-700 shadow-lg text-foreground dark:text-white rounded-lg transition-colors duration-300">
                      <Calendar
                        mode="single"
                        selected={toDate}
                        onSelect={setToDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2 w-full min-w-40 max-w-56">
                <label className="text-sm font-medium">Platform</label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="API Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zerodha">Zerodha</SelectItem>
                    <SelectItem value="binance">Binance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 w-full min-w-40 max-w-56">
                <label className="text-sm font-medium">Bot/Trader</label>
                <Select value={botTrader} onValueChange={setBotTrader}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bot/Trader Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bot1">Bot 1</SelectItem>
                    <SelectItem value="bot2">Bot 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 w-full min-w-40 max-w-56">
                <label className="text-sm font-medium">Pairs</label>
                <Select value={pairs} onValueChange={setPairs}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pairs Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btc-usdt">BTC/USDT</SelectItem>
                    <SelectItem value="eth-usdt">ETH/USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  className="bg-[#4A1C24] text-white hover:bg-[#3A161C]"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden bg-card dark:bg-[#232326] border border-border dark:border-gray-700 shadow-lg text-foreground dark:text-white transition-colors duration-300">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#4A1C24] hover:bg-[#4A1C24] text-white">
                <TableHead className="text-white border-r-2 dark:border-gray-700">S.no</TableHead>
                <TableHead className="text-white border-r-2 dark:border-gray-700">Platform</TableHead>
                <TableHead className="text-white border-r-2 dark:border-gray-700">Account/API Name</TableHead>
                <TableHead className="text-white border-r-2 dark:border-gray-700">Bot Name</TableHead>
                <TableHead className="text-white border-r-2 dark:border-gray-700">Date & Time</TableHead>
                <TableHead className="text-white border-r-2 dark:border-gray-700">Coin/Stock/Pairs</TableHead>
                <TableHead className="text-white border-r-2 dark:border-gray-700">Buy</TableHead>
                <TableHead className="text-white border-r-2 dark:border-gray-700">Sell</TableHead>
                <TableHead className="text-white border-r-2 dark:border-gray-700">Quantity</TableHead>
                <TableHead className="text-white border-r-2 dark:border-gray-700">P/L</TableHead>
                <TableHead className="text-white">Transaction ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
  {currentData.map((row, rowIndex) => (
    <TableRow
      key={row.id}
      className="hover:bg-muted/50 dark:hover:bg-[#2d2d30] dark:text-white"
    >
      {Object.entries(row).map(([key, value], cellIndex) => (
        <TableCell
          key={key}
          className={cn(
            rowIndex < currentData.length - 1 ? "border-b-2 dark:border-gray-700" : "",
            cellIndex < Object.keys(row).length - 1 ? "border-r-2 dark:border-gray-700" : "" ,
            "p-4",
            key === "pl" || key === "id" ? "text-center" : "",
            "dark:text-white"
          )}
        >
          {key === "pl" ? ( 
            <span className={Number(value) > 0 ? "text-green-600" : "text-red-600"}>
              {Number(value) > 0 ? `+${value}` : value}
            </span>
          ) : (
            value
          )}
        </TableCell>
      ))}
    </TableRow>
  ))}
</TableBody>


          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {startIndex + 1} to {Math.min(endIndex, MOCK_DATA.length)} of {MOCK_DATA.length} entries
          </div>
          <div className="flex items-center gap-2 dark:text-white">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                className={cn(
                  currentPage === page && "bg-[#4A1C24] text-white hover:bg-[#3A161C]"
                )}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

