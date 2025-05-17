import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from 'react';
  import { useAuth0 } from '@auth0/auth0-react';
  import { AmplitudeContextType } from './AmplitudeContextTypes';
  
  const AmplitudeContext = createContext<AmplitudeContextType | undefined>(undefined);
  
  interface AmplitudeProviderProps {
    children: ReactNode;
  }
  
  export const AmplitudeProvider: React.FC<AmplitudeProviderProps> = ({ children }) => {
    const { user } = useAuth0();
    const [isAmplitudeInitialized, setIsAmplitudeInitialized] = useState(false);
  
    useEffect(() => {
      if (
        import.meta.env.VITE_BUILD_ENV !== 'Production' &&
        !isAmplitudeInitialized &&
        user?.npn
      ) {
        const script = document.createElement('script');
        script.src = 'https://cdn.amplitude.com/script/bdb9ff9f9b4050ae0f8a387d65052a72.js';
        script.async = true;
  
        script.onload = () => {
          if (window.amplitude?.init) {
            window.amplitude.init('bdb9ff9f9b4050ae0f8a387d65052a72', user.npn, {
              fetchRemoteConfig: true,
              autocapture: true,
            });
  
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'Amp User ID Ready',
              ampUserId: user.npn,
            });
  
            setIsAmplitudeInitialized(true);
          }
        };
  
        document.body.appendChild(script);
      }
    }, [user, isAmplitudeInitialized]);
  
    return (
      <AmplitudeContext.Provider value={{ isAmplitudeInitialized }}>
        {children}
      </AmplitudeContext.Provider>
    );
  };
  
  export const useAmplitude = (): AmplitudeContextType => {
    const context = useContext(AmplitudeContext);
    if (!context) {
      throw new Error('useAmplitude must be used within an AmplitudeProvider');
    }
    return context;
  };
  