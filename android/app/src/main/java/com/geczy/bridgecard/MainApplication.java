package com.geczy.bridgecard;

import android.app.Application;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.projectseptember.RNGL.RNGLPackage;
import com.imagepicker.ImagePickerPackage;
import com.horcrux.svg.SvgPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.projectseptember.RNGL.RNGLPackage;

public class MainApplication extends Application implements ShareApplication, ReactApplication {
  @Override
  public String getFileProviderAuthority() {
         return "${applicationId}.provider";
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
            new PickerPackage(),
            new RNGLPackage(),
            new ImagePickerPackage(),
            new SvgPackage(),
            new RNSharePackage()
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
