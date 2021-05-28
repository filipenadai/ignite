import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export function Home() {
    const [mySkill, setMySkill] = useState('');
    const [mySkills, setMySkills] = useState([]);

    function handleAddNewSkill() {
        setMySkills(state => [...state, mySkill]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, Nadai</Text>
            <TextInput
                placeholder="New Skill"
                placeholderTextColor="#555"
                style={styles.input}
                onChangeText={setMySkill}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddNewSkill}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>
            {
                mySkills.map(skill => (
                    <TouchableOpacity key={skill} style={styles.buttonSkill}>
                        <Text style={styles.textSkill}>
                            {skill}
                        </Text>
                    </TouchableOpacity>

                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 70,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#1f1e25',
        color: '#fff',
        borderRadius: 7,
        fontSize: 18,
        padding: 15,
        marginTop: 30,
    },
    button: {
        backgroundColor: '#a370f7',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    buttonSkill: {
        backgroundColor: '#1f1e25',
        padding: 20,
        borderRadius: 7,
        alignItems: 'center',
        marginVertical: 10,
    },
    textSkill: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})