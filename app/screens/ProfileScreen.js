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

export default class ProfileScreen extends Component {

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
        elevation: 1}}/>
        <ScrollView
          style={{ backgroundColor: 'whitesmoke '}}
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}/>
        }>
        {this.state.cards.map((ref) => {
          switch (ref.cardnum) {
            case 1:
              return ( <CardOnePreview title={ref.title} tagline={ref.tagline} buisname={ref.buisname} phonenum={ref.phonenum}/> );
            case 2:
              return ( <CardTwoPreview title={ref.title} tagline={ref.tagline} buisname={ref.buisname} phonenum={ref.phonenum}/> );
            case 3:
              return ( <CardThreePreview title={ref.title} tagline={ref.tagline} buisname={ref.buisname} phonenum={ref.phonenum}/> );
            case 4:
              return ( <CardFourPreview title={ref.title} tagline={ref.tagline} buisname={ref.buisname} phonenum={ref.phonenum}/> );
            case 5:
              return ( <CardFivePreview title={ref.title} tagline={ref.tagline} buisname={ref.buisname} phonenum={ref.phonenum}/> );
          }
          })}
        </ScrollView>
      </Container>
    )
  };
}
