import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Create = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    return (
        <View style={styles.container}>
                <TextInput
                    placeholder="Enter title"
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter content"
                    onChangeText={(text) => setContent(text)}
                    value={content}
                    style={styles.input}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00ced1',
      alignItems: 'center',
    },
    login_message: {
        fontSize: 40,
        height: 700,
        color: 'white',
        marginTop: 25
    },
    title_style: {
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    text_style: {
        position: 'absolute',
        top: 50,
        width: "100%",
        height: 700
    }
  });

  export default Create;