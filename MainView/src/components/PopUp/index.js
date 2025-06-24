import React, { useEffect, useRef } from 'react';
import { X, AlertCircle, MapPin, Headphones } from 'lucide-react';

// Simple Button component (replace with your preferred button component)
const Button = ({ children, onClick, className = '', variant = 'default', disabled = false, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * PopUp - A reusable React popup component for displaying popup modal states
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Callback when modal is closed
 * @param {'location'|'audio'|'cosmosFailure'} props.type - Modal state type
 * @param {string} props.title - Main title text
 * @param {string} [props.subtitle] - Subtitle text (optional)
 * @param {string} [props.primaryButtonText] - Primary button text (optional)
 * @param {string} [props.secondaryButtonText] - Secondary button text (optional)
 * @param {function} [props.onPrimaryAction] - Primary button click handler (optional)
 * @param {function} [props.onSecondaryAction] - Secondary button click handler (optional)
 * @param {boolean} [props.isLoading] - Shows loading state on primary button
 */
const PopUp = ({ 
  isOpen, 
  onClose, 
  type = 'location', 
  title,
  subtitle,
  onPrimaryAction,
  onSecondaryAction,
  primaryButtonText,
  secondaryButtonText,
  isLoading = false
}) => {
  const gradientRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !gradientRef.current) return;

    let startTime = Date.now();
    let animationId;
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000; // Convert to seconds
      const speed = 0.3; // Slower animation speed
      
      // Infinity pattern using parametric equations
      // x = sin(t), y = sin(2t) creates a figure-8 pattern
      const t = elapsed * speed;
      const x = Math.sin(t) * 20; // Reduced movement scale
      const y = Math.sin(2 * t) * 15; // Reduced movement scale
      
      // Center the movement around 50% and add the offset
      const centerX = 50 + x;
      const centerY = 50 + y;
      
      if (gradientRef.current) {
        gradientRef.current.style.background = `radial-gradient(circle at ${centerX}% ${centerY}%, ${getGradientColors(type)})`;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation with a small delay
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isOpen, type]);

  const getGradientColors = (modalType) => {
    switch (modalType) {
      case 'location':
        return 'rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.25) 20%, rgba(147, 51, 234, 0.15) 40%, rgba(147, 51, 234, 0.08) 60%, rgba(147, 51, 234, 0.03) 80%, transparent 100%';
      case 'audio':
        return 'rgba(34, 197, 94, 0.4) 0%, rgba(34, 197, 94, 0.25) 20%, rgba(34, 197, 94, 0.15) 40%, rgba(34, 197, 94, 0.08) 60%, rgba(34, 197, 94, 0.03) 80%, transparent 100%';
      case 'cosmosFailure':
        return 'rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0.25) 20%, rgba(239, 68, 68, 0.15) 40%, rgba(239, 68, 68, 0.08) 60%, rgba(239, 68, 68, 0.03) 80%, transparent 100%';
      default:
        return 'rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.25) 20%, rgba(147, 51, 234, 0.15) 40%, rgba(147, 51, 234, 0.08) 60%, rgba(147, 51, 234, 0.03) 80%, transparent 100%';
    }
  };

  if (!isOpen) return null;

  const getIconAndColors = () => {
    switch (type) {
      case 'location':
        return {
          icon: <MapPin className="w-8 h-8 text-purple-600" />,
          iconBg: 'bg-white'
        };
      case 'audio':
        return {
          icon: <Headphones className="w-8 h-8 text-green-600" />,
          iconBg: 'bg-white'
        };
      case 'cosmosFailure':
        return {
          icon: <AlertCircle className="w-8 h-8 text-red-600" />,
          iconBg: 'bg-white'
        };
      default:
        return {
          icon: <MapPin className="w-8 h-8 text-purple-600" />,
          iconBg: 'bg-white'
        };
    }
  };

  const { icon, iconBg } = getIconAndColors();

  const handleLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location access granted:', position);
          if (onPrimaryAction) onPrimaryAction(position);
        },
        (error) => {
          console.error('Location access denied:', error);
          if (onPrimaryAction) onPrimaryAction(null, error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
      if (onPrimaryAction) onPrimaryAction(null, new Error('Geolocation not supported'));
    }
  };

  const handlePrimaryAction = () => {
    if (type === 'location') {
      handleLocationPermission();
    } else if (onPrimaryAction) {
      onPrimaryAction();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-auto relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated background gradient */}
        <div 
          ref={gradientRef}
          className="absolute inset-0 opacity-100"
        />

        {/* Content */}
        <div className="relative p-6 pt-10">
          {/* Icon */}
          <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-8 relative shadow-lg`}>
            <div className="relative">
              {icon}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
            {title}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm text-gray-500 text-center mb-6">
              {subtitle}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            {secondaryButtonText && (
              <Button
                variant="outline"
                onClick={onSecondaryAction}
                className="flex-1 h-12 text-gray-700 border-gray-200 hover:bg-gray-50"
                disabled={isLoading}
              >
                {secondaryButtonText}
              </Button>
            )}
            {primaryButtonText && (
              <Button
                onClick={handlePrimaryAction}
                className="flex-1 h-12 text-white font-medium bg-gray-600 hover:bg-gray-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </div>
                ) : (
                  primaryButtonText
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;

