import React from 'react';
import { Text, Platform, View, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Keyboard, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import GoogleSignIn from 'react-native-google-sign-in';
import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';

var { FBLogin, FBLoginManager } = require('react-native-facebook-login');

import firebase from 'react-native-firebase';

var {height, width} = Dimensions.get('window');

const Facebook = {
    login: (permissions) => {
      return new Promise((resolve, reject) => {
        FBLoginManager.loginWithPermissions(permissions || ['email'], (error, data) => {
          if (!error) {
            resolve(data.credentials.token);
          } else {
            reject(error);
          }
        });
      });
    },
    logout: () => {
      return new Promise((resolve, reject) => {
        FBLoginManager.logout((error, data) => {
          if (!error) {
            resolve(true);
          } else {
            reject(error);
          }
        });
      });
    }
  }


export default class LoginScreen extends React.Component {

  state = {
    email: '',
    password: '',
    register: false,
    activity: false,
  }

    componentDidMount() {        
        GoogleSignIn.configure({ offlineAccess: true }).then(() => {
            // you can now call currentUserAsync()
        });
        // GoogleSignIn.hasPlayServices({ autoResolve: true }).then(() => {
        //     // play services are available. can now configure library
            
        // })
        // .catch((err) => {
        //     console.log("Play services error", err.code, err.message);
        // })
    }

  onSubmit = async () => {
    
    this.setState({activity: true})
    if (this.state.register) {
        user = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
        .then(value => {
            this.setState({activity: false})
            this.props.navigation.navigate('Main')
        }).catch((error) => {
            console.log(error)
            this.setState({activity: false})
            Alert.alert("Bad register!", "Sorry, something went wrong. Make sure your password has at least 6 characters!")
        });;
    }
    else {
        user = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
        .then(value => {
            this.setState({activity: false})
            this.props.navigation.navigate('Main')
        }).catch((error) => {
            this.setState({activity: false})
            Alert.alert("Bad login!", "Sorry, that was either a wrong username or a wrong password.")
        });
    }

  }

  render() {    

    const { email, password } = this.state
    const { navigate } = this.props.navigation
    const { isLoading, onLoginPress } = this.props
    const isValid = email !== '' && password !== ''
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.main}>

          <View style={styles.imageView}>
          <StatusBar translucent={false} barStyle="light-content" />
            <Image
              style={styles.logo}
              source={require('../assets/images/logo.png')}/>
          </View>
          <View style={styles.credView}>
            <EmailInput
              withRef={true}
              editable={!isLoading}
              onChangeText={(value) => this.setState({email: value })}
              isEnabled={!isLoading}/>
            <PasswordInput
              withRef={true}
              editable={!isLoading}
              onChangeText={(value) => this.setState({password: value })}
              isEnabled={!isLoading}/>
          </View>
          <View style={styles.miscView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onSubmit()}>
              <Text style={styles.buttonText}>{!this.state.activity ? (!this.state.register ? "Log in" : "Register") : ""}</Text>
              <View>
                  {this.state.activity ? (
              <ActivityIndicator style={{width: 5, height: 5}} size="small" color="#0000ff" />
                      
                  ) : 
                  <View/>}
                </View>
            </TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
            <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => {
                                                this.setState({activity: true})
                                                Facebook.logout().then(poo => {
                                                    Facebook.login().then(value => {
                                                        firebase.auth().signInAndRetrieveDataWithCredential(firebase.auth.FacebookAuthProvider.credential(value)).then(loggedUser => {
                                                            this.setState({activity: false})
                                                            this.props.navigation.navigate('Main')
                                                        }).catch((error2) => {
                                                            this.setState({activity: false})
                                                            console.log(JSON.stringify(error2))
                                                            Alert.alert("Uh oh!", "Something went wrong - we think you already have an account under the same email address, but the credentials used is different than what we've got stored. Try again with your original login method!")
                                                        })
                                                    }).catch((error) => {
                                                        this.setState({activity: false})
                                                        console.log(error.NSLocalizedDescription)
                                                    })
                                                })
                                            }}>
              <View style={styles.icon}>
                <Text style={styles.iconText}>f</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
                                                    this.setState({activity: true})
                                                    if(Platform.OS == "ios") {
                                                        GoogleSignIn.currentUser().then((user) => {
                                                            if (user != undefined) {
                                                                GoogleSignIn.signOut()
                                                            }
                                                            GoogleSignIn.signOut()
                                                            GoogleSignIn.signInPromise()
                                                            .then(user => {
                                                                firebase.auth().signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken)).then(loggedUser => {
                                                                    this.setState({activity: false})
                                                                    this.props.navigation.navigate('Main')
                                                                }).catch((error2) => {
                                                                    this.setState({activity: false})
                                                                    console.log(JSON.stringify(error2))
                                                                    Alert.alert("Uh oh!", "Something went wrong - we think you already have an account under the same email address, but the credentials used is different than what we've got stored. Try again with your original login method!")
                                                                })
                                                            }).catch((err) => {
                                                                this.setState({activity: false})
                                                                console.log(err)
                                                            })
                                                        }).catch(() => {
                                                            console.log("uh oh")
                                                        })
                                                    } else {
                                                        GoogleSignIn.signOut()
                                                        GoogleSignIn.signInPromise()
                                                            .then(user => {
                                                                console.log(user)
                                                                firebase.auth().signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(user.idToken)).then(loggedUser => {
                                                                    this.setState({activity: false})
                                                                    this.props.navigation.navigate('Main')
                                                                }).catch((error2) => {
                                                                    this.setState({activity: false})
                                                                    console.log(JSON.stringify(error2))
                                                                    Alert.alert("Uh oh!", "Something went wrong - we think you already have an account under the same email address, but the credentials used is different than what we've got stored. Try again with your original login method!")
                                                                })
                                                            }).catch((err) => {
                                                                this.setState({activity: false})
                                                                console.log(err)
                                                            })
                                                    }
                                            }}>
              <View style={styles.icon}>
                <Text style={styles.iconText}>{'g'}</Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footView}>
            <View style={styles.footNest}>
              <Text style={styles.footerText}>{this.state.register ? "Already have an account?" : "Dont have an account yet?"}</Text>
              <TouchableOpacity style={styles.registerButton} onPress={() => this.setState({register: !this.state.register})}>
                <Text style={styles.registerText}>{this.state.register ? "Log in" : "Register"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = EStyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '$primaryBlue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    flex: .6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: width*.4,
    width: width*.6,
  },
  credview: {
    flex: .15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miscview: {
    flex: .2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width*.45,
    height: width*.11,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 14,
    color: '$primaryBlue',
  },
  forgotText: {
    fontSize: 12,
    color: 'black',
    alignSelf: 'center'
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: width*.08,
    height: width*.08,
    borderRadius: width*.04,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    backgroundColor: 'white'
  },
  iconText: {
    fontSize: 16,
    color: '$primaryBlue',
    fontWeight: 'bold'
  },
  footView: {
    flex: .25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footNest: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '$inputText',
  },
  registerButton: {
    margin: 5,
  },
  registerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

});
