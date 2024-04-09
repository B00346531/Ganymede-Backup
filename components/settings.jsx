import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.setting_message}>Settings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00ced1',
      alignItems: 'center',
      justifyContent: 'center',
    },
    setting_message: {
        fontSize: 40,
        height: 700,
        color: 'white',
        marginTop: 25
    }
  });

  export default Settings;

  //Copied and Pasted from home.jsx