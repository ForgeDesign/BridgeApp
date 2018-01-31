import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, RefreshControl, FlatList, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import store from 'react-native-simple-store';

import styles from './ProfileStyles'

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

class ProfileScreen extends Component {

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
            // console.log("here we are in screen")
            this._onRefresh()
        }
        if (this.props.isFocused && !nextProps.isFocused) {
            // console.log("NOT HERE")
        }
    }

    swipeable = {}

    _keyExtractor = (item, index) => index;

    _renderItem(ref, navigation) {
        console.log(this.state.cards)
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
        console.log("edit")
        this.props.navigation.navigate('Edit', { card: ref, cards: this.state.cards })
        this.swipeable[ref.index].recenter()
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <Header title={'Profile'} />

                <ProfileHeader/>

                <View style={{
                    borderBottomColor: '#003E5B',
                    borderBottomWidth: 4,
                    shadowOffset: { width: 0, height:2.8 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1,
                    bottom: 3
                }}/>

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

export default withNavigationFocus(ProfileScreen, 'Profile')
