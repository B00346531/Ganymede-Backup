import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Edit = ({ route }) => {
    const navigation = useNavigation();
    const { note } = route.params;
    const [title, setTitle] = React.useState(note.title);
    const [content, setContent] = React.useState(note.content);

    const updateNotes = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem('@myNotes');
            if(storedNotes !== null) {
                const parsedNotes = JSON.parse(storedNotes)
                const updatedNotes = parsedNotes.map(item => {
                    if (item.title === note.title && item.content === note.content) {
                        return { ...item, title, content };
                    }
                    return item;
                });
                await AsyncStorage.setItem('@myNotes', JSON.stringify(updatedNotes));
                }
                } catch (error) {
                    console.log("Error...", error)
            }
            }

    useEffect(() => {
    }, []);

    const handleEdit = async () => {
        await updateNotes();
        navigation.navigate('Home', {updatedNotes: {title, content }});
    };

    return (
        <View style={styles.container}>
            <Button style={styles.button} onPress={handleEdit}>Save</Button>
            <TextInput style={styles.title_style} label="Title" value={title} onChangeText={setTitle} placeholder='Enter Title'/>
            <TextInput style={styles.text_style} label="Text" value={content} onChangeText={setContent} multiline={true} autoCapitalize={'sentences'} autoCorrect={true} scrollEnabled={true}/>
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
    },
    title_style: {
        position: 'absolute',
        top: 100,
        width: '100%'
    },
    text_style: {
        position: 'absolute',
        top: 155,
        width: "100%",
        height: 700
    },
    button: {
        position: 'absolute',
        color: 'white',
        width: "20%",
        top: 10,
        height: 50,
        backgroundColor: 'white',
        fontSize: 20
          
    }
  });

  export default Edit;