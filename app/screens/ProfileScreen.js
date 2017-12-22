import React, { Component } from 'react';
import { View, Text, AppRegistry, ScrollView, RefreshControl } from 'react-native';
import store from 'react-native-simple-store';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { ProfileHeader } from '../components/ProfileHeader';
import { CardPreview } from '../components/CardPreview';

export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      cards: []
    };
  }

  componentWillMount() {
    store.get('usercards').then((value) => {
      if (value!==null){
      this.setState({cards: value});
      this.forceUpdate()
      }
    });
  }


  _onRefresh() {
    this.setState({refreshing: true});
    store.get('usercards').then((value) => {
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
        <Header title={'Profile'}/>
        <ProfileHeader/>
        <ScrollView
          style={{ backgroundColor: 'whitesmoke '}}
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}/>
          }
        >
          {this.state.cards.map((ref) => <CardPreview title={ref.title} tagline={ref.tagline} buisname={ref.buisname} phonenum={ref.phonenum}/>)}
        </ScrollView>
      </Container>
    )
  };
}
