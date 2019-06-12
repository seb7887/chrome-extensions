import { DEV, IS_LIVE_EXAMPLE } from '../config/constants';

export default function getFaviconUrl(url: string) {
  try {
    if (DEV || IS_LIVE_EXAMPLE) {
      const prefixLessUrl = new URL(url || '').hostname;
      return `https://api.faviconkit.com/${prefixLessUrl}/32`;
    } else {
      return `chrome://favicon/size/16@2x/${url}`;
    }
  } catch (err) {
    return '';
  }
}
