import React from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Text, Icon } from 'react-native';
import styles from './styles';

const Navbar = () => (
    <View style={styles.bar}>

      <TouchableOpacity
        style={styles.tab}
        onPress={() =>
          navigate('Profile')}>
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() =>
          navigate('Ecard')}>
          <Text style={styles.text}>Ecard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() =>
          navigate('Contacts')}>
        <Text style={styles.text}>Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() =>
          navigate('Iso')}>
        <Text style={styles.text}>ISO</Text>
      </TouchableOpacity>

    </View>
);

export default Navbar;
