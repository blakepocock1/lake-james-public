import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lakejamescanopies.command',
  appName: 'LJC Command',
  webDir: 'www',
  server: {
    url: 'https://lakejamescanopies.com/app/',
    cleartext: false,
    allowNavigation: ['lakejamescanopies.com']
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile'
  },
  android: {
    allowMixedContent: false
  },
  plugins: {
    StatusBar: {
      style: 'DARK'
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
