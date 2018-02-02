import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, RefreshControl, FlatList, TouchableOpacity, Modal, Dimensions, AsyncStorage } from 'react-native';
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
            cards: [],
            isModalVisible: false,
            isModalOneVisible: false,
            isModalTwoVisible: false,
            isModalThreeVisible: false,
            isModalFourVisible: false,
            isModalFiveVisible: false,
            _navigation: null,
            _cardnum: null,
            _key: null,
            _logo: null,
            _position: null,
            _color: null,
            _website: null,
            _buisname: null,
            _phonenum: null,
            _name: null,
            _email: null,
            _address: null,
            _city: null,
            _stateabb: null,
            _zip: null,
            landscapedCard: []
        };
    }

    componentWillMount() {
        store.get('busicards').then((value) => {
            if (value!==null){
                this.setState({cards: value});
                this.forceUpdate()
            }
        });
    }
    
    // assignVariables(nav,reference){
    //     this.setState({isModalVisible: true})
    //     this.setState({_navigation: nav})
    //     this.setState({_cardnum: reference.item.cardnum})
    //     this.setState({_key: reference.index})
    //     this.setState({_logo: reference.item.logo})
    //     this.setState({_position: reference.item.position})
    //     this.setState({_color: reference.item.color})
    //     this.setState({_website: reference.item.website})
    //     this.setState({_buisname: reference.item.buisname})
    //     this.setState({_phonenum: reference.item.phonenum})
    //     this.setState({_name: reference.item.name})
    //     this.setState({_email: reference.item.email})
    //     this.setState({_address: reference.item.address})
    //     this.setState({_city: reference.item.city})
    //     this.setState({_stateabb: reference.item.stateabb})
    //     this.setState({_zip: reference.item.zip})
    // }

    _onRefresh() {
        this.setState({refreshing: true});
        store.get('busicards').then((value) => {
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

    
    _showModal(ref) {
        this.setState({isModalVisible: true, landscapedCard: [ref]})
        console.log(this)
    }
    _hideModal = () => {this.setState({isModalVisible: false})}

    // _showModal = (ref) => { 
    //     switch(ref.item.cardnum){
    //         case 1:
    //             this.setState({isModalOneVisible: true});
    //         case 2:
    //             this.setState({isModalTwoVisible: true});
    //         case 3:
    //             this.setState({isModalThreeVisible: true});
    //         case 4:
    //             this.setState({isModalFourVisible: true});
    //         case 5:
    //             this.setState({isModalFiveVisible: true});
    //     }
        
    //  }

    // _hideModal = () => { 
    //     this.setState({ isModalOneVisible: false });
    //     this.setState({ isModalTwoVisible: false });
    //     this.setState({ isModalThreeVisible: false });
    //     this.setState({ isModalFourVisible: false });
    //     this.setState({ isModalFiveVisible: false });
    // }

    
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
                                    onPress={() => this.openConnect()}>
                                        <Text style={styles.buttonText}>Share Card</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this._deleteItem(ref.index)}>
                                        <Text style={styles.buttonText}>Delete Card</Text>
                                </TouchableOpacity>
                            </View>
                        ]}
                        rightButtonWidth={width*.4 + 30}>
                        <TouchableOpacity onPress = {() => this._showModal(ref)}>
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
                        </TouchableOpacity>
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
                                    onPress={() => this.openConnect()}>
                                        <Text style={styles.buttonText}>Share Card</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this._deleteItem(ref.index)}>
                                        <Text style={styles.buttonText}>Delete Card</Text>
                                </TouchableOpacity>
                            </View>
                        ]}
                        rightButtonWidth={width*.4 + 30}>
                        <TouchableOpacity onPress = {() => this._showModal(ref)}>
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
                        </TouchableOpacity>
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
                                    onPress={() => this.openConnect()}>
                                        <Text style={styles.buttonText}>Share Card</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this._deleteItem(ref.index)}>
                                        <Text style={styles.buttonText}>Delete Card</Text>
                                </TouchableOpacity>
                            </View>
                        ]}
                        rightButtonWidth={width*.4 + 30}>
                        <TouchableOpacity onPress = {() => this._showModal(ref)}>
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
                        </TouchableOpacity>
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
                                    onPress={() => this.openConnect()}>
                                        <Text style={styles.buttonText}>Share Card</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this._deleteItem(ref.index)}>
                                        <Text style={styles.buttonText}>Delete Card</Text>
                                </TouchableOpacity>
                            </View>
                        ]}
                        rightButtonWidth={width*.4 + 30}>
                        <TouchableOpacity onPress = {() => this._showModal(ref)}>
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
                        </TouchableOpacity>
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
                                    onPress={() => this.openConnect()}>
                                        <Text style={styles.buttonText}>Share Card</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this._deleteItem(ref.index)}>
                                        <Text style={styles.buttonText}>Delete Card</Text>
                                </TouchableOpacity>
                            </View>
                        ]}
                        rightButtonWidth={width*.4 + 30}>
                        <TouchableOpacity onPress = {() => this._showModal(ref)}>
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
                        </TouchableOpacity>
                    </Swipeable>
                )
        }
    }

    _deleteItem(index) {
        this.swipeable[index].recenter()
        arrayCopy = this.state.cards
        arrayCopy.splice(index, 1)
        setTimeout(() => {this.setState({cards: arrayCopy})}, 215)
        AsyncStorage.setItem('busicards', JSON.stringify(arrayCopy))
    }

    _editItem(ref) {
        this.props.navigation.navigate('Edit', { card: ref, cards: this.state.cards })
        this.swipeable[ref.index].recenter()
    }

    openConnect() {
        this.header.openConnect()
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <Header title={'Profile'} />

                <ProfileHeader ref={ref => this.header = ref} navigation={this.props.navigation}/>

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
                

                <Modal
                    onRequestClose={this._hideModal}
                    transparent={false}
                    visible={this.state.isModalVisible}
                    animationType='slide'>
                    <View style={{ top: '40%', left: '3%', transform: [{ rotate: '90deg'}, {scaleX: 2}, {scaleY: 2}], alignContent:"center", justifyContent: "center" }}>
                        {this.state.landscapedCard.map((ref, key) =>
                            {
                                index = ref.index
                                switch (ref.item.cardnum) {
                                    case 1:
                                    return (
                                        <TouchableOpacity key={ref.index + 'landscaped'} onPress = {this._hideModal}>
                                            <CardOneDisplay
                                                cardnum={ref.item.cardnum}
                                                key={ref.index + 'landscaped'}
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
                                        </TouchableOpacity>
                                    )
                                    case 2:
                                    return (
                                        <TouchableOpacity key={ref.index + 'landscaped'} onPress = {this._hideModal}>
                                            <CardTwoDisplay
                                                cardnum={ref.item.cardnum}
                                                key={ref.index + 'landscaped'}
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
                                        </TouchableOpacity>
                                    )
                                    case 3:
                                    return (
                                        <TouchableOpacity key={ref.index + 'landscaped'} onPress = {this._hideModal}>
                                            <CardThreeDisplay
                                                cardnum={ref.item.cardnum}
                                                key={ref.index + 'landscaped'}
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
                                        </TouchableOpacity>
                                    )
                                    case 4:
                                    return (
                                        <TouchableOpacity key={ref.index + 'landscaped'} onPress = {this._hideModal}>
                                            <CardFourDisplay
                                                cardnum={ref.item.cardnum}
                                                key={ref.index + 'landscaped'}
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
                                        </TouchableOpacity>
                                    )
                                    case 5:
                                    return (
                                        <TouchableOpacity key={ref.index + 'landscaped'} onPress = {this._hideModal}>
                                            <CardFiveDisplay
                                                cardnum={ref.item.cardnum}
                                                key={ref.index + 'landscaped'}
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
                                        </TouchableOpacity>
                                    )
                                }
                            }
                        )}
                    </View>
                </Modal>

                {/* <Modal
                    onRequestClose={this._hideModal}
                    transparent={true}
                    visible={this.state.isModalOneVisible}
                    animationType='fade'>
                    <Text>Modal 1</Text>
                </Modal>

                <Modal
                    onRequestClose={this._hideModal}
                    transparent={true}
                    visible={this.state.isModalTwoVisible}
                    animationType='fade'>
                    <Text>Modal 2</Text>
                </Modal>

                <Modal
                    onRequestClose={this._hideModal}
                    transparent={true}
                    visible={this.state.isModalThreeVisible}
                    animationType='fade'>
                    <Text>Modal 3</Text>
                </Modal>

                <Modal
                    onRequestClose={this._hideModal}
                    transparent={true}
                    visible={this.state.isModalFourVisible}
                    animationType='fade'>
                    <Text>Modal 4</Text>
                </Modal>

                <Modal
                    onRequestClose={this._hideModal}
                    transparent={true}
                    visible={this.state.isModalFiveVisible}
                    animationType='fade'>
                    <Text>Modal 5</Text>
                </Modal> */}

            </Container>
        )
    }
}

export default withNavigationFocus(ProfileScreen, 'Profile')
