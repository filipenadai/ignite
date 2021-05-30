import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
}

export function Home() {
    const [mySkill, setMySkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: mySkill,
        }

        setMySkills(state => [...state, data]);
    }

    function handleRemoveSkill(id: string) {
        setMySkills(state => state.filter(skill => skill.id !== id));
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

            <Button onPress={handleAddNewSkill} title="Add" />

            <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>
            <FlatList
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item: skill }) => (
                    <SkillCard skill={skill.name} onPress={() => handleRemoveSkill(skill.id)} />
                )}
            />
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
})