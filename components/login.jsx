import * as React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput } from 'react-native';

const Login = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.login_message}>Login</Text>
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
    login_message: {
        fontSize: 40,
        height: 700,
        color: 'white',
        marginTop: 25
    }
  });

  export default Login;