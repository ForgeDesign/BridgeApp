import React from 'react';

import { View, Text, Image } from 'react-native';
import styles from './styles';

const CardPreview = ({title, tagline, buisname, phonenum, cardnum}) => {
  if (cardnum == 0) {
    return (
      <Image style={styles.image}
        source={require('../../data/CardTemplates/businesscard1.png')} />
        <View style={styles.container}>
          <View style={styles.headView}/>
          <View style={styles.mainView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.tagline}>{tagline}</Text>
          </View>
          <View style={styles.footView}>
            <Text style={styles.buisname}>{buisname}</Text>
            <Text style={styles.phonenum}>{phonenum}</Text>
          </View>
        </View>
      </Image>
    )
  }
  if (cardnum == 1) {
    return (
      <Image style={styles.image}
        source={require('../../data/CardTemplates/businesscard2.png')} />
        <View style={styles.container}>
          <View style={styles.headView}/>
          <View style={styles.mainView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.tagline}>{tagline}</Text>
          </View>
          <View style={styles.footView}>
            <Text style={styles.buisname}>{buisname}</Text>
            <Text style={styles.phonenum}>{phonenum}</Text>
          </View>
        </View>
      </Image>
    )
  }
  if (cardnum == 2) {
    return (
      <Image style={styles.image}
        source={require('../../data/CardTemplates/businesscard3.png')} />
        <View style={styles.container}>
          <View style={styles.headView}/>
          <View style={styles.mainView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.tagline}>{tagline}</Text>
          </View>
          <View style={styles.footView}>
            <Text style={styles.buisname}>{buisname}</Text>
            <Text style={styles.phonenum}>{phonenum}</Text>
          </View>
        </View>
      </Image>
    )
  }
  if (cardnum == 3) {
    return (
      <Image style={styles.image}
        source={require('../../data/CardTemplates/businesscard4.png')} />
        <View style={styles.container}>
          <View style={styles.headView}/>
          <View style={styles.mainView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.tagline}>{tagline}</Text>
          </View>
          <View style={styles.footView}>
            <Text style={styles.buisname}>{buisname}</Text>
            <Text style={styles.phonenum}>{phonenum}</Text>
          </View>
        </View>
      </Image>
    )
  }
  if (cardnum == 4) {
    return (
      <Image style={styles.image}
        source={require('../../data/CardTemplates/businesscard5.png')} />
        <View style={styles.container}>
          <View style={styles.headView}/>
          <View style={styles.mainView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.tagline}>{tagline}</Text>
          </View>
          <View style={styles.footView}>
            <Text style={styles.buisname}>{buisname}</Text>
            <Text style={styles.phonenum}>{phonenum}</Text>
          </View>
        </View>
      </Image>
    )
  }
  else {
    return (
      <Image style={styles.image}
        source={require('../../data/CardTemplates/businesscard1.png')} />
        <View style={styles.container}>
          <View style={styles.headView}/>
          <View style={styles.mainView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.tagline}>{tagline}</Text>
          </View>
          <View style={styles.footView}>
            <Text style={styles.buisname}>{buisname}</Text>
            <Text style={styles.phonenum}>{phonenum}</Text>
          </View>
        </View>
      </Image>
    )
  }
};

export default CardPreview;
