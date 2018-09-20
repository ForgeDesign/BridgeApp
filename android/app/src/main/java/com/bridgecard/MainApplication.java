package com.bridgecard;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;

import cl.json.RNSharePackage;
import cl.json.ShareApplication;

import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.dooboolab.RNIap.RNIapPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // <-- Add this line
import io.invertase.firebase.database.RNFirebaseDatabasePackage; // <-- Add this line
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.magus.fblogin.FacebookLoginPackage;

import com.reactlibrary.googlesignin.RNGoogleSignInPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public String getFileProviderAuthority() {
    return "com.bridgecard.provider";
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new RNSharePackage(),
            new ImagePickerPackage(),
            new PickerPackage(),
            new RNIapPackage(),
            new RNGoogleSignInPackage(),
            new RNGeocoderPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(), // <-- Add this line
            new RNFirebaseDatabasePackage(), // <-- Add this line
            new FacebookLoginPackage(),
            new FBSDKPackage(mCallbackManager)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
