
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { useNotifications } from "@/contexts/NotificationContext"

interface PromotionalBannerProps {
  isOpen: boolean
  onClose: () => void
}

export function PromotionalBanner({
  isOpen,
  onClose
}: PromotionalBannerProps) {
  const { addNotification } = useNotifications()
  
  if (!isOpen) return null

  const handleClose = () => {
    // Add a notification when the banner is closed
    addNotification({
      type: 'promotional',
      title: 'Special Offer Available',
      message: 'Get 10% off on your 1st trade - Click to view offer details',
      data: {
        offer: '10% off first trade',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      }
    })
    onClose()
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 bg-[#4A1C24] text-white shadow-lg animate-in slide-in-from-top duration-300" 
      data-promotional-banner
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center px-4 py-3 max-w-7xl mx-auto relative">
        {/* Center section with confetti icon, text, and enroll button */}
        <div className="flex items-center space-x-3 mx-auto">
          {/* Confetti/Party Popper Icon */}
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            {/* Confetti pieces */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-75"></div>
            <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-150"></div>
            <div className="absolute top-0 -right-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-200"></div>
          </div>
          
          {/* Offer text */}
          <span className="font-medium text-sm sm:text-base">
            Get 10% off on your 1st trade
          </span>

          {/* Enroll Now button */}
          <Button
            onClick={() => {
              // Handle enrollment action
              console.log('Enroll Now clicked')
              // You can add navigation or modal here
            }}
            className="bg-[#FF8C00] hover:bg-[#FF7A00] text-white text-xs px-4 py-2 rounded-full transition-colors duration-200 font-medium"
          >
            Enroll Now!
          </Button>
        </div>

                  {/* Close button - positioned absolutely to the right */}
          <button
            onClick={handleClose}
            className="absolute right-4 text-[#FF8C00] hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            title="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
      </div>
    </div>
  )
} 