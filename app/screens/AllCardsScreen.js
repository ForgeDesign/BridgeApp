import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, RefreshControl, FlatList, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import store from 'react-native-simple-store';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { ProfileHeader } from '../components/ProfileHeader';
import { CardTwoDisplay } from '../components/CardTwoDisplay';
import { CardThreeDisplay } from '../components/CardThreeDisplay';
import { CardFourDisplay } from '../components/CardFourDisplay';
import { CardFiveDisplay } from '../components/CardFiveDisplay';
import { CardOneDisplay } from '../components/CardOneDisplay';

import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import Swipeable from 'react-native-swipeable';

var {height, width} = Dimensions.get('window');

export default class AllCardsScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          refreshing: false,
          cards: []
      };
  }

  componentWillMount() {
      store.get('buiscards').then((value) => {
          if (value!==null){
              this.setState({cards: value});
              this.forceUpdate()
          }
      });
  }

  _onRefresh() {
      this.setState({refreshing: true});
      store.get('buiscards').then((value) => {
          if (value!==null){
              this.setState({cards: value});
              this.forceUpdate();
          }
          this.setState({refreshing: false});
      });
  }

  componentWillReceiveProps(nextProps) {
      if (!this.props.isFocused && nextProps.isFocused) {
          // here we are in screen
          this._onRefresh()
      }
      if (this.props.isFocused && !nextProps.isFocused) {
          // NOT HERE
      }
  }

  swipeable = {}

  _keyExtractor = (item, index) => index;

  _renderItem(ref, navigation) {
      index = ref.index
      switch (ref.item.cardnum) {
          case 1:
              return (
                  <Swipeable
                      onRef={ref => this.swipeable[index] = ref}
                      rightButtons={[
                          <View style={styles.buttonRow}>
                              <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this._editItem(ref)}>
                                      <Text style={styles.buttonText}>Edit Card</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this._deleteItem(ref.index)}>
                                      <Text style={styles.buttonText}>Delete Card</Text>
                              </TouchableOpacity>
                          </View>
                      ]}
                      rightButtonWidth={width*.4 + 30}>
                      <CardOneDisplay
                          navigation={navigation}
                          cardnum={ref.item.cardnum}
                          key={ref.index}
                          logo={ref.item.logo}
                          position={ref.item.position}
                          color={ref.item.color}
                          website={ref.item.website}
                          buisname={ref.item.buisname}
                          phonenum={ref.item.phonenum}
                          name={ref.item.name}
                          email={ref.item.email}
                          address={ref.item.address}
                          city={ref.item.city}
                          stateabb={ref.item.stateabb}
                          zip={ref.item.zip}
                      />
                  </Swipeable>
              )
          case 2:
              return (
                  <Swipeable
                      onRef={ref => this.swipeable[index] = ref}
                      rightButtons={[
                          <View style={styles.buttonRow}>
                              <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this._editItem(ref)}>
                                      <Text style={styles.buttonText}>Edit Card</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this._deleteItem(ref.index)}>
                                      <Text style={styles.buttonText}>Delete Card</Text>
                              </TouchableOpacity>
                          </View>
                      ]}
                      rightButtonWidth={width*.4 + 30}>
                      <CardTwoDisplay
                          navigation={navigation}
                          cardnum={ref.item.cardnum}
                          key={ref.index}
                          logo={ref.item.logo}
                          position={ref.item.position}
                          color={ref.item.color}
                          website={ref.item.website}
                          buisname={ref.item.buisname}
                          phonenum={ref.item.phonenum}
                          name={ref.item.name}
                          email={ref.item.email}
                          address={ref.item.address}
                          city={ref.item.city}
                          stateabb={ref.item.stateabb}
                          zip={ref.item.zip}
                      />
                  </Swipeable>
              )
          case 3:
              return (
                  <Swipeable
                      onRef={ref => this.swipeable[index] = ref}
                      rightButtons={[
                          <View style={styles.buttonRow}>
                              <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this._editItem(ref)}>
                                      <Text style={styles.buttonText}>Edit Card</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this._deleteItem(ref.index)}>
                                      <Text style={styles.buttonText}>Delete Card</Text>
                              </TouchableOpacity>
                          </View>
                      ]}
                      rightButtonWidth={width*.4 + 30}>
                      <CardThreeDisplay
                          navigation={navigation}
                          cardnum={ref.item.cardnum}
                          key={ref.index}
                          logo={ref.item.logo}
                          position={ref.item.position}
                          color={ref.item.color}
                          website={ref.item.website}
                          buisname={ref.item.buisname}
                          phonenum={ref.item.phonenum}
                          name={ref.item.name}
                          email={ref.item.email}
                          address={ref.item.address}
                          city={ref.item.city}
                          stateabb={ref.item.stateabb}
                          zip={ref.item.zip}
                      />
                  </Swipeable>
              )
          case 4:
              return (
                  <Swipeable
                      onRef={ref => this.swipeable[index] = ref}
                      rightButtons={[
                          <View style={styles.buttonRow}>
                              <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this._editItem(ref)}>
                                      <Text style={styles.buttonText}>Edit Card</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this._deleteItem(ref.index)}>
                                      <Text style={styles.buttonText}>Delete Card</Text>
                              </TouchableOpacity>
                          </View>
                      ]}
                      rightButtonWidth={width*.4 + 30}>
                      <CardFourDisplay
                          navigation={navigation}
                          cardnum={ref.item.cardnum}
                          key={ref.index}
                          logo={ref.item.logo}
                          position={ref.item.position}
                          color={ref.item.color}
                          website={ref.item.website}
                          buisname={ref.item.buisname}
                          phonenum={ref.item.phonenum}
                          name={ref.item.name}
                          email={ref.item.email}
                          address={ref.item.address}
                          city={ref.item.city}
                          stateabb={ref.item.stateabb}
                          zip={ref.item.zip}
                      />
                  </Swipeable>
              )
          case 5:
              return (
                  <Swipeable
                      onRef={ref => this.swipeable[index] = ref}
                      rightButtons={[
                          <View style={styles.buttonRow}>
                              <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this._editItem(ref)}>
                                      <Text style={styles.buttonText}>Edit Card</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => this._deleteItem(ref.index)}>
                                      <Text style={styles.buttonText}>Delete Card</Text>
                              </TouchableOpacity>
                          </View>
                      ]}
                      rightButtonWidth={width*.4 + 30}>
                      <CardFiveDisplay
                          navigation={navigation}
                          cardnum={ref.item.cardnum}
                          key={ref.index}
                          logo={ref.item.logo}
                          position={ref.item.position}
                          color={ref.item.color}
                          website={ref.item.website}
                          buisname={ref.item.buisname}
                          phonenum={ref.item.phonenum}
                          name={ref.item.name}
                          email={ref.item.email}
                          address={ref.item.address}
                          city={ref.item.city}
                          stateabb={ref.item.stateabb}
                          zip={ref.item.zip}
                      />
                  </Swipeable>
              )
      }
  }

  _deleteItem(index) {
      this.swipeable[index].recenter()
      arrayCopy = this.state.cards
      arrayCopy.splice(index, 1)
      setTimeout(() => {this.setState({cards: arrayCopy})}, 215)
      AsyncStorage.setItem('buiscards', JSON.stringify(arrayCopy))
  }

  _editItem(ref) {
      this.props.navigation.navigate('Edit', { card: ref, cards: this.state.cards })
      this.swipeable[ref.index].recenter()
  }

  back = () => this.props.navigation.navigate('Profile');

  render() {
      const { navigate } = this.props.navigation;

      return (
          <Container>
              <Header title={'My Cards'} />

              <View style={styles.buttonView}>

                  <TouchableOpacity
                  style={styles.button}
                  onPress={this.back}>
                      <Text style={styles.buttonText}>Return</Text>
                  </TouchableOpacity>

              </View>

              <FlatList
                  style={{marginTop: 6, marginBottom: 6}}
                  refreshControl= { <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/> }
                  data={this.state.cards}
                  keyExtractor={this._keyExtractor}
                  extraData={this.props.navigation}
                  renderItem={(item) => this._renderItem(item, this.props.navigation)}
              />

          </Container>
      )
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
      marginLeft: 10,
      marginRight: 10,
      marginTop: 15,
    },
    buttonText: {
      fontSize: 16,
      color: 'white',
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    button2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    button3: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*.4,
        height: width*.12,
        backgroundColor: '$primaryBlue',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
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