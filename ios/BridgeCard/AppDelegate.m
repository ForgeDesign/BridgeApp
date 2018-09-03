/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */


//  AppDelegate.m
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import <GoogleSignIn/GoogleSignIn.h>

//#import <React/RCTLog.h>

#import <Firebase.h>
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [FIRDatabase database].persistenceEnabled = YES;
  
//  RCTSetLogThreshold(RCTLogLevelInfo - 1);
  
  NSURL *jsCodeLocation;
  
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist"];
  NSDictionary *plistDict = [NSDictionary dictionaryWithContentsOfFile:filePath];
  [GIDSignIn sharedInstance].clientID = [plistDict objectForKey:@"CLIENT_ID"];

  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"BridgeCard"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                  didFinishLaunchingWithOptions:launchOptions];
}
  
  // Facebook SDK
- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}

// Only if your app is using [Universal Links](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html).
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  // ADD THE FOLLOWING CODE
  if ([[GIDSignIn sharedInstance] handleURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey] annotation:options[UIApplicationOpenURLOptionsAnnotationKey]]) {
    return YES;
  }else if([[FBSDKApplicationDelegate sharedInstance] application:application openURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey] annotation:options[UIApplicationOpenURLOptionsAnnotationKey]]){
    return YES;
  }else if([RCTLinkingManager application:application openURL:url options:options]) {
    return YES;
  }

  return NO;
  // ADD THE ABOVE CODE
}

- (BOOL)application: (UIApplication *)application openURL: (NSURL *)url sourceApplication: (NSString *)sourceApplication annotation: (id)annotation
{
  if ([[GIDSignIn sharedInstance] handleURL:url sourceApplication:sourceApplication annotation:annotation]) {
    return YES;
  }else if([[FBSDKApplicationDelegate sharedInstance] application:application openURL:url sourceApplication:sourceApplication annotation:annotation]){
    return YES;
  }else if([RCTLinkingManager application:application openURL:url
                        sourceApplication:sourceApplication annotation:annotation]) {
    return YES;
  }
  
  return NO;
}


@end
