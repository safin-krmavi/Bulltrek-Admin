import { Copy, Share2, Instagram, Linkedin, Twitter, HelpCircle, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ShareCard() {
  return (
    <Card className="bg-white dark:bg-[#232326] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 w-full max-w-md">
      <CardContent className="p-4 space-y-3">
        {/* Top Row: Referral ID and Settings */}
        <div className="flex justify-between items-center">
          <div className="font-semibold text-gray-900 dark:text-white text-sm">
            Referral ID: 12345TH
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Referral Link Row */}
        <div className="flex items-center gap-2 text-sm">
          <a
            href="https://referral.linknameIdnameStrategy.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline text-sm truncate flex-1"
          >
            https://referral.linknameIdnameStrategy.co
          </a>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0">
            <Copy className="h-4 w-4" />
          </Button>
          <span className="text-gray-500 dark:text-gray-400 text-sm">Share on</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="p-2">
                <div className="text-sm">You can share link on:</div>
                <div className="flex gap-2 mt-2">
                  <Instagram className="h-5 w-5" />
                  <Linkedin className="h-5 w-5" />
                  <Twitter className="h-5 w-5" />
                  <HelpCircle className="h-5 w-5" />
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Referrals Row */}
        <div className="flex items-center gap-4 text-sm pt-3 border-t border-gray-200 dark:border-gray-600">
          <span className="text-gray-700 dark:text-gray-300">
            Verified Referrals: <span className="font-semibold text-gray-900 dark:text-white">238</span>
          </span>
          <span className="text-gray-300 dark:text-gray-500">|</span>
          <span className="text-gray-700 dark:text-gray-300">
            Pending Referrals: <span className="font-semibold text-gray-900 dark:text-white">23</span>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}