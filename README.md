# Cordova(android)でFirebase Authenticationを利用する手順

## CordovaではWebアプリと同じ手順で認証ができない

### [Cordova で OAuth プロバイダを使用して認証する](https://firebase.google.com/docs/auth/web/cordova#web-version-9_2)

を参考にして、Firebaseの設定を行う

1. Firebaseプロジェクトを作成する

1. アプリの追加(Android)を追加

    `keytool -list -printcert -jarfile app-debug.apk`

1. Firebase Dynamic Links を有効にする

1. メールログイン、Googleログインを有効にする

1. 必要なプラグインを追加する(Firebaseのページに記載されている下記プラグインはコンパイルエラーとなるため、一部修正する必要がある)

    1. AndroidXEnabledを有効化＋cordova-plugin-androidx-adapterを読み込む

    1. 不要なバージョンチェックをコメントアウト

    1. cordova-universal-links-plugin　がエラー(Cannot read property 'manifest' of undefined)となるため、修正版に置き換える

    ```
    # Plugin to pass application build info (app name, ID, etc) to the OAuth widget.
    cordova plugin add cordova-plugin-buildinfo --save
    # Plugin to handle Universal Links (Android app link redirects)
    cordova plugin add cordova-universal-links-plugin-fix --save
    # Plugin to handle opening secure browser views on iOS/Android mobile devices
    cordova plugin add cordova-plugin-browsertab --save
    # Plugin to handle opening a browser view in older versions of iOS and Android
    cordova plugin add cordova-plugin-inappbrowser --save
    # Plugin to handle deep linking through Custom Scheme for iOS
    # Substitute *com.firebase.cordova* with the iOS bundle ID of your app.
    cordova plugin add cordova-plugin-customurlscheme --variable \
        URL_SCHEME=com.firebase.cordova --save
    ```

https://github.com/nordnet/cordova-universal-links-plugin/issues/133
cordova-universal-links-plugin を下記に変更する
```
cordova plugin add https://github.com/walteram/cordova-universal-links-plugin
```
---

https://qiita.com/rs_tukki/items/a1af87df2c792a3ef71b

バージョンチェックでエラーになるが、2022年時点では不要のためコメントアウト

platforms\android\cordova-plugin-browsertab\cordovafirebaseauth-BrowserTab.gradle
```
// def minSdkVersion = 16

// if(cdvMinSdkVersion == null) {
//     ext.cdvMinSdkVersion = minSdkVersion;
// } else if (cdvMinSdkVersion.toInteger() < minSdkVersion) {
//     ext.cdvMinSdkVersion = minSdkVersion;
// }
```

---
latforms\android\app\src\main\java\com\google\cordova\plugin\BrowserTab.java:21: エラー: シンボルを見つけられません
古いプラグインでシンボルのエラーが発生する。
'''
<preference name="AndroidXEnabled" value="true" />
'''
かつ、cordova-plugin-androidx-adapterを読み込み、互換性を確保する

https://stackoverflow.com/questions/63383216/ionic-5-app-no-longer-builds-after-updating-android-studio

First ensure AndroidX is enabled in your Cordova project. Either make sure the Android platform is cordova-android@9 or install cordova-plugin-androidx into a cordova-android@8 project.

Then install cordova-plugin-androidx-adapter which will dynamically patch the source code of plugins to migrate from Android Support Library to AndroidX. Note this currently only works for Java and XML source files (not Kotlin or compiled libraries e.g. JAR or AAR).
```
cordova plugin add cordova-plugin-androidx-adapter
```


---

FirebaseコンソールでAndroid アプリを設定



