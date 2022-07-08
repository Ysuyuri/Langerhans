import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HeaderLayout = () => {
    return (
            <HeaderRNE
            leftComponent={
            <TouchableOpacity>
                <Icon name="menu" color="white" />
            </TouchableOpacity>
            }
            rightComponent={
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <Icon name="person" type="Fontisto" color="white" />
                    </TouchableOpacity>
                </View>
            }
            />
    );
};

const styles = StyleSheet.create ({
    headerRight: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 5,
    },
  })

export default HeaderLayout;