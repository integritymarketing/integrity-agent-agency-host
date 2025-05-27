import { useEffect, useState } from "react";

declare global {
  interface Window {
    MSStream?: any;
  }
}

export enum DEVICES {
  ANDROID = "ANDROID",
  IOS = "IOS",
  IPHONE = "IPHONE",
  UNKNOWN = "UNKNOWN",
}

type DeviceType = DEVICES;

const useDeviceInfo = (): DeviceType => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceType>(DEVICES.UNKNOWN);

  useEffect(() => {
    const getMobileOperatingSystem = (): DeviceType => {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;

      if (/android/i.test(userAgent)) {
        return DEVICES.ANDROID;
      }

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        if (/iPhone/.test(userAgent)) {
          return DEVICES.IPHONE;
        }
        return DEVICES.IOS;
      }

      return DEVICES.UNKNOWN;
    };

    const info = getMobileOperatingSystem();
    setDeviceInfo(info);
  }, []);

  return deviceInfo;
};

export default useDeviceInfo;
