import React from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface ErrorDialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  formatExample?: string
  columns?: string[]
}

export default function ErrorDialog({
  isOpen,
  onClose,
  title = "Invalid Data Format",
  message,
  formatExample = "0,tcp,http,SF,215,45076,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,normal",
  columns
}: ErrorDialogProps) {
  const router = useRouter();
  
  const handleLearnMore = () => {
    onClose();
    router.push('/resources/format-guide');
  };
  
  // Create a shortened example for display
  const shortExample = "0,tcp,http,SF,215,45076,0,0,0,...,normal";
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md rounded-xl border border-gray-800 bg-gradient-to-b from-black/95 to-gray-900/90 p-4 shadow-xl shadow-blue-900/10 backdrop-blur-sm">
        <DialogHeader className="mb-3">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-red-500/20 blur-sm"></div>
              <AlertTriangle className="relative h-5 w-5 text-red-500" />
            </div>
            <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 text-base font-semibold">
              {title}
            </DialogTitle>
          </motion.div>
        </DialogHeader>
        
        <motion.div 
          className="space-y-3 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="text-gray-300 leading-relaxed">{message}</p>
          
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-900/60 rounded-lg p-2.5 text-xs text-gray-400 border border-gray-800/80">
            <strong className="text-white font-medium">Required format:</strong> 41 features separated by commas
          </div>
          
          <div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 text-xs font-medium mb-1.5">
              Example Format:
            </div>
            <div className="bg-gradient-to-r from-gray-900/90 to-gray-900/70 rounded-lg border border-gray-800/80 p-2 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <code className="text-gray-300 text-xs font-mono">{shortExample}</code>
            </div>
          </div>
        </motion.div>
        
        <DialogFooter className="flex justify-end gap-2.5 mt-4 pt-3 border-t border-gray-800/60">
          <Button 
            onClick={handleLearnMore}
            variant="outline"
            size="sm"
            className="text-blue-400 border-blue-900/30 hover:bg-blue-900/20 text-xs transition-colors duration-200 rounded-lg"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            Learn More
          </Button>
          <Button 
            onClick={onClose}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-xs transition-all duration-200 shadow-md shadow-blue-900/20 rounded-lg"
          >
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 