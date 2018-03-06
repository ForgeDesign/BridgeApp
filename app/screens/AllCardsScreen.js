    import React, { Component } from 'react';
    import { View, Text, AppRegistry, ScrollView, RefreshControl, FlatList, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
    import store from 'react-native-simple-store';
    import EStyleSheet from 'react-native-extended-stylesheet';

    import ConnectButtonWithDescription from '../components/ProfileHeader/ConnectButtonWithDescription';
    import { Container } from '../components/Container';
    import { Header } from '../components/Header';
    import { ProfileHeader } from '../components/ProfileHeader';
    import { BusinessCard } from '../components/BusinessCard';

    import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
    import Swipeable from 'react-native-swipeable';

    var {height, width} = Dimensions.get('window');

   class AllCardsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            cards: [],
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

    _keyExtractor = (item, index) => index;

    openConnect() {
        this.connect.openConnect()
    }

    _renderItem(item) {
        return(
            <Swipeable
                ref={ref => this["swipable" + item.index] = ref}
                rightButtons={[
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this._editItem(item)}>
                                <Text style={styles.buttonText}>Edit Card</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.openConnect()}>
                                <Text style={styles.buttonText}>Share Card</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this._deleteItem(item.index)}>
                                <Text style={styles.buttonText}>Delete Card</Text>
                        </TouchableOpacity>
                    </View>
                ]}
                rightButtonWidth={width*.4 + 30}
            >
                <BusinessCard
                    font={item.item.font}
                    cardnum={item.item.cardnum}
                    key={item.index}
                    id={item.index}
                    logo={item.item.logo}
                    position={item.item.position}
                    color={item.item.color}
                    website={item.item.website}
                    businame={item.item.businame}
                    phonenum={item.item.phonenum}
                    name={item.item.name}
                    email={item.item.email}
                    address={item.item.address}
                    city={item.item.city}
                    stateabb={item.item.stateabb}
                    socialMedia={item.item.socialMedia}
                    zip={item.item.zip}
                />
            </Swipeable>
        )
    }

    _deleteItem(index) {
        this["swipable" + index].recenter()
        arrayCopy = this.state.cards
        arrayCopy = arrayCopy.filter((_, i) => i !== index)
        setTimeout(() => {this.setState({cards: arrayCopy})}, 215)
        AsyncStorage.setItem('busicards', JSON.stringify(arrayCopy))
        var d = new Date();
        obj = {
            connector: "You",
            text: "deleted a",
            connectee: "Bridge Card",
            icon: "md-trash",
            image: "",
            time: d.toString()
        }
        store.push('activity', obj)
    }

    _editItem(ref) {
        this.props.navigation.navigate('Edit', { card: ref, cards: this.state.cards })
        this["swipable" + ref.index].recenter()
    }

    back() {
        this.props.navigation.goBack()
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <Header title={'My Cards'} />

                {/* fun hack */}
                <View style={{display: 'none'}}>
                    <ConnectButtonWithDescription ref={ref => this.connect = ref}/>
                </View>

                <View style={styles.buttonView}>

                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.back()}>
                        <Text style={styles.buttonText}>Return</Text>
                    </TouchableOpacity>

                </View>

                <FlatList
                    style={{marginTop: 6, marginBottom: 6}}
                    ref={ref => this.list = ref}
                    refreshControl= { <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/> }
                    data={this.state.cards}
                    extraData={"poo"}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem.bind(this)}
                />

            </Container>
        )
    }
}

export default withNavigationFocus(AllCardsScreen, 'AllCards')

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
