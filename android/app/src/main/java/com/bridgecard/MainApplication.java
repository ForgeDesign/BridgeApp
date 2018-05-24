package com.bridgecard;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import io.amarcruz.rnmeasuretext.RNMeasureTextPackage;
import com.horcrux.svg.SvgPackage;
import cl.json.RNSharePackage;
import com.beefe.picker.PickerViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.dooboolab.RNIap.RNIapPackage;
import com.reactlibrary.googlesignin.RNGoogleSignInPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;

import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
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
            new RNMeasureTextPackage(),
            new SvgPackage(),
            new RNSharePackage(),
            new PickerViewPackage(),
            new ImagePickerPackage(),
            new PickerPackage(),
            new RNIapPackage(),
            new RNGoogleSignInPackage(),
            new RNGeocoderPackage(),
            new RNFirebasePackage(),
            new FBSDKPackage(mCallbackManager),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseAuthPackage(),
            new FacebookLoginPackage()
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
