import React, { Component } from 'react';
import { View, Text, AppRegistry, Platform, ScrollView, RefreshControl, FlatList, TouchableOpacity, Modal, Dimensions, Linking, Button, Alert } from 'react-native';

import styles from './ProfileStyles'

import AwesomeAlert from 'react-native-awesome-alerts'

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { ProfileHeader } from '../components/ProfileHeader';
import { BusinessCard } from '../components/BusinessCard';
import Checkbox from '../components/Checkbox';
import { ProfileActivity } from '../components/ProfileActivity';

import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import Swipeable from 'react-native-swipeable';

import { Col, Row, Grid } from "react-native-easy-grid";
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import firebase from 'react-native-firebase';
import { Face } from 'react-native-flip-card';
const rootRef = firebase.database().ref();
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
import GoogleSignIn from 'react-native-google-sign-in';

import * as RNIap from 'react-native-iap';

Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () { 
    return Date.isLeapYear(this.getFullYear()); 
};

Date.prototype.getDaysInMonth = function () { 
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

const itemSkus = Platform.select({
  ios: [
    'Pro2'
  ],
  android: [
    '2_pro.'
  ]
});

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

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

var {height, width} = Dimensions.get('window');

class ProfileScreen extends Component {

    tick() {
        this._getActivity()
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    constructor(props) {
        super(props)

        this.state = {
            price: "$0.0",
            disabled: true,
            activity: [ ],
            showAlert: false,
            capturedCards: 0,
            cardCount: 0,
            cards: []
        }

        this._handleCheck.bind(this)
        this._renderItem.bind(this)

        this._getCards()
        this._getActivity()
        this.interval = setInterval(this.tick.bind(this), 1000)

        this.getPeople().then(people => {
            removedDuplicates = []
            for (let index = 0; index < people.length; index++) {
                person = people[index];
                goodtogo = true
                for (let index2 = 0; index2 < removedDuplicates.length; index2++) {
                    const element = removedDuplicates[index2];
                    if(element.person == person.person) {
                        goodtogo = false
                        break
                    }
                }
                if(goodtogo) {
                    person.card = this.filter_array(person.card)
                    removedDuplicates.push(person)
                }
            }
            capturedCards = 0
            for (let index = 0; index < removedDuplicates.length; index++) {
                capturedCards += removedDuplicates[index].card.length
            }
            this.setState({capturedCards: capturedCards})
        })
    }

    showAlert = () => {
        this.promessage = 
        'Upgrade to "Pro" to get access to these features:\n' + 
        'Unlimited BridgeCards\n' + 
        'Unlimited Connects\n' + 
        'Unlimited Search Board Access\n' + 
        this.state.price + " for \"Pro\"\n" +
        'Monthly subscription\n\n' + 
        'Payment will be charged to iTunes Account at confirmation of purchase\n' + 
        'Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period\n' + 
        'Account will be charged for renewal within 24-hours prior to the end of the current period, and identify the cost of the renewal\n' + 
        'Manage your subscription in the iTunes store after purchase\n'
        this.setState({
          showAlert: true
        });
      };
    
      hideAlert = () => {
        this.setState({
          showAlert: false
        });
      };

    arraysEqual(arr1, arr2) {
        if(arr1.length !== arr2.length)
            return false;
        for(var i = arr1.length; i--;) {
            if(arr1[i].connector !== arr2[i].connector 
                || arr1[i].text !== arr2[i].text
                || arr1[i].connectee !== arr2[i].connectee
                || arr1[i].icon !== arr2[i].icon
                || arr1[i].image !== arr2[i].image
                || arr1[i].time !== arr2[i].time)
                return false;
        }
        return true;
    }

    getPeople() {
        return new Promise((resolve, reject) => {
            peopleObj = []
            rootRef.child(firebase.auth().currentUser.uid + "people").once().then(val => {
                val.forEach(child => {
                    boo = child.val()
                    boo.key = child.key
                    peopleObj.push(boo)
                })
                if(peopleObj.length == 0) {
                    peopleObj = [
                        {
                            "person": "uFMPJdt0hidaQN458StwnKx3NP32",
                            "location": "1001 Bridge Card Lane, OH",
                            "card":[{id: "-L82ptyd00cxneD_vabR", notes: ""}],
                        }
                    ]
                    rootRef.child(firebase.auth().currentUser.uid + "people").set(peopleObj)
                }
            }).then(() => {
                resolve(peopleObj)
            })
        });
    }

    _getActivity() {        
        
        rootRef.child(firebase.auth().currentUser.uid + "activity").once().then(val => {
            var activityArray = []
            val.forEach(child => {
                activityArray.push(child.val())
            })
            if (activityArray.length == 0) {
                var a = new Date();
                a.setMinutes(a.getMinutes() - 1);
                obj =  
                {
                    connector: "You",
                    text: "bridged with",
                    connectee: "Ryan Camardo",
                    icon: "",
                    image: "ryan",
                    time: a.toString()
                }
                this.setState({activity: [obj]})
                rootRef.child(firebase.auth().currentUser.uid + "activity").push(obj)
                return
            }
            if (!this.arraysEqual(activityArray.reverse(), this.state.activity)){
                this.setState({activity: activityArray});
            } 
        })
    }

    filter_array(test_array) {
        var index = -1,
            arr_length = test_array ? test_array.length : 0,
            resIndex = -1,
            result = [];
    
        while (++index < arr_length) {
            var value = test_array[index];
    
            if (value) {
                result[++resIndex] = value;
            }
        }
    
        return result;
    }

    _onRefresh() {
        this.setState({refreshing: true});
        rootRef.child(firebase.auth().currentUser.uid + "cards").once().then(val => {
            var cardArray = []
            val.forEach(child => {
                cardArray.push(child.val())
            })
            cardArray = this.filter_array(cardArray)
            this.setState({cards: cardArray, refreshing: false});
        })
    }

    _getCards() {
        console.log(firebase.auth().currentUser.uid)
        rootRef.child(firebase.auth().currentUser.uid + "cards").once().then(val => {
            console.log(val)
            var cardArray = []
            val.forEach(child => {
                cardArray.push(child.val())
            })
            // console.log(cardArray)

            cardArray = this.filter_array(cardArray)
            
            this.setState({cards: cardArray, cardCount: cardArray.length});
        })
    }

    level = "loading"

    componentWillMount() {
        var pathPerson = firebase.auth().currentUser.uid + "person"
        rootRef.child(pathPerson).once().then(firePerson => {
            this.level = firePerson.val().level
        })
        RNIap.getProducts(itemSkus).then(val => {
            this.setState({price : val["0"].localizedPrice})
        })
        this.getTheLevel()
    }

    // this tells you if the profile screen is active
    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            // here we are in screen
            var pathPerson = firebase.auth().currentUser.uid + "person"
            rootRef.child(pathPerson).once().then(firePerson => {
                this.level = firePerson.val().level
            })
            RNIap.getProducts(itemSkus).then(val => {
                this.setState({price : val["0"].localizedPrice})
            })
            this.getTheLevel()
            this._getActivity()
            this._getCards()
            this.getPeople().then(people => {
                capturedCards = 0
                for (let index = 0; index < people.length; index++) {
                    capturedCards += people[index].card.length
                }
                this.setState({capturedCards: capturedCards})
            })
            this.interval = setInterval(this.tick.bind(this), 1000)
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // NOT HERE
            clearInterval(this.interval)
        }
    }

    openPopup() {
        this._onRefresh()
        if (this.state.cards != undefined)
            for (let index = 0; index < this.state.cards.length; index++) {
                this["check" + index].uncheck()
            }
            this.cardChecked = {}
        this.setState({disabled: true})
        // for (let index = 0; index < this.state.cards.length; index++) {
        //     if(this[index] && this[index].updateForce)
        //         this[index].updateForce()
        // }
        setTimeout(() => {
            this._onRefresh()
        },400)
        //MARKMARK
        this.popupDialog.show()
        // setTimeout(() => {
        //     this.forceUpdate()
        // },300)
        
    }

    cardChecked = {}

    _keyExtractor = (item, index) => index;

    _handleCheck(val, ref) {
        this.cardChecked[ref.index] = val
        isCheck = false
        for (let index = 0; index < this.state.cards.length; index++) {
            if (this.cardChecked[index] != undefined && this.cardChecked[index]) {
                isCheck = true
                break
            }
        }
        if (isCheck) {
            this.setState({disabled : false})
        }
        else {
            this.setState({disabled : true})
        }
    }

    _handleShares() {
        checks = this.cardChecked
        cards = []
        this.popupDialog.dismiss()
        for (let index = 0; index < Object.keys(checks).length; index++) {
            cardKey = Object.keys(checks)[index]
            cards.push(this.state.cards[cardKey])
        }
        this.header.openConnect(cards)
    }

    _renderItem(ref) {
        return (
            <Grid style={{marginTop: '12%'}}>
                <Col size={Platform.OS == "android" ? 195 : 75}>
                    <BusinessCard
                        ref={(card) => this[ref.index] = card}
                        refreshOn={true}
                        logoFrame={ref.item.logoFrame}
                        chosenImage={ref.item.chosenImage}
                        font={ref.item.font}
                        cardnum={ref.item.cardnum}
                        id={ref.index}
                        key={ref.index}
                        logo={ref.item.logo}
                        position={ref.item.position}
                        color={ref.item.color}
                        website={ref.item.website}
                        businame={ref.item.businame}
                        phonenum={ref.item.phonenum}
                        name={ref.item.name}
                        email={ref.item.email}
                        address={ref.item.address}
                        city={ref.item.city}
                        stateabb={ref.item.stateabb}
                        zip={ref.item.zip}
                        socialMedia={ref.item.socialMedia}
                        section={ref.item.fireKey}
                    />
                </Col>
                <Col size={25}>
                    <Checkbox
                        style={{left: Platform.OS == "android" ? '0%' : '45%', flex: 1, top: '-12%'}}
                        onChange={(val) => this._handleCheck(val, ref)}
                        checked={false}
                        ref={(check) => {this["check" + ref.index] = check}}
                        checkedColor={$primaryBlue}
                        uncheckedColor={$lightGray}
                        iconName='matMix'
                    />
                </Col>
            </Grid>
        )
    }

    filter_array(test_array) {
        var index = -1,
            arr_length = test_array ? test_array.length : 0,
            resIndex = -1,
            result = [];
    
        while (++index < arr_length) {
            var value = test_array[index];
    
            if (value) {
                result[++resIndex] = value;
            }
        }
    
        return result;
    }

    async getTheLevel() {
        RNIap.prepare().then(val => {
            RNIap.getPurchaseHistory().then(val => {
                if(val) {
                    console.log(val)
                    var latest = new Date(val[val.length - 1].transactionDate)
                    var expires = new Date(val[val.length - 1].transactionDate)
                    expires = expires.addMonths(1)
                    if(latest <= expires) {
                        console.log("currently valid subscription")
                        var pathPerson = firebase.auth().currentUser.uid + "person"
                        rootRef.child(pathPerson).once().then(val2 => {
                            console.log("updating user", val2.val().transactionId)
                            if(val2.val().transactionId == val[val.length - 1].transactionId || val2.val().transactionId == undefined) {
                                var person = val2._value
                                if (person == null) {
                                    console.log("intializing person")
                                    obj = JSON.parse(JSON.stringify( firebase.auth().currentUser._user ))
                                    obj.level = "Pro"
                                    obj.transactionId = val[val.length - 1].transactionId
                                    delete obj.refreshToken
                                    delete obj.providerId
                                    delete obj.providerData
                                    delete obj.uid
                                    delete obj.metadata
                                    delete obj.phoneNumber
                                    delete obj.isAnonymous
                                    delete obj.emailVerified
                                    delete obj.email
                                    rootRef.child(pathPerson).set(obj).then(() => {
                                        console.log(obj)
                                        this.forceUpdate()
                                    })
                                }
                                else {
                                    console.log("updating existing person")
                                    var poo = val2.val()
                                    poo.level = "Pro"
                                    poo.transactionId = val[val.length - 1].transactionId
                                    rootRef.child(pathPerson).set(poo).then(() => {
                                        this.forceUpdate()
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                }
                            }
                        })
                    }
                    else {
                        var pathPerson = firebase.auth().currentUser.uid + "person"
                        rootRef.child(pathPerson).once().then(val2 => {
                            if(val2.val().transactionId == val[val.length - 1].transactionId) {
                                var person = val2._value
                                if (person == null) {
                                    obj = JSON.parse(JSON.stringify( firebase.auth().currentUser._user ))
                                    obj.level = "Lite"
                                    delete obj.refreshToken
                                    delete obj.providerId
                                    delete obj.providerData
                                    delete obj.uid
                                    delete obj.metadata
                                    delete obj.phoneNumber
                                    delete obj.isAnonymous
                                    delete obj.emailVerified
                                    delete obj.email
                                    rootRef.child(pathPerson).set(obj).then(() => {
                                        this.forceUpdate()
                                    })
                                }
                                else {
                                    var poo = val2.val()
                                    poo.level = "Lite"
                                    rootRef.child(pathPerson).set(poo).then(() => {
                                        this.forceUpdate()
                                    })
                                }
                            }
                        })
                    }
                }
            })
        });
    }

    state = {
        price: "$0.0"
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <Header 
                    title={'Profile'} 
                    logout={() => {
                        GoogleSignIn.signOut()
                        Facebook.logout().then(val => {
                            firebase.auth().signOut()
                        }).catch(err => {
                            firebase.auth().signOut()
                            console.log(err)
                        })
                    }}
                    upgrade={() => {
                        console.log("pressed")
                        this.showAlert()
                        
                        // GoogleSignIn.signOut()
                        // Facebook.logout().then(val => {
                        //     firebase.auth().signOut()
                        // }).catch(err => {
                        //     firebase.auth().signOut()
                        //     console.log(err)
                        // })
                    }}
                />

                {/* <Button
                    onPress={() => Linking.openURL("bridgecard://connectRemote/2dj5Le0d94Sf9fGiOEAzc0ywlhw2/card/-L8U06gQFXGHerQg_Yse")}
                    title="Open bridgecard://connectRemote/uid/card/id"
                /> */}

                <ProfileHeader
                    ref={ref => this.header = ref}
                    navigation={this.props.navigation}
                    showPopup={this.openPopup.bind(this)}
                    numberOfCards={this.state.cardCount}
                    capturedCards={this.state.capturedCards}
                />

                {Platform.OS == "android" ? (
                    <View/>
                ) : (
                    <View style={{
                        borderBottomColor: '#003E5B',
                        borderBottomWidth: 4,
                        shadowOffset: { width: 0, height:2.8 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 1,
                        bottom: 3
                    }}/>
                )}

                

                <PopupDialog
                    dialogTitle={<DialogTitle title="Select a Card" />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={slideAnimation}
                    height={0.70}
                    actions={[
                        <Grid key="grid">
                            <Row style={{justifyContent: 'center'}}>
                                <DialogButton
                                    text="Cancel"
                                    onPress={() => {
                                        this.popupDialog.dismiss();
                                    }}
                                    key="button-1"
                                />
                                <DialogButton
                                    disabled={this.state.disabled}
                                    text="Share"
                                    onPress={() => {
                                        this._handleShares();
                                    }}
                                    key="button-2"
                                />
                            </Row>
                        </Grid>]
                    }
                    >
                    <View>
                        <FlatList
                            height={'80%'}
                            data={this.state.cards}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem.bind(this)}
                        />
                    </View>
                </PopupDialog>
                <ScrollView style={{ flex: 1, marginTop: 3 }}>
                    {this.state.activity.map((ref, key) =>
                        <ProfileActivity
                          key={key}
                          ref={(card) => {this[key] = card}}
                          connector={ref.connector}
                          connectee={ref.connectee}
                          text={ref.text}
                          image={ref.image}
                          icon={ref.icon}
                          time={ref.time}/>
                    )}
                </ScrollView>

                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    messageStyle={{fontSize: 11}}
                    title="Upgrade to Pro"
                    message={this.promessage}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Cancel"
                    confirmText={"Upgrade for " + this.state.price}
                    confirmButtonColor="#5D9CBF"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();
                        if(this.level != "loading") {
                            if(this.level == "Pro")
                                Alert.alert("You are already upgraded to the pro version. Thank you for your support and keep Bridging!\n\n BridgeCard Team")
                            else {
                                try {
                                RNIap.prepare().then(val => {
                                    // RNIap.getSubscriptions(itemSkus).then(val => {
                                    //     console.log(val)
                                    // })
                                    RNIap.buySubscription(itemSkus[0]).then(subscription => {
                                        console.log(subscription)
                                        var person = firePerson._value
                                        if (person == null) {
                                            obj = JSON.parse(JSON.stringify( firebase.auth().currentUser._user ))
                                            obj.level = "Pro"
                                            obj.transactionId = subscription.transactionId
                                            delete obj.refreshToken
                                            delete obj.providerId
                                            delete obj.providerData
                                            delete obj.uid
                                            delete obj.metadata
                                            delete obj.phoneNumber
                                            delete obj.isAnonymous
                                            delete obj.emailVerified
                                            delete obj.email
                                            rootRef.child(pathPerson).set(obj)
                                        }
                                        else {
                                            var poo = firePerson.val()
                                            poo.level = "Pro"
                                            poo.transactionId = subscription.transactionId
                                            rootRef.child(pathPerson).set(poo)
                                        }
                                    })
                                });
                                //   const products = await RNIap.getAvailablePurchases();
                                //   console.log(products)
                                } catch(err) {
                                console.warn(err); // standardized err.code and err.message available
                                }
                            }
                        }
                        else {
                            var pathPerson = firebase.auth().currentUser.uid + "person"
                            rootRef.child(pathPerson).once().then(firePerson => {
                                if(firePerson.val().level == "Pro")
                                    Alert.alert("You are already upgraded to the pro version. Thank you for your support and keep Bridging!\n\n BridgeCard Team")
                                else {
                                    try {
                                        RNIap.prepare().then(val => {
                                            // RNIap.getSubscriptions(itemSkus).then(val => {
                                            //     console.log(val)
                                            // })
                                            RNIap.buySubscription(itemSkus[0]).then(subscription => {
                                                console.log(subscription)
                                                var person = firePerson._value
                                                if (person == null) {
                                                    obj = JSON.parse(JSON.stringify( firebase.auth().currentUser._user ))
                                                    obj.level = "Pro"
                                                    obj.transactionId = subscription.transactionId
                                                    delete obj.refreshToken
                                                    delete obj.providerId
                                                    delete obj.providerData
                                                    delete obj.uid
                                                    delete obj.metadata
                                                    delete obj.phoneNumber
                                                    delete obj.isAnonymous
                                                    delete obj.emailVerified
                                                    delete obj.email
                                                    rootRef.child(pathPerson).set(obj)
                                                }
                                                else {
                                                    var poo = firePerson.val()
                                                    poo.level = "Pro"
                                                    poo.transactionId = subscription.transactionId
                                                    rootRef.child(pathPerson).set(poo)
                                                }
                                            })
                                        });
                                      //   const products = await RNIap.getAvailablePurchases();
                                      //   console.log(products)
                                      } catch(err) {
                                        console.warn(err); // standardized err.code and err.message available
                                      }
                                }
                            })
                        }
                    }}
                    >
                        <TouchableOpacity onPress={() => Linking.openURL("http://www.bridgecardapp.com/privacy.html")}>
                        <Text>Privacy Policy</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => Linking.openURL("http://www.bridgecardapp.com/use.html")}>
                        <Text>Terms of Use</Text>
                        </TouchableOpacity>
                    </AwesomeAlert>
            </Container>
        )
    }
}

export default withNavigationFocus(ProfileScreen, 'Profile')
