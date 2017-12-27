import React, { Component } from 'react';
import { View, Text, AppRegistry, TouchableOpacity, Modal, KeyboardAvoidingView, AsyncStorage, Dimensions, Picker, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import store from 'react-native-simple-store';

import { Header } from '../components/Header';
import { CardInput } from '../components/CardInput';
import { Container } from '../components/Container';
import { CardOnePreview } from '../components/CardOnePreview';
import { CardTwoPreview } from '../components/CardTwoPreview';
import { CardThreePreview } from '../components/CardThreePreview';
import { CardFourPreview } from '../components/CardFourPreview';
import { CardFivePreview } from '../components/CardFivePreview'

import ImagePicker from 'react-native-image-picker'

// import GL from 'gl-react'
// import { Surface } from "gl-react-native";
// import { HueRotate } from 'gl-react-hue-rotate'

import {
    SlidersColorPicker,
    HueGradient,
    SaturationGradient,
    LightnessGradient,
    HueSlider,
    SaturationSlider,
    LightnessSlider
} from 'react-native-color';

const {height, width} = Dimensions.get('window');

export default class EcardScreen extends React.Component {

  state = {
    title: '',
    tagline: '',
    buisname: '',
    phonenum: '',
    cardnum: 1,
    isModalVisible: false,
    color: "rgba(255,255,255,0.3)",
    modalVisible: false,
    recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
    avatarSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII='
  }

  _showModal = () => { this.setState({ isModalVisible: true })
    console.log(width)
  }
  _hideModal = () => { this.setState({ isModalVisible: false })
    console.log(width)
  }

  _showColorModal = () => { this.setState({ modalVisible: true })
    console.log(width)
  }

  saveData = () => {
    let obj = {
      cardnum: this.state.cardnum,
      title: this.state.title,
      tagline: this.state.tagline,
      buisname: this.state.buisname,
      phonenum: this.state.phonenum,
      color: this.state.color
    }
    store.push('usercard', obj)
  }

  /*<View style={{
    borderBottomColor: '#003E5B',
    borderBottomWidth: 4,
    shadowOffset: { width: 0, height:2.8 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1}}/>*/

    changeColor() {
        this.setState({ modalVisible: false })
    }

    constructor(props) {
        super(props)

        this.addLogo = this.addLogo.bind(this);
    }

  render() {
    const { navigate } = this.props.navigation;
    const { title, tagline, buisname, phonenum, cardnum } = this.state;
    const { isLoading } = this.props;

    // testing the fucking color overlay shit
    // return (
    //     <Surface width={300} height={200}>
    //         <HueRotate hue={12}>
    //             <View key="pooP">
    //                 <Image
    //                     style={{ width: 256, height: 244 }}
    //                     source={require('../data/CardTemplates/businesscard4.png')}
    //                 />
    //             </View>
    //         </HueRotate>
    //     </Surface>
    // )

    return (
      <Container>

        <Header title={'Business Card'}/>

        { (() => {
          switch(cardnum) {
            case 1:
              return ( <CardOnePreview logo={this.state.avatarSource} color={this.state.color} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
            case 2:
              return ( <CardTwoPreview logo={this.state.avatarSource} color={this.state.color} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
            case 3:
              return ( <CardThreePreview logo={this.state.avatarSource} color={this.state.color} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
            case 4:
              return ( <CardFourPreview logo={this.state.avatarSource} color={this.state.color} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
            case 5:
              return ( <CardFivePreview logo={this.state.avatarSource} color={this.state.color} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
          }
        })()}

        <View style={styles.pickWrapper}>
          <Picker
            style={styles.picker}
            mode="dialog"
            placeholder="Select One"
            selectedValue={cardnum}
            onValueChange={(itemValue, itemIndex) => this.setState({ cardnum: itemValue })}>
            <Picker.Item label={"Black and Yellow"} value={1} />
            <Picker.Item label={"Blue and White"} value={2} />
            <Picker.Item label={"Minimalistic"} value={3} />
            <Picker.Item label={"Carbon"} value={4} />
            <Picker.Item label={"Red and White"} value={5} />
          </Picker>
        </View>

        <SlidersColorPicker
            visible={this.state.modalVisible}
            color={this.state.color}
            returnMode={'rgb'}
            onCancel={() => this.setState({ modalVisible: false })}
            onOk={colorHex => {
              this.setState({
                modalVisible: false,
                color: colorHex
              });
              this.setState({
                recents: [
                  colorHex,
                  ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                ]
              });
            }}
            swatches={this.state.recents}
            swatchesLabel="RECENTS"
            okLabel="Done"
            cancelLabel="Cancel"
        />

        <View style={styles.buttonRow }>
          <TouchableOpacity
            style={styles.button2}
            onPress={this._showModal}>
            <Text style={styles.buttonText}>Edit Content</Text>
          </TouchableOpacity>
            <TouchableOpacity
                style={styles.button2}
                onPress={this._showColorModal}>
                <Text style={styles.buttonText}>Choose Color</Text>
            </TouchableOpacity>
          
        </View>

        <View style={styles.buttonRow }>
            <TouchableOpacity
                style={styles.button2}
                onPress={this.saveData}>
                <Text style={styles.buttonText}>Save Card</Text>
            </TouchableOpacity>
        </View>

        <Modal
          onRequestClose={this._hideModal}
          transparent={true}
          visible={this.state.isModalVisible}
          animationType='fade'>

            <KeyboardAvoidingView
              behavior={'position'}
              style={{ backgroundColor: 'whitesmoke', flex: 1}}>

              <Header title={'Business Card'}/>

              { (() => {
                switch(cardnum) {
                  case 1:
                    return ( <CardOnePreview cardnum={cardnum} logo={this.state.avatarSource} color={this.state.color} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
                  case 2:
                    return ( <CardTwoPreview cardnum={cardnum} logo={this.state.avatarSource} color={this.state.color} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
                  case 3:
                    return ( <CardThreePreview cardnum={cardnum} logo={this.state.avatarSource} color={this.state.color} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
                  case 4:
                    return ( <CardFourPreview cardnum={cardnum} logo={this.state.avatarSource} color={this.state.color} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
                  case 5:
                    return ( <CardFivePreview cardnum={cardnum} logo={this.state.avatarSource} color={this.state.color} title={title} tagline={tagline} buisname={buisname} phonenum={phonenum}/> );
                }
              })()}

              <CardInput
                name={'title'}
                placeholder={'Large Text'}
                withRef={true}
                ref={(ref) => this.TitleInputRef = ref}
                editable={!isLoading}
                value={this.state.title}
                onChangeText={(value) => this.setState({title: value })}
                isEnabled={!isLoading}/>

              <CardInput
                name={'tagline'}
                placeholder={'Tagline'}
                withRef={true}
                ref={(ref) => this.TaglineInputRef = ref}
                editable={!isLoading}
                value={this.state.tagline}
                onChangeText={(value) => this.setState({tagline: value })}
                isEnabled={!isLoading}/>

              <CardInput
                name={'buisname'}
                placeholder={'Buisness Name'}
                withRef={true}
                ref={(ref) => this.BuisnameInputRef = ref}
                editable={!isLoading}
                value={this.state.buisname}
                onChangeText={(value) => this.setState({buisname: value })}
                isEnabled={!isLoading}/>

              <CardInput
                name={'phonenum'}
                placeholder={'Phone Number'}
                withRef={true}
                ref={(ref) => this.PhonenumInputRef = ref}
                editable={!isLoading}
                value={this.state.phonenum}
                onChangeText={(value) => this.setState({phonenum: value })}
                isEnabled={!isLoading}/>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.addLogo}>
                    <Text style={styles.buttonText}>Add Logo</Text>
                </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={this._hideModal}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Modal>
        </Container>
    )
  }

    options = {
        title: 'Select Logo',
        noData: true,
        storageOptions: {
            skipBackup: true,
            path: 'images',
            waitUntilSaved: true
        }
    };

    async addLogo() {
        await ImagePicker.showImagePicker(this.options, (response) => {   
                   
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                
                // You can also display the image using data:
                let source = response.uri;

                this.setState({
                    avatarSource: source
                });

            }
        })
    }
}

const styles = EStyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: width*.3,
        marginRight: width*.3,
        marginTop: 15,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
    pickWrapper: {
        margin: 10,
        borderRadius: 5,
        backgroundColor: '$lightGray',
    },
    pickWrapperText: {

    },
    picker: {

    }
})
