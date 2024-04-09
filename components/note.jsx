import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput } from 'react-native';
import { Card, TouchableOpacity } from 'react-native-paper';

const Note = ({ title, content, linkTo }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.create_note_style}>
        <Button styles={styles.note_title} onPress={() => navigation.navigate(Edit)} textColor='white'>
            <Text style={styles.note_title}>{title}</Text>
            <Text style={styles.note_title}>{content}</Text>
        </Button>
    </View>
    )
}

const styles = StyleSheet.create({
    note_style: {
        margin: 10,
        backgroundColor: 'white',
    },
    
  });

  export default Note;