import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CopyTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function CopyTradeModal({ isOpen, onClose, onConfirm }: CopyTradeModalProps) {
  const [isAgreed, setIsAgreed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (isAgreed) {
      onConfirm();
      onClose();
      setIsAgreed(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-black dark:text-white">
            Copy Trade Agreement
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4 max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>
              <p>
                Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
              </p>
              <p>
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
              </p>
            </div>
          </div>

          {/* Checkbox and Button */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="agreement"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agreement" className="text-sm text-black dark:text-white">
                I have read and agreed
              </label>
            </div>
            <Button
              onClick={handleConfirm}
              disabled={!isAgreed}
              className="bg-[#4A1D2F] hover:bg-[#3A1525] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 