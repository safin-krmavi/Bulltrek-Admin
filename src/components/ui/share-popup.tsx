
import { Button } from "@/components/ui/button"
import { X, Instagram, Linkedin, Twitter, Facebook, Download } from 'lucide-react'
import { Logo } from "@/components/ui/logo"
import { QRCodeSVG } from 'qrcode.react'

interface SharePopupProps {
  isOpen: boolean
  onClose: () => void
  predictionData?: {
    title: string
    percentage: string
    pair: string
    referrals: string
    duration: string
  }
}

export function SharePopup({
  isOpen,
  onClose,
  predictionData = {
    title: "Lorem Ipsum dolor sit for prediction",
    percentage: "+ 14.80 %",
    pair: "mETH/USDT",
    referrals: "238",
    duration: "153d 18h 24m"
  }
}: SharePopupProps) {
  if (!isOpen) return null

  const handleShare = (platform: string) => {
    // Handle social media sharing
    const shareText = `Check out my prediction: ${predictionData.percentage} on ${predictionData.pair}`
    const shareUrl = window.location.href
    
    const shareUrls = {
      instagram: `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    }
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
  }

  const handleDownload = () => {
    // Handle image download functionality
    console.log('Downloading image...')
    // You can implement actual image generation and download here
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 max-w-md w-full relative shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-300 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main content area */}
        <div className="bg-[#f5f5dc] dark:bg-[#2a2a2a] rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          {/* Prediction header */}
          <h3 className="text-center text-gray-800 dark:text-gray-200 font-medium mb-4">
            {predictionData.title}
          </h3>

          {/* Main percentage */}
          <div className="text-center mb-6">
            <span className="text-3xl font-bold text-green-600 dark:text-green-400">
              {predictionData.percentage}
            </span>
          </div>

          {/* Data points */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Lorem ipsum</div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{predictionData.pair}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Lorem</div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{predictionData.referrals}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Lorem ipsum</div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{predictionData.duration}</div>
            </div>
          </div>

          {/* Branding and QR Code */}
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="flex items-center">
              <Logo 
                width={80} 
                height={24} 
                primaryColor="#40101B" 
                accentColor="#F6921E"
                redColor="#E92C2A"
                greenColor="#029447"
                showText={true}
                showIcon={true}
              />
            </div>
            <div className="w-16 h-16 bg-white rounded flex items-center justify-center border border-gray-400 dark:border-gray-500 p-1">
              <QRCodeSVG 
                value="https://bulltrek.com/share?ref=12345TH&prediction=+14.80%25&pair=mETH/USDT"
                size={56}
                level="M"
                includeMargin={false}
              />
            </div>
          </div>
        </div>

        {/* Share section */}
        <div className="mb-6">
          <div className="flex items-center gap-8">
            <span className="text-gray-700 dark:text-white text-sm font-medium">Share on</span>
            <div className="flex gap-8">
              <button
                onClick={() => handleShare('instagram')}
                className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md"
              >
                <Instagram className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md"
              >
                <Twitter className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md"
              >
                <Facebook className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Download button */}
        <div className="text-center">
          <Button
            onClick={handleDownload}
            className="bg-[#8B0000] hover:bg-[#A52A2A] dark:bg-[#8B0000] dark:hover:bg-[#A52A2A] text-white px-8 py-3 rounded-lg flex items-center gap-2 mx-auto shadow-md"
          >
            <Download className="w-4 h-4" />
            Download Image
          </Button>
        </div>
      </div>
    </div>
  )
} 