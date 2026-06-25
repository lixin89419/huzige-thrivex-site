interface StatusTagProps {
  status: number | boolean;
  className?: string;
  flash?: boolean;
}

export default ({ status, className, flash = false }: StatusTagProps) => {
  const enabled = Boolean(status);
  const animateClass = flash ? 'animate-pulse' : '';
  const pingClass = flash ? 'animate-ping' : '';

  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      {enabled ? (
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-50 hover:bg-green-100 transition-colors relative">
          <span className={`w-2.5 h-2.5 bg-green-500 rounded-full ${animateClass}`} />
          <span className={`absolute w-2.5 h-2.5 bg-green-500 rounded-full ${pingClass} opacity-75`} />
        </div>
      ) : (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors relative">
          <span className={`w-2.5 h-2.5 bg-red-500 rounded-full ${animateClass}`} />
          <span className={`absolute w-2.5 h-2.5 bg-red-500 rounded-full ${pingClass} opacity-75`} />
        </div>
      )}
    </div>
  );
};
