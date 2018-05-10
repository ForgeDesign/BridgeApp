package com.bridgecard;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.dooboolab.RNIap.RNIapPackage;
import com.beefe.picker.PickerViewPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.reactlibrary.googlesignin.RNGoogleSignInPackage;
import io.amarcruz.rnmeasuretext.RNMeasureTextPackage;
// import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // <-- Add this line

import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import cl.json.RNSharePackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new OrientationPackage(),
            new RNGeocoderPackage(),
            new RNIapPackage(),
            new PickerViewPackage(),
            new FBSDKPackage(),
            new FacebookLoginPackage(),
            new RNGoogleSignInPackage(),
            new RNMeasureTextPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(), // <-- Add this line
            new PickerPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new RNSharePackage(),
            new ImagePickerPackage()
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
