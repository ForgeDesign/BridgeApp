import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, RefreshControl } from 'react-native';
import store from 'react-native-simple-store';

import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { ProfileHeader } from '../components/ProfileHeader';
import { CardOnePreview } from '../components/CardOnePreview';
import { CardTwoPreview } from '../components/CardTwoPreview';
import { CardThreePreview } from '../components/CardThreePreview';
import { CardFourPreview } from '../components/CardFourPreview';
import { CardFivePreview } from '../components/CardFivePreview';

import { withNavigationFocus } from 'react-navigation-is-focused-hoc'

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      cards: []
    };
  }

  componentWillMount() {
    store.get('usercard').then((value) => {
      if (value!==null){
      this.setState({cards: value});
      this.forceUpdate()
      }
    });
  }


  _onRefresh() {
    this.setState({refreshing: true});
    store.get('usercard').then((value) => {
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
        bottom: 3}}/>
      
        <ScrollView
        style={{marginTop: 6}}
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}/>
        }>
        {this.state.cards.map((ref, key) => {
          switch (ref.cardnum) {
            case 1:
              return ( <CardOnePreview key={key} logo={ref.logo} title={ref.title} color={ref.color} website={ref.website} buisname={ref.buisname} phonenum={ref.phonenum} name={ref.name} email={ref.email} address={ref.address}/> );
            case 2:
              return ( <CardTwoPreview key={key} logo={ref.logo} title={ref.title} color={ref.color} website={ref.website} buisname={ref.buisname} phonenum={ref.phonenum} name={ref.name} email={ref.email} address={ref.address}/> );
            case 3:
              return ( <CardThreePreview key={key} logo={ref.logo} title={ref.title} color={ref.color} website={ref.website} buisname={ref.buisname} phonenum={ref.phonenum} name={ref.name} email={ref.email} address={ref.address}/> );
            case 4:
              return ( <CardFourPreview key={key} logo={ref.logo} title={ref.title} color={ref.color} website={ref.website} buisname={ref.buisname} phonenum={ref.phonenum} name={ref.name} email={ref.email} address={ref.address}/> );
            case 5:
              return ( <CardFivePreview key={key} logo={ref.logo} title={ref.title} color={ref.color} website={ref.website} buisname={ref.buisname} phonenum={ref.phonenum} name={ref.name} email={ref.email} address={ref.address}/> );
          }
          })}
        </ScrollView>
      </Container>
    )
  };
}

export default withNavigationFocus(ProfileScreen, 'Profile')