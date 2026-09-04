# LJC Command Native

Native iOS and Android container for the Lake James Canopies operating system.

## App identity

- App name: LJC Command
- Bundle / application ID: com.lakejamescanopies.command
- Secure application URL: https://lakejamescanopies.com/app/
- Backend: existing Supabase project and role-based RLS

## Local build

Requirements: Node.js, Xcode for iOS, Android Studio/JDK for Android.

```bash
cd native
npm install
npx cap add ios
npx cap add android
npx cap sync
```

Open native projects:

```bash
npx cap open ios
npx cap open android
```

## iPhone distribution

Open the generated iOS project in Xcode, select the Lake James Canopies Apple Developer Team, enable automatic signing for `com.lakejamescanopies.command`, then archive for TestFlight/App Store distribution.

## Android distribution

Open the generated Android project in Android Studio. A debug APK can be installed directly for testing. For Google Play, create a release signing key and build an Android App Bundle (AAB).

## Native capabilities prepared

Dependencies are included for Camera, Filesystem, Network, Push Notifications, Haptics, Status Bar and App lifecycle/deep links. Push notification tokens must be registered by the app against `mobile_push_devices`; actual Apple APNs / Firebase credentials are intentionally not stored in this public repository.

## Security

Never add Supabase service-role keys, APNs private keys, Firebase service-account credentials, Android keystores, Apple certificates or provisioning profiles to this repository. The client application uses the public Supabase key and existing RLS policies only.
