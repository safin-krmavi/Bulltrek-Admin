import React from 'react'
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, X } from 'lucide-react'
import { useNotifications } from "@/contexts/NotificationContext"

interface StrategyResponsePopupProps {
  isOpen: boolean
  onClose: () => void
  response: any
  isSuccess: boolean
  strategyName: string
}

export function StrategyResponsePopup({
  isOpen,
  onClose,
  response,
  isSuccess,
  strategyName
}: StrategyResponsePopupProps) {
  const { addNotification } = useNotifications()
  
  // Always show the banner when isOpen is true, regardless of other conditions
  if (!isOpen) return null

  // Add notification when banner is shown
  React.useEffect(() => {
    if (isOpen) {
      addNotification({
        type: 'strategy',
        title: isSuccess ? 'Strategy Executed Successfully' : 'Strategy Execution Failed',
        message: isSuccess 
          ? `${strategyName} has been executed successfully`
          : `Failed to execute ${strategyName}: ${response?.message || "An error occurred"}`,
        data: {
          strategyName,
          response,
          isSuccess
        }
      })
    }
  }, [isOpen, isSuccess, strategyName, response, addNotification])

  const getIcon = () => {
    if (isSuccess) {
      return (
        <div className="relative">
          <CheckCircle className="w-5 h-5 text-green-500" />
          {/* Confetti effect for success */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-75"></div>
          <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-150"></div>
        </div>
      )
    }
    return <XCircle className="w-5 h-5 text-red-500" />
  }

  const getMessage = () => {
    if (isSuccess) {
      return `${strategyName} executed successfully!`
    }
    return `Failed to execute ${strategyName}: ${response?.message || "An error occurred"}`
  }

  const getBackgroundColor = () => {
    if (isSuccess) {
      return "bg-gradient-to-r from-green-600 to-green-700"
    }
    return "bg-gradient-to-r from-red-600 to-red-700"
  }

  const showDetailsModal = () => {
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[60]'
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Response Details</h3>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <pre class="text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto">${JSON.stringify(response, null, 2)}</pre>
      </div>
    `
    document.body.appendChild(modal)
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove()
      }
    })
  }

  // Handle close button click - this is the only way to dismiss the banner
  const handleClose = () => {
    onClose()
  }

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 ${getBackgroundColor()} text-white shadow-lg animate-in slide-in-from-top duration-300`} 
      data-strategy-banner
      // Prevent any accidental dismissal
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      style={{
        animation: 'slideInFromTop 0.3s ease-out, subtlePulse 3s ease-in-out infinite'
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Left side with icon and message */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
            {getIcon()}
          </div>
          <span className="font-medium text-sm sm:text-base">
            {getMessage()}
          </span>
        </div>

        {/* Right side with action buttons */}
        <div className="flex items-center space-x-3">
          {/* View Details button */}
          <Button
            onClick={showDetailsModal}
            className="bg-white/20 hover:bg-white/30 text-white text-xs px-4 py-2 rounded-full transition-colors duration-200 font-medium"
          >
            View Details
          </Button>

          {/* Close button - only way to dismiss the banner */}
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            title="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 