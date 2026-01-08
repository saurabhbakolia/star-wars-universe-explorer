import { Button } from './ui/Button';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorDisplay = ({ 
  message = 'Something went wrong. Please try again.', 
  onRetry 
}: ErrorDisplayProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
      <div className="text-sw-red text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">⚠️</div>
      <h2 className="text-xl sm:text-2xl font-bold text-sw-gray mb-2">Error</h2>
      <p className="text-sm sm:text-base text-sw-gray/70 mb-4 sm:mb-6 text-center max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" size="sm" className="w-full sm:w-auto">
          Try Again
        </Button>
      )}
    </div>
  );
};
