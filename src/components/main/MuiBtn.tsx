// MUI- Material Icons
import WatchIcon from '@mui/icons-material/Watch';
import LaptopIcon from '@mui/icons-material/Laptop';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import MonitorIcon from '@mui/icons-material/Monitor';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import CableIcon from '@mui/icons-material/Cable';

// category 값에 따른 MUI 아이콘을 가져옵니다.
export const getIconComponet = (value: string) => {
  switch (value) {
    case '컴퓨터':
      return DesktopMacIcon;
    case '노트북':
      return LaptopIcon;
    case '모니터':
      return MonitorIcon;
    case '핸드폰':
      return PhoneAndroidIcon;
    case '웨어러블':
      return WatchIcon;
    case '콘솔':
      return VideogameAssetIcon;
    case '주변기기':
      return CableIcon;
    default:
      return QuestionMarkIcon;
  }
};
