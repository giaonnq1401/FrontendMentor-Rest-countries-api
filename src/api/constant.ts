export const STORAGE_ACCESS_TOKEN = 'perme_access_token';
export const STORAGE_REFRESH_TOKEN = 'perme_refresh_token';
export type SNSProvider = 'google' | 'facebook' | 'twitter' | 'naver' | 'kakao' | 'custom';
export const PROVIDERS: Record<SNSProvider, SNSProvider> = {
  google: 'google',
  facebook: 'facebook',
  twitter: 'twitter',
  naver: 'naver',
  kakao: 'kakao',
  custom: 'custom',
};
export const AUTHORIZE_ENDPOINT: Record<Exclude<SNSProvider, 'custom'>, string> = {
  google: 'https://accounts.google.com/o/oauth2/v2/auth',
  kakao: 'https://kauth.kakao.com/oauth/authorize',
  naver: 'https://nid.naver.com/oauth2.0/authorize',
  facebook: 'https://www.facebook.com/v17.0/dialog/oauth',
  twitter: 'https://api.twitter.com/oauth/authorize',
};
export const STORAGE_PROVIDER: string = 'perme_social_provider';
