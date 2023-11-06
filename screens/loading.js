import { StyleSheet, View, Image } from 'react-native';
import React, { useContext } from 'react'

import Icon from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../context/auth';

export default function Loading({ children }) {
  const { loading } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      {
        loading ?
          <Icon name='loading1' size={20} color={"#000"} />
        :
        { children }
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9D9D9',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
