import { View, Text, StyleSheet,  } from 'react-native';
import React from 'react';

const UserConfig = () => {
  return (
    <View>
      <Text>Tela do usuário</Text>
    </View>
  );
};

const styles = StyleSheet.create ({
  texto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default UserConfig;