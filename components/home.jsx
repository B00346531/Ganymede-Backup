import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TextInput, FlatList, Vibration, RefreshControl } from 'react-native';
import { PaperProvider, Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import Settings from './settings';
import Create from './create';
import Edit from './edit';

const Home = () => {
    const navigation = useNavigation();
    //Load Data
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const exportNotes = async () => {
        try {
            const notesExtension = JSON.stringify(notes);
            const fileUri = FileSystem.documentDirectory + 'note.json';
            await FileSystem.writeAsStringAsync(fileUri, notesExtension);
            console.log('Note Exported Successfully to: ', fileUri);
        }
        catch (error) {
            console.error('Export Failed', error)
        }
    }

    const storeNotes = async () => {
        try {
            const newNote = { title, content };
            const updatedNotes = [...notes, newNote];
            await AsyncStorage.setItem('@myNotes', JSON.stringify(updatedNotes));
            setNotes(updatedNotes);
            console.log("Note Saved Successfully...");
            setTitle('');
            setContent('');
            Vibration.vibrate(100);
        }
        catch (error) {
            console.log("Data Saved Unsuccessfully... Please Try Again...")
            console.log(error);
        }
    }

    const getNotes = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem('@myNotes');
            if(storedNotes !== null) {
                setNotes(JSON.parse(storedNotes));
            }
            else {
                setNotes([]);
            }
        }
        catch (error) {
            console.log("Data Retrieval Unsuccessful...")
            console.log(error);
            setTitle([]);
            setContent([]);
        }
    }

    useEffect(() => {
        const refreshNotes = async () => {
            await getNotes(title, content);
        }

        refreshNotes();
    }, []);

    const navigateToEdit = async (item) => {
        navigation.navigate('Edit', {  note: item });
        await getNotes();
    };

    const deleteNote = async (index) => {
        try {
            const updatedNotes = notes.filter((item, i) => {
                return i !== index;
            });
            await AsyncStorage.setItem('@myNotes', JSON.stringify(updatedNotes));
            setNotes(updatedNotes);
            console.log("Note Deleted...");
        }
        catch (error) {
            console.log("Error...", error);
        }
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <FlatList
                    //We simply use .reverse() to go backwards through the array as new Notes are added at the end of the array, so you want to start at the back and go to the start of the array
                    //React Native Card Buttons appear transparent and purple by default
                    data={notes.reverse()}
                    renderItem={({ item, index }) => (
                        <View style={styles.note_card}>
                            <Card style={styles.note_style} onPress={() => navigateToEdit(item)}>
                                <Card.Title title={item.title} subtitle={item.content}>
                                </Card.Title>
                                <Card.Actions>
                                    <Button onPress={() => navigateToEdit(item)}>Edit</Button>
                                    <Button onPress={() => deleteNote(index)}>Delete</Button>
                                    <Button onPress={() => exportNotes(item)}>Export</Button>
                                </Card.Actions>
                            </Card>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={true}
                    refreshControl={
                       <RefreshControl refreshing={true} onRefresh={useEffect} /> 
                    }
                />
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
                    multiline={true}
                />
                <Button style={styles.button} onPress={storeNotes}>Add Note</Button>
            </View>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00ced1',
        alignItems: 'center',
    },
    welcome_message: {
        padding: 20,
        marginTop: 10,
        marginBottom: 50,
        width: 400
    },
    welcome_message_title: {
        fontSize: 20
    },
    create_note_style: {
        backgroundColor: '#40e0d0',
        padding: 20,
        marginTop: 10,
        marginBottom: 1000,
        width: 400,
    },
    note_style: {
        backgroundColor: '#40e0d0',
        padding: 20,
        marginTop: 10,
        marginBottom: 20,
        width: 380,
    },
    note_title: {
        fontSize: 50,
    },
    note_card: {
        padding: 10,
        borderBottomWidth: 0,
        borderBottomColor: '#ccc',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        width: '80%',
        color: 'grey',
        backgroundColor: 'white'
    },
    button: {
        color: 'grey',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
    }
  });

  export default Home;