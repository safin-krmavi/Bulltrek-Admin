import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  primaryColor?: string; // Main text color
  accentColor?: string;  // Orange accent color
  redColor?: string;     // Red accent color
  greenColor?: string;   // Green accent color
  showText?: boolean;    // Whether to show the text part
  showIcon?: boolean;    // Whether to show the icon part
  loading?: boolean;     // Animate the red/green lines for loading
}

export const Logo: React.FC<LogoProps> = ({
  width = 178,
  height = 53,
  className = '',
  primaryColor = '#40101B',
  accentColor = '#F6921E',
  redColor = '#E92C2A',
  greenColor = '#029447',
  showText = true,
  showIcon = true,
  loading = false,
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 178 53" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Red accent line */}
      {showIcon && (
        <g className={loading ? 'bulltrek-loading-bar-red' : ''}>
          <path d="M70.0068 13.5V46.8179H64.1934V13.5H70.0068Z" fill={redColor} />
        </g>
      )}
      
      {/* Green accent line */}
      {showIcon && (
        <g className={loading ? 'bulltrek-loading-bar-green' : ''}>
          <path d="M79.9717 5.94141V46.8163H74.1582V5.94141H79.9717Z" fill={greenColor} />
        </g>
      )}
      
      {/* BullTrek Text - B */}
      {showText && (
        <path d="M84.125 19.7932V15.6992H89.2174V19.7932H98.3523V24.3505H89.2174V38.1233C89.2174 39.4068 89.5843 40.4019 90.3469 41.1356C91.1077 41.8946 92.1576 42.2605 93.4967 42.2605H98.3523V46.8178H92.4196C90.7914 46.8178 89.3493 46.4771 88.088 45.8227C86.8284 45.1683 85.8562 44.2255 85.1749 43.0213C84.4665 41.8423 84.125 40.4812 84.125 38.9363V19.795V19.7932Z" fill={primaryColor}/>
      )}
      
      {/* BullTrek Text - u */}
      {showText && (
        <path d="M118.459 24.5066H114.573C113.182 24.5066 111.975 24.7951 110.898 25.3972C109.821 25.9993 109.007 26.7059 108.431 27.4667C107.853 28.2527 107.565 29.5362 107.565 31.3155V46.8171H102.5V19.7925H107.513V23.014C108.353 21.9666 109.428 21.1554 110.715 20.5785C112.002 20.0287 113.446 19.7402 114.994 19.7402H118.459V24.5066Z" fill={primaryColor}/>
      )}
      
      {/* BullTrek Text - l (first) */}
      {showText && (
        <g className={loading ? 'bulltrek-loading-bar-l1' : ''}>
          <path d="M54.9733 19.793V35.9237C54.9733 37.1802 54.6841 38.3322 54.1076 39.3543C53.5041 40.3764 52.6891 41.1877 51.6138 41.7898C50.5386 42.3919 49.3297 42.6803 47.9653 42.6803C46.6009 42.6803 45.3667 42.3919 44.2914 41.7898C43.2144 41.2129 42.3759 40.4287 41.7976 39.4066C41.2212 38.3844 40.932 37.2595 40.932 36.0283V19.793H35.8125V36.7349C35.8125 38.7252 36.3113 40.5315 37.2835 42.1557C38.2539 43.8052 39.593 45.0888 41.2989 46.0045C43.0048 46.9474 44.9221 47.4179 47.0744 47.4179C48.6502 47.4179 50.1194 47.1565 51.4837 46.6066C52.8228 46.0839 54.0046 45.3231 54.9751 44.355V46.8158H60.0404V19.793H54.9751H54.9733Z" fill={primaryColor}/>
        </g>
      )}
      {/* BullTrek Text - l (second) */}
      {showText && (
        <g className={loading ? 'bulltrek-loading-bar-l2' : ''}>
          <path d="M54.9733 19.793V35.9237C54.9733 37.1802 54.6841 38.3322 54.1076 39.3543C53.5041 40.3764 52.6891 41.1877 51.6138 41.7898C50.5386 42.3919 49.3297 42.6803 47.9653 42.6803C46.6009 42.6803 45.3667 42.3919 44.2914 41.7898C43.2144 41.2129 42.3759 40.4287 41.7976 39.4066C41.2212 38.3844 40.932 37.2595 40.932 36.0283V19.793H35.8125V36.7349C35.8125 38.7252 36.3113 40.5315 37.2835 42.1557C38.2539 43.8052 39.593 45.0888 41.2989 46.0045C43.0048 46.9474 44.9221 47.4179 47.0744 47.4179C48.6502 47.4179 50.1194 47.1565 51.4837 46.6066C52.8228 46.0839 54.0046 45.3231 54.9751 44.355V46.8158H60.0404V19.793H54.9751H54.9733Z" fill={primaryColor}/>
        </g>
      )}
      
      {/* BullTrek Text - T (first part) */}
      {showText && (
        <path d="M30.351 30.8167C29.4583 29.2988 28.2512 28.0676 26.7025 27.15C28.1717 26.1819 29.3282 24.9507 30.1414 23.458C30.9546 21.9654 31.3757 20.3159 31.3757 18.5095C31.3757 16.44 30.8769 14.5814 29.8794 12.9319C28.8819 11.2824 27.4904 9.99889 25.705 9.05607C23.9195 8.14028 21.8992 7.66797 19.6421 7.66797H0.0332031V46.8159H19.6945C21.9516 46.8159 23.9991 46.3453 25.8116 45.4025C27.6223 44.4597 29.0662 43.1509 30.1161 41.4744C31.1407 39.8249 31.6648 37.9393 31.6648 35.8715C31.6648 34.0382 31.2184 32.3635 30.3528 30.8185L30.351 30.8167ZM25.4429 38.8298C24.8918 39.7726 24.1039 40.5063 23.1063 41.0291C22.1088 41.579 21.0065 41.8403 19.7993 41.8403H5.38766V12.6435H19.6403C20.8475 12.6435 21.9245 12.9049 22.8949 13.4024C23.8653 13.9252 24.6279 14.6337 25.1773 15.5495C25.7285 16.4653 25.9905 17.5126 25.9905 18.6646C25.9905 19.8165 25.7285 20.8116 25.1773 21.7292C24.6261 22.645 23.8653 23.3535 22.8949 23.8762C21.9227 24.4008 20.8475 24.6622 19.6403 24.6622H11.9294V29.6125H19.7975C21.0318 29.6125 22.1594 29.8739 23.1316 30.3985C24.1021 30.9483 24.89 31.682 25.4411 32.5978C25.9923 33.5136 26.2814 34.561 26.2814 35.7129C26.2814 36.8648 25.9923 37.9122 25.4411 38.8298H25.4429Z" fill={primaryColor}/>
      )}
      
      {/* BullTrek Text - r (first part) */}
      {showText && (
        <path d="M177.786 19.793L169.495 27.8169L168.568 22.3835L171.227 19.793" fill={primaryColor}/>
      )}
      
      {/* BullTrek Text - r (accent part) */}
      {showText && (
        <path d="M171.227 19.793V26.1422L177.786 19.793H171.227Z" fill={accentColor}/>
      )}
      
      {/* BullTrek Text - r (second part) */}
      {showText && (
        <path d="M169.891 27.4352V21.0951L159.438 31.2895V5.94141H154.373V46.8163H159.438V33.8547L171.224 46.8163H177.786L164.61 32.546L169.891 27.4352Z" fill={primaryColor}/>
      )}
      
      {/* BullTrek Text - e (first) */}
      {showText && (
        <path d="M125.5 19.793V46.8171H120.435V19.793H125.5Z" fill={primaryColor}/>
      )}
      
      {/* BullTrek Text - e (second) */}
      {showText && (
        <path d="M135.5 19.793V46.8171H130.435V19.793H135.5Z" fill={primaryColor}/>
      )}
      
      {/* BullTrek Text - k */}
      {showText && (
        <path d="M145.5 19.793V46.8171H140.435V19.793H145.5Z" fill={primaryColor}/>
      )}
    </svg>
  );
};

// Convenience components for common use cases
export const LogoIcon: React.FC<Omit<LogoProps, 'showText' | 'showIcon'> & { size?: number }> = ({ 
  size = 32, 
  ...props 
}) => (
  <Logo 
    width={size} 
    height={size} 
    showText={false} 
    showIcon={true} 
    {...props} 
  />
);

export const LogoText: React.FC<Omit<LogoProps, 'showText' | 'showIcon'> & { size?: number }> = ({ 
  size = 32, 
  ...props 
}) => (
  <Logo 
    width={size * 3.36} // Maintain aspect ratio
    height={size} 
    showText={true} 
    showIcon={false} 
    {...props} 
  />
);

export default Logo; 