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
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-sw-red text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-sw-gray mb-2">Error</h2>
      <p className="text-sw-gray/70 mb-6 text-center max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Try Again
        </Button>
      )}
    </div>
  );
};
