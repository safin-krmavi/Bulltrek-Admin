import { Copy, Share2, Settings, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SharePopup } from "@/components/ui/share-popup"
import { useState } from "react"

export default function ShareCard() {
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false)

  const handleShareClick = () => {
    setIsSharePopupOpen(true)
  }

  const handleSocialShare = (platform: string) => {
    const shareText = `Check out my referral link: https://referralLinknameIdnameStrategy.co`
    const shareUrl = "https://referralLinknameIdnameStrategy.co"
    
    const shareUrls = {
      instagram: `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    }
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
  }

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
            href="https://referralLinknameIdnameStrategy.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline text-sm truncate flex-1"
          >
            https://referralLinknameIdnameStrategy.co
          </a>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0">
            <Copy className="h-4 w-4" />
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-gray-500 dark:text-gray-400 text-sm cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">Share on</span>
              </TooltipTrigger>
              <TooltipContent className="p-3 bg-[#f5f5dc] dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-800 dark:text-gray-200 mb-2">You can share link on:</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSocialShare('instagram')}
                    className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleSocialShare('linkedin')}
                    className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleSocialShare('twitter')}
                    className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleSocialShare('facebook')}
                    className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-white" />
                  </button>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={handleShareClick}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Referrals Row */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-700 dark:text-gray-300">
            Verified Referrals: <span className="font-semibold text-gray-900 dark:text-white">238</span>
          </span>
          <span className="text-gray-300 dark:text-gray-500">|</span>
          <span className="text-gray-700 dark:text-gray-300">
            Pending Referrals: <span className="font-semibold text-gray-900 dark:text-white">23</span>
          </span>
        </div>
      </CardContent>
      
      {/* Share Popup */}
      <SharePopup
        isOpen={isSharePopupOpen}
        onClose={() => setIsSharePopupOpen(false)}
        predictionData={{
          title: "Your Trading Success Story",
          percentage: "+ 14.80 %",
          pair: "mETH/USDT",
          referrals: "238",
          duration: "153d 18h 24m"
        }}
      />
    </Card>
  )
}